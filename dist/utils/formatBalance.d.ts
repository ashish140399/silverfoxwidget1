import { BigNumberish } from "ethers";
/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export declare const getDecimalAmount: (amount: string, decimals?: number) => import("ethers").BigNumber;
export declare const getBalanceAmount: (amount: BigNumberish, decimals?: number) => string;
/**
 * This function is not really necessary but is used throughout the site.
 */
export declare const getBalanceNumber: (balance: BigNumberish, decimals?: number) => number;
export declare const getFullDisplayBalance: (balance: BigNumberish, decimals?: number, decimalsToAppear?: number) => string;
export declare const formatDecimalNumber: (tokens: any, amount: BigNumberish, chainId: number, assetId: string) => string;
export declare const parseDecimalNumber: (tokens: any, amount: BigNumberish, chainId: number, assetId: string) => import("ethers").BigNumber;
export declare const formatNumber: (number: number, minPrecision?: number, maxPrecision?: number) => string;
