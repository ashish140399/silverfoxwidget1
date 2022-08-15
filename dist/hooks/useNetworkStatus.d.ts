export declare enum FetchStatus {
    NOT_FETCHED = "not-fetched",
    SUCCESS = "success",
    FAILED = "failed",
    LOADING = "loading"
}
declare const useNetworkStatus: () => {
    maintenance: boolean;
    disabledNetworks: number[];
    networks: {
        [chainId: number]: {
            chainId: number;
            subgraph: boolean;
            maintenance: boolean;
        };
    };
    fetchStatus: FetchStatus;
};
export default useNetworkStatus;
