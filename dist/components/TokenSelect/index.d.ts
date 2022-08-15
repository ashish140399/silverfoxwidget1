import React from "react";
export default function TokenSelect({ chainId, assetId, onSelect, onClick, className, children, }: {
    chainId?: number;
    assetId?: string;
    onSelect?: (assetId: string) => void;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}): JSX.Element;
