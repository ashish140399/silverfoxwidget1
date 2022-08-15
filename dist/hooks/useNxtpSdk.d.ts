import { NxtpSdkBase, NxtpSdkUtils, NxtpSdkRouter, NxtpSdkSwap } from "@fibswap-dex/fibswap-sdk";
export declare enum InitStatus {
    NOT_INITED = "not-inited",
    SUCCESS = "success",
    FAILED = "failed",
    LOADING = "loading"
}
declare type UseNxtpSdkState = {
    nxtpSdkBase: NxtpSdkBase;
    nxtpSdkUtils: NxtpSdkUtils;
    nxtpSdkRouter: NxtpSdkRouter;
    nxtpSdkSwap: NxtpSdkSwap;
    status: InitStatus;
    error: any;
};
declare const useNxtpSdk: (trigger: number) => {
    sdk: UseNxtpSdkState;
    assetBalances: any;
    swapTransfers: any[];
    paymentTransfers: any[];
};
export default useNxtpSdk;
