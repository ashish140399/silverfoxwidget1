import { Token } from "config/types";
import React from "react";
declare type TokensState = {
    tokens: Record<number, Token[]>;
    fetchStatus: FetchStatus;
};
export declare enum FetchStatus {
    NOT_FETCHED = "not-fetched",
    SUCCESS = "success",
    FAILED = "failed"
}
export declare const FIBSWAP_TOKENS_KEY = "fibswap-tokens";
declare const TokensContext: React.Context<TokensState>;
declare const TokensContextProvider: ({ defaultTokens, children }: {
    defaultTokens: any;
    children: any;
}) => JSX.Element;
export { TokensContext, TokensContextProvider };
