import { UniswapPairSettings } from "simple-uniswap-sdk";
export declare const DEFAULT_SLIPPAGE = 0.001;
export declare const DEFAULT_DESTINATION_SLIPPAGE = 0.15;
export declare const DEFAULT_DEADLINE_MINUTES: number;
export declare const AUTO_SLIPPAGES: number[];
export declare const MAX_LIMIT_USD = 5000;
export declare const MIN_LIMIT_USD = 5;
export declare const getPairSettings: (chainId: number, slippage?: number) => UniswapPairSettings[] | undefined;
