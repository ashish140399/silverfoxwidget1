import _ from "lodash";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { create, NxtpSdkBase, NxtpSdkUtils, NxtpSdkRouter, NxtpSdkSwap } from "@fibswap-dex/fibswap-sdk";
import { ALL_CHAINS, ALL_LOCAL_ASSETS, BACKEND_URL, ENVIRONMENT, NETWORK, SWAP_ROUTER_MAP, ZERO_ADDRESS } from "config";
import { equals_ignore_case } from "utils/number";
import { getWrappedToken } from "utils/getHelper";

export enum InitStatus {
  NOT_INITED = "not-inited",
  SUCCESS = "success",
  FAILED = "failed",
  LOADING = "loading",
}

type UseNxtpSdkState = {
  nxtpSdkBase: NxtpSdkBase;
  nxtpSdkUtils: NxtpSdkUtils;
  nxtpSdkRouter: NxtpSdkRouter;
  nxtpSdkSwap: NxtpSdkSwap;
  status: InitStatus;
  error: any;
};

const useNxtpSdk = (trigger: number) => {
  const [sdk, setSdk] = useState<UseNxtpSdkState>();
  const [assetBalances, setAssetBalances] = useState<any>();
  const [swapTransfers, setSwapTransfers] = useState<any[]>([]);
  const [paymentTransfers, setPaymentTransfers] = useState<any[]>([]);
  const { account, provider } = useWeb3React();

  useEffect(() => {
    const init = async () => {
      if (ALL_CHAINS.length) {
        const chains_config = {};
        for (let i = 0; i < ALL_CHAINS.length; i++) {
          const chain_data = ALL_CHAINS[i];
          if (!chain_data?.disabled) {
            const chain_id = chain_data?.chain_id;
            const domain_id = String(chain_data?.chain_id);
            const rpc_urls = chain_data?.provider_params?.rpcUrls?.filter((url) => url) || [];
            if (domain_id) {
              chains_config[domain_id] = {
                providers: rpc_urls,
                assets: ALL_LOCAL_ASSETS.filter(
                  (a) => a?.contracts?.findIndex((c) => c?.chain_id === chain_id) > -1,
                ).map((a) => {
                  const contract = a.contracts.find((c) => c?.chain_id === chain_id);
                  const name = contract.symbol || a.symbol || a.name;
                  const address = contract.contract_address;
                  return { name, address };
                }),
              };
            }
          }
        }

        setSdk((prev) => ({ ...prev, status: InitStatus.LOADING }));

        const temp = await create({
          chains: chains_config,
          logLevel: "info",
          network: NETWORK,
          environment: ENVIRONMENT,
          backendUrl: BACKEND_URL,
        });

        setSdk((prev) => ({ ...prev, ...temp, status: InitStatus.SUCCESS }));
      }
    };

    init();
  }, []);

  // sdk
  const updateSignerAddress = async () => {
    if (sdk && account) {
      if (sdk.nxtpSdkBase) {
        await sdk.nxtpSdkBase.changeSignerAddress(account);
      }
      if (sdk.nxtpSdkRouter) {
        await sdk.nxtpSdkRouter.changeSignerAddress(account);
      }

      setSdk((prev) => ({ ...prev, ...sdk }));
    }
  };

  useEffect(() => {
    updateSignerAddress();
  }, [provider, account]);

  useEffect(() => {
    const update = async () => {
      if (sdk && sdk.nxtpSdkBase && !sdk.nxtpSdkBase.config.signerAddress && account) {
        updateSignerAddress();
      }
    };

    update();
  }, [sdk]);

  // assets balances
  useEffect(() => {
    const getData = async () => {
      if (sdk && ALL_CHAINS) {
        try {
          const response = await sdk.nxtpSdkUtils.getRoutersData();
          if (response) {
            const data = _.groupBy(
              response.map((l) => {
                const chain_data = ALL_CHAINS.find((c) => +c?.chain_id === +l?.chain_id);
                const asset_data = ALL_LOCAL_ASSETS.find(
                  (a) =>
                    a?.contracts?.findIndex(
                      (c) => c?.chain_id === chain_data?.chain_id && equals_ignore_case(c?.contract_address, l?.local),
                    ) > -1,
                );
                return {
                  ...l,
                  chain_id: chain_data?.chain_id,
                  chain_data,
                  contract_address: l?.local,
                  asset_data,
                  amount: BigInt(Number(l?.balance) || 0).toString(),
                };
              }),
              "chain_id",
            );
            setAssetBalances(data);
          }

          let allTransfers = await sdk.nxtpSdkUtils.getTransfersByUser({
            userAddress: account,
            //status?: XTransferStatus;
            range: { limit: 1000, offset: 0 },
          });
          allTransfers = allTransfers
            .sort((a, b) => b.xcall_timestamp - a.xcall_timestamp)
            .map((tx) => {
              return {
                ...tx,
                destination_transacting_asset: equals_ignore_case(
                  getWrappedToken(parseInt(tx.destination_chain)),
                  tx.destination_transacting_asset,
                )
                  ? ZERO_ADDRESS
                  : tx.destination_transacting_asset,
                origin_transacting_asset: equals_ignore_case(
                  getWrappedToken(parseInt(tx.origin_chain)),
                  tx.origin_transacting_asset,
                )
                  ? ZERO_ADDRESS
                  : tx.origin_transacting_asset,
              };
            });

          const allSwapTransfers = allTransfers.filter((tx) => {
            return SWAP_ROUTER_MAP.get(parseInt(tx.destination_chain))
              .map((address: string) => address.toLowerCase())
              .includes(tx.destination_to.toLowerCase());
          });

          setSwapTransfers(allSwapTransfers || []);
          setPaymentTransfers(
            allTransfers.filter(
              (tx) => !allSwapTransfers.map((swap) => swap.xcall_transaction_hash).includes(tx.xcall_transaction_hash),
            ),
          );
        } catch (error: any) {}
      }
    };

    getData();

    const interval = setInterval(() => getData(), 1 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [sdk, account, trigger]);

  return {
    sdk,
    assetBalances,
    swapTransfers,
    paymentTransfers,
  };
};

export default useNxtpSdk;
