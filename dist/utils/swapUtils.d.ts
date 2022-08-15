import { BridgeState } from "config/types";
export declare const getTradeInfo: (chainId: number, fromToken: string, toToken: string, account: string, amount: number, isExactInput: boolean, slippage: number) => Promise<import("simple-uniswap-sdk").RouteQuote>;
export declare const checkSupport: (tokens: any, bridge: BridgeState) => boolean;
export declare const getSwapEstimate: (tokens: any, bridgeState: BridgeState, liquidity: any, nativePrices: any, slippage: number) => Promise<BridgeState>;
export declare const convertToXCallParams: (tokens: any, bridge: BridgeState) => any;
export declare const getAmountWithOutFee: (amount: number, decimals: number) => number;
export declare const getAmountWithFee: (amount: number, decimals: number) => number;
export declare const parseFibswapError: (errorData: string | undefined) => string | null;
