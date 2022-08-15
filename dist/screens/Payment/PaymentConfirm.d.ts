import { BridgeState } from "config/types";
import React from "react";
import { PaymentWidgetProps } from "./PaymentWidget";
interface Props extends PaymentWidgetProps {
    valid: boolean;
    bridge: BridgeState;
}
declare const PaymentConfirm: React.FC<Props>;
export default PaymentConfirm;
