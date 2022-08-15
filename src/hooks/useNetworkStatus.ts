import { useEffect, useMemo, useState } from "react";
import useChainProviders from "./useChainProviders";
import { CHAIN_CONFIG } from "config";
import { getChainInfo } from "utils/getHelper";
import axios from "axios";
import useStatus from "./useStatus";

type UseNetworkStatusState = {
  networks: {
    [chainId: number]: {
      chainId: number;
      subgraph: boolean;
      maintenance: boolean;
    };
  };
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
  LOADING = "loading",
}

const useNetworkStatus = () => {
  const { NOT_FETCHED, SUCCESS, FAILED, LOADING } = FetchStatus;

  const default_network_status = {};
  Object.keys(CHAIN_CONFIG).forEach((item) => {
    default_network_status[parseInt(item)] = {
      chainId: parseInt(item),
      subgraph: true,
      maintenance: false,
    };
  });
  const [networkState, setNetworkState] = useState<UseNetworkStatusState>({
    networks: default_network_status,
    fetchStatus: NOT_FETCHED,
  });
  const { chainProviders } = useChainProviders();
  const { networkStatus, maintenance } = useStatus();

  useEffect(() => {
    const fetch = async () => {
      const allChainIds = Object.keys(CHAIN_CONFIG);

      for (const chainId of allChainIds) {
        const chainInfo = getChainInfo(+chainId);

        if (!chainInfo) {
          continue;
        }
        const provider = chainProviders[chainId]?.provider;
        const subgraphUrl = chainInfo.subgraph[0];
        if (!provider || !subgraphUrl) {
          continue;
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
                  setNetworkState((prev) => ({
                    ...prev,
                    [+chainId]: {
                      ...prev[+chainId],
                      subgraph: res - lastSyncedBlock <= 100,
                    },
                  }));
                })
                .catch((e: any) => {
                  console.log("failed to get latest block", e);
                });
            }
          })
          .catch((e: any) => {
            console.log("subgraph check failed", e);
            setNetworkState((prev) => ({
              ...prev,
              [+chainId]: {
                ...prev[+chainId],
                subgraph: true,
              },
            }));
          });
      }
    };

    if (chainProviders) {
      setNetworkState((prev) => ({
        ...prev,
        fetchStatus: LOADING,
      }));

      fetch();
    }
  }, [chainProviders, SUCCESS, FAILED, LOADING]);

  useEffect(() => {
    const allChainIds = Object.keys(CHAIN_CONFIG);

    const tempNetworks = networkState.networks;
    for (const chainId of allChainIds) {
      const disalbed = !networkStatus?.[chainId] || false;
      tempNetworks[chainId].maintenance = disalbed || maintenance;
    }

    setNetworkState((prev) => ({
      ...prev,
      networks: tempNetworks,
      fetchStatus: SUCCESS,
    }));
  }, [networkStatus, maintenance]);

  const disabledNetworks = useMemo(() => {
    return (Object.values(networkState.networks) || [])
      .filter((status) => !!status.maintenance || !status.subgraph)
      .map((status) => +status.chainId);
  }, [networkState]);

  return { ...networkState, maintenance: false, disabledNetworks: disabledNetworks };
};

export default useNetworkStatus;
