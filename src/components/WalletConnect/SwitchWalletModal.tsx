import { getChainList } from "utils/getHelper";
import { useWeb3React } from "@web3-react/core";
import { switchToNetwork } from "utils/wallet";
import { Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import "./wallet.scss";

interface Props {
  onHide: () => void;
  show: boolean;
}

const SwitchWalletModal = (props: Props) => {
  const { account, chainId, provider } = useWeb3React();
  const chainList = getChainList();

  const changeNetwork = (networkId: number) => {
    if (account && chainId !== networkId) {
      switchToNetwork({ library: provider, chainId: +networkId });
      props.onHide();
    }
  };

  return (
    <Modal {...props} className="select_modal" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="d-flex border-0">
        <div className="d-flex align-items-center text-white fs-3">
          <img src={require("../../vectors/Icons/selectnetwork.png").default} style={{ height: 26 }} alt="" />

          <p className="mb-0 ms-2 fw-bolder fs-4">Switch Network</p>
        </div>
        <button className="btn text-white" style={{ zIndex: 10 }} onClick={() => props.onHide()}>
          <FiX className="fs-3" />
        </button>
      </Modal.Header>
      <div className="border" />
      <Modal.Body>
        <div className="wallet-items">
          {chainList.map((chain, index) => (
            <div
              className={`wallet-item ${chain.chainId === chainId ? "disabled" : ""}`}
              onClick={() => changeNetwork(chain.chainId)}
              key={index}
            >
              <p className="d-flex align-items-center justify-content-between">
                <span>{chain.name}</span>
                <img width={30} height={30} src={chain.image} alt="" />
              </p>
            </div>
          ))}
        </div>
      </Modal.Body>

      <div className="overlay"></div>
    </Modal>
  );
};

export default SwitchWalletModal;
