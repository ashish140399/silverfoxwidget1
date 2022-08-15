import { providers } from "ethers";
declare const useChainProviders: () => {
    chainProviders: Record<number, {
        provider: providers.FallbackProvider;
        multicall?: string;
        coingecko_id: string;
        coingecko_chain_id: string;
    }>;
};
export default useChainProviders;
