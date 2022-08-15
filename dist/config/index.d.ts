import { BigNumber } from "ethers";
import { Asset, AssetContract, Chain, Environment, Network } from "./types";
export declare const PRODUCTION: string;
export declare const LOCAL_STORAGE_KEY = "fibswapData";
export declare const WALLET_CONNECTOR_KEY = "walletConnector";
export declare const ACCEPTED_KEY = "acceptedTerms";
export declare const BASE_EXPLORER_URL = "https://etherscan.io";
export declare const DEFAULT_CHAIN_ID = 56;
export declare const TOKENS_URL = "https://api2.fibswap.io/api/token";
export declare const STATE_API_URL = "https://api2.fibswap.io/api/state";
export declare const BACKEND_URL = "https://agent1.fibswap.io";
export declare const BIG_ZERO: BigNumber;
export declare const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export declare const MAX_SWAP_AMOUNT_IN_USD = 5000;
export declare const MAX_NATIVE_SWAP_AMOUNT_IN_USD = 5000;
export declare const MIN_SWAP_AMOUNT_IN_USD = 20;
export declare const FEE_ESTIMATE_COOLDOWN = 200;
export declare const SWAP_FEE = 2.5;
export declare const ALLOW_SAME_CHAIN_SWAP = false;
export declare const ROUTER_ADDRESS: string;
export declare const NETWORK: Network;
export declare const ENVIRONMENT: Environment;
export declare const ALL_CHAINS: Chain[];
export declare const ALL_LOCAL_ASSETS: Asset[];
export declare const LOCAL_ASSETS_BY_CHAINS: {
    [key: number]: AssetContract[];
};
export declare const LOCAL_ASSET_ADDRESSES_BY_CHAINS: {
    [key: number]: string[];
};
export declare const PROVIDERS_BY_CHAINS: {
    [key: string]: string[];
};
export declare const CHAIN_CONFIG: {
    [key: number]: Chain;
};
export declare const isSupportedChain: (chainId: number) => boolean;
export declare const OPENSEA_API_BASE: string;
export declare const OPENSEA_URL: string;
export declare const AIRNFTS_CONTRACTS: {
    [key: number]: string;
};
export declare const SWAP_ROUTER_MAP: Map<number, string[]>;
export declare type SwapConfig = {
    name: string;
    assets: [{
        chainId: number;
        assetId: string;
    }];
};
export declare const BlackList: SwapConfig[];
