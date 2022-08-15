import { BigNumber, ethers } from "ethers";
import blackList from "./blacklist.json";

import mainnet_chains from "./chain/mainnet/chains.json";
import mainnet_assets from "./chain/mainnet/assets.json";
import testnet_chains from "./chain/testnet/chains.json";
import testnet_assets from "./chain/testnet/assets.json";
import { Asset, AssetContract, Chain, Environment, Network } from "./types";

export const PRODUCTION = process.env.REACT_APP_PRODUCTION || "dev";

export const LOCAL_STORAGE_KEY = "fibswapData";
export const WALLET_CONNECTOR_KEY = "walletConnector";
export const ACCEPTED_KEY = "acceptedTerms";

export const BASE_EXPLORER_URL = "https://etherscan.io";

export const DEFAULT_CHAIN_ID = 56;

export const TOKENS_URL = "https://api2.fibswap.io/api/token";
export const STATE_API_URL = "https://api2.fibswap.io/api/state";
export const BACKEND_URL = "https://agent1.fibswap.io";

export const BIG_ZERO = BigNumber.from(0);
export const ZERO_ADDRESS = ethers.constants.AddressZero;

export const MAX_SWAP_AMOUNT_IN_USD = 5000;
export const MAX_NATIVE_SWAP_AMOUNT_IN_USD = 5000;
export const MIN_SWAP_AMOUNT_IN_USD = 20;

export const FEE_ESTIMATE_COOLDOWN = 200; // 200s
export const SWAP_FEE = 2.5; // 2.5%

export const ALLOW_SAME_CHAIN_SWAP = false;

export const ROUTER_ADDRESS = process.env.REACT_APP_ROUTER_ADDRESS;
export const NETWORK: Network = (process.env.REACT_APP_NETWORK || "testnet") as Network;
export const ENVIRONMENT: Environment = (process.env.REACT_APP_ENVIRONMENT || "production") as Environment;

export const ALL_CHAINS =
  ((NETWORK === "testnet" ? testnet_chains : mainnet_chains) as Chain[])?.filter((c) => !c?.disabled) || [];

export const ALL_LOCAL_ASSETS = ((NETWORK === "testnet" ? testnet_assets : mainnet_assets) as Asset[]) || [];

export const LOCAL_ASSETS_BY_CHAINS: { [key: number]: AssetContract[] } = ALL_LOCAL_ASSETS.reduce((r, a) => {
  for (const c of a.contracts) {
    r[c.chain_id] = [...(r[c.chain_id] || []), { ...c, symbol: c.symbol || a.symbol }];
  }
  return r;
}, {});

export const LOCAL_ASSET_ADDRESSES_BY_CHAINS: { [key: number]: string[] } = Object.fromEntries(
  new Map(
    Object.entries(LOCAL_ASSETS_BY_CHAINS).map(([chain_id, contracts]) => {
      return [chain_id, contracts.map((c) => c.contract_address)];
    }),
  ),
);

export const PROVIDERS_BY_CHAINS: { [key: string]: string[] } = mainnet_chains.reduce((r, a) => {
  r[a.chain_id] = [...(r[a.chain_id] || []), ...a.provider_params.rpcUrls];
  return r;
}, {});

export const CHAIN_CONFIG: { [key: number]: Chain } = Object.fromEntries(
  new Map(
    ALL_CHAINS.map((c) => {
      return [c.chain_id, c];
    }),
  ),
);

export const isSupportedChain = (chainId: number) => {
  return ALL_CHAINS.map((c) => c.chain_id).includes(chainId);
};

export const OPENSEA_API_BASE = NETWORK === "testnet" ? "https://testnets-api.opensea.io" : "https://api.opensea.io";
export const OPENSEA_URL = NETWORK === "testnet" ? "https://opensea.io" : "https://rinkeby.opensea.io";

export const AIRNFTS_CONTRACTS: { [key: number]: string } = {
  56: "0xb28d74Cc439d522cba584E218BD62a0EBB0B3b78",
  137: "0x5E42b0276C646EB86a84FB6cAF59ac822439aB85",
  250: "0x94e22C14118353651636f9aF43cD0A5A08B93dA3",
};

export const SWAP_ROUTER_MAP = new Map<number, string[]>([
  [1, ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "0xE592427A0AEce92De3Edee1F18E0157C05861564"]], // v2 , v3
  [4, ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "0xE592427A0AEce92De3Edee1F18E0157C05861564"]], // v2 , v3
  [42, ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "0xE592427A0AEce92De3Edee1F18E0157C05861564"]], // v2 , v3
  [
    56,
    [
      "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
      "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
    ],
  ], // pancake, sushi, apeswap
  [
    137,
    [
      "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      "0xE592427A0AEce92De3Edee1F18E0157C05861564",
      "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607",
    ],
  ], // quickswap, uniswapV3, apeswap
  [250, ["0xF491e7B69E4244ad4002BC14e878a34207E38c29", "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52"]], // spookyswap, spiritswap
  [42161, ["0xE592427A0AEce92De3Edee1F18E0157C05861564"]], // uniswap v3 arbitrum
  [43114, ["0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106", "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"]], // pangolin
  [100, ["0xE43e60736b1cb4a75ad25240E2f9a62Bff65c0C0"]], // DXswapRouter
]);

export type SwapConfig = { name: string; assets: [{ chainId: number; assetId: string }] };
export const BlackList: SwapConfig[] = JSON.parse(JSON.stringify(blackList));
