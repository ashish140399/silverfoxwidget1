import { ethers } from "ethers";

// ABI
import erc20Abi from "config/abi/erc20.json";
import fibswapAbi from "config/abi/fibswap.json";
import multicallAbi from "config/abi/Multicall.json";

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return new ethers.Contract(address, abi, signer);
};

export const getErc20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc20Abi, address, signer);
};

export const getFibswapContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(fibswapAbi, address, signer);
};

export const getMulticallContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(multicallAbi, address, signer);
};
