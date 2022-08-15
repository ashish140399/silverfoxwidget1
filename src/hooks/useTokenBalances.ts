import { useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getMulticallContract } from "utils/contractHelpers";
import useChainProviders from "./useChainProviders";
import { ZERO_ADDRESS } from "config";
import useTokens from "./useTokens";
import { isAddress } from "ethers/lib/utils";
import multicall from "utils/multicall";

import erc20Abi from "config/abi/erc20.json";
import { getChainInfo } from "utils/getHelper";
import { useGetEthBalance } from "./useTokenBalance";

type UseTokenBalanceState = {
  chainId: number;
  balances: any;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
  LOADING = "loading",
}

const useTokenBalances = (chainId: number) => {
  const { NOT_FETCHED, SUCCESS, FAILED, LOADING } = FetchStatus;
  const { chainProviders } = useChainProviders();
  const { account } = useWeb3React();
  const { tokens: allTokens } = useTokens();
  const tokens = allTokens?.[chainId];
  const validatedTokens: any[] = useMemo(
    () => tokens?.filter((t) => isAddress(t?.address) !== false && t?.address !== ZERO_ADDRESS) ?? [],
    [tokens],
  );
  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens]);

  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    chainId: chainId,
    balances: {},
    fetchStatus: NOT_FETCHED,
  });

  useEffect(() => {
    const fetchBalance = async () => {
      if (validatedTokenAddresses && validatedTokenAddresses.length) {
        const calls = validatedTokenAddresses.map((address) => ({
          address: address,
          name: "balanceOf",
          params: [account],
        }));
        const multicallAddress = getChainInfo(chainId)?.multicall;
        if (!multicallAddress) {
          setBalanceState((prev) => ({
            ...prev,
            chainId: chainId,
            fetchStatus: FAILED,
          }));
          return;
        }

        const multicallContract = getMulticallContract(multicallAddress, chainProviders[chainId].provider);
        const promises = [];
        const chunk = 300;
        for (let i = 0; i < calls.length; i += chunk) {
          promises.push(multicall(multicallContract, erc20Abi, calls.slice(i, i + chunk)));
        }
        Promise.all(promises)
          .then((res: any[]) => {
            if (res) {
              let _balances = [];
              for (const res1 of res) {
                _balances = _balances.concat(res1);
              }

              const tempBalances = {};
              for (let i = 0; i < validatedTokenAddresses.length; i++) {
                tempBalances[validatedTokenAddresses[i]?.toLowerCase()] = _balances[i]?.[0];
              }

              setBalanceState((prev) => ({
                ...prev,
                balances: tempBalances,
                chainId: chainId,
                fetchStatus: SUCCESS,
              }));
            }
          })
          .catch((e: any) => {
            console.log("fetch balance error", e);
            setBalanceState((prev) => ({
              ...prev,
              chainId: chainId,
              fetchStatus: FAILED,
            }));
          });
      }
    };

    if (account && chainId && chainProviders[chainId] && validatedTokenAddresses.length) {
      setBalanceState((prev) => ({
        ...prev,
        chainId,
        fetchStatus: LOADING,
      }));
      fetchBalance();
    } else {
      setBalanceState({
        chainId: chainId,
        balances: {},
        fetchStatus: NOT_FETCHED,
      });
    }
  }, [account, chainProviders, validatedTokenAddresses, chainId, SUCCESS, FAILED, LOADING]);

  return balanceState;
};

export function useCurrencyBalances(chainId?: number, currencies?: (string | undefined)[]): any[] {
  const { balances: tokenBalances } = useTokenBalances(chainId);
  const containsETH: boolean = useMemo(
    () => currencies?.some((currency) => currency === ZERO_ADDRESS) ?? false,
    [currencies],
  );
  const { balance: ethBalance } = useGetEthBalance(containsETH ? chainId : 0);
  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!currency) return undefined;
        if (currency !== ZERO_ADDRESS) return tokenBalances[currency?.toLowerCase()];
        if (currency === ZERO_ADDRESS) return ethBalance;
        return undefined;
      }) ?? [],
    [chainId, currencies, ethBalance, tokenBalances],
  );
}

export function useCurrencyBalance(chainId?: number, currency?: string) {
  return useCurrencyBalances(chainId, [currency])[0];
}

export default useTokenBalances;
