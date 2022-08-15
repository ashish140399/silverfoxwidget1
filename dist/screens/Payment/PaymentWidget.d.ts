import React, { ErrorInfo } from "react";
import { BridgeState, Token } from "config/types";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Provider as Eip1193Provider } from "@web3-react/types";
export interface PaymentWidgetProps {
    provider?: Eip1193Provider | JsonRpcProvider;
    jsonRpcUrlMap?: {
        [chainId: number]: string[];
    };
    tokenList?: {
        [chainId: number]: Token[];
    };
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
declare const PaymentWidget: React.FC<PaymentWidgetProps>;
export default PaymentWidget;
