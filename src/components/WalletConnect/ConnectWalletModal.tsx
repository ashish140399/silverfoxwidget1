import { Web3ReactHooks } from "@web3-react/core";
import { EIP1193 } from "@web3-react/eip1193";
import { Url } from "@web3-react/url";
import { URI_AVAILABLE, WalletConnect } from "@web3-react/walletconnect";
import { connections, defaultChainIdAtom, Web3Connection } from "hooks/useWeb3React";
import { atom, useAtom, useAtomValue } from "jotai";
import QRCode from "qrcode";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import EventEmitter from "events";
import styled from "styled-components";
import "./wallet.scss";

import connectors from "./WalletConfig";

const onError = (error: Error) => console.error("web3 error:", error);
const NO_WALLET_HELP_CENTER_URL = "https://help.uniswap.org/en/articles/5391585-how-to-get-a-wallet";
interface Props {
  onHide: () => void;
  show: boolean;
}

const QRCodeWrapper = styled.div`
  height: 110px;
  width: 110px;
  path {
    /* Maximize contrast: transparent in light theme, otherwise hard-coded to light theme. */
    fill: "#00000000";
  }
`;
interface ButtonProps {
  walletName?: string;
  logoSrc?: string;
  caption?: string;
  connection?: Web3Connection;
  onClick?: () => void;
}

function toQrCodeSvg(qrUri: string): Promise<string> {
  return QRCode.toString(qrUri, {
    // Leave a margin to increase contrast in dark mode.
    margin: 1,
    // Use 55*2=110 for the width to prevent distortion. The generated viewbox is "0 0 55 55".
    width: 110,
    type: "svg",
  });
}

function WalletConnectButton({ walletName, logoSrc, connection: wcTileConnection, onClick }: ButtonProps) {
  const [walletConnect] = wcTileConnection as [WalletConnect, Web3ReactHooks];
  const defaultChainId = useAtomValue(defaultChainIdAtom);

  const [qrUri, setQrUri] = useState("");
  const [qrCodeSvg, setQrCodeSvg] = useState<string>("");

  useEffect(() => {
    let stale = false;
    if (qrUri) {
      toQrCodeSvg(qrUri).then((qrCodeSvg) => {
        if (stale) return;
        setQrCodeSvg(qrCodeSvg);
      });
    } else {
      walletConnect.activate(defaultChainId).catch((e) => {
        if (stale) return;
        onError?.(e);
      });
    }
    return () => {
      stale = true;
    };
  }, [qrUri, walletConnect, defaultChainId]);

  useEffect(() => {
    const disconnectListener = async (err: Error | null, _: any) => {
      if (err) onError?.(err);
      // Clear saved QR URI after disconnection
      setQrUri(undefined);
      walletConnect.deactivate();
    };
    walletConnect.provider?.connector.on("disconnect", disconnectListener);

    // Need both URI event listeners
    walletConnect.events.on(URI_AVAILABLE, async (uri: string) => {
      if (uri) {
        setQrUri(uri);
      }
    });

    const uriListener = async (err: Error | null, payload: any) => {
      if (err) onError?.(err);
      const uri: string = payload.params[0];
      if (uri) {
        setQrUri(uri);
      }
    };
    walletConnect.provider?.connector.on("display_uri", uriListener);

    return () => {
      walletConnect.events.off(URI_AVAILABLE);
      (walletConnect.provider?.connector as unknown as EventEmitter | undefined)?.off("display_uri", uriListener);
    };
  });

  return (
    <div className="wallet-item" onClick={onClick}>
      <p className="d-flex align-items-center justify-content-between white">
        <span>{walletName}</span>
        <img src={logoSrc} width="30" />
      </p>
      <QRCodeWrapper dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
    </div>
  );
}

function MetaMaskButton({ walletName, logoSrc, onClick }: ButtonProps) {
  return (
    <div className="wallet-item" onClick={onClick}>
      <p className="d-flex align-items-center justify-content-between white">
        <span>{walletName}</span>
        <img src={logoSrc} width="30" />
      </p>
    </div>
  );
}

function NoWalletButton() {
  return (
    <div className="wallet-item" onClick={() => window.open(NO_WALLET_HELP_CENTER_URL)}>
      <p className="d-flex align-items-center justify-content-between white">
        <span>I don't have a wallet</span>
      </p>
    </div>
  );
}

const ConnectWalletModal = (props: Props) => {
  const [firstConnector] = connections[0];
  const integratorProvidedConnector = firstConnector instanceof EIP1193 || firstConnector instanceof Url;
  const [mmConnection, wcTileConnection, wcPopupConnection]: Web3Connection[] = integratorProvidedConnector
    ? connections.slice(1)
    : connections;
  const defaultChainId = useAtomValue(defaultChainIdAtom);

  const activateWalletConnectPopup = useCallback(() => {
    const [walletConnectPopup] = wcPopupConnection;
    (walletConnectPopup.activate(defaultChainId) as Promise<void>)?.catch(onError).then(() => {
      props.onHide();
    });
  }, [wcPopupConnection, defaultChainId]);

  const activateMetaMask = useCallback(() => {
    const [metamask] = mmConnection;
    (metamask.activate(defaultChainId) as Promise<void>)?.catch(onError).then(() => {
      props.onHide();
    });
  }, [mmConnection, defaultChainId]);

  return (
    <div className="select_options">
      <div className="wallet-items">
        <WalletConnectButton
          walletName="WalletConnect"
          logoSrc={connectors[1].icon}
          connection={wcTileConnection}
          onClick={activateWalletConnectPopup}
        />
        <MetaMaskButton walletName="MetaMask" logoSrc={connectors[0].icon} onClick={activateMetaMask} />
      </div>
    </div>
  );
};

export default ConnectWalletModal;
