import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getErc20Contract } from "utils/contractHelpers";
import useRefresh from "./useRefresh";
import useChainProviders from "./useChainProviders";
import { BIG_ZERO } from "config";
import { BigNumber, constants } from "ethers";

type UseTokenBalanceState = {
  chainId: number;
  balance: BigNumber;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
  LOADING = "loading",
}

const useTokenBalance = (tokenAddress: string, chainId: number) => {
  const { NOT_FETCHED, SUCCESS, FAILED, LOADING } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    chainId: chainId,
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { chainProviders } = useChainProviders();
  const { account } = useWeb3React();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      if (tokenAddress == constants.AddressZero) {
        try {
          const res = await chainProviders[chainId].provider.getBalance(account);
          setBalanceState((prev) => ({ ...prev, chainId: chainId, balance: res, fetchStatus: SUCCESS }));
        } catch (e: any) {
          console.error(e);
          setBalanceState((prev) => ({
            ...prev,
            chainId: chainId,
            fetchStatus: FAILED,
          }));
        }
      } else {
        const contract = getErc20Contract(tokenAddress, chainProviders[chainId].provider);
        try {
          const res = await contract.balanceOf(account);
          setBalanceState((prev) => ({ ...prev, chainId: chainId, balance: res, fetchStatus: SUCCESS }));
        } catch (e: any) {
          console.error(e);
          setBalanceState((prev) => ({
            ...prev,
            chainId: chainId,
            fetchStatus: FAILED,
          }));
        }
      }
    };

    if (account && tokenAddress && chainId && chainProviders[chainId]) {
      setBalanceState((prev) => ({
        ...prev,
        chainId,
        fetchStatus: LOADING,
      }));
      fetchBalance();
    }
  }, [account, tokenAddress, chainId, slowRefresh, SUCCESS, FAILED, LOADING]);

  return balanceState;
};

export const useGetEthBalance = (chainId: number) => {
  const [balance, setBalance] = useState(BIG_ZERO);
  const { account } = useWeb3React();
  const { chainProviders } = useChainProviders();

  useEffect(() => {
    const fetchBalance = async () => {
      const provider = chainProviders[chainId].provider;
      const walletBalance = await provider.getBalance(account);
      setBalance(walletBalance);
    };

    if (account && chainId) {
      fetchBalance();
    }
  }, [account, setBalance, chainId]);

  return { balance };
};

export default useTokenBalance;
