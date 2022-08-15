import { Token } from "config/types";
export declare const useTokens: () => {
    tokens: Record<number, Token[]>;
    fetchStatus: import("contexts/TokensContext").FetchStatus;
};
export declare const useToken: (chainId: number, address: string) => Token;
export declare const useTokenDecimal: (chainId: number, address: string) => number;
export default useTokens;
