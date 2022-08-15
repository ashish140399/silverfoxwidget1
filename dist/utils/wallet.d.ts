import { Web3Provider } from "@ethersproject/providers";
/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export declare const registerToken: (tokenAddress: string, tokenSymbol: string, tokenDecimals: number, tokenImage: string) => Promise<any>;
interface SwitchNetworkArguments {
    library: Web3Provider | undefined;
    chainId: number;
}
export declare function switchToNetwork({ library, chainId }: SwitchNetworkArguments): Promise<null | void>;
export {};
