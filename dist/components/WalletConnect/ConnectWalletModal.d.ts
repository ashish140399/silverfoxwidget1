/// <reference types="react" />
import "./wallet.scss";
interface Props {
    onHide: () => void;
    show: boolean;
}
declare const ConnectWalletModal: (props: Props) => JSX.Element;
export default ConnectWalletModal;
