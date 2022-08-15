import PaymentWidget from "screens/Payment/PaymentWidget";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  orderprop?: any;
}

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}
const FibapalWidget: React.FC<Props> = (props) => {
  const order = {
    localAmount: 0.06,
    originSender: "0x94ec0Ba4c17C0a658B51ce375F73b1B18d2650cD",
    toChainId: 56,
    toData:
      "0x7053b116000000000000000000000000000000000000000000000000000000000004267600000000000000000000000094ec0ba4c17c0a658b51ce375f73b1b18d2650cd",
    toTo: "0xb28d74Cc439d522cba584E218BD62a0EBB0B3b78",
    toTransacting: "0x0000000000000000000000000000000000000000",
  };
  const { orderprop } = props;
  return <PaymentWidget order={orderprop ? orderprop : order} />;
};

export default FibapalWidget;
