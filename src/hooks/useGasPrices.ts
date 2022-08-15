import { useEffect, useState } from "react";
import useChainProviders from "./useChainProviders";
import { BigNumber } from "ethers";
import axios from "axios";
import { isSupportedChain } from "config";

const cachedPrices: Record<number, any> = {};

const useGasPrices = (chainId: number) => {
  const [priceState, setPriceState] = useState<number>(0);
  const { chainProviders } = useChainProviders();

  const fetchEthGas = () => {
    return axios
      .get("https://gas-price-api.1inch.io/v1.2/1")
      .then((response: any) => {
        return BigNumber.from(response?.data?.medium?.maxFeePerGas)
          .div(10 ** 9)
          .toNumber();
      })
      .catch(() =>
        axios.get("https://ethgasstation.info/api/ethgasAPI.json").then((response: any) => {
          return response.data.average / 10;
        }),
      )
      .catch(() => {
        return 0;
      });
  };

  const fetchPolygonGas = () => {
    return axios
      .get("https://gasstation-mainnet.matic.network/")
      .then((response: any) => {
        return parseFloat(response?.data?.fast || response?.data?.fastest || "100"); //standard
      })
      .catch(() => {
        return 0;
      });
  };

  useEffect(() => {
    const fetchPrice = async () => {
      if (!chainId) {
        return;
      }

      if (cachedPrices[chainId] && Date.now() - cachedPrices[chainId].updated < 5 * 60 * 1000) {
        setPriceState(cachedPrices[chainId].price);
        return;
      }

      let gasPriceGwei = 0;
      try {
        switch (chainId) {
          case 1:
            gasPriceGwei = await fetchEthGas();
            break;
          case 137:
            gasPriceGwei = await fetchPolygonGas();
            break;
          default:
            gasPriceGwei = 0;
        }

        if (gasPriceGwei == 0) {
          const temp = await chainProviders[chainId].provider.getGasPrice();
          gasPriceGwei = temp
            .mul(120)
            .div(100)
            .div(10 ** 9)
            .toNumber();
        }

        cachedPrices[chainId] = {
          price: gasPriceGwei,
          updated: Date.now(),
        };
      } catch (e: any) {
        console.error(e);
      }

      setPriceState(gasPriceGwei);
    };

    if (chainId && isSupportedChain(chainId)) {
      fetchPrice();
    }
  }, [chainId, chainProviders]);

  return priceState;
};

export default useGasPrices;
