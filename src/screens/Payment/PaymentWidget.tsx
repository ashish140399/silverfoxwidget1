import { ALL_CHAINS, isSupportedChain, PROVIDERS_BY_CHAINS, ROUTER_ADDRESS, ZERO_ADDRESS } from "config";
import React, { ErrorInfo, useEffect, useMemo, useState } from "react";
// import "./payment.scss";
import styled, { createGlobalStyle } from "styled-components";
import PaymentConfirm from "./PaymentConfirm";
import { BridgeState, Token } from "config/types";
import { getWrappedToken, isSupportedLocalToken } from "utils/getHelper";
import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Provider as Eip1193Provider } from "@web3-react/types";
import { isAddress } from "ethers/lib/utils";
import { ActiveWeb3Provider } from "hooks/useWeb3React";
import { RefreshContextProvider } from "contexts/RefreshContext";
import { TokensContextProvider } from "contexts/TokensContext";
import { TokenPriceContextProvider } from "contexts/TokenPriceContext";
import Wallet from "./Wallet";

export interface PaymentWidgetProps {
  //theme?: Theme
  provider?: Eip1193Provider | JsonRpcProvider;
  jsonRpcUrlMap?: { [chainId: number]: string[] };
  tokenList?: { [chainId: number]: Token[] };
  width?: string | number;
  dialog?: HTMLElement | null;
  className?: string;
  defaultChainId?: number;
  order: Pick<BridgeState, "localAmount" | "originSender" | "toChainId" | "toTransacting" | "toData" | "toTo">;
  onError?: (error: Error, info: ErrorInfo) => void;
  onTxSubmit?: (txHash: string, data: any) => void;
  onTxSuccess?: (txHash: string, data: any) => void;
  onTxFail?: (error: Error, data: any) => void;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = (props: PaymentWidgetProps) => {
  const { provider, dialog: userDialog, className, tokenList, onError, order } = props;

  const [bridgeState, setBridgeState] = useState<BridgeState>();
  const [valid, setValid] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const width = useMemo(() => {
    if (props.width && props.width < 400) {
      console.warn(`Widget width must be at least 400px (you set it to ${props.width}). Falling back to 400px.`);
      return 400;
    }
    return props.width ?? 400;
  }, [props.width]);

  const [dialog, setDialog] = useState<HTMLDivElement | null>(null);

  const defaultChainId = useMemo(() => {
    if (!props.defaultChainId) return 1;
    if (!isSupportedChain(props.defaultChainId)) {
      console.warn(`Unsupported chainId: ${props.defaultChainId}. Falling back to 1 (Ethereum Mainnet).`);
      return 1;
    }
    return props.defaultChainId;
  }, [props.defaultChainId]);

  const jsonRpcUrlMap: string | JsonRpcProvider | { [chainId: number]: string[] } = useMemo(() => {
    if (!props.jsonRpcUrlMap) return PROVIDERS_BY_CHAINS;
    for (const supportedChainId of ALL_CHAINS.map((c) => c.chain_id)) {
      if (!Object.keys(props.jsonRpcUrlMap).includes(`${supportedChainId}`)) {
        console.warn(`Did not provide a jsonRpcUrlMap for chainId: ${supportedChainId}. `);
        props.jsonRpcUrlMap[supportedChainId] = PROVIDERS_BY_CHAINS[supportedChainId];
      }
    }
    return props.jsonRpcUrlMap;
  }, [props.jsonRpcUrlMap]);

  useEffect(() => {
    if (order) {
      // validate
      const localAmount = order.localAmount || 0;
      if (localAmount === 0) {
        setValid(false);
        setBridgeState(null);
        setError("Price is invalid");
        return;
      }

      const originSender = order.originSender;
      const recovery = originSender;
      const router = ROUTER_ADDRESS;
      const toChainId = order.toChainId;

      if (!isSupportedChain(toChainId)) {
        setValid(false);
        setBridgeState(null);
        setError("Unsupported Network!");
        return;
      }

      const toTransacting = order.toTransacting;
      const isEth = toTransacting === ZERO_ADDRESS;
      const toLocal = isEth ? getWrappedToken(toChainId) : toTransacting;
      if (!toLocal || !isSupportedLocalToken(toChainId, toLocal)) {
        setValid(false);
        setBridgeState(null);
        setError("Unsupported Token Payment!");
        return;
      }

      if (!isAddress(order.toTo) || !order.toData || order.toData === "0x") {
        setValid(false);
        setBridgeState(null);
        setError("Invalid Transaction Data!");
        return;
      }

      setBridgeState({
        ...order,

        localAmount,

        fromChainId: undefined,
        toChainId,
        toTransacting,
        toLocal,
        toTransactingAmount: localAmount,
        toRouteQuote: null,

        router,
        isEth: isEth,
        isExactInput: false,
        originSender,
        recovery,
        relayerFee: "0",

        estimated: false,
      });
    }
  }, [order]);

  return (
    <>
      <React.StrictMode>
        <WidgetWrapper width={width} className={className}>
          <ActiveWeb3Provider provider={provider} jsonRpcUrlMap={jsonRpcUrlMap} defaultChainId={defaultChainId}>
            <RefreshContextProvider>
              <TokensContextProvider defaultTokens={tokenList}>
                <TokenPriceContextProvider>
                  <GlobalStyle />
                  <Wallet />
                  <PaymentConfirm {...props} bridge={bridgeState} valid={valid} />
                </TokenPriceContextProvider>
              </TokensContextProvider>
            </RefreshContextProvider>
          </ActiveWeb3Provider>
        </WidgetWrapper>
      </React.StrictMode>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  .mynavbar {    
    background: linear-gradient(106.89deg, #142949 -7.89%, #250F3A 106.45%);
  }
  .select_modal {
    .modal-content{
      *{
        color:#000;
      }
    }
    .border{
      mix-blend-mode: unset !important;
      background:rgba(0, 0, 0, 0.5) !important;
    }
    .headertag{
      font-weight:400;
      img{
        display:none;
      }
    }
    .modal-content{
      background:#fff;
      .select_searchBox{
        background: #F2F2F2;
        border: 0.5px solid rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        .select_search_input{
          color:#000 !important;
          &::placeholder{
            color: rgba(0, 0, 0, 0.5) !important;
          }
        }
      }
      .select_searchBox , .select_item{
        color:#000;
      }
      .select_item .select_item_circle{
        border: 2px solid #429AE3;
        border-radius: 50%;
        &::before{
          background:#429AE3;
        }
      }
    }
  }
`;

const WidgetWrapper = styled.div<{ width?: number | string }>`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-radius: 0.1em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-feature-settings: "ss01" on, "ss02" on, "cv01" on, "cv03" on;
  font-size: 16px;
  font-smooth: always;
  font-variant: none;
  // height: 400px;
  min-width: 400px;
  padding: 0.25em;
  position: relative;
  user-select: none;
  width: ${({ width }) => width && (isNaN(Number(width)) ? width : `${width}px`)};

  * {
    box-sizing: border-box;
    font-family: "Inter", sans-serif;

    @supports (font-variation-settings: normal) {
      font-family: "Inter", sans-serif;
    }
  }
`;

export default PaymentWidget;
