declare type UseTokenBalanceState = {
    chainId: number;
    balances: any;
    fetchStatus: FetchStatus;
};
export declare enum FetchStatus {
    NOT_FETCHED = "not-fetched",
    SUCCESS = "success",
    FAILED = "failed",
    LOADING = "loading"
}
declare const useTokenBalances: (chainId: number) => UseTokenBalanceState;
export declare function useCurrencyBalances(chainId?: number, currencies?: (string | undefined)[]): any[];
export declare function useCurrencyBalance(chainId?: number, currency?: string): any;
export default useTokenBalances;
