import { AssetContract, Chain, Protocols } from "config/types";
export declare const shorter: (str: any) => any;
export declare const getChainList: any;
export declare const getChainListExclude: any;
export declare const getChainInfo: (chainId: number) => Chain;
export declare const isValidChainId: (chainId: number) => boolean;
export declare const getChainIdFromName: (name: string) => number;
export declare const getChainNameFromId: (id: number) => string | undefined;
export declare const getChainShortNameFromId: (id: number) => string | undefined;
export declare const getGasLimit: (chainId: number, protocol: Protocols) => number;
export declare const getTokenInfoFromAddr: (tokens: any, chainId: number, address: string) => any;
export declare const getTokenDecimalFromAddr: (tokens: any, chainId: number, address: string) => any;
export declare const getNativeTokenInfo: (chainId: number) => {
    name: string;
    symbol: string;
    decimals: number;
};
export declare const getWrappedToken: (chainId: number, wrappedChain?: number | undefined) => string | undefined;
export declare const getLocalAsset: (chainId: number, idOrAddress: string) => (AssetContract & {
    id: string;
}) | undefined;
export declare const isSupportedLocalToken: (chainId: number, token: string) => boolean;
export declare const getExplorerLinkForTx: (tx: string, chainId: number) => string;
export declare const getExplorerLinkForAccount: (account: string, chainId: number) => string;
export declare const formatTimestamp: (timestamp: any) => string;
