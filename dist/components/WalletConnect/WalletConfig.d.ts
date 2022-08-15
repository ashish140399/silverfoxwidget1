export declare enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect"
}
export declare type Login = (connectorId: ConnectorNames) => void;
export interface Config {
    title: string;
    icon: any;
    connectorId: ConnectorNames;
}
export declare type Handler = () => void;
declare const connectors: Config[];
export default connectors;
