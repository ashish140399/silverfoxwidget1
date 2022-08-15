// Set of helper functions to facilitate wallet setup
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";
import { hexStripZeros } from "@ethersproject/bytes";
import { getChainInfo } from "./getHelper";

declare let window: any;

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  });

  return tokenAdded;
};

interface SwitchNetworkArguments {
  library: Web3Provider | undefined;
  chainId: number;
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({ library, chainId }: SwitchNetworkArguments): Promise<null | void> {
  if (!library?.provider?.request) {
    return;
  }
  if (!chainId && library?.getNetwork) {
    ({ chainId } = await library.getNetwork());
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
  try {
    await library?.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: formattedChainId }],
    });
  } catch (error: any) {
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    if (error?.code === 4902 && chainId !== undefined) {
      const chainInfo = getChainInfo(chainId);

      await library.provider.request({
        method: "wallet_addEthereumChain",
        params: [chainInfo.provider_params],
      });
      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: formattedChainId }],
        });
      } catch (error: any) {
        console.debug("Added network but could not switch chains", error);
      }
    } else {
      throw error;
    }
  }
}
