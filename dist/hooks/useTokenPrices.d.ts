export declare type TokenPriceParam = {
    chainId: number;
    assetId: string;
};
declare const useTokenPrices: (assets: TokenPriceParam[]) => Record<string, number>;
export declare function useCurrencyPrice(chainId?: number, currencies?: (string | undefined)[]): any[];
export default useTokenPrices;
