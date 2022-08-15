import { JsonRpcProvider } from "@ethersproject/providers";
import { Web3ReactHooks } from "@web3-react/core";
import { Connector, Provider as Eip1193Provider } from "@web3-react/types";
import { PropsWithChildren } from "react";
export declare type Web3Connection = [Connector, Web3ReactHooks];
export declare let connections: Web3Connection[];
export declare const defaultChainIdAtom: import("jotai").PrimitiveAtom<number> & {
    init: number;
};
export declare function getConnectorName(connector: Connector): "MetaMask" | "WalletConnect" | "Network" | "JsonRpcConnector" | "EIP1193" | "Unknown";
interface ActiveWeb3ProviderProps {
    provider?: Eip1193Provider | JsonRpcProvider;
    jsonRpcUrlMap: {
        [chainId: number]: string[];
    };
    defaultChainId: number;
}
export declare function ActiveWeb3Provider({ provider, jsonRpcUrlMap, defaultChainId: propsDefaultChainId, children, }: PropsWithChildren<ActiveWeb3ProviderProps>): JSX.Element;
export {};
