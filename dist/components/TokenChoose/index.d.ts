import React from "react";
import "./select.scss";
export default function TokenSelectData({ chainId, assetId, onSelectToken, onSelectNetwork, onClick, className, children, }: {
    chainId?: number;
    assetId?: string;
    onSelectToken?: (assetId: string) => void;
    onSelectNetwork?: (chainId: number) => void;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}): JSX.Element;
