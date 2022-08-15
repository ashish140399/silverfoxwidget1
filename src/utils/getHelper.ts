import { ALL_LOCAL_ASSETS, CHAIN_CONFIG, DEFAULT_CHAIN_ID, isSupportedChain } from "config";
import { AssetContract, Chain, Protocols } from "config/types";
import { isAddress } from "ethers/lib/utils";

export const shorter = (str: any) => (str?.length > 8 ? String(str.slice(0, 6)) + "..." + String(str.slice(-4)) : str);

export const getChainList: any = () => {
  const chainList: any = [];
  for (const [key, value] of Object.entries(CHAIN_CONFIG)) {
    chainList.push({
      chainId: +key,
      name: value.name,
      short_name: value.short_name,
      image: value.image,
    });
  }

  return chainList;
};

export const getChainListExclude: any = (chainId: string) => {
  const chainList: any = [];
  for (const [key, value] of Object.entries(CHAIN_CONFIG)) {
    if (+key !== +chainId) {
      chainList.push({
        chainId: +key,
        name: value.name,
        short_name: value.short_name,
        image: value.image,
      });
    }
  }
  return chainList;
};

export const getChainInfo = (chainId: number): Chain => {
  return { ...CHAIN_CONFIG?.[chainId] };
};

export const isValidChainId = (chainId: number) => {
  return !!CHAIN_CONFIG?.[chainId];
};

export const getChainIdFromName = (name: string) => {
  for (const [key, value] of Object.entries(CHAIN_CONFIG)) {
    if (value.short_name === name) {
      return +key;
    }
  }

  return DEFAULT_CHAIN_ID;
};

export const getChainNameFromId = (id: number): string | undefined => {
  return CHAIN_CONFIG?.[id]?.name;
};

export const getChainShortNameFromId = (id: number): string | undefined => {
  return CHAIN_CONFIG?.[id]?.short_name;
};

export const getGasLimit = (chainId: number, protocol: Protocols): number => {
  return parseFloat(CHAIN_CONFIG?.[chainId]?.gas_limit[protocol] || "200000");
};

export const getTokenInfoFromAddr = (tokens: any, chainId: number, address: string) => {
  return tokens?.[chainId]?.find((item: any) => item.address.toLowerCase() === address?.toLowerCase());
};

export const getTokenDecimalFromAddr = (tokens: any, chainId: number, address: string) => {
  const tokenInfo = getTokenInfoFromAddr(tokens, chainId, address);
  if (tokenInfo) {
    return tokenInfo.decimals;
  }

  return 18;
};

export const getNativeTokenInfo = (chainId: number) => {
  return CHAIN_CONFIG?.[chainId]?.provider_params.nativeCurrency;
};

export const getWrappedToken = (chainId: number, wrappedChain: number | undefined = undefined): string | undefined => {
  return (
    ALL_LOCAL_ASSETS.find(
      (a) => a.is_wrapped && a.wrapped_chain_id === (wrappedChain ? wrappedChain : chainId),
    )?.contracts?.find((c) => c.chain_id === chainId)?.contract_address || undefined
  );
};

export const getLocalAsset = (chainId: number, idOrAddress: string): (AssetContract & { id: string }) | undefined => {
  const assetFromId = ALL_LOCAL_ASSETS.find((a) => a.id === idOrAddress)?.contracts?.find(
    (c) => c.chain_id === chainId,
  );
  if (assetFromId) return { id: idOrAddress, ...assetFromId };

  for (const local of ALL_LOCAL_ASSETS) {
    const asset = local.contracts.find(
      (c) => c.chain_id === chainId && c.contract_address?.toLowerCase() === idOrAddress.toLowerCase(),
    );
    if (asset) return { ...asset, id: local.id };
  }
  return undefined;
};

export const isSupportedLocalToken = (chainId: number, token: string): boolean => {
  if (!isSupportedChain(chainId) || !isAddress(token)) {
    return false;
  }

  for (const asset of ALL_LOCAL_ASSETS) {
    if (asset.contracts?.find((c) => c.chain_id === chainId)?.contract_address?.toLowerCase() === token?.toLowerCase())
      return true;
  }
  return false;
};

export const getExplorerLinkForTx = (tx: string, chainId: number) => {
  const explorer = CHAIN_CONFIG?.[chainId]?.explorer?.url;
  return explorer ? `${explorer}/tx/${tx}` : "#";
};

export const getExplorerLinkForAccount = (account: string, chainId: number) => {
  const explorer = CHAIN_CONFIG?.[chainId]?.explorer?.url;
  return explorer ? `${explorer}/address/${account}` : "#";
};

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString().slice(0, 19).replace("T", " ");
};
