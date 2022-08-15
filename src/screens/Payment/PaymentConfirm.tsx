import { useWeb3React } from "@web3-react/core";
import moment from "moment";
import TokenSelect from "components/TokenSelect";
import ConnectWalletModal from "components/WalletConnect/ConnectWalletModal";
import { ALL_CHAINS, BIG_ZERO, FEE_ESTIMATE_COOLDOWN, isSupportedChain, SWAP_FEE, ZERO_ADDRESS } from "config";
import { ActiveWidgetModal, BridgeState, Protocols } from "config/types";
import useNxtpSdk from "hooks/useNxtpSdk";
import { useCurrencyPrice } from "hooks/useTokenPrices";
import useTokens from "hooks/useTokens";
import React, { useEffect, useMemo, useState } from "react";
import { formatNumber, getDecimalAmount, parseDecimalNumber } from "utils/formatBalance";
import {
  getChainInfo,
  getGasLimit,
  getLocalAsset,
  getTokenDecimalFromAddr,
  getTokenInfoFromAddr,
  isValidChainId,
} from "utils/getHelper";

import { checkSupport, getSwapEstimate, parseFibswapError } from "utils/swapUtils";
import useGasPrices from "hooks/useGasPrices";
import useNativeTokenPrices from "hooks/useNativeTokenPrices";
import BigNumber from "bignumber.js";
import { useCurrencyBalance } from "hooks/useTokenBalances";
import { FixedNumber } from "ethers";
import toast from "react-hot-toast";
import { useIsBrowserTabActive } from "contexts/RefreshContext";
import { BscscanIcon, CloseIcon, SettingsIcon, WalletIcon } from "assets/icons";
import { DEFAULT_SLIPPAGE } from "config/swapConfig";

import {
  Close,
  CoinSelectorDD,
  Container,
  FibpalWidget,
  HeaderName,
  LeftHeader,
  PriceBlock,
  RightHeader,
  Settings,
  StatusButtons,
  TotalPrice,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
} from "./WidgetCss";
import SettingsWidget from "./Settings";
import TokenSelectData from "components/TokenChoose";
import PaymentReview from "./PaymentReview";
import PaymentStatus from "./PaymentStatus";
import { switchToNetwork } from "utils/wallet";
import { PaymentWidgetProps } from "./PaymentWidget";

interface Props extends PaymentWidgetProps {
  valid: boolean;
  bridge: BridgeState;
}

