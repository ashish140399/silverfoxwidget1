export declare enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect",
    Clover = "clover",
    WalletLink = "walletlink"
}
export declare type Login = (connectorId: ConnectorNames) => void;
export interface Config {
    title: string;
    icon: string;
    connectorId: ConnectorNames;
}
export interface AssetContract {
    contract_address: string;
    chain_id: number;
    contract_decimals: number;
    symbol?: string;
    image?: string;
}
export interface Asset {
    id: string;
    symbol: string;
    name: string;
    image: string;
    coingecko_id: string;
    is_stablecoin: boolean;
    is_wrapped?: boolean | false;
    wrapped_chain_id?: number;
    contracts: AssetContract[];
}
export interface Chain {
    id: string;
    chain_id: number;
    name: string;
    short_name: string;
    image: string;
    website: string;
    coingecko_id: string;
    coingecko_chain_id: string;
    color: string;
    disabled: boolean;
    provider_params: {
        chainId: string;
        chainName: string;
        rpcUrls: string[];
        nativeCurrency: {
            name: string;
            symbol: string;
            decimals: number;
        };
        blockExplorerUrls: string[];
    };
    gas_limit: {
        [key in Protocols]: string;
    };
    multicall: string;
    fibswap: string | undefined;
    subgraph: string[];
    explorer: {
        name: string;
        url: string;
        icon: string;
        block_path: string;
        address_path: string;
        contract_path: string;
        contract_0_path: string;
        transaction_path: string;
    };
    domain_id?: string | undefined;
}
export interface Token {
    address: string;
    network: number;
    decimals: number;
    image: string;
    name: string;
    symbol: string;
}
export declare type Network = "testnet" | "mainnet" | "local";
export declare type Environment = "staging" | "production";
export declare type BridgeStatus = "idle" | "estimating" | "approving" | "xcalling";
export declare enum ActiveWidgetModal {
    Main = "main",
    Settings = "settings",
    TokenSelect = "choosetoken",
    PaymentStatus = "paystatus",
    PaymentReview = "review",
    ConnectWallet = "connectwallet"
}
export interface BridgeState {
    fromChainId: number;
    fromTransacting?: string;
    fromLocal?: string;
    fromTransactingAmount?: number;
    localAmount?: number;
    fromTo?: string;
    fromData?: string;
    fromRouteQuote?: any;
    toChainId: number;
    toTransacting?: string;
    toLocal?: string;
    toTransactingAmount?: number;
    toTo?: string;
    toData?: string;
    toRouteQuote?: any;
    router: string;
    isEth: boolean | false;
    isExactInput: boolean | true;
    originSender: string;
    recovery: string;
    relayerFee: string;
    slippage?: number;
    estimated: boolean;
}
export declare enum Protocols {
    Opensea = "opensea",
    UniswapV2 = "uniswapv2",
    UniswapV3 = "uniswapv3",
    Airnfts = "airnfts"
}
export interface AirnftOrder {
    id: string;
    external_url?: string;
    baseID: string;
    creatorId: string;
    creatorAddress: string;
    ownerId: string;
    ownerAddress: string;
    ownerUsername: string;
    creatorUsername: string;
    mintTransactionHash: string;
    tokenID: string;
    name: string;
    priority: number;
    attributes: any[];
    description: string;
    listed: boolean;
    verified: boolean;
    category: string;
    gcpUrl?: string;
    image: string;
    animation_url?: string;
    url: string;
    urlCompressed?: string;
    urlThumbnail?: string;
    price: number;
    USDPrice: number;
    fileType: string;
    chain: string;
    createdAt: string;
    owner: {
        id: string;
        username: string;
        walletAddress: string;
        userAvatarUrl: string;
        userAvatarUrlCompressed?: string;
        userAvatarUrlThumbnail?: string;
        verified: boolean | false;
    };
}
