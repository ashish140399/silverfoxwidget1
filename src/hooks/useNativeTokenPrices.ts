import { TokenPriceContext } from "contexts/TokenPriceContext";
import { useContext } from "react";

const useNativeTokenPrices = () => {
  const { nativeTokenPrices, fetchStatus } = useContext(TokenPriceContext);
  return {
    nativeTokenPrices,
    fetchStatus,
  };
};

export default useNativeTokenPrices;
