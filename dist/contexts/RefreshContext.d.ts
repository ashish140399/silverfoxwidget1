import React from "react";
declare const RefreshContext: React.Context<{
    slow: number;
    fast: number;
}>;
declare const useIsBrowserTabActive: () => React.MutableRefObject<boolean>;
declare const RefreshContextProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export { RefreshContext, RefreshContextProvider, useIsBrowserTabActive };
