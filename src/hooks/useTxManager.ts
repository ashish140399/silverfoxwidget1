import { useEffect, useState } from "react";
import useChainProviders from "./useChainProviders";
import { BIG_ZERO, ROUTER_ADDRESS } from "config";
import { BigNumber } from "ethers";
import { getChainInfo } from "utils/getHelper";
import axios from "axios";
import useRefresh from "./useRefresh";
import { isAddress } from "ethers/lib/utils";
import useNxtpSdk from "./useNxtpSdk";

type UseTxManagerState = {
  chainId: number;
  liquidity: any;
  balance: BigNumber;
  subgraphBehind: number;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
  LOADING = "loading",
}

const useTxManager = (chainId: number, subgraphOnly = false) => {
  const { NOT_FETCHED, SUCCESS, FAILED, LOADING } = FetchStatus;

  const [managerState, setManagerState] = useState<UseTxManagerState>({
    chainId: chainId,
    liquidity: null,
    balance: BIG_ZERO,
    subgraphBehind: 0,
    fetchStatus: NOT_FETCHED,
  });
  const { chainProviders } = useChainProviders();
  const { slowRefresh } = useRefresh();
  const { assetBalances } = useNxtpSdk(slowRefresh);

  useEffect(() => {
    const fetch = async () => {
      const chainInfo = getChainInfo(chainId);
      if (!chainInfo) {
        setManagerState((prev) => ({
          ...prev,
          chainId: chainId,
          fetchStatus: FAILED,
        }));
        return;
      }
      const provider = chainProviders[chainId].provider;
      const subgraphUrl = chainInfo.subgraph[0];
      if (!provider || !subgraphUrl) {
        console.log("Invalid chain info", chainId);
        setManagerState((prev) => ({
          ...prev,
          chainId: chainId,
          fetchStatus: FAILED,
        }));
        return;
      }

      axios
        .post(subgraphUrl, {
          query: `{
            _meta {
              block {
                number
              }
            }
          }`,
        })
        .then((response) => {
          const lastSyncedBlock = response?.data?.data?._meta?.block?.number;
          if (lastSyncedBlock > 0) {
            provider
              .getBlockNumber()
              .then((res) => {
                setManagerState((prev) => ({
                  ...prev,
                  subgraphBehind: Math.max(0, res - lastSyncedBlock),
                }));
              })
              .catch((e) => {
                console.log("failed to get latest block", e);
              });
          }
        })
        .catch((e) => {
          console.log("subgraph check failed", e);
          setManagerState((prev) => ({
            ...prev,
            subgraphBehind: 0,
          }));
        });

      if (!subgraphOnly) {
        // fetch txManager Balance, Asset Liquidity,
        const txManagerAddr = chainInfo.fibswap;
        if (!isAddress(txManagerAddr)) {
          setManagerState((prev) => ({
            ...prev,
            chainId: chainId,
            fetchStatus: FAILED,
          }));
          return;
        }

        const routerBalance = await provider.getBalance(ROUTER_ADDRESS);

        setManagerState((prev) => ({
          ...prev,
          chainId,
          liquidity: assetBalances?.[chainId] || [],
          balance: routerBalance,
          fetchStatus: SUCCESS,
        }));
      }
    };

    if (chainId && chainProviders[chainId]) {
      setManagerState((prev) => ({
        ...prev,
        chainId,
        fetchStatus: LOADING,
      }));
      fetch();
    }
  }, [chainId, chainProviders, assetBalances, slowRefresh, SUCCESS, FAILED, LOADING]);

  return managerState;
};

export default useTxManager;
