import { useEffect, useMemo, useState } from "react";
import useChainProviders from "./useChainProviders";
import { utils } from "ethers";
import axios from "axios";
import useNativeTokenPrices from "./useNativeTokenPrices";
import { ZERO_ADDRESS } from "config";

export type TokenPriceParam = {
  chainId: number;
  assetId: string;
};

const cachedPrices: Record<string, any> = {};

const useTokenPrices = (assets: TokenPriceParam[]) => {
  const [priceState, setPriceState] = useState<Record<string, number>>({});
  const { chainProviders } = useChainProviders();

  useEffect(() => {
    const fetchPrice = async () => {
      const tempPrices = {};
      for (const asset of assets) {
        if (!asset.assetId || !asset.chainId) {
          continue;
        }
        const key = `${asset.chainId}-${asset.assetId}`;
        if (tempPrices[key]) {
          continue;
        }

        if (cachedPrices[key] && Date.now() - cachedPrices[key].updated < 5 * 60 * 1000) {
          tempPrices[key] = cachedPrices[key].price;
          continue;
        }

        const chain_id = chainProviders?.[asset.chainId]?.coingecko_chain_id;
        if (utils.isAddress(asset.assetId) && asset.chainId && chain_id) {
          try {
            const res = await axios.get(
              `https://api.coingecko.com/api/v3/coins/${chain_id}/contract/${asset.assetId.toLowerCase()}`,
            );
            tempPrices[key] = parseFloat((res as any)?.market_data?.current_price?.usd || 0);
            cachedPrices[key] = {
              price: tempPrices[key],
              updated: Date.now(),
            };
          } catch (e: any) {
            console.error(e);
            tempPrices[key] = -1;
          }
        } else {
          tempPrices[key] = -1;
          cachedPrices[key] = {
            price: -1,
            updated: Date.now(),
          };
        }
      }

      setPriceState(tempPrices);
    };

    if (assets && assets.length > 0) {
      fetchPrice();
    }
  }, [JSON.stringify(assets), chainProviders]);

  return priceState;
};

export function useCurrencyPrice(chainId?: number, currencies?: (string | undefined)[]): any[] {
  const { nativeTokenPrices } = useNativeTokenPrices();
  const tokenPrices = useTokenPrices(
    (currencies || []).filter((c) => c != ZERO_ADDRESS).map((c) => ({ chainId, assetId: c } as TokenPriceParam)),
  );

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!currency) return undefined;
        if (currency !== ZERO_ADDRESS) return tokenPrices[`${chainId}-${currency?.toLowerCase()}`];
        if (currency === ZERO_ADDRESS) return nativeTokenPrices[chainId];
        return undefined;
      }) ?? [],
    [currencies, tokenPrices, nativeTokenPrices],
  );
}

export default useTokenPrices;
