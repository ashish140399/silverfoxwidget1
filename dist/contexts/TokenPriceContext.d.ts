import React from "react";
declare type TokenPriceState = {
    nativeTokenPrices: Record<number, string>;
    fetchStatus: FetchStatus;
};
export declare enum FetchStatus {
    NOT_FETCHED = "not-fetched",
    SUCCESS = "success",
    FAILED = "failed"
}
declare const TokenPriceContext: React.Context<TokenPriceState>;
declare const TokenPriceContextProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export { TokenPriceContext, TokenPriceContextProvider };
