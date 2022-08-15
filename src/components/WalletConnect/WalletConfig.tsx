import Metamask from "assets/icons/metamask.svg";
import WalletConnect from "assets/icons/walletconnect.svg";

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: any;
  connectorId: ConnectorNames;
}

export type Handler = () => void;

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
];

export default connectors;
