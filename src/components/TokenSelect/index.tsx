import IconImage from "components/IconImage";
import ReactDOM from "react-dom";
import { isAddress } from "ethers/lib/utils";
import useTokens from "hooks/useTokens";
import React, { useEffect, useMemo, useState } from "react";
import { FormControl, Modal } from "react-bootstrap";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { ChooseTokenOuter } from "screens/Payment/WidgetCss";

interface Props {
  chainId: number;
  options: any;
  selectItem: (item: any) => void;
  selectedItem: any;
}

export default function TokenSelect({
  chainId,
  assetId,
  onSelect,
  onClick,
  className,
  children,
}: {
  chainId?: number;
  assetId?: string;
  onSelect?: (assetId: string) => void;
  onClick?: () => void;
  className?: string;

  children?: React.ReactNode;
}) {
  const { tokens: allTokens } = useTokens();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (chainId && allTokens) {
      if (allTokens?.[chainId]) {
        setSelectedItem(allTokens[chainId].find((token) => token.address.toLowerCase() === assetId?.toLowerCase()));
        return;
      }
    }
    setSelectedItem(null);
  }, [chainId, assetId]);

  return (
    <>
      <div className={`select_control temp  d-flex align-items-center justify-content-between ${className}`}>
        <div className="option d-flex align-items-center me-1">
          {selectedItem ? (
            <>
              <div className="me-2 select_control_icon flex-grow-1">
                <IconImage
                  src={selectedItem.image}
                  className="w-full"
                  alt={selectedItem.symbol}
                  width={22}
                  height={22}
                />
              </div>
              <div>
                <p className="option-label mb-0 ">{selectedItem.symbol}</p>
              </div>
            </>
          ) : (
            <div>
              <p className="option-label mb-0 ">Select</p>
            </div>
          )}
        </div>
        <FiChevronDown />
      </div>
    </>
  );
}