const PaymentConfirm: React.FC<Props> = (props: Props) => {
  // set this for different screens
  const [widgetActive, setWidgetActive] = useState<ActiveWidgetModal>(ActiveWidgetModal.Main);
  const { bridge, valid } = props;
  const isBrowserTabActiveRef = useIsBrowserTabActive();
  const { account, chainId, isActive, provider } = useWeb3React();
  const { tokens } = useTokens();
  const { sdk, assetBalances } = useNxtpSdk(0);

  const [bridgeState, setBridgeState] = useState<BridgeState>();
  const tokenPrices = useCurrencyPrice(bridge?.toChainId, [bridgeState?.toTransacting]);
  const gasPrice = useGasPrices(bridge?.toChainId);
  const { nativeTokenPrices } = useNativeTokenPrices();

  const [controller, setController] = useState(null);
  const [error, setError] = useState(null);
  const [estimating, setEstimating] = useState(null);
  const [estimateResponse, setEstimateResponse] = useState<BridgeState>(null);
  const [estimateCooldown, setEstimateCooldown] = useState(null);
  const [estimateTrigger, setEstimateTrigger] = useState(null);
  const [approving, setApproving] = useState(null);
  const [approveResponse, setApproveResponse] = useState(null);

  const [xcall, setXcall] = useState(null);
  const [calling, setCalling] = useState(null);
  const [xcallResponse, setXcallResponse] = useState(null);

  const fromBalance = useCurrencyBalance(bridgeState?.fromChainId, bridgeState?.fromTransacting);

  // const fromBalanceEther = useMemo(
  //   () =>
  //     bridgeState && bridgeState?.fromChainId
  //       ? formatDecimalNumber(tokens, fromBalance, bridgeState?.fromChainId, bridgeState?.fromTransacting)
  //       : "0.0",
  //   [bridgeState, fromBalance, tokens],
  // );

  const fromTransactingToken = useMemo(() => {
    if (estimateResponse?.fromTransacting) {
      return getTokenInfoFromAddr(tokens, estimateResponse.fromChainId, estimateResponse.fromTransacting);
    }
    return null;
  }, [estimateResponse?.fromTransacting]);

  const hasSufficientBalance = useMemo(() => {
    const balance = fromBalance ?? BIG_ZERO;
    const estimated = estimateResponse
      ? parseDecimalNumber(
          tokens,
          estimateResponse.fromTransactingAmount,
          estimateResponse.fromChainId,
          estimateResponse.fromTransacting,
        )
      : BIG_ZERO;

    return balance.gte(estimated);
  }, [fromBalance, estimateResponse]);

  useEffect(() => {
    setBridgeState({ ...bridgeState, ...bridge });
  }, [bridge]);

  const fromChainInfo = useMemo(() => {
    const allChainIds = ALL_CHAINS.map((c) => c.chain_id);
    let fromChainId;
    if (!bridgeState || !bridgeState.toChainId) {
      return null;
    } else if (!chainId || chainId == bridgeState.toChainId) {
      fromChainId = allChainIds.filter((id) => id !== bridgeState.toChainId)?.[0];
    } else {
      fromChainId = chainId;
    }

    return getChainInfo(fromChainId);
  }, [chainId, bridgeState?.toChainId]);

  const toTransactingToken = useMemo(() => {
    if (bridgeState?.toTransacting && bridgeState?.toTransactingAmount) {
      const tokenInfo = getTokenInfoFromAddr(tokens, bridgeState.toChainId, bridgeState.toTransacting);
      const priceUsd = tokenPrices?.[0] || 0;

      return {
        ...tokenInfo,
        priceUsd,
      };
    }
    return null;
  }, [bridgeState?.toTransacting, bridgeState?.toTransactingAmount, tokenPrices]);

  // fee estimate cooldown
  useEffect(() => {
    if (typeof estimateCooldown === "number") {
      if (estimateCooldown === 0) {
        const { fromTransactingAmount } = { ...bridgeState };
        if (typeof fromTransactingAmount !== "number") {
          setEstimateTrigger(moment().valueOf());
        }
      } else {
        const interval = setInterval(() => {
          const _estimateCooldown = estimateCooldown - 1;
          if (_estimateCooldown > -1 && isBrowserTabActiveRef.current) {
            setEstimateCooldown(_estimateCooldown);
          }
        }, 10000);
        return () => clearInterval(interval);
      }
    }
  }, [estimateCooldown]);

  // reset fee estimate cooldown
  useEffect(() => {
    if (typeof estimating === "boolean" && !estimating) {
      setEstimateCooldown(FEE_ESTIMATE_COOLDOWN);
    }
  }, [estimating]);

  // trigger estimate
  useEffect(() => {
    const { fromChainId, toChainId, fromTransacting, toLocal, relayerFee } = { ...bridgeState };
    if (fromChainId && toChainId && fromTransacting && new BigNumber(relayerFee).gt(0) && assetBalances && toLocal) {
      setEstimateTrigger(moment().valueOf());
    }
  }, [bridgeState, assetBalances]);

  // estimate trigger
  useEffect(() => {
    let _controller;
    if (estimateTrigger && !calling && !approving) {
      controller?.abort();
      _controller = new AbortController();
      setController(_controller);
      estimate(_controller);
    }
    return () => {
      _controller?.abort();
    };
  }, [estimateTrigger]);

  // when chain updated
  useEffect(() => {
    if (calling || approving || xcallResponse || approveResponse) {
      return;
    }

    const toLocalAsset = getLocalAsset(bridgeState?.toChainId, bridgeState?.toLocal);
    const fromLocalAsset =
      toLocalAsset && fromChainInfo ? getLocalAsset(fromChainInfo.chain_id, toLocalAsset.id) : null;
    setBridgeState({
      ...bridgeState,
      originSender: account?.toLowerCase(),
      recovery: account?.toLowerCase(),
      fromChainId: fromChainInfo && isValidChainId(fromChainInfo.chain_id) ? fromChainInfo.chain_id : null,
      fromTransacting: ZERO_ADDRESS,
      fromLocal: fromLocalAsset ? fromLocalAsset.contract_address : null,
    });
  }, [fromChainInfo, account]);

  // when chain updated
  useEffect(() => {
    if (isValidChainId(bridgeState?.fromChainId) && isValidChainId(bridgeState?.toChainId)) {
      setBridgeState({ ...bridgeState, relayerFee: estimateRelayerFee() });
      return;
    }
  }, [bridgeState?.fromChainId, bridgeState?.toChainId, gasPrice, nativeTokenPrices]);

  const estimateRelayerFee = () => {
    const gasLimit = getGasLimit(bridgeState.toChainId, Protocols.Airnfts);
    const fromNativePrice = nativeTokenPrices?.[bridgeState.fromChainId];
    const toNativePrice = nativeTokenPrices?.[bridgeState.toChainId];
    if (!gasPrice || +fromNativePrice === 0 || +toNativePrice === 0) {
      return "0";
    }
    const gasOnToChain = new BigNumber(gasPrice)
      .multipliedBy(10 ** 9)
      .multipliedBy(gasLimit)
      .multipliedBy(toNativePrice);

    return gasOnToChain.dividedBy(fromNativePrice).toFixed(0);
  };

  const estimate = async (controller: AbortController) => {
    if (!xcall) {
      if (checkSupport(tokens, bridgeState)) {
        if (sdk) {
          setEstimating(true);
          setApproveResponse(null);
          setXcall(null);
          setCalling(false);
          setXcallResponse(null);
          setError(null);
          setEstimateResponse(null);
          try {
            const result = await swapEstimate(DEFAULT_SLIPPAGE, controller);
            setEstimateResponse(result);
            setEstimating(false);
          } catch (error: any) {
            if ((error as Error)?.message !== "Aborted") {
              setError((error as Error).message);
              setEstimating(false);
            }
          }
        }
      }
    }
  };

  const swapEstimate = (slippage: number, controller?: AbortController) => {
    return new Promise<BridgeState>((resolve, reject) => {
      getSwapEstimate(tokens, bridgeState, assetBalances, nativeTokenPrices, slippage)
        .then((response) => {
          return resolve(response);
        })
        .catch(() => {
          return reject(new Error("Failed"));
        });

      if (controller?.signal) {
        controller?.signal?.addEventListener("abort", () => {
          return reject(new Error("Aborted"));
        });
      }
    });
  };

  const handleChangeFromToken = (assetId: string) => {
    setBridgeState({ ...bridgeState, fromTransacting: assetId });
  };

  const handleChangeFromChain = (chainId: number) => {
    setBridgeState({ ...bridgeState, fromChainId: chainId });
  };

  const call = async () => {
    setCalling(true);
    const infiniteApprove = true;
    if (sdk && estimateResponse) {
      const {
        router,
        recovery,
        fromChainId,
        toChainId,
        fromTransacting,
        fromTransactingAmount,
        fromLocal,
        localAmount,
        toLocal,
        isEth,
        fromTo,
        fromData,
        toTo,
        toData,
        relayerFee,
        isExactInput,
      } = { ...estimateResponse };

      const fromTransactingInfo = getTokenInfoFromAddr(tokens, fromChainId, fromTransacting);

      const xcallParams = {
        params: {
          router,
          recovery,
          origin: String(fromChainId),
          destination: String(toChainId),
          orgLocalAsset: fromLocal,
          dstLocalAsset: toLocal,
          isEth,
          orgParam: {
            to: fromTo,
            data: fromData ?? "0x",
          },
          dstParam: {
            to: toTo,
            data: toData ?? "0x",
          },
        },
        transactingAssetId: fromTransacting,
        amount: getDecimalAmount(String(fromTransactingAmount), fromTransactingInfo.decimals).toString(),
        localAmount: getDecimalAmount(
          String(localAmount),
          getTokenDecimalFromAddr(tokens, fromChainId, fromLocal),
        ).toString(),
        relayerFee,
        isExactInput,
      };
      let failed = false;
      const signer = provider.getSigner(account);
      try {
        const approve_request = await sdk.nxtpSdkBase.approveIfNeeded(
          String(xcallParams.params.origin),
          xcallParams.transactingAssetId,
          xcallParams.amount.toString(),
          infiniteApprove,
        );
        if (approve_request) {
          setApproving(true);
          const approve_response = await signer.sendTransaction(approve_request);
          const tx_hash = approve_response?.hash;
          setApproveResponse({
            status: "pending",
            message: `Wait for ${fromTransactingInfo.symbol} approval`,
            tx_hash,
          });
          toast.success(`Wait for ${fromTransactingInfo.symbol} approval`);
          const approve_receipt = await signer.provider.waitForTransaction(tx_hash);
          setApproveResponse(
            approve_receipt?.status
              ? null
              : {
                  status: "failed",
                  message: `Failed to approve ${fromTransactingInfo.symbol}`,
                  tx_hash,
                },
          );
          toast.error(`Failed to approve ${fromTransactingInfo.symbol}`);
          failed = !approve_receipt?.status;
          setApproving(false);
        }
      } catch (error: any) {
        setApproveResponse({ status: "failed", message: error?.data?.message || error?.message });
        failed = true;
        setApproving(false);
        toast.error(error?.data?.message || error?.message);
      }
      if (!failed) {
        try {
          const xcall_request = await sdk.nxtpSdkBase.xcall(xcallParams);
          if (xcall_request) {
            let gas_limit = (await signer.estimateGas(xcall_request)).toString();
            if (gas_limit) {
              gas_limit = FixedNumber.fromString(gas_limit)
                .mulUnsafe(FixedNumber.fromString("1.3"))
                .round(0)
                .toString()
                .replace(".0", "");
              xcall_request.gasLimit = gas_limit;
            }

            const xcall_response = await signer.sendTransaction(xcall_request);
            const tx_hash = xcall_response?.hash;
            const xcall_receipt = await signer.provider.waitForTransaction(tx_hash);
            setXcall(xcall_receipt);
            failed = !xcall_receipt?.status;
            setXcallResponse({
              status: failed ? "failed" : "success",
              message: failed
                ? "Failed to send transaction"
                : `${fromTransactingInfo.symbol} transfer detected, waiting for execution.`,
              tx_hash,
            });
            if (failed) {
              toast.error("Failed to send transaction");
            } else {
              toast.success(`${fromTransactingInfo.symbol} transfer detected, waiting for execution.`);
            }
          }
        } catch (error: any) {
          console.log(error.error);
          const errorMessage =
            parseFibswapError(error?.error?.data?.data || error?.error?.data?.originalError?.data) ||
            error?.data?.message ||
            error?.message;
          setXcallResponse({ status: "failed", message: errorMessage });
          toast.error(errorMessage);
          failed = true;
        }
      }
      if (failed) {
        setXcall(null);
      }
    }

    setCalling(false);
  };

  return (
    <>
      <FibpalWidget className="fibpalwidget">
        <WidgetHeader>
          <LeftHeader>
            {widgetActive === ActiveWidgetModal.Main ? (
              <PriceBlock>
                <Container>
                  <h2>
                    <img src={toTransactingToken && toTransactingToken.image} alt="" />
                    {bridgeState?.toTransactingAmount || 0} {toTransactingToken?.symbol || ""}
                  </h2>
                  <h5>(${formatNumber(bridgeState?.toTransactingAmount * toTransactingToken?.priceUsd, 2)})</h5>
                </Container>
              </PriceBlock>
            ) : null}
            {widgetActive === ActiveWidgetModal.ConnectWallet ? <HeaderName>Connect Wallet</HeaderName> : null}
            {widgetActive === ActiveWidgetModal.Settings ? <HeaderName>Settings</HeaderName> : null}
            {widgetActive === ActiveWidgetModal.TokenSelect ? <HeaderName>Choose a Token</HeaderName> : null}
            {widgetActive === ActiveWidgetModal.PaymentReview ? <HeaderName>Payment Review</HeaderName> : null}
            {widgetActive === ActiveWidgetModal.PaymentStatus ? <HeaderName>Payment Status</HeaderName> : null}
          </LeftHeader>
          <RightHeader>
            {widgetActive === ActiveWidgetModal.Main ? (
              <Settings onClick={() => setWidgetActive(ActiveWidgetModal.Settings)}>
                <SettingsIcon />
              </Settings>
            ) : null}
            {widgetActive === ActiveWidgetModal.Settings ||
            widgetActive === ActiveWidgetModal.ConnectWallet ||
            widgetActive === ActiveWidgetModal.TokenSelect ||
            widgetActive === ActiveWidgetModal.PaymentStatus ||
            widgetActive === ActiveWidgetModal.PaymentReview ? (
              <Close onClick={() => setWidgetActive(ActiveWidgetModal.Main)}>
                <CloseIcon />
              </Close>
            ) : null}
          </RightHeader>
        </WidgetHeader>
        <div className="widgetcontentmiddle">
          {widgetActive === ActiveWidgetModal.Main ? (
            <WidgetContent>
              <CoinSelectorDD>
                <div className="tokeninner" onClick={() => setWidgetActive(ActiveWidgetModal.TokenSelect)}>
                  <TokenSelect
                    chainId={bridgeState?.fromChainId ?? (fromChainInfo ? fromChainInfo.chain_id : null)}
                    assetId={bridgeState?.fromTransacting ?? ZERO_ADDRESS}
                  ></TokenSelect>
                </div>
                {estimateResponse && (
                  <div className="valueconverted">
                    1 {toTransactingToken?.symbol || ""} ={" "}
                    {estimateResponse
                      ? `${formatNumber(
                          estimateResponse?.fromTransactingAmount / estimateResponse.localAmount || 0,
                          4,
                          4,
                        )} ${
                          getTokenInfoFromAddr(tokens, estimateResponse.fromChainId, estimateResponse.fromTransacting)
                            ?.symbol
                        }`
                      : "-"}
                  </div>
                )}
              </CoinSelectorDD>
              <TotalPrice>
                <h6>Total Price:</h6>
                <h2>
                  <img
                    src={fromTransactingToken ? fromTransactingToken.image : fromChainInfo && fromChainInfo.image}
                    className="tokenimg"
                    alt=""
                  />
                  {estimateResponse
                    ? `${formatNumber(estimateResponse?.fromTransactingAmount || 0, 4, 4)} ${
                        getTokenInfoFromAddr(tokens, estimateResponse.fromChainId, estimateResponse.fromTransacting)
                          ?.symbol
                      }`
                    : "-"}
                </h2>
              </TotalPrice>
              <StatusButtons>
                {!(isActive && Boolean(account)) ? (
                  <button className="complete" onClick={() => setWidgetActive(ActiveWidgetModal.ConnectWallet)}>
                    <p className="d-inline-block fw-bold mb-0">Connect Wallet</p>
                  </button>
                ) : chainId && (chainId == bridgeState?.toChainId || !isSupportedChain(chainId)) ? (
                  <button className="complete" onClick={() => {}}>
                    <p className="d-inline-block  fw-bold mb-0">Unsupported Network</p>
                  </button>
                ) : chainId &&
                  bridgeState?.fromChainId &&
                  isSupportedChain(bridgeState?.fromChainId) &&
                  chainId !== bridgeState?.fromChainId ? (
                  <button
                    className="complete"
                    onClick={() => switchToNetwork({ library: provider, chainId: bridgeState.fromChainId })}
                  >
                    <p className="d-inline-block  fw-bold mb-0">Switch Network</p>
                  </button>
                ) : !valid ? (
                  <button className="complete" onClick={() => {}}>
                    <p className="d-inline-block fw-bold mb-0">Unsupported</p>
                  </button>
                ) : error ? (
                  <button className="complete" onClick={() => {}} disabled={true}>
                    <p className="d-inline-block  fw-bold mb-0">{error && error.length <= 50 ? error : "Error"}</p>
                  </button>
                ) : estimating ? (
                  <button className="complete" onClick={() => {}} disabled={true}>
                    <p className="d-inline-block fw-bold mb-0">Estimating...</p>
                  </button>
                ) : approving ? (
                  <button className="complete" onClick={() => {}} disabled={true}>
                    <p className="d-inline-block  fw-bold mb-0">Approving...</p>
                  </button>
                ) : calling ? (
                  <button className="complete" onClick={() => {}} disabled={true}>
                    <p className="d-inline-block fw-bold mb-0">Transferring...</p>
                  </button>
                ) : !estimateResponse ? (
                  <button className="complete" onClick={() => {}} disabled={true}>
                    <p className="d-inline-block fw-bold mb-0">Loading...</p>
                  </button>
                ) : estimateResponse && !hasSufficientBalance ? (
                  <button className="complete" onClick={() => {}} disabled={true}>
                    <p className="d-inline-block  fw-bold mb-0">Insufficient Balance</p>
                  </button>
                ) : estimateResponse ? (
                  <button className="complete" onClick={call} disabled={!estimateResponse}>
                    <p className="d-inline-block fw-bold mb-0">
                      {" "}
                      <WalletIcon /> Complete Purchase
                    </p>
                  </button>
                ) : null}
              </StatusButtons>
            </WidgetContent>
          ) : null}

          {widgetActive === ActiveWidgetModal.TokenSelect ? (
            <WidgetContent>
              <TokenSelectData
                chainId={bridgeState?.fromChainId ?? (fromChainInfo ? fromChainInfo.chain_id : null)}
                assetId={bridgeState?.fromTransacting ?? ZERO_ADDRESS}
                onSelectToken={(assetId) => {
                  handleChangeFromToken(assetId);
                }}
                onSelectNetwork={(chainId) => {
                  handleChangeFromChain(chainId);
                }}
              />
            </WidgetContent>
          ) : null}

          {widgetActive === ActiveWidgetModal.Settings ? (
            <WidgetContent>
              <SettingsWidget />
            </WidgetContent>
          ) : null}

          {widgetActive === ActiveWidgetModal.PaymentReview ? (
            <WidgetContent>
              <PaymentReview />
            </WidgetContent>
          ) : null}

          {widgetActive === ActiveWidgetModal.PaymentStatus ? (
            <WidgetContent>
              <PaymentStatus status="pending" />
            </WidgetContent>
          ) : null}

          {widgetActive === ActiveWidgetModal.ConnectWallet ? (
            <WidgetContent>
              <ConnectWalletModal show={true} onHide={() => setWidgetActive(ActiveWidgetModal.Main)} />
            </WidgetContent>
          ) : null}
        </div>
        {widgetActive !== ActiveWidgetModal.TokenSelect && widgetActive !== ActiveWidgetModal.Settings ? (
          <WidgetFooter>
            <div className="powered">Powered by FibPal</div>
            {widgetActive === ActiveWidgetModal.PaymentStatus ? (
              <a href="#">
                <BscscanIcon />
              </a>
            ) : (
              <div className="feeblock">Fees {SWAP_FEE}%</div>
            )}
          </WidgetFooter>
        ) : null}
      </FibpalWidget>
    </>
  );
};

export default PaymentConfirm;
