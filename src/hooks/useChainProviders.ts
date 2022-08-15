import { useEffect, useState } from "react";
import { providers } from "ethers";
import { CHAIN_CONFIG } from "config";

const useChainProviders = () => {
  const [chainProviders, setChainProviders] = useState<
    Record<
      number,
      {
        provider: providers.FallbackProvider;
        multicall?: string;
        coingecko_id: string;
        coingecko_chain_id: string;
      }
    >
  >({});

  useEffect(() => {
    const tempProviders: Record<
      number,
      {
        provider: providers.FallbackProvider;
        multicall?: string;
        coingecko_id: string;
        coingecko_chain_id: string;
      }
    > = {};
    Object.entries(CHAIN_CONFIG).forEach(
      ([chainId, { provider_params, multicall, coingecko_id, coingecko_chain_id }]) => {
        tempProviders[parseInt(chainId)] = {
          provider: new providers.FallbackProvider(
            provider_params.rpcUrls.map((p) => new providers.JsonRpcProvider(p, parseInt(chainId))),
          ),
          multicall,
          coingecko_id,
          coingecko_chain_id,
        };
      },
    );

    setChainProviders(tempProviders);
  }, []);

  return { chainProviders };
};

export default useChainProviders;
