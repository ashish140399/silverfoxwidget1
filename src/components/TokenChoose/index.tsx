import { isAddress } from "ethers/lib/utils";
import useTokens from "hooks/useTokens";
import React, { useEffect, useMemo, useState } from "react";
import { FormControl, Modal } from "react-bootstrap";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import "./select.scss";
import SelectItem from "./SelectItem";
import { ChooseTokenOuter } from "screens/Payment/WidgetCss";
import { ALL_CHAINS } from "config";
import SelectNetwork from "./SelectNetwork";

interface Props {
  chainId: number;
  options: any;
  selectNetwork: (item: any) => void;
  selectItem: (item: any) => void;
  selectedNetwork: any;
  selectedItem: any;
}

function TokenSelectModal(props: Props) {
  const [inputSearch, setInputSearch] = useState("");

  const filterTokens = (tokens, search: string) => {
    if (!search || !search.length) return tokens;

    const searchingAddress = isAddress(search);

    if (searchingAddress) {
      return tokens.filter((token) => token.address.toLowerCase() === search?.toLowerCase());
    }

    const lowerSearchParts = search
      ?.toLowerCase()
      .split(/\s+/)
      .filter((s) => s.length > 0);

    if (lowerSearchParts.length === 0) {
      return tokens;
    }

    const matchesSearch = (s: string): boolean => {
      const sParts = s
        .toLowerCase()
        .split(/\s+/)
        .filter((str) => str.length > 0);

      return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)));
    };

    return tokens.filter((token) => {
      const { name, symbol } = token;

      return (name && matchesSearch(name)) || (symbol && matchesSearch(symbol));
    });
  };

  const filteredTokens = useMemo(() => {
    return filterTokens(props.options, inputSearch);
  }, [props.options, filterTokens, inputSearch]);

  const filteredChains = ALL_CHAINS;

  useEffect(() => {
    setInputSearch("");
  }, []);

  return (
    <>
      <ChooseTokenOuter>
        <div className="searchboxOuter">
          <div className="d-flex align-items-center select_searchBox">
            <FormControl
              className="select_search_input"
              placeholder="Search name or address"
              value={inputSearch}
              onChange={(event) => setInputSearch(event.target.value)}
            />
            <FiSearch className="me-2" />
          </div>
        </div>
        <div className="tokenselectionbox">
          <div className="tokenselectionleft">
            {filteredChains &&
              filteredChains.map((item, index) => (
                <SelectNetwork
                  item={item}
                  active={item.chain_id === props.selectedNetwork}
                  selectItem={() => {
                    props.selectNetwork(item);
                  }}
                  key={index}
                />
              ))}
          </div>
          <div className="tokenselectionright">
            <div className="select_options">
              {filteredTokens &&
                filteredTokens.map((item, index) => (
                  <SelectItem
                    item={item}
                    active={item?.address?.toLowerCase() === props.selectedItem}
                    selectItem={() => {
                      props.selectItem(item);
                    }}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </ChooseTokenOuter>
    </>
  );
}

export default function TokenSelectData({
  chainId,
  assetId,
  onSelectToken,
  onSelectNetwork,
  onClick,
  className,
  children,
}: {
  chainId?: number;
  assetId?: string;
  onSelectToken?: (assetId: string) => void;
  onSelectNetwork?: (chainId: number) => void;
  onClick?: () => void;
  className?: string;

  children?: React.ReactNode;
}) {
  const { tokens: allTokens } = useTokens();
  const [tokens, setTokens] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (chainId && allTokens) {
      if (allTokens?.[chainId]) {
        setTokens(allTokens[chainId]);
        setSelectedItem(
          allTokens[chainId]
            ?.find((token) => token.address.toLowerCase() === assetId?.toLowerCase())
            ?.address?.toLowerCase(),
        );
        setSelectedNetwork(chainId);
        return;
      }
    }
    setTokens([]);
  }, [chainId, assetId]);

  const handleSelectNetwork = (item: any) => {
    onSelectNetwork(item?.chain_id);
    setSelectedNetwork(item?.chain_id);
  };

  const handleSelectToken = (item: any) => {
    onSelectToken(item?.address?.toLowerCase());
    setSelectedItem(item?.address?.toLowerCase());
  };

  return (
    <>
      <TokenSelectModal
        chainId={chainId}
        options={tokens}
        selectNetwork={(item) => handleSelectNetwork(item)}
        selectItem={(item) => handleSelectToken(item)}
        selectedItem={selectedItem}
        selectedNetwork={selectedNetwork}
      />
    </>
  );
}
