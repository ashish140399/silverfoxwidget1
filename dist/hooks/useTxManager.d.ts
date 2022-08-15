import { BigNumber } from "ethers";
declare type UseTxManagerState = {
    chainId: number;
    liquidity: any;
    balance: BigNumber;
    subgraphBehind: number;
    fetchStatus: FetchStatus;
};
export declare enum FetchStatus {
    NOT_FETCHED = "not-fetched",
    SUCCESS = "success",
    FAILED = "failed",
    LOADING = "loading"
}
declare const useTxManager: (chainId: number, subgraphOnly?: boolean) => UseTxManagerState;
export default useTxManager;
