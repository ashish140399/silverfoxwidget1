import axios from "axios";
import { TOKENS_URL } from "config";
import { Token } from "config/types";
import useRefresh from "hooks/useRefresh";
import React, { useState, useEffect } from "react";
import { readFromCache, writeToCache } from "utils/cache";

type TokensState = {
  tokens: Record<number, Token[]>;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
}

export const FIBSWAP_TOKENS_KEY = "fibswap-tokens";

const defaultState = {
  tokens: {},
  fetchStatus: FetchStatus.NOT_FETCHED,
};

const TokensContext = React.createContext<TokensState>(defaultState);

const TokensContextProvider = ({ defaultTokens, children }) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;

  const { slowRefresh } = useRefresh();
  const [tokensState, setTokensState] = useState<TokensState>({
    tokens: readFromCache(FIBSWAP_TOKENS_KEY),
    fetchStatus: NOT_FETCHED,
  });

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        axios
          .get(TOKENS_URL)
          .then((res) => {
            if (res.data) {
              writeToCache(FIBSWAP_TOKENS_KEY, res.data);
              setTokensState({ tokens: res.data, fetchStatus: SUCCESS });
            }
          })
          .catch((e) => {
            console.log("fetching tokens error", e);
            setTokensState((prev) => ({
              ...prev,
              fetchStatus: FAILED,
            }));
          });
      } catch (e: any) {
        console.error(e);
        setTokensState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };

    if (defaultTokens && defaultTokens.length) {
      setTokensState({
        tokens: defaultTokens,
        fetchStatus: SUCCESS,
      });
    } else {
      fetchTokens();
    }
  }, [slowRefresh, setTokensState, defaultTokens, SUCCESS, FAILED]);

  return <TokensContext.Provider value={tokensState}>{children}</TokensContext.Provider>;
};

export { TokensContext, TokensContextProvider };
