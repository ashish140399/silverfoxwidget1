import { ethers } from "ethers";
export declare const getErc20Contract: (address: string, signer?: ethers.Signer | ethers.providers.Provider) => ethers.Contract;
export declare const getFibswapContract: (address: string, signer?: ethers.Signer | ethers.providers.Provider) => ethers.Contract;
export declare const getMulticallContract: (address: string, signer?: ethers.Signer | ethers.providers.Provider) => ethers.Contract;
