import axios from "axios";
import useChainProviders from "hooks/useChainProviders";
import useRefresh from "hooks/useRefresh";
import React, { useState, useEffect } from "react";

type TokenPriceState = {
  nativeTokenPrices: Record<number, string>;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
}

const defaultState = {
  nativeTokenPrices: {},
  fetchStatus: FetchStatus.NOT_FETCHED,
};

const TokenPriceContext = React.createContext<TokenPriceState>(defaultState);

const TokenPriceContextProvider = ({ children }) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;

  const { chainProviders } = useChainProviders();
  const { slowRefresh } = useRefresh();
  const [priceState, setPriceState] = useState<TokenPriceState>({
    nativeTokenPrices: {},
    fetchStatus: NOT_FETCHED,
  });

  useEffect(() => {
    const fetchNativePrice = async () => {
      try {
        const ids = {};
        for (let index = 0; index < Object.values(chainProviders).length; index++) {
          ids[Object.keys(chainProviders)[index]] = Object.values(chainProviders)[index].coingecko_id;
        }

        if (Object.keys(ids).length) {
          const res = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(ids).join(",")}&vs_currencies=usd`,
          );
          const tempPrices: Record<number, string> = {};
          for (const chainId of Object.keys(ids)) {
            const token = ids[chainId];
            tempPrices[chainId] = res.data[token]?.usd ?? 0;
          }
          setPriceState({ nativeTokenPrices: tempPrices, fetchStatus: SUCCESS });
        }
      } catch (e: any) {
        console.error(e);
        setPriceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };
    if (chainProviders && Object.keys(chainProviders).length) {
      fetchNativePrice();
    }
  }, [slowRefresh, setPriceState, chainProviders, SUCCESS, FAILED]);

  return <TokenPriceContext.Provider value={priceState}>{children}</TokenPriceContext.Provider>;
};

export { TokenPriceContext, TokenPriceContextProvider };
