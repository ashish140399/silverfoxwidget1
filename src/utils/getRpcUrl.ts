import { CHAIN_CONFIG } from "config";

const getNodeUrl = (chainId: number) => {
  for (const [key, value] of Object.entries(CHAIN_CONFIG)) {
    if (key === chainId.toString()) {
      const randomIndex = Math.floor(Math.random() * (value.provider_params.rpcUrls.length - 1));
      return value.provider_params.rpcUrls[randomIndex];
    }
  }
  return "";
};

export default getNodeUrl;
