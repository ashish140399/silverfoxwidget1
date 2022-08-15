import { Token } from "config/types";
import { TokensContext } from "contexts/TokensContext";
import { useContext } from "react";

export const useTokens = () => {
  const { tokens, fetchStatus } = useContext(TokensContext);
  return {
    tokens,
    fetchStatus,
  };
};

export const useToken = (chainId: number, address: string): Token => {
  const { tokens } = useContext(TokensContext);
  return tokens?.[chainId]?.find((item: any) => item.address.toLowerCase() === address?.toLowerCase());
};

export const useTokenDecimal = (chainId: number, address: string): number => {
  const { tokens } = useContext(TokensContext);
  const tokenInfo = tokens?.[chainId]?.find((item: any) => item.address.toLowerCase() === address?.toLowerCase());
  if (tokenInfo) {
    return tokenInfo.decimals;
  }
  return 18;
};

export default useTokens;
