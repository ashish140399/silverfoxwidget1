import { UniswapPairSettings, UniswapVersion } from "simple-uniswap-sdk";
import TraderJoeRouterABI from "./abi/traderJoeRouter.json";

export const DEFAULT_SLIPPAGE = 0.001; // 0.1%
export const DEFAULT_DESTINATION_SLIPPAGE = 0.15; // 15%
export const DEFAULT_DEADLINE_MINUTES = 60 * 24; // 24 hours
export const AUTO_SLIPPAGES = [0, 0.005, 0.01, 0.03, 0.05, 0.1, 0.2];

export const MAX_LIMIT_USD = 5000;
export const MIN_LIMIT_USD = 5;

export const getPairSettings = (
  chainId: number,
  slippage: number = DEFAULT_SLIPPAGE,
): UniswapPairSettings[] | undefined => {
  switch (chainId) {
    case 1:
      return [
        new UniswapPairSettings({
          slippage: slippage,
          deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
          disableMultihops: false,
          uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
        }),
      ];
    case 4:
      return [
        new UniswapPairSettings({
          slippage: slippage,
          deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
          disableMultihops: false,
          uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
        }),
      ];
    case 42:
      return [
        new UniswapPairSettings({
          slippage: slippage,
          deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
          disableMultihops: false,
          uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
        }),
      ];
    case 56:
      return [
        new UniswapPairSettings({
          slippage: slippage,
          deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
          disableMultihops: false,
          uniswapVersions: [UniswapVersion.v2],
          cloneUniswapContractDetails: {
            v2Override: {
              routerAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
              factoryAddress: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
              pairAddress: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
            },
          },
          customNetwork: {
            nameNetwork: "BSC",
            multicallContractAddress: "0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
            },
            nativeWrappedTokenInfo: {
              chainId: 56,
              contractAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
              decimals: 18,
              symbol: "WBNB",
              name: "Wrapped BNB",
            },
            baseTokens: {
              usdt: {
                chainId: 56,
                contractAddress: "0x55d398326f99059ff775485246999027b3197955",
                decimals: 18,
                symbol: "USDT",
                name: "USDT",
              },
              dai: {
                chainId: 56,
                contractAddress: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
                decimals: 18,
                symbol: "DAI",
                name: "DAI",
              },
              usdc: {
                chainId: 56,
                contractAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                decimals: 18,
                symbol: "USDC",
                name: "USDC",
              },
            },
          },
        }),
      ];
    case 137:
      return [
        new UniswapPairSettings({
          slippage: slippage,
          deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
          disableMultihops: false,
          uniswapVersions: [UniswapVersion.v2],
          cloneUniswapContractDetails: {
            v2Override: {
              routerAddress: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
              factoryAddress: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
              pairAddress: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
            },
          },
          customNetwork: {
            nameNetwork: "Polygon",
            multicallContractAddress: "0x275617327c958bD06b5D6b871E7f491D76113dd8",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
            },
            nativeWrappedTokenInfo: {
              chainId: 137,
              contractAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
              decimals: 18,
              symbol: "WMATIC",
              name: "Wrapped MATIC",
            },
            baseTokens: {
              usdt: {
                chainId: 137,
                contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                decimals: 6,
                symbol: "USDT",
                name: "USDT",
              },
              dai: {
                chainId: 137,
                contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
                decimals: 18,
                symbol: "DAI",
                name: "DAI",
              },
              usdc: {
                chainId: 137,
                contractAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                decimals: 6,
                symbol: "USDC",
                name: "USDC",
              },
            },
          },
        }),
      ];
    case 250:
      return [
        new UniswapPairSettings({
          slippage: slippage,
          deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
          disableMultihops: false,
          uniswapVersions: [UniswapVersion.v2],
          cloneUniswapContractDetails: {
            v2Override: {
              routerAddress: "0xF491e7B69E4244ad4002BC14e878a34207E38c29",
              factoryAddress: "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3",
              pairAddress: "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3",
            },
          },
          customNetwork: {
            nameNetwork: "Fantom",
            multicallContractAddress: "0xD98e3dBE5950Ca8Ce5a4b59630a5652110403E5c",
            nativeCurrency: {
              name: "FTM",
              symbol: "FTM",
            },
            nativeWrappedTokenInfo: {
              chainId: 250,
              contractAddress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
              decimals: 18,
              symbol: "WFTM",
              name: "Wrapped FTM",
            },
            baseTokens: {
              usdt: {
                chainId: 250,
                contractAddress: "0x049d68029688eAbF473097a2fC38ef61633A3C7A",
                decimals: 6,
                symbol: "fUSDT",
                name: "fUSDT",
              },
              dai: {
                chainId: 250,
                contractAddress: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
                decimals: 18,
                symbol: "DAI",
                name: "DAI",
              },
              usdc: {
                chainId: 250,
                contractAddress: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
                decimals: 6,
                symbol: "USDC",
                name: "USDC",
              },
              wbtc: {
                chainId: 250,
                contractAddress: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
                decimals: 8,
                symbol: "wBTC",
                name: "wBTC",
              },
            },
          },
        }),
      ];
    case 43114:
      return [
        new UniswapPairSettings({
          slippage: slippage,
          deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
          disableMultihops: false,
          uniswapVersions: [UniswapVersion.v2],
          cloneUniswapContractDetails: {
            v2Override: {
              routerAddress: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",
              factoryAddress: "0x9ad6c38be94206ca50bb0d90783181662f0cfa10",
              pairAddress: "0x9ad6c38be94206ca50bb0d90783181662f0cfa10",
              routerAbi: TraderJoeRouterABI,
              routerMethods: {
                swapETHForExactTokens: "swapAVAXForExactTokens",
                swapExactETHForTokens: "swapExactAVAXForTokens",
                swapExactETHForTokensSupportingFeeOnTransferTokens:
                  "swapExactAVAXForTokensSupportingFeeOnTransferTokens",
                swapExactTokensForETH: "swapExactTokensForAVAX",
                swapExactTokensForETHSupportingFeeOnTransferTokens:
                  "swapExactTokensForAVAXSupportingFeeOnTransferTokens",
                swapExactTokensForTokens: "swapExactTokensForTokens",
                swapExactTokensForTokensSupportingFeeOnTransferTokens:
                  "swapExactTokensForTokensSupportingFeeOnTransferTokens",
                swapTokensForExactETH: "swapTokensForExactAVAX",
                swapTokensForExactTokens: "swapTokensForExactTokens",
              },
            },
          },
          customNetwork: {
            nameNetwork: "Avalanche",
            multicallContractAddress: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
            nativeCurrency: {
              name: "AVAX",
              symbol: "AVAX",
            },
            nativeWrappedTokenInfo: {
              chainId: 43114,
              contractAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
              decimals: 18,
              symbol: "WAVAX",
              name: "Wrapped AVAX",
            },
            baseTokens: {
              usdt: {
                chainId: 43114,
                contractAddress: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
                decimals: 6,
                symbol: "USDT",
                name: "USDT",
              },
              usdc: {
                chainId: 43114,
                contractAddress: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
                decimals: 6,
                symbol: "USDC.e",
                name: "USDC.e",
              },
              wbtc: {
                chainId: 43114,
                contractAddress: "0x152b9d0fdc40c096757f570a51e494bd4b943e50",
                decimals: 8,
                symbol: "BTC.b",
                name: "BTC.b",
              },
            },
          },
        }),
      ];
  }
};
