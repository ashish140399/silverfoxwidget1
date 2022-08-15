declare const useNativeTokenPrices: () => {
    nativeTokenPrices: Record<number, string>;
    fetchStatus: import("contexts/TokenPriceContext").FetchStatus;
};
export default useNativeTokenPrices;
