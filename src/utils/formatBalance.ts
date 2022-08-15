import { BigNumberish, utils } from "ethers";
import { BigNumber as BigNumberJs } from "bignumber.js";
import { getTokenDecimalFromAddr } from "./getHelper";

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: string, decimals = 18) => {
  return utils.parseUnits(new BigNumberJs(amount).toFixed(decimals).toString(), decimals);
};

export const getBalanceAmount = (amount: BigNumberish, decimals = 18) => {
  return utils.formatUnits(amount, decimals);
};

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumberish, decimals = 18) => {
  return +getBalanceAmount(balance, decimals);
};

export const getFullDisplayBalance = (balance: BigNumberish, decimals = 18, decimalsToAppear?: number) => {
  return String(
    Math.floor(+getBalanceAmount(balance, decimals) * 10 ** (decimalsToAppear || 8)) / 10 ** (decimalsToAppear || 8),
  );
};

export const formatDecimalNumber = (tokens: any, amount: BigNumberish, chainId: number, assetId: string) => {
  const decimal = getTokenDecimalFromAddr(tokens, chainId, assetId);

  return formatNumber(getBalanceNumber(amount || 0, decimal), 2, 4);
};

export const parseDecimalNumber = (tokens: any, amount: BigNumberish, chainId: number, assetId: string) => {
  const decimal = getTokenDecimalFromAddr(tokens, chainId, assetId);

  return getDecimalAmount(amount.toString(), decimal);
};

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};
