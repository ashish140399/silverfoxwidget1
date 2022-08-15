import { BigNumber } from "ethers";
declare type UseTokenBalanceState = {
    chainId: number;
    balance: BigNumber;
    fetchStatus: FetchStatus;
};
export declare enum FetchStatus {
    NOT_FETCHED = "not-fetched",
    SUCCESS = "success",
    FAILED = "failed",
    LOADING = "loading"
}
declare const useTokenBalance: (tokenAddress: string, chainId: number) => UseTokenBalanceState;
export declare const useGetEthBalance: (chainId: number) => {
    balance: BigNumber;
};
export default useTokenBalance;
