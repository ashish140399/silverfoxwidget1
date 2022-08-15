import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { BigNumber, ethers, providers, utils, FixedNumber } from 'ethers';
import React, { useState, useEffect, useRef, useContext, useMemo, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { initializeConnector, Web3ReactProvider, useWeb3React } from '@web3-react/core';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { EIP1193 } from '@web3-react/eip1193';
import { Url } from '@web3-react/url';
import { WalletConnect, URI_AVAILABLE } from '@web3-react/walletconnect';
import { JsonRpcProvider } from '@ethersproject/providers';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Connector } from '@web3-react/types';
import QRCode from 'qrcode';
import Metamask from 'assets/icons/metamask.svg';
import WalletConnect$1 from 'assets/icons/walletconnect.svg';
import _ from 'lodash';
import { create } from '@fibswap-dex/fibswap-sdk';
import 'numeral';
import { isAddress, Interface } from 'ethers/lib/utils';
import BigNumber$3, { BigNumber as BigNumber$1 } from 'bignumber.js';
import { UniswapPairSettings, UniswapVersion, TradeDirection, UniswapPair, appendEthToContractAddress } from 'simple-uniswap-sdk';
import toast from 'react-hot-toast';
import Switch from '@mui/material/Switch';
import { FormControl } from 'react-bootstrap';
import { BigNumber as BigNumber$2 } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
import { useAtomValue as useAtomValue$1 } from 'jotai/utils';
import 'bootstrap/dist/css/bootstrap.min.css';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var blackList = [
];

var mainnet_chains = [
	{
		id: "ethereum",
		chain_id: 1,
		name: "Ethereum",
		short_name: "ETH",
		image: "/logos/chains/ethereum.png",
		website: "https://ethereum.org",
		coingecko_id: "ethereum",
		coingecko_chain_id: "ethereum",
		color: "#c0c2c3",
		disabled: false,
		provider_params: {
			chainId: "0x1",
			chainName: "Ethereum",
			rpcUrls: [
				"https://rpc.ankr.com/eth/c82a7930562d9f88f36171e034e6ab44616fc977a1f80bf7961b505563d3f1d0",
				"https://eth-mainnet.alchemyapi.io/v2/_V0ay-GtZuPRooSDXQFei3k8QI0ASop3",
				"https://eth-mainnet.alchemyapi.io/v2/XFdOGs7reQYJ6gcWsFlx-SqxTCLfdrmH"
			],
			nativeCurrency: {
				name: "Ether",
				symbol: "ETH",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://etherscan.io"
			]
		},
		gas_limit: {
			opensea: "732000",
			uniswapv2: "400000",
			uniswapv3: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-mainnet"
		],
		fibswap: "0x354C92287Fc0e5bb16f6Ddd9Dc17C0580D1902cB",
		multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
		explorer: {
			name: "Etherscan",
			url: "https://etherscan.io",
			icon: "/logos/explorers/etherscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "binance",
		chain_id: 56,
		name: "BNB Chain",
		short_name: "BNB",
		image: "/logos/chains/binance.png",
		website: "https://bnbchain.world",
		coingecko_id: "binancecoin",
		coingecko_chain_id: "binance-smart-chain",
		color: "#e8b30b",
		disabled: false,
		provider_params: {
			chainId: "0x38",
			chainName: "BNB Chain",
			rpcUrls: [
				"https://rpc.ankr.com/bsc/c82a7930562d9f88f36171e034e6ab44616fc977a1f80bf7961b505563d3f1d0",
				"https://bsc-dataseed.binance.org",
				"https://bsc-dataseed1.defibit.io"
			],
			nativeCurrency: {
				name: "BNB Token",
				symbol: "BNB",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://bscscan.com"
			]
		},
		gas_limit: {
			uniswapv2: "400000",
			airnfts: "300000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-bsc"
		],
		fibswap: "0xfbF2961be8f47178AA6568eaC24702424368226A",
		multicall: "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb",
		explorer: {
			name: "BscScan",
			url: "https://bscscan.com",
			icon: "/logos/explorers/bscscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "polygon",
		chain_id: 137,
		name: "Polygon",
		short_name: "MATIC",
		image: "/logos/chains/polygon.png",
		website: "https://polygon.technology",
		coingecko_id: "matic-network",
		coingecko_chain_id: "polygon-pos",
		color: "#8247e5",
		disabled: false,
		provider_params: {
			chainId: "0x89",
			chainName: "Polygon",
			rpcUrls: [
				"https://rpc.ankr.com/polygon",
				"https://rpc.ankr.com/polygon/c82a7930562d9f88f36171e034e6ab44616fc977a1f80bf7961b505563d3f1d0",
				"https://polygon-mainnet.g.alchemy.com/v2/dC08sm_pIF5jKDf3JVe_D4r4l5cz0Kx9"
			],
			nativeCurrency: {
				name: "Matic",
				symbol: "MATIC",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://polygonscan.com"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-matic"
		],
		fibswap: "0x27760167d5a18bEb7AeFac161840f76DA50F0daB",
		multicall: "0xc4f1501f337079077842343Ce02665D8960150B0",
		explorer: {
			name: "Polygonscan",
			url: "https://polygonscan.com",
			icon: "/logos/explorers/polygonscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "avalanche",
		chain_id: 43114,
		name: "Avalanche",
		short_name: "AVAX",
		image: "/logos/chains/avalanche.png",
		website: "https://avax.network",
		coingecko_id: "avalanche-2",
		coingecko_chain_id: "avalanche",
		color: "#e84143",
		disabled: false,
		provider_params: {
			chainId: "0xa86a",
			chainName: "Avalanche",
			rpcUrls: [
				"https://rpc.ankr.com/avalanche/c82a7930562d9f88f36171e034e6ab44616fc977a1f80bf7961b505563d3f1d0",
				"https://rpc.ankr.com/avalanche",
				"https://api.avax.network/ext/bc/C/rpc"
			],
			nativeCurrency: {
				name: "Avalanche",
				symbol: "AVAX",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://snowtrace.io"
			]
		},
		gas_limit: {
			uniswapv2: "400000",
			airnfts: "300000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-avalanche"
		],
		fibswap: "0xB95E60bcc68A6d20f5e3C4a6C622EF18cd6498AF",
		multicall: "0xa00FB557AA68d2e98A830642DBbFA534E8512E5f",
		explorer: {
			name: "Snowtrace",
			url: "https://snowtrace.io",
			icon: "/logos/explorers/snowtrace.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "fantom",
		chain_id: 250,
		name: "Fantom",
		short_name: "FTM",
		image: "/logos/chains/fantom.png",
		website: "https://fantom.foundation",
		coingecko_id: "fantom",
		coingecko_chain_id: "fantom",
		color: "#1869ff",
		disabled: false,
		provider_params: {
			chainId: "0xfa",
			chainName: "Fantom",
			rpcUrls: [
				"https://rpc.ankr.com/fantom/c82a7930562d9f88f36171e034e6ab44616fc977a1f80bf7961b505563d3f1d0",
				"https://rpc.ankr.com/fantom",
				"https://rpc.fantom.network"
			],
			nativeCurrency: {
				name: "Fantom",
				symbol: "FTM",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://ftmscan.com"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-fantom"
		],
		fibswap: "0x63477C6f5DffB3D00f85C46aB6d664A763449061",
		multicall: "0xb828C456600857abd4ed6C32FAcc607bD0464F4F",
		explorer: {
			name: "FTMScan",
			url: "https://ftmscan.com",
			icon: "/logos/explorers/ftmscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "gnosis",
		chain_id: 100,
		domain_id: "2019844457",
		name: "Gnosis",
		short_name: "GNO",
		image: "/logos/chains/gnosis.png",
		website: "https://gnosischain.com",
		coingecko_id: "gnosis",
		coingecko_chain_id: "xdai",
		color: "#48a9a6",
		disabled: true,
		provider_params: {
			chainId: "0x64",
			chainName: "Gnosis",
			rpcUrls: [
				"https://rpc.xdaichain.com/",
				"https://rpc.gnosischain.com/",
				"https://xdai.poanetwork.dev/"
			],
			nativeCurrency: {
				name: "xDAI",
				symbol: "xDAI",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://blockscout.com/poa/xdai/"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-xdai"
		],
		fibswap: "",
		multicall: "0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a",
		explorer: {
			name: "BlockScout",
			url: "https://blockscout.com/xdai/mainnet",
			icon: "/logos/explorers/blockscout.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "arbitrum",
		chain_id: 42161,
		name: "Arbitrum",
		short_name: "ARB",
		image: "/logos/chains/arbitrum.png",
		website: "https://arbitrum.io",
		coingecko_id: "ethereum",
		coingecko_chain_id: "arbitrum-one",
		color: "#28a0f0",
		disabled: true,
		provider_params: {
			chainId: "0xa4b1",
			chainName: "Arbitrum",
			rpcUrls: [
				"https://rpc.ankr.com/arbitrum/c82a7930562d9f88f36171e034e6ab44616fc977a1f80bf7961b505563d3f1d0",
				"https://arb1.arbitrum.io/rpc"
			],
			nativeCurrency: {
				name: "Arbitrum Ether",
				symbol: "aETH",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://arbiscan.io"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-arbitrum-one"
		],
		fibswap: "",
		multicall: "0x7a7443f8c577d537f1d8cd4a629d40a3148dd7ee",
		explorer: {
			name: "Arbiscan",
			url: "https://arbiscan.io",
			icon: "/logos/explorers/arbiscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "optimism",
		chain_id: 10,
		name: "Optimism",
		short_name: "OPT",
		image: "/logos/chains/optimism.png",
		website: "https://optimism.io",
		coingecko_id: "ethereum",
		coingecko_chain_id: "optimistic-ethereum",
		color: "#dc2626",
		disabled: true,
		provider_params: {
			chainId: "0xa",
			chainName: "Optimism",
			rpcUrls: [
				"https://mainnet.optimism.io"
			],
			nativeCurrency: {
				name: "Ether",
				symbol: "OETH",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://optimistic.etherscan.io"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-optimism"
		],
		fibswap: "",
		multicall: "0xeAa6877139d436Dc6d1f75F3aF15B74662617B2C",
		explorer: {
			name: "Etherscan",
			url: "https://optimistic.etherscan.io",
			icon: "/logos/explorers/optimism.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "moonbeam",
		chain_id: 1284,
		domain_id: "1650811245",
		name: "Moonbeam",
		short_name: "MBEAM",
		image: "/logos/chains/moonbeam.png",
		website: "https://moonbeam.network",
		coingecko_id: "moonbeam",
		coingecko_chain_id: "moonbeam",
		color: "#53cbc8",
		disabled: true,
		provider_params: {
			chainId: "0x504",
			chainName: "Moonbeam",
			rpcUrls: [
				"https://rpc.api.moonbeam.network",
				"https://rpc.ankr.com/moonbeam"
			],
			nativeCurrency: {
				name: "Glimmer",
				symbol: "GLMR",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://moonscan.io"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-moonbeam"
		],
		fibswap: "",
		multicall: "",
		explorer: {
			name: "Moonscan",
			url: "https://moonscan.io",
			icon: "/logos/explorers/moonbeam.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "moonriver",
		chain_id: 1285,
		name: "Moonriver",
		short_name: "MOVR",
		image: "/logos/chains/moonriver.png",
		website: "https://moonbeam.network/networks/moonriver",
		coingecko_id: "moonriver",
		coingecko_chain_id: "moonriver",
		color: "#e6af07",
		disabled: true,
		provider_params: {
			chainId: "0x505",
			chainName: "Moonriver",
			rpcUrls: [
				"https://rpc.api.moonriver.moonbeam.network"
			],
			nativeCurrency: {
				name: "Moonriver",
				symbol: "MOVR",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://moonriver.moonscan.io"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-moonriver"
		],
		fibswap: "",
		multicall: "",
		explorer: {
			name: "Moonscan",
			url: "https://moonriver.moonscan.io",
			icon: "/logos/explorers/moonriver.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "fuse",
		chain_id: 122,
		name: "Fuse",
		short_name: "FUSE",
		image: "/logos/chains/fuse.png",
		website: "https://fuse.io",
		coingecko_id: "fuse-network-token",
		coingecko_chain_id: "fuse",
		color: "#fde047",
		disabled: true,
		provider_params: {
			chainId: "0x7a",
			chainName: "Fuse",
			rpcUrls: [
				"https://rpc.fuse.io"
			],
			nativeCurrency: {
				name: "Fuse Token",
				symbol: "FUSE",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://explorer.fuse.io"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-fuse"
		],
		fibswap: "",
		multicall: "",
		explorer: {
			name: "Fuse Explorer",
			url: "https://explorer.fuse.io",
			icon: "/logos/explorers/fuse.png",
			block_path: "/blocks/{block}",
			address_path: "/address/{address}",
			contract_path: "/tokens/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "boba",
		chain_id: 288,
		name: "Boba",
		short_name: "BOBA",
		image: "/logos/chains/boba.png",
		website: "https://boba.network",
		coingecko_id: "boba-network",
		coingecko_chain_id: "boba",
		color: "#cbff00",
		disabled: true,
		provider_params: {
			chainId: "0x120",
			chainName: "Boba",
			rpcUrls: [
				"https://mainnet.boba.network"
			],
			nativeCurrency: {
				name: "Ethereum",
				symbol: "ETH",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://blockexplorer.boba.network"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-boba"
		],
		fibswap: "",
		multicall: "",
		explorer: {
			name: "Boba",
			url: "https://blockexplorer.boba.network",
			icon: "/logos/explorers/boba.png",
			block_path: "/blocks/{block}",
			address_path: "/address/{address}",
			contract_path: "/tokens/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "harmony",
		chain_id: 1666600000,
		name: "Harmony",
		short_name: "HONE",
		image: "/logos/chains/harmony.png",
		website: "https://harmony.one",
		coingecko_id: "harmony",
		coingecko_chain_id: "harmony-shard-0",
		color: "#42decd",
		disabled: true,
		provider_params: {
			chainId: "0x120",
			chainName: "Harmony",
			rpcUrls: [
				"https://api.harmony.one",
				"https://rpc.ankr.com/harmony"
			],
			nativeCurrency: {
				name: "One",
				symbol: "ONE",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://explorer.harmony.one"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-harmony"
		],
		fibswap: "",
		multicall: "0x5c41f6817feeb65d7b2178b0b9cebfc8fad97969",
		explorer: {
			name: "Harmony",
			url: "https://explorer.harmony.one",
			icon: "/logos/explorers/harmony.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/address/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "cronos",
		chain_id: 25,
		name: "Cronos",
		short_name: "CRO",
		image: "/logos/chains/cronos.png",
		website: "https://crypto.com",
		coingecko_id: "crypto-com-chain",
		coingecko_chain_id: "cronos",
		color: "#012d74",
		disabled: true,
		provider_params: {
			chainId: "0x19",
			chainName: "Cronos",
			rpcUrls: [
				"https://evm.cronos.org"
			],
			nativeCurrency: {
				name: "Cronos",
				symbol: "CRO",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://cronoscan.com"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-cronos"
		],
		fibswap: "",
		multicall: "0x5e954f5972EC6BFc7dECd75779F10d848230345F",
		explorer: {
			name: "Cronoscan",
			url: "https://cronoscan.com",
			icon: "/logos/explorers/cronoscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "evmos",
		chain_id: 9001,
		name: "Evmos",
		short_name: "EVMOS",
		image: "/logos/chains/evmos.png",
		website: "https://evmos.org",
		coingecko_id: "evmos",
		coingecko_chain_id: "evmos",
		color: "#1f1577",
		disabled: true,
		provider_params: {
			chainId: "0x2329",
			chainName: "Evmos",
			rpcUrls: [
				"https://eth.bd.evmos.org:8545"
			],
			nativeCurrency: {
				name: "Evmos",
				symbol: "EVMOS",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://evm.evmos.org"
			]
		},
		gas_limit: {
			uniswapv2: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-evmos"
		],
		fibswap: "",
		multicall: "",
		explorer: {
			name: "Evmos",
			url: "https://evm.evmos.org",
			icon: "/logos/explorers/evmos.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/address/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	}
];

var mainnet_assets = [
	{
		id: "usdt",
		symbol: "USDT",
		name: "Tether",
		image: "/logos/assets/usdt.png",
		coingecko_id: "tether",
		is_stablecoin: true,
		contracts: [
			{
				contract_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
				chain_id: 1,
				contract_decimals: 6
			},
			{
				contract_address: "0x55d398326f99059ff775485246999027b3197955",
				chain_id: 56,
				contract_decimals: 18
			},
			{
				contract_address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
				chain_id: 137,
				contract_decimals: 6
			},
			{
				contract_address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
				chain_id: 42161,
				contract_decimals: 6
			},
			{
				contract_address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
				chain_id: 10,
				contract_decimals: 6
			},
			{
				contract_address: "0xc7198437980c041c805a1edcba50c1ce5db95118",
				chain_id: 43114,
				contract_decimals: 6,
				symbol: "USDT.e"
			},
			{
				contract_address: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
				chain_id: 250,
				contract_decimals: 6,
				symbol: "fUSDT"
			},
			{
				contract_address: "0x4ecaba5870353805a9f068101a40e0f32ed605c6",
				chain_id: 100,
				contract_decimals: 6
			},
			{
				contract_address: "0x8e70cd5b4ff3f62659049e74b6649c6603a0e594",
				chain_id: 1284,
				contract_decimals: 6,
				symbol: "madUSDT"
			},
			{
				contract_address: "0xb44a9b6905af7c801311e8f4e76932ee959c663c",
				chain_id: 1285,
				contract_decimals: 6,
				symbol: "madUSDT"
			},
			{
				contract_address: "0xfadbbf8ce7d5b7041be672561bba99f79c532e10",
				chain_id: 122,
				contract_decimals: 6
			},
			{
				contract_address: "0xab58da63dfdd6b97eaab3c94165ef6f43d951fb2",
				chain_id: 2001,
				contract_decimals: 6,
				symbol: "madUSDT"
			},
			{
				contract_address: "0x5de1677344d3cb0d7d465c10b72a8f60699c062d",
				chain_id: 288,
				contract_decimals: 6
			},
			{
				contract_address: "0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f",
				chain_id: 1666600000,
				contract_decimals: 6
			},
			{
				contract_address: "0x66e428c3f67a68878562e79a0234c1f83c208770",
				chain_id: 25,
				contract_decimals: 6
			},
			{
				contract_address: "0x7ff4a56b32ee13d7d4d405887e0ea37d61ed919e",
				chain_id: 9001,
				contract_decimals: 6
			}
		]
	},
	{
		id: "usdc",
		symbol: "USDC",
		name: "USD Coin",
		image: "/logos/assets/usdc.png",
		coingecko_id: "usd-coin",
		is_stablecoin: true,
		contracts: [
			{
				contract_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
				chain_id: 1,
				contract_decimals: 6
			},
			{
				contract_address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
				chain_id: 56,
				contract_decimals: 18
			},
			{
				contract_address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
				chain_id: 137,
				contract_decimals: 6
			},
			{
				contract_address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
				chain_id: 42161,
				contract_decimals: 6
			},
			{
				contract_address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
				chain_id: 10,
				contract_decimals: 6
			},
			{
				contract_address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
				chain_id: 43114,
				contract_decimals: 6,
				symbol: "USDC.e"
			},
			{
				contract_address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
				chain_id: 250,
				contract_decimals: 6
			},
			{
				contract_address: "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
				chain_id: 100,
				contract_decimals: 6
			},
			{
				contract_address: "0x8f552a71efe5eefc207bf75485b356a0b3f01ec9",
				chain_id: 1284,
				contract_decimals: 6,
				symbol: "madUSDC"
			},
			{
				contract_address: "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d",
				chain_id: 1285,
				contract_decimals: 6,
				symbol: "madUSDC"
			},
			{
				contract_address: "0x620fd5fa44be6af63715ef4e65ddfa0387ad13f5",
				chain_id: 122,
				contract_decimals: 6
			},
			{
				contract_address: "0x5a955fddf055f2de3281d99718f5f1531744b102",
				chain_id: 2001,
				contract_decimals: 6,
				symbol: "madUSDC"
			},
			{
				contract_address: "0x66a2a913e447d6b4bf33efbec43aaef87890fbbc",
				chain_id: 288,
				contract_decimals: 6
			},
			{
				contract_address: "0x985458e523db3d53125813ed68c274899e9dfab4",
				chain_id: 1666600000,
				contract_decimals: 6
			},
			{
				contract_address: "0xc21223249ca28397b4b6541dffaecc539bff0c59",
				chain_id: 25,
				contract_decimals: 6
			},
			{
				contract_address: "0x51e44ffad5c2b122c8b635671fcc8139dc636e82",
				chain_id: 9001,
				contract_decimals: 6
			}
		]
	},
	{
		id: "dai",
		symbol: "DAI",
		name: "Dai",
		image: "/logos/assets/dai.png",
		coingecko_id: "dai",
		is_stablecoin: true,
		contracts: [
			{
				contract_address: "0x6b175474e89094c44da98b954eedeac495271d0f",
				chain_id: 1,
				contract_decimals: 18
			},
			{
				contract_address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
				chain_id: 56,
				contract_decimals: 18
			},
			{
				contract_address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
				chain_id: 137,
				contract_decimals: 18
			},
			{
				contract_address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
				chain_id: 42161,
				contract_decimals: 18
			},
			{
				contract_address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
				chain_id: 10,
				contract_decimals: 18
			},
			{
				contract_address: "0xd586e7f844cea2f87f50152665bcbc2c279d8d70",
				chain_id: 43114,
				contract_decimals: 18,
				symbol: "DAI.e"
			},
			{
				contract_address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
				chain_id: 250,
				contract_decimals: 18
			},
			{
				contract_address: "0x0000000000000000000000000000000000000000",
				chain_id: 100,
				contract_decimals: 18,
				symbol: "xDAI",
				image: "/logos/assets/xdai.png"
			},
			{
				contract_address: "0xc234a67a4f840e61ade794be47de455361b52413",
				chain_id: 1284,
				contract_decimals: 18,
				symbol: "madDAI"
			},
			{
				contract_address: "0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844",
				chain_id: 1285,
				contract_decimals: 18,
				symbol: "madDAI"
			},
			{
				contract_address: "0x94ba7a27c7a95863d1bdc7645ac2951e0cca06ba",
				chain_id: 122,
				contract_decimals: 18
			},
			{
				contract_address: "0x41eafc40cd5cb904157a10158f73ff2824dc1339",
				chain_id: 2001,
				contract_decimals: 18,
				symbol: "madDAI"
			},
			{
				contract_address: "0xf74195bb8a5cf652411867c5c2c5b8c2a402be35",
				chain_id: 288,
				contract_decimals: 18
			},
			{
				contract_address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
				chain_id: 1666600000,
				contract_decimals: 18
			},
			{
				contract_address: "0xf2001b145b43032aaf5ee2884e456ccd805f677d",
				chain_id: 25,
				contract_decimals: 18
			},
			{
				contract_address: "0x63743acf2c7cfee65a5e356a4c4a005b586fc7aa",
				chain_id: 9001,
				contract_decimals: 18
			}
		]
	},
	{
		id: "eth",
		symbol: "WETH",
		name: "Ethereum",
		image: "/logos/assets/eth.png",
		coingecko_id: "ethereum",
		is_stablecoin: false,
		is_wrapped: true,
		wrapped_chain_id: 1,
		contracts: [
			{
				contract_address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
				chain_id: 1,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
				chain_id: 56,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
				chain_id: 137,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
				chain_id: 42161,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
				chain_id: 43114,
				contract_decimals: 18,
				symbol: "WETH.e"
			},
			{
				contract_address: "0x74b23882a30290451a17c44f4f05243b6b58c76d",
				chain_id: 250,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1",
				chain_id: 100,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x30d2a9f5fdf90ace8c17952cbb4ee48a55d916a7",
				chain_id: 1284,
				contract_decimals: 18,
				symbol: "madWETH"
			},
			{
				contract_address: "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c",
				chain_id: 1285,
				contract_decimals: 18,
				symbol: "madWETH"
			},
			{
				contract_address: "0xa722c13135930332eb3d749b2f0906559d2c5b99",
				chain_id: 122,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x5950f9b6ef36f3127ea66799e64d0ea1f5fdb9d1",
				chain_id: 2001,
				contract_decimals: 18,
				symbol: "madWETH"
			},
			{
				contract_address: "0x0000000000000000000000000000000000000000",
				chain_id: 288,
				contract_decimals: 18
			},
			{
				contract_address: "0xe44fd7fcb2b1581822d0c862b68222998a0c299a",
				chain_id: 25,
				contract_decimals: 18,
				symbol: "WETH"
			},
			{
				contract_address: "0x5842c5532b61acf3227679a8b1bd0242a41752f2",
				chain_id: 9001,
				contract_decimals: 18,
				symbol: "WETH"
			}
		]
	},
	{
		id: "bnb",
		symbol: "WBNB",
		name: "BNB",
		image: "/logos/assets/bnb.png",
		coingecko_id: "binancecoin",
		is_stablecoin: false,
		is_wrapped: true,
		wrapped_chain_id: 56,
		contracts: [
			{
				contract_address: "0x418d75f65a02b3d53b2418fb8e1fe493759c7605",
				chain_id: 1,
				contract_decimals: 18,
				symbol: "WBNB"
			},
			{
				contract_address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
				chain_id: 56,
				contract_decimals: 18,
				symbol: "WBNB"
			},
			{
				contract_address: "0xecdcb5b88f8e3c15f95c720c51c71c9e2080525d",
				chain_id: 137,
				contract_decimals: 18,
				symbol: "WBNB"
			},
			{
				contract_address: "0x264c1383ea520f73dd837f915ef3a732e204a493",
				chain_id: 43114,
				contract_decimals: 18,
				symbol: "WBNB"
			},
			{
				contract_address: "0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454",
				chain_id: 250,
				contract_decimals: 18,
				symbol: "WBNB"
			},
			{
				contract_address: "0xca8d20f3e0144a72c6b5d576e9bd3fd8557e2b04",
				chain_id: 100,
				contract_decimals: 18,
				symbol: "WBNB"
			}
		]
	},
	{
		id: "matic",
		symbol: "WMATIC",
		name: "MATIC",
		image: "/logos/assets/matic.png",
		coingecko_id: "matic-network",
		is_stablecoin: false,
		is_wrapped: true,
		wrapped_chain_id: 137,
		contracts: [
			{
				contract_address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
				chain_id: 1,
				contract_decimals: 18,
				symbol: "MATIC"
			},
			{
				contract_address: "0xcc42724c6683b7e57334c4e856f4c9965ed682bd",
				chain_id: 56,
				contract_decimals: 18,
				symbol: "WMATIC"
			},
			{
				contract_address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
				chain_id: 137,
				contract_decimals: 18,
				symbol: "WMATIC"
			},
			{
				contract_address: "0xf2f13f0b7008ab2fa4a2418f4ccc3684e49d20eb",
				chain_id: 43114,
				contract_decimals: 18,
				symbol: "WMATIC"
			},
			{
				contract_address: "0x40df1ae6074c35047bff66675488aa2f9f6384f3",
				chain_id: 250,
				contract_decimals: 18,
				symbol: "WMATIC"
			},
			{
				contract_address: "0x7122d7661c4564b7c6cd4878b06766489a6028a2",
				chain_id: 100,
				contract_decimals: 18,
				symbol: "WMATIC"
			},
			{
				contract_address: "0x3405a1bd46b85c5c029483fbecf2f3e611026e45",
				chain_id: 1284,
				contract_decimals: 18,
				symbol: "WMATIC"
			},
			{
				contract_address: "0x682f81e57eaa716504090c3ecba8595fb54561d8",
				chain_id: 1285,
				contract_decimals: 18,
				symbol: "WMATIC"
			}
		]
	},
	{
		id: "ftm",
		symbol: "WFTM",
		name: "FTM",
		image: "/logos/assets/ftm.png",
		coingecko_id: "fantom",
		is_stablecoin: false,
		is_wrapped: true,
		wrapped_chain_id: 250,
		contracts: [
			{
				contract_address: "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
				chain_id: 1,
				contract_decimals: 18,
				symbol: "FTM"
			},
			{
				contract_address: "0xad29abb318791d579433d831ed122afeaf29dcfe",
				chain_id: 56,
				contract_decimals: 18,
				symbol: "FTM"
			},
			{
				contract_address: "0xc9c1c1c20b3658f8787cc2fd702267791f224ce1",
				chain_id: 137,
				contract_decimals: 18,
				symbol: "FTM"
			},
			{
				contract_address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
				chain_id: 250,
				contract_decimals: 18,
				symbol: "WFTM"
			}
		]
	},
	{
		id: "avax",
		symbol: "WAVAX",
		name: "AVAX",
		image: "/logos/assets/avax.png",
		coingecko_id: "avalanche-2",
		is_stablecoin: false,
		is_wrapped: true,
		wrapped_chain_id: 43114,
		contracts: [
			{
				contract_address: "0x85f138bfee4ef8e540890cfb48f620571d67eda3",
				chain_id: 1,
				contract_decimals: 18,
				symbol: "WAVAX"
			},
			{
				contract_address: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041",
				chain_id: 56,
				contract_decimals: 18,
				symbol: "AVAX"
			},
			{
				contract_address: "0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
				chain_id: 137,
				contract_decimals: 18,
				symbol: "AVAX"
			},
			{
				contract_address: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
				chain_id: 43114,
				contract_decimals: 18,
				symbol: "WAVAX"
			},
			{
				contract_address: "0x511d35c52a3c244e7b8bd92c0c297755fbd89212",
				chain_id: 250,
				contract_decimals: 18,
				symbol: "AVAX"
			},
			{
				contract_address: "0x511d35c52a3c244e7b8bd92c0c297755fbd89212",
				chain_id: 1284,
				contract_decimals: 18,
				symbol: "AVAX"
			},
			{
				contract_address: "0x14a0243c333a5b238143068dc3a7323ba4c30ecb",
				chain_id: 1285,
				contract_decimals: 18,
				symbol: "AVAX"
			}
		]
	}
];

var testnet_chains = [
	{
		id: "rinkeby",
		chain_id: 4,
		domain_id: "1111",
		name: "Rinkeby",
		short_name: "RIN",
		image: "/logos/chains/rinkeby.png",
		website: "https://rinkeby.io",
		coingecko_id: "ethereum",
		color: "#c0c2c3",
		disabled: false,
		provider_params: {
			chainId: "0x4",
			chainName: "Ethereum Rinkeby",
			rpcUrls: [
				"https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
			],
			nativeCurrency: {
				name: "Rinkeby Ether",
				symbol: "RIN",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://rinkeby.etherscan.io"
			]
		},
		gas_limit: {
			opensea: "732000",
			uniswapv2: "400000",
			uniswapv3: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-rinkeby"
		],
		fibswap: "0xbaa68DAA487c2BD0b1C49530ac2477dE07516917",
		multicall: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
		explorer: {
			name: "Etherscan",
			url: "https://rinkeby.etherscan.io",
			icon: "/logos/explorers/etherscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	},
	{
		id: "kovan",
		chain_id: 42,
		domain_id: "2221",
		name: "Kovan",
		short_name: "KOV",
		image: "/logos/chains/kovan.png",
		website: "https://kovan-testnet.github.io/website",
		coingecko_id: "ethereum",
		color: "#c0c2c3",
		disabled: false,
		provider_params: {
			chainId: "0x2a",
			chainName: "Ethereum Kovan",
			rpcUrls: [
				"https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
			],
			nativeCurrency: {
				name: "Kovan Ether",
				symbol: "KOV",
				decimals: 18
			},
			blockExplorerUrls: [
				"https://kovan.etherscan.io"
			]
		},
		gas_limit: {
			opensea: "732000",
			uniswapv2: "400000",
			uniswapv3: "400000"
		},
		subgraph: [
			"https://api.thegraph.com/subgraphs/name/fibswapdex/fibswap-runtime-v1-kovan"
		],
		fibswap: "0x96078BbBB1dF93ec5fc27a46b996D0B46DF536F8",
		multicall: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
		explorer: {
			name: "Etherscan",
			url: "https://kovan.etherscan.io",
			icon: "/logos/explorers/etherscan.png",
			block_path: "/block/{block}",
			address_path: "/address/{address}",
			contract_path: "/token/{address}",
			contract_0_path: "/address/{address}",
			transaction_path: "/tx/{tx}"
		}
	}
];

var testnet_assets = [
	{
		id: "usdt",
		symbol: "USDT",
		name: "USDT",
		is_stablecoin: false,
		contracts: [
			{
				contract_address: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
				chain_id: 4,
				contract_decimals: 6
			},
			{
				contract_address: "0x07de306ff27a2b630b1141956844eb1552b956b5",
				chain_id: 42,
				contract_decimals: 6
			}
		]
	},
	{
		id: "weth",
		symbol: "WETH",
		name: "WETH",
		is_stablecoin: false,
		is_wrapped: true,
		wrapped_chain_id: 1,
		contracts: [
			{
				contract_address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
				chain_id: 4,
				contract_decimals: 18
			},
			{
				contract_address: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
				chain_id: 42,
				contract_decimals: 18
			}
		]
	}
];

var _a;
process.env.REACT_APP_PRODUCTION || "dev";
var TOKENS_URL = "https://api2.fibswap.io/api/token";
var BACKEND_URL = "https://agent1.fibswap.io";
var BIG_ZERO = BigNumber.from(0);
var ZERO_ADDRESS = ethers.constants.AddressZero;
var FEE_ESTIMATE_COOLDOWN = 200; // 200s
var SWAP_FEE = 2.5; // 2.5%
var ROUTER_ADDRESS = process.env.REACT_APP_ROUTER_ADDRESS;
var NETWORK = (process.env.REACT_APP_NETWORK || "testnet");
var ENVIRONMENT = (process.env.REACT_APP_ENVIRONMENT || "production");
var ALL_CHAINS = ((_a = ((NETWORK === "testnet" ? testnet_chains : mainnet_chains))) === null || _a === void 0 ? void 0 : _a.filter(function (c) { return !(c === null || c === void 0 ? void 0 : c.disabled); })) || [];
var ALL_LOCAL_ASSETS = (NETWORK === "testnet" ? testnet_assets : mainnet_assets) || [];
var LOCAL_ASSETS_BY_CHAINS = ALL_LOCAL_ASSETS.reduce(function (r, a) {
    var e_1, _a;
    try {
        for (var _b = __values(a.contracts), _c = _b.next(); !_c.done; _c = _b.next()) {
            var c = _c.value;
            r[c.chain_id] = __spreadArray(__spreadArray([], __read((r[c.chain_id] || [])), false), [__assign(__assign({}, c), { symbol: c.symbol || a.symbol })], false);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return r;
}, {});
Object.fromEntries(new Map(Object.entries(LOCAL_ASSETS_BY_CHAINS).map(function (_a) {
    var _b = __read(_a, 2), chain_id = _b[0], contracts = _b[1];
    return [chain_id, contracts.map(function (c) { return c.contract_address; })];
})));
var PROVIDERS_BY_CHAINS = mainnet_chains.reduce(function (r, a) {
    r[a.chain_id] = __spreadArray(__spreadArray([], __read((r[a.chain_id] || [])), false), __read(a.provider_params.rpcUrls), false);
    return r;
}, {});
var CHAIN_CONFIG = Object.fromEntries(new Map(ALL_CHAINS.map(function (c) {
    return [c.chain_id, c];
})));
var isSupportedChain = function (chainId) {
    return ALL_CHAINS.map(function (c) { return c.chain_id; }).includes(chainId);
};
var SWAP_ROUTER_MAP = new Map([
    [1, ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "0xE592427A0AEce92De3Edee1F18E0157C05861564"]],
    [4, ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "0xE592427A0AEce92De3Edee1F18E0157C05861564"]],
    [42, ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "0xE592427A0AEce92De3Edee1F18E0157C05861564"]],
    [
        56,
        [
            "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
        ],
    ],
    [
        137,
        [
            "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
            "0xE592427A0AEce92De3Edee1F18E0157C05861564",
            "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607",
        ],
    ],
    [250, ["0xF491e7B69E4244ad4002BC14e878a34207E38c29", "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52"]],
    [42161, ["0xE592427A0AEce92De3Edee1F18E0157C05861564"]],
    [43114, ["0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106", "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"]],
    [100, ["0xE43e60736b1cb4a75ad25240E2f9a62Bff65c0C0"]], // DXswapRouter
]);
JSON.parse(JSON.stringify(blackList));

function IconImage(_a) {
    var src = _a.src, className = _a.className, alt = _a.alt, height = _a.height, width = _a.width;
    return (jsx(LazyLoadImage, { alt: alt, src: src, effect: "blur", width: width, height: height, className: className, onError: function (e) {
            var target = e.target;
            target.onerror = null;
            target.src = "/tokens/unknown.svg";
        } }));
}

var FAST_INTERVAL = 20000;
var SLOW_INTERVAL = 60000;
var RefreshContext = React.createContext({ slow: 0, fast: 0 });
// Check if the tab is active in the user browser
var useIsBrowserTabActive = function () {
    var isBrowserTabActiveRef = useRef(true);
    useEffect(function () {
        var onVisibilityChange = function () {
            isBrowserTabActiveRef.current = !document.hidden;
        };
        window.addEventListener("visibilitychange", onVisibilityChange);
        return function () {
            window.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);
    return isBrowserTabActiveRef;
};
// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
var RefreshContextProvider = function (_a) {
    var children = _a.children;
    var _b = __read(useState(0), 2), slow = _b[0], setSlow = _b[1];
    var _c = __read(useState(0), 2), fast = _c[0], setFast = _c[1];
    var isBrowserTabActiveRef = useIsBrowserTabActive();
    useEffect(function () {
        var interval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (isBrowserTabActiveRef.current) {
                    setFast(function (prev) { return prev + 1; });
                }
                return [2 /*return*/];
            });
        }); }, FAST_INTERVAL);
        return function () { return clearInterval(interval); };
    }, [isBrowserTabActiveRef]);
    useEffect(function () {
        var interval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (isBrowserTabActiveRef.current) {
                    setSlow(function (prev) { return prev + 1; });
                }
                return [2 /*return*/];
            });
        }); }, SLOW_INTERVAL);
        return function () { return clearInterval(interval); };
    }, [isBrowserTabActiveRef]);
    return jsx(RefreshContext.Provider, __assign({ value: { slow: slow, fast: fast } }, { children: children }));
};

var useRefresh = function () {
    var _a = useContext(RefreshContext), fast = _a.fast, slow = _a.slow;
    return { fastRefresh: fast, slowRefresh: slow };
};

var writeToCache = function (key, data) { return localStorage.setItem(key, JSON.stringify(data)); };
var readFromCache = function (key) { return JSON.parse(localStorage.getItem(key)) || null; };

var FetchStatus$3;
(function (FetchStatus) {
    FetchStatus["NOT_FETCHED"] = "not-fetched";
    FetchStatus["SUCCESS"] = "success";
    FetchStatus["FAILED"] = "failed";
})(FetchStatus$3 || (FetchStatus$3 = {}));
var FIBSWAP_TOKENS_KEY = "fibswap-tokens";
var defaultState$1 = {
    tokens: {},
    fetchStatus: FetchStatus$3.NOT_FETCHED,
};
var TokensContext = React.createContext(defaultState$1);
var TokensContextProvider = function (_a) {
    var defaultTokens = _a.defaultTokens, children = _a.children;
    var NOT_FETCHED = FetchStatus$3.NOT_FETCHED, SUCCESS = FetchStatus$3.SUCCESS, FAILED = FetchStatus$3.FAILED;
    var slowRefresh = useRefresh().slowRefresh;
    var _b = __read(useState({
        tokens: readFromCache(FIBSWAP_TOKENS_KEY),
        fetchStatus: NOT_FETCHED,
    }), 2), tokensState = _b[0], setTokensState = _b[1];
    useEffect(function () {
        var fetchTokens = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    axios
                        .get(TOKENS_URL)
                        .then(function (res) {
                        if (res.data) {
                            writeToCache(FIBSWAP_TOKENS_KEY, res.data);
                            setTokensState({ tokens: res.data, fetchStatus: SUCCESS });
                        }
                    })
                        .catch(function (e) {
                        console.log("fetching tokens error", e);
                        setTokensState(function (prev) { return (__assign(__assign({}, prev), { fetchStatus: FAILED })); });
                    });
                }
                catch (e) {
                    console.error(e);
                    setTokensState(function (prev) { return (__assign(__assign({}, prev), { fetchStatus: FAILED })); });
                }
                return [2 /*return*/];
            });
        }); };
        if (defaultTokens && defaultTokens.length) {
            setTokensState({
                tokens: defaultTokens,
                fetchStatus: SUCCESS,
            });
        }
        else {
            fetchTokens();
        }
    }, [slowRefresh, setTokensState, defaultTokens, SUCCESS, FAILED]);
    return jsx(TokensContext.Provider, __assign({ value: tokensState }, { children: children }));
};

var useTokens = function () {
    var _a = useContext(TokensContext), tokens = _a.tokens, fetchStatus = _a.fetchStatus;
    return {
        tokens: tokens,
        fetchStatus: fetchStatus,
    };
};

function TokenSelect(_a) {
    var chainId = _a.chainId, assetId = _a.assetId; _a.onSelect; _a.onClick; var className = _a.className; _a.children;
    var allTokens = useTokens().tokens;
    var _b = __read(useState(null), 2), selectedItem = _b[0], setSelectedItem = _b[1];
    useEffect(function () {
        if (chainId && allTokens) {
            if (allTokens === null || allTokens === void 0 ? void 0 : allTokens[chainId]) {
                setSelectedItem(allTokens[chainId].find(function (token) { return token.address.toLowerCase() === (assetId === null || assetId === void 0 ? void 0 : assetId.toLowerCase()); }));
                return;
            }
        }
        setSelectedItem(null);
    }, [chainId, assetId]);
    return (jsx(Fragment, { children: jsxs("div", __assign({ className: "select_control temp  d-flex align-items-center justify-content-between ".concat(className) }, { children: [jsx("div", __assign({ className: "option d-flex align-items-center me-1" }, { children: selectedItem ? (jsxs(Fragment, { children: [jsx("div", __assign({ className: "me-2 select_control_icon flex-grow-1" }, { children: jsx(IconImage, { src: selectedItem.image, className: "w-full", alt: selectedItem.symbol, width: 22, height: 22 }) })), jsx("div", { children: jsx("p", __assign({ className: "option-label mb-0 " }, { children: selectedItem.symbol })) })] })) : (jsx("div", { children: jsx("p", __assign({ className: "option-label mb-0 " }, { children: "Select" })) })) })), jsx(FiChevronDown, {})] })) }));
}

function parseChainId(chainId) {
    return Number.parseInt(chainId, 16);
}
var JsonRpcConnector = /** @class */ (function (_super) {
    __extends(JsonRpcConnector, _super);
    function JsonRpcConnector(actions, customProvider) {
        var _this = _super.call(this, actions) || this;
        _this.customProvider = customProvider;
        customProvider
            .on("connect", function (_a) {
            var chainId = _a.chainId;
            _this.actions.update({ chainId: parseChainId(chainId) });
        })
            .on("disconnect", function (error) {
            var _a;
            (_a = _this.onError) === null || _a === void 0 ? void 0 : _a.call(_this, error);
            _this.actions.resetState();
        })
            .on("chainChanged", function (chainId) {
            _this.actions.update({ chainId: parseChainId(chainId) });
        })
            .on("accountsChanged", function (accounts) {
            _this.actions.update({ accounts: accounts });
        });
        return _this;
    }
    JsonRpcConnector.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, chainId, accounts, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.actions.startActivation();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this.customProvider.getNetwork(),
                                this.customProvider.listAccounts(),
                            ])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), chainId = _a[0].chainId, accounts = _a[1];
                        this.actions.update({ chainId: chainId, accounts: accounts });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.actions.resetState();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return JsonRpcConnector;
}(Connector));

var connections = [];
var defaultChainIdAtom = atom(1);
function toWeb3Connection(_a) {
    var _b = __read(_a, 2), connector = _b[0], hooks = _b[1];
    return [connector, hooks];
}
function getConnectorName(connector) {
    if (connector instanceof MetaMask)
        return "MetaMask";
    if (connector instanceof WalletConnect)
        return "WalletConnect";
    if (connector instanceof Network)
        return "Network";
    if (connector instanceof JsonRpcConnector)
        return "JsonRpcConnector";
    if (connector instanceof EIP1193)
        return "EIP1193";
    return "Unknown";
}
function getConnectionFromProvider(onError, provider) {
    if (!provider)
        return;
    if (JsonRpcProvider.isProvider(provider)) {
        return toWeb3Connection(initializeConnector(function (actions) { return new JsonRpcConnector(actions, provider); }));
    }
    else if (JsonRpcProvider.isProvider(provider.provider)) {
        throw new Error("Eip1193Bridge is experimental: pass your ethers Provider directly");
    }
    else {
        return toWeb3Connection(initializeConnector(function (actions) { return new EIP1193({ actions: actions, provider: provider, onError: onError }); }));
    }
}
function getConnectionFromWalletConnect(useDefault, jsonRpcUrlMap, defaultChainId, onError) {
    return toWeb3Connection(initializeConnector(function (actions) {
        return new WalletConnect({
            actions: actions,
            options: {
                rpc: jsonRpcUrlMap,
                qrcode: useDefault,
            },
            onError: onError,
            defaultChainId: defaultChainId,
        });
    }));
}
function ActiveWeb3Provider(_a) {
    var provider = _a.provider, jsonRpcUrlMap = _a.jsonRpcUrlMap, propsDefaultChainId = _a.defaultChainId, children = _a.children;
    var onError = console.error;
    var _b = __read(useAtom(defaultChainIdAtom), 2), defaultChainId = _b[0], setDefaultChainId = _b[1];
    useEffect(function () {
        if (propsDefaultChainId !== defaultChainId)
            setDefaultChainId(propsDefaultChainId);
    }, [propsDefaultChainId, defaultChainId, setDefaultChainId]);
    var integratorConnection = useMemo(function () { return getConnectionFromProvider(onError, provider); }, [onError, provider]);
    var metaMaskConnection = useMemo(function () { return toWeb3Connection(initializeConnector(function (actions) { return new MetaMask({ actions: actions, onError: onError }); })); }, [onError]);
    var walletConnectConnectionQR = useMemo(function () { return getConnectionFromWalletConnect(false, jsonRpcUrlMap, defaultChainId, onError); }, [jsonRpcUrlMap, defaultChainId, onError]); // WC via tile QR code scan
    var walletConnectConnectionPopup = useMemo(function () { return getConnectionFromWalletConnect(true, jsonRpcUrlMap, defaultChainId, onError); }, [jsonRpcUrlMap, defaultChainId, onError]); // WC via built-in popup
    var networkConnection = useMemo(function () {
        return toWeb3Connection(initializeConnector(function (actions) { return new Network({ actions: actions, urlMap: jsonRpcUrlMap, defaultChainId: defaultChainId }); }));
    }, [jsonRpcUrlMap, defaultChainId]);
    connections = [metaMaskConnection, walletConnectConnectionQR, walletConnectConnectionPopup, networkConnection];
    if (integratorConnection)
        connections = __spreadArray([integratorConnection], __read(connections), false);
    var key = "".concat(connections.length, "+").concat(Object.entries(jsonRpcUrlMap), "+").concat(propsDefaultChainId, "+").concat(defaultChainId);
    return (jsx(Web3ReactProvider, __assign({ connectors: connections }, { children: children }), key));
}

var ConnectorNames$1;
(function (ConnectorNames) {
    ConnectorNames["Injected"] = "injected";
    ConnectorNames["WalletConnect"] = "walletconnect";
})(ConnectorNames$1 || (ConnectorNames$1 = {}));
var connectors = [
    {
        title: "Metamask",
        icon: Metamask,
        connectorId: ConnectorNames$1.Injected,
    },
    {
        title: "WalletConnect",
        icon: WalletConnect$1,
        connectorId: ConnectorNames$1.WalletConnect,
    },
];

var onError = function (error) { return console.error("web3 error:", error); };
var QRCodeWrapper = styled.div(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  height: 110px;\n  width: 110px;\n  path {\n    /* Maximize contrast: transparent in light theme, otherwise hard-coded to light theme. */\n    fill: \"#00000000\";\n  }\n"], ["\n  height: 110px;\n  width: 110px;\n  path {\n    /* Maximize contrast: transparent in light theme, otherwise hard-coded to light theme. */\n    fill: \"#00000000\";\n  }\n"])));
function toQrCodeSvg(qrUri) {
    return QRCode.toString(qrUri, {
        // Leave a margin to increase contrast in dark mode.
        margin: 1,
        // Use 55*2=110 for the width to prevent distortion. The generated viewbox is "0 0 55 55".
        width: 110,
        type: "svg",
    });
}
function WalletConnectButton(_a) {
    var _this = this;
    var walletName = _a.walletName, logoSrc = _a.logoSrc, wcTileConnection = _a.connection, onClick = _a.onClick;
    var _b = __read(wcTileConnection, 1), walletConnect = _b[0];
    var defaultChainId = useAtomValue(defaultChainIdAtom);
    var _c = __read(useState(""), 2), qrUri = _c[0], setQrUri = _c[1];
    var _d = __read(useState(""), 2), qrCodeSvg = _d[0], setQrCodeSvg = _d[1];
    useEffect(function () {
        var stale = false;
        if (qrUri) {
            toQrCodeSvg(qrUri).then(function (qrCodeSvg) {
                if (stale)
                    return;
                setQrCodeSvg(qrCodeSvg);
            });
        }
        else {
            walletConnect.activate(defaultChainId).catch(function (e) {
                if (stale)
                    return;
                onError === null || onError === void 0 ? void 0 : onError(e);
            });
        }
        return function () {
            stale = true;
        };
    }, [qrUri, walletConnect, defaultChainId]);
    useEffect(function () {
        var _a, _b;
        var disconnectListener = function (err, _) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err)
                    onError === null || onError === void 0 ? void 0 : onError(err);
                // Clear saved QR URI after disconnection
                setQrUri(undefined);
                walletConnect.deactivate();
                return [2 /*return*/];
            });
        }); };
        (_a = walletConnect.provider) === null || _a === void 0 ? void 0 : _a.connector.on("disconnect", disconnectListener);
        // Need both URI event listeners
        walletConnect.events.on(URI_AVAILABLE, function (uri) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (uri) {
                    setQrUri(uri);
                }
                return [2 /*return*/];
            });
        }); });
        var uriListener = function (err, payload) { return __awaiter(_this, void 0, void 0, function () {
            var uri;
            return __generator(this, function (_a) {
                if (err)
                    onError === null || onError === void 0 ? void 0 : onError(err);
                uri = payload.params[0];
                if (uri) {
                    setQrUri(uri);
                }
                return [2 /*return*/];
            });
        }); };
        (_b = walletConnect.provider) === null || _b === void 0 ? void 0 : _b.connector.on("display_uri", uriListener);
        return function () {
            var _a, _b;
            walletConnect.events.off(URI_AVAILABLE);
            (_b = (_a = walletConnect.provider) === null || _a === void 0 ? void 0 : _a.connector) === null || _b === void 0 ? void 0 : _b.off("display_uri", uriListener);
        };
    });
    return (jsxs("div", __assign({ className: "wallet-item", onClick: onClick }, { children: [jsxs("p", __assign({ className: "d-flex align-items-center justify-content-between white" }, { children: [jsx("span", { children: walletName }), jsx("img", { src: logoSrc, width: "30" })] })), jsx(QRCodeWrapper, { dangerouslySetInnerHTML: { __html: qrCodeSvg } })] })));
}
function MetaMaskButton(_a) {
    var walletName = _a.walletName, logoSrc = _a.logoSrc, onClick = _a.onClick;
    return (jsx("div", __assign({ className: "wallet-item", onClick: onClick }, { children: jsxs("p", __assign({ className: "d-flex align-items-center justify-content-between white" }, { children: [jsx("span", { children: walletName }), jsx("img", { src: logoSrc, width: "30" })] })) })));
}
var ConnectWalletModal = function (props) {
    var _a = __read(connections[0], 1), firstConnector = _a[0];
    var integratorProvidedConnector = firstConnector instanceof EIP1193 || firstConnector instanceof Url;
    var _b = __read(integratorProvidedConnector
        ? connections.slice(1)
        : connections, 3), mmConnection = _b[0], wcTileConnection = _b[1], wcPopupConnection = _b[2];
    var defaultChainId = useAtomValue(defaultChainIdAtom);
    var activateWalletConnectPopup = useCallback(function () {
        var _a;
        var _b = __read(wcPopupConnection, 1), walletConnectPopup = _b[0];
        (_a = walletConnectPopup.activate(defaultChainId)) === null || _a === void 0 ? void 0 : _a.catch(onError).then(function () {
            props.onHide();
        });
    }, [wcPopupConnection, defaultChainId]);
    var activateMetaMask = useCallback(function () {
        var _a;
        var _b = __read(mmConnection, 1), metamask = _b[0];
        (_a = metamask.activate(defaultChainId)) === null || _a === void 0 ? void 0 : _a.catch(onError).then(function () {
            props.onHide();
        });
    }, [mmConnection, defaultChainId]);
    return (jsx("div", __assign({ className: "select_options" }, { children: jsxs("div", __assign({ className: "wallet-items" }, { children: [jsx(WalletConnectButton, { walletName: "WalletConnect", logoSrc: connectors[1].icon, connection: wcTileConnection, onClick: activateWalletConnectPopup }), jsx(MetaMaskButton, { walletName: "MetaMask", logoSrc: connectors[0].icon, onClick: activateMetaMask })] })) })));
};
var templateObject_1$4;

var ConnectorNames;
(function (ConnectorNames) {
    ConnectorNames["Injected"] = "injected";
    ConnectorNames["WalletConnect"] = "walletconnect";
    ConnectorNames["Clover"] = "clover";
    ConnectorNames["WalletLink"] = "walletlink";
})(ConnectorNames || (ConnectorNames = {}));
var ActiveWidgetModal;
(function (ActiveWidgetModal) {
    ActiveWidgetModal["Main"] = "main";
    ActiveWidgetModal["Settings"] = "settings";
    ActiveWidgetModal["TokenSelect"] = "choosetoken";
    ActiveWidgetModal["PaymentStatus"] = "paystatus";
    ActiveWidgetModal["PaymentReview"] = "review";
    ActiveWidgetModal["ConnectWallet"] = "connectwallet";
})(ActiveWidgetModal || (ActiveWidgetModal = {}));
var Protocols;
(function (Protocols) {
    Protocols["Opensea"] = "opensea";
    Protocols["UniswapV2"] = "uniswapv2";
    Protocols["UniswapV3"] = "uniswapv3";
    Protocols["Airnfts"] = "airnfts";
})(Protocols || (Protocols = {}));

var equals_ignore_case = function (a, b) { return (!a && !b) || (a === null || a === void 0 ? void 0 : a.toLowerCase()) === (b === null || b === void 0 ? void 0 : b.toLowerCase()); };

var getChainInfo = function (chainId) {
    return __assign({}, CHAIN_CONFIG === null || CHAIN_CONFIG === void 0 ? void 0 : CHAIN_CONFIG[chainId]);
};
var isValidChainId = function (chainId) {
    return !!(CHAIN_CONFIG === null || CHAIN_CONFIG === void 0 ? void 0 : CHAIN_CONFIG[chainId]);
};
var getGasLimit = function (chainId, protocol) {
    var _a;
    return parseFloat(((_a = CHAIN_CONFIG === null || CHAIN_CONFIG === void 0 ? void 0 : CHAIN_CONFIG[chainId]) === null || _a === void 0 ? void 0 : _a.gas_limit[protocol]) || "200000");
};
var getTokenInfoFromAddr = function (tokens, chainId, address) {
    var _a;
    return (_a = tokens === null || tokens === void 0 ? void 0 : tokens[chainId]) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.address.toLowerCase() === (address === null || address === void 0 ? void 0 : address.toLowerCase()); });
};
var getTokenDecimalFromAddr = function (tokens, chainId, address) {
    var tokenInfo = getTokenInfoFromAddr(tokens, chainId, address);
    if (tokenInfo) {
        return tokenInfo.decimals;
    }
    return 18;
};
var getWrappedToken = function (chainId, wrappedChain) {
    var _a, _b, _c;
    if (wrappedChain === void 0) { wrappedChain = undefined; }
    return (((_c = (_b = (_a = ALL_LOCAL_ASSETS.find(function (a) { return a.is_wrapped && a.wrapped_chain_id === (wrappedChain ? wrappedChain : chainId); })) === null || _a === void 0 ? void 0 : _a.contracts) === null || _b === void 0 ? void 0 : _b.find(function (c) { return c.chain_id === chainId; })) === null || _c === void 0 ? void 0 : _c.contract_address) || undefined);
};
var getLocalAsset = function (chainId, idOrAddress) {
    var e_4, _a;
    var _b, _c;
    var assetFromId = (_c = (_b = ALL_LOCAL_ASSETS.find(function (a) { return a.id === idOrAddress; })) === null || _b === void 0 ? void 0 : _b.contracts) === null || _c === void 0 ? void 0 : _c.find(function (c) { return c.chain_id === chainId; });
    if (assetFromId)
        return __assign({ id: idOrAddress }, assetFromId);
    try {
        for (var ALL_LOCAL_ASSETS_1 = __values(ALL_LOCAL_ASSETS), ALL_LOCAL_ASSETS_1_1 = ALL_LOCAL_ASSETS_1.next(); !ALL_LOCAL_ASSETS_1_1.done; ALL_LOCAL_ASSETS_1_1 = ALL_LOCAL_ASSETS_1.next()) {
            var local = ALL_LOCAL_ASSETS_1_1.value;
            var asset = local.contracts.find(function (c) { var _a; return c.chain_id === chainId && ((_a = c.contract_address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === idOrAddress.toLowerCase(); });
            if (asset)
                return __assign(__assign({}, asset), { id: local.id });
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (ALL_LOCAL_ASSETS_1_1 && !ALL_LOCAL_ASSETS_1_1.done && (_a = ALL_LOCAL_ASSETS_1.return)) _a.call(ALL_LOCAL_ASSETS_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return undefined;
};
var isSupportedLocalToken = function (chainId, token) {
    var e_5, _a;
    var _b, _c, _d;
    if (!isSupportedChain(chainId) || !isAddress(token)) {
        return false;
    }
    try {
        for (var ALL_LOCAL_ASSETS_2 = __values(ALL_LOCAL_ASSETS), ALL_LOCAL_ASSETS_2_1 = ALL_LOCAL_ASSETS_2.next(); !ALL_LOCAL_ASSETS_2_1.done; ALL_LOCAL_ASSETS_2_1 = ALL_LOCAL_ASSETS_2.next()) {
            var asset = ALL_LOCAL_ASSETS_2_1.value;
            if (((_d = (_c = (_b = asset.contracts) === null || _b === void 0 ? void 0 : _b.find(function (c) { return c.chain_id === chainId; })) === null || _c === void 0 ? void 0 : _c.contract_address) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === (token === null || token === void 0 ? void 0 : token.toLowerCase()))
                return true;
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (ALL_LOCAL_ASSETS_2_1 && !ALL_LOCAL_ASSETS_2_1.done && (_a = ALL_LOCAL_ASSETS_2.return)) _a.call(ALL_LOCAL_ASSETS_2);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return false;
};

var InitStatus;
(function (InitStatus) {
    InitStatus["NOT_INITED"] = "not-inited";
    InitStatus["SUCCESS"] = "success";
    InitStatus["FAILED"] = "failed";
    InitStatus["LOADING"] = "loading";
})(InitStatus || (InitStatus = {}));
var useNxtpSdk = function (trigger) {
    var _a = __read(useState(), 2), sdk = _a[0], setSdk = _a[1];
    var _b = __read(useState(), 2), assetBalances = _b[0], setAssetBalances = _b[1];
    var _c = __read(useState([]), 2), swapTransfers = _c[0], setSwapTransfers = _c[1];
    var _d = __read(useState([]), 2), paymentTransfers = _d[0], setPaymentTransfers = _d[1];
    var _e = useWeb3React(), account = _e.account, provider = _e.provider;
    useEffect(function () {
        var init = function () { return __awaiter(void 0, void 0, void 0, function () {
            var chains_config, _loop_1, i, temp_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!ALL_CHAINS.length) return [3 /*break*/, 2];
                        chains_config = {};
                        _loop_1 = function (i) {
                            var chain_data = ALL_CHAINS[i];
                            if (!(chain_data === null || chain_data === void 0 ? void 0 : chain_data.disabled)) {
                                var chain_id_1 = chain_data === null || chain_data === void 0 ? void 0 : chain_data.chain_id;
                                var domain_id = String(chain_data === null || chain_data === void 0 ? void 0 : chain_data.chain_id);
                                var rpc_urls = ((_b = (_a = chain_data === null || chain_data === void 0 ? void 0 : chain_data.provider_params) === null || _a === void 0 ? void 0 : _a.rpcUrls) === null || _b === void 0 ? void 0 : _b.filter(function (url) { return url; })) || [];
                                if (domain_id) {
                                    chains_config[domain_id] = {
                                        providers: rpc_urls,
                                        assets: ALL_LOCAL_ASSETS.filter(function (a) { var _a; return ((_a = a === null || a === void 0 ? void 0 : a.contracts) === null || _a === void 0 ? void 0 : _a.findIndex(function (c) { return (c === null || c === void 0 ? void 0 : c.chain_id) === chain_id_1; })) > -1; }).map(function (a) {
                                            var contract = a.contracts.find(function (c) { return (c === null || c === void 0 ? void 0 : c.chain_id) === chain_id_1; });
                                            var name = contract.symbol || a.symbol || a.name;
                                            var address = contract.contract_address;
                                            return { name: name, address: address };
                                        }),
                                    };
                                }
                            }
                        };
                        for (i = 0; i < ALL_CHAINS.length; i++) {
                            _loop_1(i);
                        }
                        setSdk(function (prev) { return (__assign(__assign({}, prev), { status: InitStatus.LOADING })); });
                        return [4 /*yield*/, create({
                                chains: chains_config,
                                logLevel: "info",
                                network: NETWORK,
                                environment: ENVIRONMENT,
                                backendUrl: BACKEND_URL,
                            })];
                    case 1:
                        temp_1 = _c.sent();
                        setSdk(function (prev) { return (__assign(__assign(__assign({}, prev), temp_1), { status: InitStatus.SUCCESS })); });
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        init();
    }, []);
    // sdk
    var updateSignerAddress = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(sdk && account)) return [3 /*break*/, 5];
                    if (!sdk.nxtpSdkBase) return [3 /*break*/, 2];
                    return [4 /*yield*/, sdk.nxtpSdkBase.changeSignerAddress(account)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!sdk.nxtpSdkRouter) return [3 /*break*/, 4];
                    return [4 /*yield*/, sdk.nxtpSdkRouter.changeSignerAddress(account)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    setSdk(function (prev) { return (__assign(__assign({}, prev), sdk)); });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        updateSignerAddress();
    }, [provider, account]);
    useEffect(function () {
        var update = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (sdk && sdk.nxtpSdkBase && !sdk.nxtpSdkBase.config.signerAddress && account) {
                    updateSignerAddress();
                }
                return [2 /*return*/];
            });
        }); };
        update();
    }, [sdk]);
    // assets balances
    useEffect(function () {
        var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, allTransfers, allSwapTransfers_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(sdk && ALL_CHAINS)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, sdk.nxtpSdkUtils.getRoutersData()];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            data = _.groupBy(response.map(function (l) {
                                var chain_data = ALL_CHAINS.find(function (c) { return +(c === null || c === void 0 ? void 0 : c.chain_id) === +(l === null || l === void 0 ? void 0 : l.chain_id); });
                                var asset_data = ALL_LOCAL_ASSETS.find(function (a) {
                                    var _a;
                                    return ((_a = a === null || a === void 0 ? void 0 : a.contracts) === null || _a === void 0 ? void 0 : _a.findIndex(function (c) { return (c === null || c === void 0 ? void 0 : c.chain_id) === (chain_data === null || chain_data === void 0 ? void 0 : chain_data.chain_id) && equals_ignore_case(c === null || c === void 0 ? void 0 : c.contract_address, l === null || l === void 0 ? void 0 : l.local); })) > -1;
                                });
                                return __assign(__assign({}, l), { chain_id: chain_data === null || chain_data === void 0 ? void 0 : chain_data.chain_id, chain_data: chain_data, contract_address: l === null || l === void 0 ? void 0 : l.local, asset_data: asset_data, amount: BigInt(Number(l === null || l === void 0 ? void 0 : l.balance) || 0).toString() });
                            }), "chain_id");
                            setAssetBalances(data);
                        }
                        return [4 /*yield*/, sdk.nxtpSdkUtils.getTransfersByUser({
                                userAddress: account,
                                //status?: XTransferStatus;
                                range: { limit: 1000, offset: 0 },
                            })];
                    case 3:
                        allTransfers = _a.sent();
                        allTransfers = allTransfers
                            .sort(function (a, b) { return b.xcall_timestamp - a.xcall_timestamp; })
                            .map(function (tx) {
                            return __assign(__assign({}, tx), { destination_transacting_asset: equals_ignore_case(getWrappedToken(parseInt(tx.destination_chain)), tx.destination_transacting_asset)
                                    ? ZERO_ADDRESS
                                    : tx.destination_transacting_asset, origin_transacting_asset: equals_ignore_case(getWrappedToken(parseInt(tx.origin_chain)), tx.origin_transacting_asset)
                                    ? ZERO_ADDRESS
                                    : tx.origin_transacting_asset });
                        });
                        allSwapTransfers_1 = allTransfers.filter(function (tx) {
                            return SWAP_ROUTER_MAP.get(parseInt(tx.destination_chain))
                                .map(function (address) { return address.toLowerCase(); })
                                .includes(tx.destination_to.toLowerCase());
                        });
                        setSwapTransfers(allSwapTransfers_1 || []);
                        setPaymentTransfers(allTransfers.filter(function (tx) { return !allSwapTransfers_1.map(function (swap) { return swap.xcall_transaction_hash; }).includes(tx.xcall_transaction_hash); }));
                        return [3 /*break*/, 5];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        getData();
        var interval = setInterval(function () { return getData(); }, 1 * 60 * 1000);
        return function () {
            clearInterval(interval);
        };
    }, [sdk, account, trigger]);
    return {
        sdk: sdk,
        assetBalances: assetBalances,
        swapTransfers: swapTransfers,
        paymentTransfers: paymentTransfers,
    };
};

var useChainProviders = function () {
    var _a = __read(useState({}), 2), chainProviders = _a[0], setChainProviders = _a[1];
    useEffect(function () {
        var tempProviders = {};
        Object.entries(CHAIN_CONFIG).forEach(function (_a) {
            var _b = __read(_a, 2), chainId = _b[0], _c = _b[1], provider_params = _c.provider_params, multicall = _c.multicall, coingecko_id = _c.coingecko_id, coingecko_chain_id = _c.coingecko_chain_id;
            tempProviders[parseInt(chainId)] = {
                provider: new providers.FallbackProvider(provider_params.rpcUrls.map(function (p) { return new providers.JsonRpcProvider(p, parseInt(chainId)); })),
                multicall: multicall,
                coingecko_id: coingecko_id,
                coingecko_chain_id: coingecko_chain_id,
            };
        });
        setChainProviders(tempProviders);
    }, []);
    return { chainProviders: chainProviders };
};

var FetchStatus$2;
(function (FetchStatus) {
    FetchStatus["NOT_FETCHED"] = "not-fetched";
    FetchStatus["SUCCESS"] = "success";
    FetchStatus["FAILED"] = "failed";
})(FetchStatus$2 || (FetchStatus$2 = {}));
var defaultState = {
    nativeTokenPrices: {},
    fetchStatus: FetchStatus$2.NOT_FETCHED,
};
var TokenPriceContext = React.createContext(defaultState);
var TokenPriceContextProvider = function (_a) {
    var children = _a.children;
    var NOT_FETCHED = FetchStatus$2.NOT_FETCHED, SUCCESS = FetchStatus$2.SUCCESS, FAILED = FetchStatus$2.FAILED;
    var chainProviders = useChainProviders().chainProviders;
    var slowRefresh = useRefresh().slowRefresh;
    var _b = __read(useState({
        nativeTokenPrices: {},
        fetchStatus: NOT_FETCHED,
    }), 2), priceState = _b[0], setPriceState = _b[1];
    useEffect(function () {
        var fetchNativePrice = function () { return __awaiter(void 0, void 0, void 0, function () {
            var ids, index, res, tempPrices, _a, _b, chainId, token, e_1;
            var e_2, _c;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 3, , 4]);
                        ids = {};
                        for (index = 0; index < Object.values(chainProviders).length; index++) {
                            ids[Object.keys(chainProviders)[index]] = Object.values(chainProviders)[index].coingecko_id;
                        }
                        if (!Object.keys(ids).length) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios.get("https://api.coingecko.com/api/v3/simple/price?ids=".concat(Object.values(ids).join(","), "&vs_currencies=usd"))];
                    case 1:
                        res = _f.sent();
                        tempPrices = {};
                        try {
                            for (_a = __values(Object.keys(ids)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                chainId = _b.value;
                                token = ids[chainId];
                                tempPrices[chainId] = (_e = (_d = res.data[token]) === null || _d === void 0 ? void 0 : _d.usd) !== null && _e !== void 0 ? _e : 0;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        setPriceState({ nativeTokenPrices: tempPrices, fetchStatus: SUCCESS });
                        _f.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_1 = _f.sent();
                        console.error(e_1);
                        setPriceState(function (prev) { return (__assign(__assign({}, prev), { fetchStatus: FAILED })); });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (chainProviders && Object.keys(chainProviders).length) {
            fetchNativePrice();
        }
    }, [slowRefresh, setPriceState, chainProviders, SUCCESS, FAILED]);
    return jsx(TokenPriceContext.Provider, __assign({ value: priceState }, { children: children }));
};

var useNativeTokenPrices = function () {
    var _a = useContext(TokenPriceContext), nativeTokenPrices = _a.nativeTokenPrices, fetchStatus = _a.fetchStatus;
    return {
        nativeTokenPrices: nativeTokenPrices,
        fetchStatus: fetchStatus,
    };
};

var cachedPrices$1 = {};
var useTokenPrices = function (assets) {
    var _a = __read(useState({}), 2), priceState = _a[0], setPriceState = _a[1];
    var chainProviders = useChainProviders().chainProviders;
    useEffect(function () {
        var fetchPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
            var tempPrices, assets_1, assets_1_1, asset, key, chain_id, res, e_1, e_2_1;
            var e_2, _a;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        tempPrices = {};
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 10, 11, 12]);
                        assets_1 = __values(assets), assets_1_1 = assets_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!assets_1_1.done) return [3 /*break*/, 9];
                        asset = assets_1_1.value;
                        if (!asset.assetId || !asset.chainId) {
                            return [3 /*break*/, 8];
                        }
                        key = "".concat(asset.chainId, "-").concat(asset.assetId);
                        if (tempPrices[key]) {
                            return [3 /*break*/, 8];
                        }
                        if (cachedPrices$1[key] && Date.now() - cachedPrices$1[key].updated < 5 * 60 * 1000) {
                            tempPrices[key] = cachedPrices$1[key].price;
                            return [3 /*break*/, 8];
                        }
                        chain_id = (_b = chainProviders === null || chainProviders === void 0 ? void 0 : chainProviders[asset.chainId]) === null || _b === void 0 ? void 0 : _b.coingecko_chain_id;
                        if (!(utils.isAddress(asset.assetId) && asset.chainId && chain_id)) return [3 /*break*/, 7];
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, axios.get("https://api.coingecko.com/api/v3/coins/".concat(chain_id, "/contract/").concat(asset.assetId.toLowerCase()))];
                    case 4:
                        res = _e.sent();
                        tempPrices[key] = parseFloat(((_d = (_c = res === null || res === void 0 ? void 0 : res.market_data) === null || _c === void 0 ? void 0 : _c.current_price) === null || _d === void 0 ? void 0 : _d.usd) || 0);
                        cachedPrices$1[key] = {
                            price: tempPrices[key],
                            updated: Date.now(),
                        };
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _e.sent();
                        console.error(e_1);
                        tempPrices[key] = -1;
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        tempPrices[key] = -1;
                        cachedPrices$1[key] = {
                            price: -1,
                            updated: Date.now(),
                        };
                        _e.label = 8;
                    case 8:
                        assets_1_1 = assets_1.next();
                        return [3 /*break*/, 2];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (assets_1_1 && !assets_1_1.done && (_a = assets_1.return)) _a.call(assets_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        setPriceState(tempPrices);
                        return [2 /*return*/];
                }
            });
        }); };
        if (assets && assets.length > 0) {
            fetchPrice();
        }
    }, [JSON.stringify(assets), chainProviders]);
    return priceState;
};
function useCurrencyPrice(chainId, currencies) {
    var nativeTokenPrices = useNativeTokenPrices().nativeTokenPrices;
    var tokenPrices = useTokenPrices((currencies || []).filter(function (c) { return c != ZERO_ADDRESS; }).map(function (c) { return ({ chainId: chainId, assetId: c }); }));
    return useMemo(function () {
        var _a;
        return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.map(function (currency) {
            if (!currency)
                return undefined;
            if (currency !== ZERO_ADDRESS)
                return tokenPrices["".concat(chainId, "-").concat(currency === null || currency === void 0 ? void 0 : currency.toLowerCase())];
            if (currency === ZERO_ADDRESS)
                return nativeTokenPrices[chainId];
            return undefined;
        })) !== null && _a !== void 0 ? _a : [];
    }, [currencies, tokenPrices, nativeTokenPrices]);
}

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
var getDecimalAmount = function (amount, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return utils.parseUnits(new BigNumber$1(amount).toFixed(decimals).toString(), decimals);
};
var parseDecimalNumber = function (tokens, amount, chainId, assetId) {
    var decimal = getTokenDecimalFromAddr(tokens, chainId, assetId);
    return getDecimalAmount(amount.toString(), decimal);
};
var formatNumber = function (number, minPrecision, maxPrecision) {
    if (minPrecision === void 0) { minPrecision = 2; }
    if (maxPrecision === void 0) { maxPrecision = 2; }
    var options = {
        minimumFractionDigits: minPrecision,
        maximumFractionDigits: maxPrecision,
    };
    return number.toLocaleString(undefined, options);
};

var TraderJoeRouterABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WAVAX",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "WAVAX",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountADesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountTokenDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAXMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidityAVAX",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAX",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountIn",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountOut",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsIn",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsOut",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		name: "quote",
		outputs: [
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAXMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityAVAX",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAX",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAXMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityAVAXSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountAVAX",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAXMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityAVAXWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAX",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAVAXMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountAVAX",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapAVAXForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactAVAXForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactAVAXForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForAVAX",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForAVAXSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactAVAX",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];

var DEFAULT_SLIPPAGE = 0.001; // 0.1%
var DEFAULT_DESTINATION_SLIPPAGE = 0.15; // 15%
var DEFAULT_DEADLINE_MINUTES = 60 * 24; // 24 hours
var MAX_LIMIT_USD = 5000;
var getPairSettings = function (chainId, slippage) {
    if (slippage === void 0) { slippage = DEFAULT_SLIPPAGE; }
    switch (chainId) {
        case 1:
            return [
                new UniswapPairSettings({
                    slippage: slippage,
                    deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
                    disableMultihops: false,
                    uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
                }),
            ];
        case 4:
            return [
                new UniswapPairSettings({
                    slippage: slippage,
                    deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
                    disableMultihops: false,
                    uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
                }),
            ];
        case 42:
            return [
                new UniswapPairSettings({
                    slippage: slippage,
                    deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
                    disableMultihops: false,
                    uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
                }),
            ];
        case 56:
            return [
                new UniswapPairSettings({
                    slippage: slippage,
                    deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
                    disableMultihops: false,
                    uniswapVersions: [UniswapVersion.v2],
                    cloneUniswapContractDetails: {
                        v2Override: {
                            routerAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
                            factoryAddress: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
                            pairAddress: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
                        },
                    },
                    customNetwork: {
                        nameNetwork: "BSC",
                        multicallContractAddress: "0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D",
                        nativeCurrency: {
                            name: "BNB",
                            symbol: "BNB",
                        },
                        nativeWrappedTokenInfo: {
                            chainId: 56,
                            contractAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                            decimals: 18,
                            symbol: "WBNB",
                            name: "Wrapped BNB",
                        },
                        baseTokens: {
                            usdt: {
                                chainId: 56,
                                contractAddress: "0x55d398326f99059ff775485246999027b3197955",
                                decimals: 18,
                                symbol: "USDT",
                                name: "USDT",
                            },
                            dai: {
                                chainId: 56,
                                contractAddress: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
                                decimals: 18,
                                symbol: "DAI",
                                name: "DAI",
                            },
                            usdc: {
                                chainId: 56,
                                contractAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                                decimals: 18,
                                symbol: "USDC",
                                name: "USDC",
                            },
                        },
                    },
                }),
            ];
        case 137:
            return [
                new UniswapPairSettings({
                    slippage: slippage,
                    deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
                    disableMultihops: false,
                    uniswapVersions: [UniswapVersion.v2],
                    cloneUniswapContractDetails: {
                        v2Override: {
                            routerAddress: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
                            factoryAddress: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
                            pairAddress: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
                        },
                    },
                    customNetwork: {
                        nameNetwork: "Polygon",
                        multicallContractAddress: "0x275617327c958bD06b5D6b871E7f491D76113dd8",
                        nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                        },
                        nativeWrappedTokenInfo: {
                            chainId: 137,
                            contractAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
                            decimals: 18,
                            symbol: "WMATIC",
                            name: "Wrapped MATIC",
                        },
                        baseTokens: {
                            usdt: {
                                chainId: 137,
                                contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                                decimals: 6,
                                symbol: "USDT",
                                name: "USDT",
                            },
                            dai: {
                                chainId: 137,
                                contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
                                decimals: 18,
                                symbol: "DAI",
                                name: "DAI",
                            },
                            usdc: {
                                chainId: 137,
                                contractAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
                                decimals: 6,
                                symbol: "USDC",
                                name: "USDC",
                            },
                        },
                    },
                }),
            ];
        case 250:
            return [
                new UniswapPairSettings({
                    slippage: slippage,
                    deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
                    disableMultihops: false,
                    uniswapVersions: [UniswapVersion.v2],
                    cloneUniswapContractDetails: {
                        v2Override: {
                            routerAddress: "0xF491e7B69E4244ad4002BC14e878a34207E38c29",
                            factoryAddress: "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3",
                            pairAddress: "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3",
                        },
                    },
                    customNetwork: {
                        nameNetwork: "Fantom",
                        multicallContractAddress: "0xD98e3dBE5950Ca8Ce5a4b59630a5652110403E5c",
                        nativeCurrency: {
                            name: "FTM",
                            symbol: "FTM",
                        },
                        nativeWrappedTokenInfo: {
                            chainId: 250,
                            contractAddress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
                            decimals: 18,
                            symbol: "WFTM",
                            name: "Wrapped FTM",
                        },
                        baseTokens: {
                            usdt: {
                                chainId: 250,
                                contractAddress: "0x049d68029688eAbF473097a2fC38ef61633A3C7A",
                                decimals: 6,
                                symbol: "fUSDT",
                                name: "fUSDT",
                            },
                            dai: {
                                chainId: 250,
                                contractAddress: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
                                decimals: 18,
                                symbol: "DAI",
                                name: "DAI",
                            },
                            usdc: {
                                chainId: 250,
                                contractAddress: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
                                decimals: 6,
                                symbol: "USDC",
                                name: "USDC",
                            },
                            wbtc: {
                                chainId: 250,
                                contractAddress: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
                                decimals: 8,
                                symbol: "wBTC",
                                name: "wBTC",
                            },
                        },
                    },
                }),
            ];
        case 43114:
            return [
                new UniswapPairSettings({
                    slippage: slippage,
                    deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
                    disableMultihops: false,
                    uniswapVersions: [UniswapVersion.v2],
                    cloneUniswapContractDetails: {
                        v2Override: {
                            routerAddress: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",
                            factoryAddress: "0x9ad6c38be94206ca50bb0d90783181662f0cfa10",
                            pairAddress: "0x9ad6c38be94206ca50bb0d90783181662f0cfa10",
                            routerAbi: TraderJoeRouterABI,
                            routerMethods: {
                                swapETHForExactTokens: "swapAVAXForExactTokens",
                                swapExactETHForTokens: "swapExactAVAXForTokens",
                                swapExactETHForTokensSupportingFeeOnTransferTokens: "swapExactAVAXForTokensSupportingFeeOnTransferTokens",
                                swapExactTokensForETH: "swapExactTokensForAVAX",
                                swapExactTokensForETHSupportingFeeOnTransferTokens: "swapExactTokensForAVAXSupportingFeeOnTransferTokens",
                                swapExactTokensForTokens: "swapExactTokensForTokens",
                                swapExactTokensForTokensSupportingFeeOnTransferTokens: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
                                swapTokensForExactETH: "swapTokensForExactAVAX",
                                swapTokensForExactTokens: "swapTokensForExactTokens",
                            },
                        },
                    },
                    customNetwork: {
                        nameNetwork: "Avalanche",
                        multicallContractAddress: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
                        nativeCurrency: {
                            name: "AVAX",
                            symbol: "AVAX",
                        },
                        nativeWrappedTokenInfo: {
                            chainId: 43114,
                            contractAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
                            decimals: 18,
                            symbol: "WAVAX",
                            name: "Wrapped AVAX",
                        },
                        baseTokens: {
                            usdt: {
                                chainId: 43114,
                                contractAddress: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
                                decimals: 6,
                                symbol: "USDT",
                                name: "USDT",
                            },
                            usdc: {
                                chainId: 43114,
                                contractAddress: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
                                decimals: 6,
                                symbol: "USDC.e",
                                name: "USDC.e",
                            },
                            wbtc: {
                                chainId: 43114,
                                contractAddress: "0x152b9d0fdc40c096757f570a51e494bd4b943e50",
                                decimals: 8,
                                symbol: "BTC.b",
                                name: "BTC.b",
                            },
                        },
                    },
                }),
            ];
    }
};

var fibswapAbi = [
	{
		inputs: [
		],
		name: "FibswapUtils__handleIncomingAsset_ethWithErcTransfer",
		type: "error"
	},
	{
		inputs: [
		],
		name: "FibswapUtils__handleIncomingAsset_notAmount",
		type: "error"
	},
	{
		inputs: [
		],
		name: "FibswapUtils__transferAssetFromContract_notNative",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addAssetId_alreadyAdded",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addAssetIds_invalidArgs",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addLiquidityForRouter_amountIsZero",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addLiquidityForRouter_badAsset",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addLiquidityForRouter_badRouter",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addLiquidityForRouter_routerEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addSwapRouter_alreadyApproved",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addSwapRouter_invalidArgs",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__addSwapRouter_invalidSwapRouterAddress",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__decrementLiquidity_notEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__execute_alreadyExecuted",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__execute_incorrectDestination",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__execute_invalidRouterSignature",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__execute_unapprovedRouter",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__removeAssetId_notAdded",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__removeLiquidity_amountIsZero",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__removeLiquidity_insufficientFunds",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__removeLiquidity_recipientEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__removeSwapRouter_alreadyRemoved",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__removeSwapRouter_invalidArgs",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_emptyToOrRecovery",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_invalidSwapRouer",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_notApprovedRouter",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_notGasFee",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_notSupportedAsset",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_tooBigSlippage",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_tooSmallLocalAmount",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Fibswap__xcall_wrongDomain",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RouterPermissionsLogic__onlyRouterOwner_notRouterOwner",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RouterPermissionsLogic__removeRouter_notAdded",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RouterPermissionsLogic__removeRouter_routerEmpty",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RouterPermissionsLogic__setRouterOwner_notNewOwner",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RouterPermissionsLogic__setRouterRecipient_notNewRecipient",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RouterPermissionsLogic__setupRouter_alreadyApproved",
		type: "error"
	},
	{
		inputs: [
		],
		name: "RouterPermissionsLogic__setupRouter_routerEmpty",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "previousAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "AdminChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "localAsset",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "AssetAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "localAsset",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "AssetRemoved",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "beacon",
				type: "address"
			}
		],
		name: "BeaconUpgraded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "transferId",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "address",
						name: "router",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "to",
								type: "address"
							},
							{
								internalType: "bytes",
								name: "data",
								type: "bytes"
							}
						],
						internalType: "struct IFibswap.ExternalCall",
						name: "orgParam",
						type: "tuple"
					},
					{
						components: [
							{
								internalType: "address",
								name: "to",
								type: "address"
							},
							{
								internalType: "bytes",
								name: "data",
								type: "bytes"
							}
						],
						internalType: "struct IFibswap.ExternalCall",
						name: "dstParam",
						type: "tuple"
					},
					{
						internalType: "address",
						name: "recovery",
						type: "address"
					},
					{
						internalType: "uint32",
						name: "origin",
						type: "uint32"
					},
					{
						internalType: "uint32",
						name: "destination",
						type: "uint32"
					},
					{
						internalType: "address",
						name: "orgLocalAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "dstLocalAsset",
						type: "address"
					},
					{
						internalType: "bool",
						name: "isEth",
						type: "bool"
					}
				],
				indexed: false,
				internalType: "struct IFibswap.CallParams",
				name: "params",
				type: "tuple"
			},
			{
				indexed: false,
				internalType: "address",
				name: "transactingAsset",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "localAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "transactingAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "routerSignature",
				type: "bytes"
			},
			{
				indexed: false,
				internalType: "address",
				name: "originSender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "Executed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint8",
				name: "version",
				type: "uint8"
			}
		],
		name: "Initialized",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "router",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "local",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "LiquidityAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "router",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "local",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "LiquidityRemoved",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "executor",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "NewExecutor",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "feePercent",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "NewFeePercent",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "percent",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "NewMaxAllowSlippage",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "Paused",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "swapRouter",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "SwapRouterUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "Unpaused",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "implementation",
				type: "address"
			}
		],
		name: "Upgraded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "transferId",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "address",
						name: "router",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "to",
								type: "address"
							},
							{
								internalType: "bytes",
								name: "data",
								type: "bytes"
							}
						],
						internalType: "struct IFibswap.ExternalCall",
						name: "orgParam",
						type: "tuple"
					},
					{
						components: [
							{
								internalType: "address",
								name: "to",
								type: "address"
							},
							{
								internalType: "bytes",
								name: "data",
								type: "bytes"
							}
						],
						internalType: "struct IFibswap.ExternalCall",
						name: "dstParam",
						type: "tuple"
					},
					{
						internalType: "address",
						name: "recovery",
						type: "address"
					},
					{
						internalType: "uint32",
						name: "origin",
						type: "uint32"
					},
					{
						internalType: "uint32",
						name: "destination",
						type: "uint32"
					},
					{
						internalType: "address",
						name: "orgLocalAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "dstLocalAsset",
						type: "address"
					},
					{
						internalType: "bool",
						name: "isEth",
						type: "bool"
					}
				],
				indexed: false,
				internalType: "struct IFibswap.CallParams",
				name: "params",
				type: "tuple"
			},
			{
				indexed: false,
				internalType: "address",
				name: "transactingAsset",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "transactingAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "localAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "underlyingAmount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "relayerFee",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "XCalled",
		type: "event"
	},
	{
		inputs: [
		],
		name: "PERCENTS_DIVIDER",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "localAssets",
				type: "address[]"
			}
		],
		name: "addAssetIds",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "local",
				type: "address"
			}
		],
		name: "addLiquidity",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "local",
				type: "address"
			},
			{
				internalType: "address",
				name: "router",
				type: "address"
			}
		],
		name: "addLiquidityFor",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "routers",
				type: "address[]"
			}
		],
		name: "addSwapRouter",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "approvedAssets",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_router",
				type: "address"
			}
		],
		name: "approvedRouters",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "chainId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "router",
								type: "address"
							},
							{
								components: [
									{
										internalType: "address",
										name: "to",
										type: "address"
									},
									{
										internalType: "bytes",
										name: "data",
										type: "bytes"
									}
								],
								internalType: "struct IFibswap.ExternalCall",
								name: "orgParam",
								type: "tuple"
							},
							{
								components: [
									{
										internalType: "address",
										name: "to",
										type: "address"
									},
									{
										internalType: "bytes",
										name: "data",
										type: "bytes"
									}
								],
								internalType: "struct IFibswap.ExternalCall",
								name: "dstParam",
								type: "tuple"
							},
							{
								internalType: "address",
								name: "recovery",
								type: "address"
							},
							{
								internalType: "uint32",
								name: "origin",
								type: "uint32"
							},
							{
								internalType: "uint32",
								name: "destination",
								type: "uint32"
							},
							{
								internalType: "address",
								name: "orgLocalAsset",
								type: "address"
							},
							{
								internalType: "address",
								name: "dstLocalAsset",
								type: "address"
							},
							{
								internalType: "bool",
								name: "isEth",
								type: "bool"
							}
						],
						internalType: "struct IFibswap.CallParams",
						name: "params",
						type: "tuple"
					},
					{
						internalType: "address",
						name: "transactingAssetId",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "bytes",
						name: "routerSignature",
						type: "bytes"
					},
					{
						internalType: "address",
						name: "originSender",
						type: "address"
					}
				],
				internalType: "struct IFibswap.ExecuteArgs",
				name: "_args",
				type: "tuple"
			}
		],
		name: "execute",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "executor",
		outputs: [
			{
				internalType: "contract IExecutor",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "feePercent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getChainId",
		outputs: [
			{
				internalType: "uint256",
				name: "_chainId",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_chainId",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "_owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "_wrapper",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "maxAllowSlippage",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "nonce",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "pause",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "processed",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "proxiableUUID",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "localAssetId",
				type: "address"
			}
		],
		name: "removeAssetId",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "local",
				type: "address"
			}
		],
		name: "removeLiquidity",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "router",
				type: "address"
			}
		],
		name: "removeRouter",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_swapRouter",
				type: "address"
			}
		],
		name: "removeSwapRouter",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "routerBalances",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_router",
				type: "address"
			}
		],
		name: "routerOwners",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_router",
				type: "address"
			}
		],
		name: "routerRecipients",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_executor",
				type: "address"
			}
		],
		name: "setExecutor",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_percent",
				type: "uint256"
			}
		],
		name: "setFeePercent",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_percent",
				type: "uint256"
			}
		],
		name: "setMaxAllowSlippage",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "router",
				type: "address"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "setRouterOwner",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "router",
				type: "address"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "setRouterRecipient",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_wrapped",
				type: "address"
			}
		],
		name: "setWrapped",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "router",
				type: "address"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "setupRouter",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "swapRouters",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "unpause",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newImplementation",
				type: "address"
			}
		],
		name: "upgradeTo",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newImplementation",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "upgradeToAndCall",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "wrapper",
		outputs: [
			{
				internalType: "contract IWrapped",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "router",
								type: "address"
							},
							{
								components: [
									{
										internalType: "address",
										name: "to",
										type: "address"
									},
									{
										internalType: "bytes",
										name: "data",
										type: "bytes"
									}
								],
								internalType: "struct IFibswap.ExternalCall",
								name: "orgParam",
								type: "tuple"
							},
							{
								components: [
									{
										internalType: "address",
										name: "to",
										type: "address"
									},
									{
										internalType: "bytes",
										name: "data",
										type: "bytes"
									}
								],
								internalType: "struct IFibswap.ExternalCall",
								name: "dstParam",
								type: "tuple"
							},
							{
								internalType: "address",
								name: "recovery",
								type: "address"
							},
							{
								internalType: "uint32",
								name: "origin",
								type: "uint32"
							},
							{
								internalType: "uint32",
								name: "destination",
								type: "uint32"
							},
							{
								internalType: "address",
								name: "orgLocalAsset",
								type: "address"
							},
							{
								internalType: "address",
								name: "dstLocalAsset",
								type: "address"
							},
							{
								internalType: "bool",
								name: "isEth",
								type: "bool"
							}
						],
						internalType: "struct IFibswap.CallParams",
						name: "params",
						type: "tuple"
					},
					{
						internalType: "address",
						name: "transactingAssetId",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "localAmount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "relayerFee",
						type: "uint256"
					},
					{
						internalType: "bool",
						name: "isExactInput",
						type: "bool"
					}
				],
				internalType: "struct IFibswap.XCallArgs",
				name: "_args",
				type: "tuple"
			}
		],
		name: "xcall",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];

var getTradeInfo = function (chainId, fromToken, toToken, account, amount, isExactInput, slippage) { return __awaiter(void 0, void 0, void 0, function () {
    var chainInfo, pairSettings, uniswapPair, uniswapPairFactory, trade, e_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!chainId) {
                    throw new Error("Unsupported Chain!");
                }
                chainInfo = getChainInfo(chainId);
                pairSettings = getPairSettings(chainId, slippage);
                if (!pairSettings || pairSettings.length === 0) {
                    throw new Error("Unsupported Chain!");
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                uniswapPair = new UniswapPair({
                    fromTokenContractAddress: fromToken === ZERO_ADDRESS ? getWrappedToken(chainId) : fromToken,
                    toTokenContractAddress: toToken === ZERO_ADDRESS ? appendEthToContractAddress(getWrappedToken(chainId)) : toToken,
                    ethereumAddress: account,
                    chainId: chainId,
                    providerUrl: _.sample(chainInfo.provider_params.rpcUrls),
                    settings: pairSettings === null || pairSettings === void 0 ? void 0 : pairSettings[0],
                });
                return [4 /*yield*/, uniswapPair.createFactory()];
            case 2:
                uniswapPairFactory = _c.sent();
                return [4 /*yield*/, uniswapPairFactory.trade(String(amount), isExactInput ? TradeDirection.input : TradeDirection.output)];
            case 3:
                trade = _c.sent();
                return [2 /*return*/, (_b = (_a = trade.allTriedRoutesQuotes) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null];
            case 4:
                e_1 = _c.sent();
                console.log("get trade info error", chainId, fromToken, toToken, amount, e_1);
                throw new Error(e_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
var checkSupport = function (tokens, bridge) {
    var _a = __assign({}, bridge), fromChainId = _a.fromChainId, toChainId = _a.toChainId, fromTransacting = _a.fromTransacting, toTransacting = _a.toTransacting;
    var source_asset_data = getTokenInfoFromAddr(tokens, fromChainId, fromTransacting);
    var destination_asset_data = getTokenInfoFromAddr(tokens, toChainId, toTransacting);
    return fromChainId && toChainId && source_asset_data && destination_asset_data && fromChainId !== toChainId;
};
var getSwapEstimate = function (tokens, bridgeState, liquidity, nativePrices, slippage) { return __awaiter(void 0, void 0, void 0, function () {
    var bridge, routerAddress, fromChainId, toChainId, fromLocal, localAmount, fromFibswap, toFibswap;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                bridge = _.cloneDeep(bridgeState);
                routerAddress = ROUTER_ADDRESS === null || ROUTER_ADDRESS === void 0 ? void 0 : ROUTER_ADDRESS.toLowerCase();
                if (!routerAddress) {
                    throw new Error("Invalid Router");
                }
                if (!checkSupport(tokens, bridge)) {
                    throw new Error("Unsupported swap");
                }
                fromChainId = bridge.fromChainId, toChainId = bridge.toChainId, fromLocal = bridge.fromLocal, localAmount = bridge.localAmount;
                fromFibswap = (_a = getChainInfo(fromChainId)) === null || _a === void 0 ? void 0 : _a.fibswap;
                toFibswap = (_b = getChainInfo(toChainId)) === null || _b === void 0 ? void 0 : _b.fibswap;
                if (!isAddress(fromFibswap) || !isAddress(toFibswap)) {
                    throw new Error("Invalid Config");
                }
                bridge.router = routerAddress;
                bridge.slippage = slippage;
                if (!(bridge.isExactInput === false || (fromLocal && localAmount > 0))) return [3 /*break*/, 2];
                return [4 /*yield*/, estimateSwapOuput(bridge, liquidity)];
            case 1: return [2 /*return*/, _c.sent()];
            case 2: return [4 /*yield*/, estimateSwapInput(bridge, liquidity, nativePrices)];
            case 3: return [2 /*return*/, _c.sent()];
        }
    });
}); };
var estimateSwapOuput = function (bridge, liquidity) { return __awaiter(void 0, void 0, void 0, function () {
    var routerAddress, fromChainId, toChainId, fromLocal, localAmount, fromFibswap, _loop_1, ALL_LOCAL_ASSETS_1, ALL_LOCAL_ASSETS_1_1, local, state_1, e_2_1;
    var e_2, _a;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                bridge.isExactInput = false;
                routerAddress = ROUTER_ADDRESS === null || ROUTER_ADDRESS === void 0 ? void 0 : ROUTER_ADDRESS.toLowerCase();
                fromChainId = bridge.fromChainId, toChainId = bridge.toChainId, fromLocal = bridge.fromLocal, localAmount = bridge.localAmount;
                fromFibswap = (_b = getChainInfo(fromChainId)) === null || _b === void 0 ? void 0 : _b.fibswap;
                _loop_1 = function (local) {
                    var senderLocal, recvLocal_1, recvLocalLiquidity, fromQuoteExactOut, fromQuote;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                senderLocal = local.contracts.find(function (l) { return l.chain_id === fromChainId; });
                                if (!(senderLocal && equals_ignore_case(senderLocal.contract_address, fromLocal))) return [3 /*break*/, 5];
                                recvLocal_1 = local.contracts.find(function (l) { return l.chain_id === toChainId; });
                                if (!recvLocal_1) {
                                    throw new Error("Invaild asset on receiving side");
                                }
                                recvLocalLiquidity = BigNumber.from(((_d = (_c = liquidity[toChainId]) === null || _c === void 0 ? void 0 : _c.find(function (l) { return l.router_address === routerAddress && equals_ignore_case(l.local, recvLocal_1.contract_address); })) === null || _d === void 0 ? void 0 : _d.amount) || "0");
                                if (recvLocalLiquidity.lt(getDecimalAmount(String(localAmount), recvLocal_1.contract_decimals).toString())) {
                                    throw new Error("Insufficient liquidity");
                                }
                                if (!equals_ignore_case(bridge.fromLocal, bridge.fromTransacting)) return [3 /*break*/, 1];
                                bridge.fromTransactingAmount = getAmountWithFee(bridge.localAmount, senderLocal.contract_decimals);
                                bridge.fromTo = ZERO_ADDRESS;
                                bridge.fromData = "0x";
                                bridge.fromRouteQuote = null;
                                return [2 /*return*/, { value: bridge }];
                            case 1: return [4 /*yield*/, getTradeInfo(fromChainId, bridge.fromTransacting, bridge.fromLocal, fromFibswap, bridge.localAmount, false, bridge.slippage)];
                            case 2:
                                fromQuoteExactOut = _f.sent();
                                if (!(fromQuoteExactOut && fromQuoteExactOut.transaction)) return [3 /*break*/, 4];
                                bridge.fromTransactingAmount = getAmountWithFee(parseFloat(fromQuoteExactOut.expectedConvertQuote), fromQuoteExactOut.routePathArrayTokenMap[0].decimals);
                                return [4 /*yield*/, getTradeInfo(fromChainId, bridge.fromTransacting, bridge.fromLocal, fromFibswap, bridge.fromTransactingAmount, true, bridge.slippage)];
                            case 3:
                                fromQuote = _f.sent();
                                if (fromQuote && fromQuote.transaction) {
                                    bridge.fromTo = fromQuote.transaction.to;
                                    bridge.fromData = fromQuote.transaction.data;
                                    bridge.fromRouteQuote = fromQuote;
                                    bridge.estimated = true;
                                    return [2 /*return*/, { value: bridge }];
                                }
                                _f.label = 4;
                            case 4: throw new Error("Failed to estimate");
                            case 5: return [2 /*return*/];
                        }
                    });
                };
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 8]);
                ALL_LOCAL_ASSETS_1 = __values(ALL_LOCAL_ASSETS), ALL_LOCAL_ASSETS_1_1 = ALL_LOCAL_ASSETS_1.next();
                _e.label = 2;
            case 2:
                if (!!ALL_LOCAL_ASSETS_1_1.done) return [3 /*break*/, 5];
                local = ALL_LOCAL_ASSETS_1_1.value;
                return [5 /*yield**/, _loop_1(local)];
            case 3:
                state_1 = _e.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _e.label = 4;
            case 4:
                ALL_LOCAL_ASSETS_1_1 = ALL_LOCAL_ASSETS_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (ALL_LOCAL_ASSETS_1_1 && !ALL_LOCAL_ASSETS_1_1.done && (_a = ALL_LOCAL_ASSETS_1.return)) _a.call(ALL_LOCAL_ASSETS_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var estimateSwapInput = function (bridge, liquidity, nativePrices) { return __awaiter(void 0, void 0, void 0, function () {
    var routerAddress, fromChainId, toChainId, fromFibswap, _loop_2, ALL_LOCAL_ASSETS_2, ALL_LOCAL_ASSETS_2_1, local, state_2, e_3_1;
    var e_3, _a;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                routerAddress = ROUTER_ADDRESS === null || ROUTER_ADDRESS === void 0 ? void 0 : ROUTER_ADDRESS.toLowerCase();
                fromChainId = bridge.fromChainId, toChainId = bridge.toChainId;
                fromFibswap = (_b = getChainInfo(fromChainId)) === null || _b === void 0 ? void 0 : _b.fibswap;
                bridge.isExactInput = true;
                bridge.isEth = bridge.toTransacting === ZERO_ADDRESS;
                _loop_2 = function (local) {
                    var senderLocal, recvLocal, senderLiquidity, recvLiquidity, selectedSenderLocal, selectedRecvLocal, fromQuote, priceUsd, totalUsd, neededRecvLocal, wrappedTo, toQuote;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0:
                                senderLocal = local.contracts.find(function (l) { return l.chain_id === fromChainId; });
                                recvLocal = local.contracts.find(function (l) { return l.chain_id === toChainId; });
                                if (!senderLocal || !recvLocal) {
                                    return [2 /*return*/, "continue"];
                                }
                                senderLiquidity = BigNumber.from(((_d = (_c = liquidity === null || liquidity === void 0 ? void 0 : liquidity[fromChainId]) === null || _c === void 0 ? void 0 : _c.find(function (l) { return l.router_address === routerAddress && equals_ignore_case(l.local, senderLocal.contract_address); })) === null || _d === void 0 ? void 0 : _d.amount) || "0");
                                recvLiquidity = BigNumber.from(((_f = (_e = liquidity === null || liquidity === void 0 ? void 0 : liquidity[toChainId]) === null || _e === void 0 ? void 0 : _e.find(function (l) { return l.router_address === routerAddress && equals_ignore_case(l.local, recvLocal.contract_address); })) === null || _f === void 0 ? void 0 : _f.amount) || "0");
                                if (senderLiquidity.lte(0) || recvLiquidity.lte(0)) {
                                    return [2 /*return*/, "continue"];
                                }
                                selectedSenderLocal = __assign(__assign({}, senderLocal), { liquidity: senderLiquidity });
                                selectedRecvLocal = __assign(__assign({}, recvLocal), { liquidity: recvLiquidity });
                                bridge.fromLocal = selectedSenderLocal.contract_address;
                                bridge.toLocal = selectedRecvLocal.contract_address;
                                if (!equals_ignore_case(bridge.fromLocal, bridge.fromTransacting)) return [3 /*break*/, 1];
                                bridge.fromTo = ZERO_ADDRESS;
                                bridge.fromData = "0x";
                                bridge.fromRouteQuote = null;
                                bridge.localAmount = getAmountWithOutFee(bridge.fromTransactingAmount, selectedSenderLocal.contract_decimals);
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, getTradeInfo(fromChainId, bridge.fromTransacting, bridge.fromLocal, fromFibswap, bridge.fromTransactingAmount, true, bridge.slippage)];
                            case 2:
                                fromQuote = _h.sent();
                                if (fromQuote && fromQuote.transaction) {
                                    bridge.fromTo = fromQuote.transaction.to;
                                    bridge.fromData = fromQuote.transaction.data;
                                    bridge.fromRouteQuote = fromQuote;
                                    bridge.localAmount = getAmountWithOutFee(parseFloat(fromQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage), selectedSenderLocal.contract_decimals);
                                }
                                else {
                                    throw new Error("Failed to estimate");
                                }
                                _h.label = 3;
                            case 3:
                                priceUsd = 0;
                                if (local.is_stablecoin) {
                                    priceUsd = 1;
                                }
                                else if (local.is_wrapped) {
                                    priceUsd = (nativePrices === null || nativePrices === void 0 ? void 0 : nativePrices[local.wrapped_chain_id]) || 0;
                                }
                                else {
                                    priceUsd = 0;
                                }
                                totalUsd = bridge.localAmount * priceUsd;
                                if (totalUsd > MAX_LIMIT_USD) {
                                    throw new Error("Too big amount!");
                                }
                                neededRecvLocal = getDecimalAmount(String(bridge.localAmount), selectedRecvLocal.contract_decimals);
                                if (selectedRecvLocal.liquidity.lt(neededRecvLocal)) {
                                    return [2 /*return*/, "continue"];
                                }
                                wrappedTo = getWrappedToken(bridge.toChainId);
                                if (!equals_ignore_case(bridge.toLocal, bridge.toTransacting)) return [3 /*break*/, 4];
                                bridge.toTo = bridge.originSender;
                                bridge.toData = "0x";
                                bridge.toTransactingAmount = bridge.localAmount;
                                bridge.toRouteQuote = null;
                                return [3 /*break*/, 7];
                            case 4:
                                if (!(equals_ignore_case(bridge.toLocal, wrappedTo) &&
                                    equals_ignore_case(bridge.toTransacting, ZERO_ADDRESS))) return [3 /*break*/, 5];
                                bridge.toTo = bridge.originSender;
                                bridge.toData = "0x";
                                bridge.toTransactingAmount = bridge.localAmount;
                                bridge.toRouteQuote = null;
                                bridge.isEth = true;
                                return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, getTradeInfo(toChainId, bridge.toLocal, bridge.toTransacting, bridge.originSender, parseFloat(new BigNumber$1(bridge.localAmount).minus(1e-6).toFixed(selectedSenderLocal.contract_decimals)), true, DEFAULT_DESTINATION_SLIPPAGE)];
                            case 6:
                                toQuote = _h.sent();
                                if (toQuote && toQuote.transaction) {
                                    bridge.toTo = toQuote.transaction.to;
                                    bridge.toData = toQuote.transaction.data;
                                    bridge.toTransactingAmount = parseFloat(toQuote.expectedConvertQuote);
                                    bridge.toRouteQuote = toQuote;
                                }
                                else {
                                    throw new Error("Failed to estimate");
                                }
                                _h.label = 7;
                            case 7:
                                console.log(bridge);
                                bridge.estimated = true;
                                return [2 /*return*/, { value: bridge }];
                        }
                    });
                };
                _g.label = 1;
            case 1:
                _g.trys.push([1, 6, 7, 8]);
                ALL_LOCAL_ASSETS_2 = __values(ALL_LOCAL_ASSETS), ALL_LOCAL_ASSETS_2_1 = ALL_LOCAL_ASSETS_2.next();
                _g.label = 2;
            case 2:
                if (!!ALL_LOCAL_ASSETS_2_1.done) return [3 /*break*/, 5];
                local = ALL_LOCAL_ASSETS_2_1.value;
                return [5 /*yield**/, _loop_2(local)];
            case 3:
                state_2 = _g.sent();
                if (typeof state_2 === "object")
                    return [2 /*return*/, state_2.value];
                _g.label = 4;
            case 4:
                ALL_LOCAL_ASSETS_2_1 = ALL_LOCAL_ASSETS_2.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_3_1 = _g.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (ALL_LOCAL_ASSETS_2_1 && !ALL_LOCAL_ASSETS_2_1.done && (_a = ALL_LOCAL_ASSETS_2.return)) _a.call(ALL_LOCAL_ASSETS_2);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 8: throw new Error("Insufficient Liquidity");
        }
    });
}); };
var getAmountWithOutFee = function (amount, decimals) {
    return parseFloat(new BigNumber$1(amount)
        .multipliedBy(100 - SWAP_FEE)
        .dividedBy(100)
        .toFixed(decimals));
};
var getAmountWithFee = function (amount, decimals) {
    return parseFloat(new BigNumber$1(amount)
        .multipliedBy(100)
        .dividedBy(100 - SWAP_FEE)
        .multipliedBy(1.0025)
        .toFixed(decimals));
};
var parseFibswapError = function (errorData) {
    var iErrors = new Interface(fibswapAbi);
    if (!errorData) {
        return null;
    }
    if (errorData.startsWith("0x08c379a0")) {
        // decode Error(string)
        var content = "0x".concat(errorData.substring(10));
        var reason = utils.defaultAbiCoder.decode(["string"], content);
        return reason[0]; // reason: string; for standard revert error string
    }
    if (errorData.startsWith("0x4e487b71")) {
        // decode Panic(uint)
        var content = "0x".concat(errorData.substring(10));
        var code = utils.defaultAbiCoder.decode(["uint"], content);
        return code[0];
    }
    try {
        var errDescription = iErrors.parseError(errorData);
        var name_1 = errDescription === null || errDescription === void 0 ? void 0 : errDescription.name;
        console.log(errDescription);
        switch (name_1) {
            case "Fibswap__xcall_notGasFee":
                return "Empty Gas Fee";
            case "Fibswap__xcall_notApprovedRouter":
                return "Not Approved Router";
            case "Fibswap__xcall_invalidSwapRouer":
                return "Invalid Swap";
            case "Fibswap__xcall_tooSmallLocalAmount":
                return "Too small Amount";
            case "Fibswap__xcall_tooBigSlippage":
                return "Too Big Slippage";
            default:
                return null;
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
};

var cachedPrices = {};
var useGasPrices = function (chainId) {
    var _a = __read(useState(0), 2), priceState = _a[0], setPriceState = _a[1];
    var chainProviders = useChainProviders().chainProviders;
    var fetchEthGas = function () {
        return axios
            .get("https://gas-price-api.1inch.io/v1.2/1")
            .then(function (response) {
            var _a, _b;
            return BigNumber.from((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.medium) === null || _b === void 0 ? void 0 : _b.maxFeePerGas)
                .div(Math.pow(10, 9))
                .toNumber();
        })
            .catch(function () {
            return axios.get("https://ethgasstation.info/api/ethgasAPI.json").then(function (response) {
                return response.data.average / 10;
            });
        })
            .catch(function () {
            return 0;
        });
    };
    var fetchPolygonGas = function () {
        return axios
            .get("https://gasstation-mainnet.matic.network/")
            .then(function (response) {
            var _a, _b;
            return parseFloat(((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.fast) || ((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.fastest) || "100"); //standard
        })
            .catch(function () {
            return 0;
        });
    };
    useEffect(function () {
        var fetchPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
            var gasPriceGwei, _a, temp, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!chainId) {
                            return [2 /*return*/];
                        }
                        if (cachedPrices[chainId] && Date.now() - cachedPrices[chainId].updated < 5 * 60 * 1000) {
                            setPriceState(cachedPrices[chainId].price);
                            return [2 /*return*/];
                        }
                        gasPriceGwei = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        _a = chainId;
                        switch (_a) {
                            case 1: return [3 /*break*/, 2];
                            case 137: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, fetchEthGas()];
                    case 3:
                        gasPriceGwei = _b.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, fetchPolygonGas()];
                    case 5:
                        gasPriceGwei = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        gasPriceGwei = 0;
                        _b.label = 7;
                    case 7:
                        if (!(gasPriceGwei == 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, chainProviders[chainId].provider.getGasPrice()];
                    case 8:
                        temp = _b.sent();
                        gasPriceGwei = temp
                            .mul(120)
                            .div(100)
                            .div(Math.pow(10, 9))
                            .toNumber();
                        _b.label = 9;
                    case 9:
                        cachedPrices[chainId] = {
                            price: gasPriceGwei,
                            updated: Date.now(),
                        };
                        return [3 /*break*/, 11];
                    case 10:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 11];
                    case 11:
                        setPriceState(gasPriceGwei);
                        return [2 /*return*/];
                }
            });
        }); };
        if (chainId && isSupportedChain(chainId)) {
            fetchPrice();
        }
    }, [chainId, chainProviders]);
    return priceState;
};

var erc20Abi = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_spender",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_from",
				type: "address"
			},
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			},
			{
				name: "_spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	}
];

var multicallAbi = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "aggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes[]",
				name: "returnData",
				type: "bytes[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "blockAndAggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			}
		],
		name: "getBlockHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockCoinbase",
		outputs: [
			{
				internalType: "address",
				name: "coinbase",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockDifficulty",
		outputs: [
			{
				internalType: "uint256",
				name: "difficulty",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockGasLimit",
		outputs: [
			{
				internalType: "uint256",
				name: "gaslimit",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockTimestamp",
		outputs: [
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "getEthBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getLastBlockHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "requireSuccess",
				type: "bool"
			},
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "tryAggregate",
		outputs: [
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "requireSuccess",
				type: "bool"
			},
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "tryBlockAndAggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var getContract = function (abi, address, signer) {
    return new ethers.Contract(address, abi, signer);
};
var getMulticallContract = function (address, signer) {
    return getContract(multicallAbi, address, signer);
};

var multicall = function (multi, abi, calls) { return __awaiter(void 0, void 0, void 0, function () {
    var itf_1, calldata, returnData, res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                itf_1 = new ethers.utils.Interface(abi);
                calldata = calls.map(function (call) { return [call.address.toLowerCase(), itf_1.encodeFunctionData(call.name, call.params)]; });
                return [4 /*yield*/, multi.aggregate(calldata)];
            case 1:
                returnData = (_a.sent()).returnData;
                res = returnData.map(function (call, i) { return itf_1.decodeFunctionResult(calls[i].name, call); });
                return [2 /*return*/, res];
            case 2:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 3: return [2 /*return*/];
        }
    });
}); };

var FetchStatus$1;
(function (FetchStatus) {
    FetchStatus["NOT_FETCHED"] = "not-fetched";
    FetchStatus["SUCCESS"] = "success";
    FetchStatus["FAILED"] = "failed";
    FetchStatus["LOADING"] = "loading";
})(FetchStatus$1 || (FetchStatus$1 = {}));
var useGetEthBalance = function (chainId) {
    var _a = __read(useState(BIG_ZERO), 2), balance = _a[0], setBalance = _a[1];
    var account = useWeb3React().account;
    var chainProviders = useChainProviders().chainProviders;
    useEffect(function () {
        var fetchBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, walletBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = chainProviders[chainId].provider;
                        return [4 /*yield*/, provider.getBalance(account)];
                    case 1:
                        walletBalance = _a.sent();
                        setBalance(walletBalance);
                        return [2 /*return*/];
                }
            });
        }); };
        if (account && chainId) {
            fetchBalance();
        }
    }, [account, setBalance, chainId]);
    return { balance: balance };
};

var FetchStatus;
(function (FetchStatus) {
    FetchStatus["NOT_FETCHED"] = "not-fetched";
    FetchStatus["SUCCESS"] = "success";
    FetchStatus["FAILED"] = "failed";
    FetchStatus["LOADING"] = "loading";
})(FetchStatus || (FetchStatus = {}));
var useTokenBalances = function (chainId) {
    var NOT_FETCHED = FetchStatus.NOT_FETCHED, SUCCESS = FetchStatus.SUCCESS, FAILED = FetchStatus.FAILED, LOADING = FetchStatus.LOADING;
    var chainProviders = useChainProviders().chainProviders;
    var account = useWeb3React().account;
    var allTokens = useTokens().tokens;
    var tokens = allTokens === null || allTokens === void 0 ? void 0 : allTokens[chainId];
    var validatedTokens = useMemo(function () { var _a; return (_a = tokens === null || tokens === void 0 ? void 0 : tokens.filter(function (t) { return isAddress(t === null || t === void 0 ? void 0 : t.address) !== false && (t === null || t === void 0 ? void 0 : t.address) !== ZERO_ADDRESS; })) !== null && _a !== void 0 ? _a : []; }, [tokens]);
    var validatedTokenAddresses = useMemo(function () { return validatedTokens.map(function (vt) { return vt.address; }); }, [validatedTokens]);
    var _a = __read(useState({
        chainId: chainId,
        balances: {},
        fetchStatus: NOT_FETCHED,
    }), 2), balanceState = _a[0], setBalanceState = _a[1];
    useEffect(function () {
        var fetchBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
            var calls, multicallAddress, multicallContract, promises, chunk, i;
            var _a;
            return __generator(this, function (_b) {
                if (validatedTokenAddresses && validatedTokenAddresses.length) {
                    calls = validatedTokenAddresses.map(function (address) { return ({
                        address: address,
                        name: "balanceOf",
                        params: [account],
                    }); });
                    multicallAddress = (_a = getChainInfo(chainId)) === null || _a === void 0 ? void 0 : _a.multicall;
                    if (!multicallAddress) {
                        setBalanceState(function (prev) { return (__assign(__assign({}, prev), { chainId: chainId, fetchStatus: FAILED })); });
                        return [2 /*return*/];
                    }
                    multicallContract = getMulticallContract(multicallAddress, chainProviders[chainId].provider);
                    promises = [];
                    chunk = 300;
                    for (i = 0; i < calls.length; i += chunk) {
                        promises.push(multicall(multicallContract, erc20Abi, calls.slice(i, i + chunk)));
                    }
                    Promise.all(promises)
                        .then(function (res) {
                        var e_1, _a;
                        var _b, _c;
                        if (res) {
                            var _balances = [];
                            try {
                                for (var res_1 = __values(res), res_1_1 = res_1.next(); !res_1_1.done; res_1_1 = res_1.next()) {
                                    var res1 = res_1_1.value;
                                    _balances = _balances.concat(res1);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (res_1_1 && !res_1_1.done && (_a = res_1.return)) _a.call(res_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            var tempBalances_1 = {};
                            for (var i = 0; i < validatedTokenAddresses.length; i++) {
                                tempBalances_1[(_b = validatedTokenAddresses[i]) === null || _b === void 0 ? void 0 : _b.toLowerCase()] = (_c = _balances[i]) === null || _c === void 0 ? void 0 : _c[0];
                            }
                            setBalanceState(function (prev) { return (__assign(__assign({}, prev), { balances: tempBalances_1, chainId: chainId, fetchStatus: SUCCESS })); });
                        }
                    })
                        .catch(function (e) {
                        console.log("fetch balance error", e);
                        setBalanceState(function (prev) { return (__assign(__assign({}, prev), { chainId: chainId, fetchStatus: FAILED })); });
                    });
                }
                return [2 /*return*/];
            });
        }); };
        if (account && chainId && chainProviders[chainId] && validatedTokenAddresses.length) {
            setBalanceState(function (prev) { return (__assign(__assign({}, prev), { chainId: chainId, fetchStatus: LOADING })); });
            fetchBalance();
        }
        else {
            setBalanceState({
                chainId: chainId,
                balances: {},
                fetchStatus: NOT_FETCHED,
            });
        }
    }, [account, chainProviders, validatedTokenAddresses, chainId, SUCCESS, FAILED, LOADING]);
    return balanceState;
};
function useCurrencyBalances(chainId, currencies) {
    var tokenBalances = useTokenBalances(chainId).balances;
    var containsETH = useMemo(function () { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.some(function (currency) { return currency === ZERO_ADDRESS; })) !== null && _a !== void 0 ? _a : false; }, [currencies]);
    var ethBalance = useGetEthBalance(containsETH ? chainId : 0).balance;
    return useMemo(function () {
        var _a;
        return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.map(function (currency) {
            if (!currency)
                return undefined;
            if (currency !== ZERO_ADDRESS)
                return tokenBalances[currency === null || currency === void 0 ? void 0 : currency.toLowerCase()];
            if (currency === ZERO_ADDRESS)
                return ethBalance;
            return undefined;
        })) !== null && _a !== void 0 ? _a : [];
    }, [chainId, currencies, ethBalance, tokenBalances]);
}
function useCurrencyBalance(chainId, currency) {
    return useCurrencyBalances(chainId, [currency])[0];
}

var SettingsIcon = function () {
    return (jsx("svg", __assign({ width: "21", height: "22", viewBox: "0 0 21 22", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx("path", { d: "M9.51367 21.2227H11.4863C11.8314 21.2227 12.1211 21.1283 12.3555 20.9395C12.5964 20.7507 12.7559 20.4837 12.834 20.1387L13.2637 18.2637L13.7324 18.0977L15.373 19.1133C15.666 19.3021 15.9655 19.377 16.2715 19.3379C16.5775 19.2988 16.8509 19.1589 17.0918 18.918L18.4688 17.5508C18.7161 17.3034 18.8561 17.0267 18.8887 16.7207C18.9277 16.4147 18.8561 16.1152 18.6738 15.8223L17.6387 14.1914L17.8145 13.7422L19.6895 13.293C20.028 13.2148 20.2917 13.0553 20.4805 12.8145C20.6758 12.5736 20.7734 12.2839 20.7734 11.9453V10.002C20.7734 9.6569 20.6758 9.36719 20.4805 9.13281C20.2917 8.89193 20.028 8.72917 19.6895 8.64453L17.8242 8.20508L17.6387 7.72656L18.6738 6.0957C18.8626 5.80924 18.9375 5.51302 18.8984 5.20703C18.8594 4.90104 18.7194 4.62435 18.4785 4.37695L17.1016 3C16.8607 2.76562 16.5872 2.62891 16.2812 2.58984C15.9753 2.55078 15.679 2.6224 15.3926 2.80469L13.752 3.83008L13.2637 3.64453L12.834 1.75977C12.7559 1.42122 12.5964 1.15755 12.3555 0.96875C12.1211 0.773438 11.8314 0.675781 11.4863 0.675781H9.51367C9.16862 0.675781 8.87565 0.773438 8.63477 0.96875C8.39388 1.15755 8.23438 1.42122 8.15625 1.75977L7.7168 3.64453L7.23828 3.83008L5.59766 2.80469C5.30469 2.6224 5.00521 2.55078 4.69922 2.58984C4.39974 2.62891 4.1263 2.76562 3.87891 3L2.51172 4.37695C2.26432 4.62435 2.12109 4.90104 2.08203 5.20703C2.04948 5.51302 2.1276 5.80924 2.31641 6.0957L3.3418 7.72656L3.16602 8.20508L1.30078 8.64453C0.955729 8.72917 0.688802 8.89193 0.5 9.13281C0.311198 9.36719 0.216797 9.6569 0.216797 10.002V11.9453C0.216797 12.2839 0.311198 12.5736 0.5 12.8145C0.695312 13.0553 0.96224 13.2148 1.30078 13.293L3.17578 13.7422L3.3418 14.1914L2.31641 15.8223C2.13411 16.1152 2.05924 16.4147 2.0918 16.7207C2.12435 17.0267 2.26758 17.3034 2.52148 17.5508L3.88867 18.918C4.12956 19.1589 4.40299 19.2988 4.70898 19.3379C5.02148 19.377 5.32422 19.3021 5.61719 19.1133L7.24805 18.0977L7.7168 18.2637L8.15625 20.1387C8.23438 20.4837 8.39388 20.7507 8.63477 20.9395C8.87565 21.1283 9.16862 21.2227 9.51367 21.2227ZM9.64062 20.0605C9.41276 20.0605 9.27604 19.9499 9.23047 19.7285L8.67383 17.3555C8.40039 17.2839 8.13997 17.1992 7.89258 17.1016C7.64518 16.9974 7.42057 16.89 7.21875 16.7793L5.14844 18.0684C4.97266 18.1921 4.79688 18.1693 4.62109 18L3.42969 16.8086C3.27344 16.6523 3.25391 16.4766 3.37109 16.2812L4.66016 14.2207C4.5625 14.0189 4.46159 13.7975 4.35742 13.5566C4.25326 13.3092 4.16536 13.0521 4.09375 12.7852L1.71094 12.2285C1.49609 12.1829 1.38867 12.0462 1.38867 11.8184V10.1191C1.38867 9.89779 1.49609 9.76107 1.71094 9.70898L4.08398 9.15234C4.1556 8.8724 4.24674 8.60872 4.35742 8.36133C4.4681 8.10742 4.5625 7.88932 4.64062 7.70703L3.36133 5.64648C3.24414 5.44466 3.26042 5.26562 3.41016 5.10938L4.61133 3.92773C4.7806 3.76497 4.95964 3.74219 5.14844 3.85938L7.20898 5.12891C7.41081 5.02474 7.63867 4.92057 7.89258 4.81641C8.15299 4.71224 8.41341 4.62435 8.67383 4.55273L9.23047 2.17969C9.27604 1.95833 9.41276 1.84766 9.64062 1.84766H11.3594C11.5872 1.84766 11.7207 1.95833 11.7598 2.17969L12.3262 4.5625C12.5996 4.64062 12.8568 4.73177 13.0977 4.83594C13.3451 4.93359 13.5664 5.03451 13.7617 5.13867L15.832 3.85938C16.0273 3.74219 16.2096 3.76497 16.3789 3.92773L17.5703 5.10938C17.7266 5.26562 17.7428 5.44466 17.6191 5.64648L16.3398 7.70703C16.4245 7.88932 16.5221 8.10417 16.6328 8.35156C16.7435 8.59896 16.8346 8.86589 16.9062 9.15234L19.2793 9.70898C19.5007 9.76107 19.6113 9.89779 19.6113 10.1191V11.8184C19.6113 12.0462 19.5007 12.1829 19.2793 12.2285L16.8965 12.7852C16.8249 13.0521 16.737 13.3092 16.6328 13.5566C16.5352 13.7975 16.4342 14.0189 16.3301 14.2207L17.6094 16.2812C17.7331 16.4766 17.7168 16.6523 17.5605 16.8086L16.3691 18C16.1934 18.1693 16.0143 18.1921 15.832 18.0684L13.7617 16.7793C13.5664 16.89 13.3451 16.9974 13.0977 17.1016C12.8503 17.1992 12.5931 17.2839 12.3262 17.3555L11.7598 19.7285C11.7207 19.9499 11.5872 20.0605 11.3594 20.0605H9.64062ZM10.5 14.6895C11.1836 14.6895 11.8053 14.5202 12.3652 14.1816C12.9316 13.8431 13.3841 13.3906 13.7227 12.8242C14.0612 12.2578 14.2305 11.6328 14.2305 10.9492C14.2305 10.2721 14.0612 9.65365 13.7227 9.09375C13.3841 8.52734 12.9316 8.07487 12.3652 7.73633C11.8053 7.39779 11.1836 7.22852 10.5 7.22852C9.81641 7.22852 9.19141 7.39779 8.625 7.73633C8.0651 8.07487 7.61263 8.52734 7.26758 9.09375C6.92904 9.65365 6.75977 10.2721 6.75977 10.9492C6.75977 11.6328 6.92904 12.2578 7.26758 12.8242C7.60612 13.3906 8.05859 13.8431 8.625 14.1816C9.19141 14.5202 9.81641 14.6895 10.5 14.6895ZM10.5 13.5273C10.0312 13.5273 9.60156 13.4102 9.21094 13.1758C8.82682 12.9414 8.51758 12.6289 8.2832 12.2383C8.04883 11.8477 7.93164 11.418 7.93164 10.9492C7.93164 10.487 8.04883 10.0638 8.2832 9.67969C8.51758 9.28906 8.83008 8.97656 9.2207 8.74219C9.61133 8.50781 10.0378 8.39062 10.5 8.39062C10.9622 8.39062 11.3854 8.50781 11.7695 8.74219C12.1602 8.97656 12.4694 9.28906 12.6973 9.67969C12.9316 10.0638 13.0488 10.487 13.0488 10.9492C13.0488 11.418 12.9316 11.8477 12.6973 12.2383C12.4694 12.6224 12.1602 12.9349 11.7695 13.1758C11.3854 13.4102 10.9622 13.5273 10.5 13.5273Z", fill: "black" }) })));
};
var CloseIcon = function () {
    return (jsx("svg", __assign({ width: "25", height: "26", viewBox: "0 0 25 26", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx("path", { d: "M12.4287 25.4302C14.1051 25.4302 15.6799 25.1087 17.1528 24.4658C18.634 23.8311 19.936 22.9521 21.0591 21.8291C22.1821 20.6979 23.0651 19.3958 23.708 17.9229C24.3509 16.4417 24.6724 14.863 24.6724 13.1865C24.6724 11.5101 24.3509 9.93538 23.708 8.4624C23.0651 6.98128 22.1821 5.6792 21.0591 4.55615C19.936 3.42497 18.634 2.54199 17.1528 1.90723C15.6717 1.26432 14.0929 0.942871 12.4165 0.942871C10.7401 0.942871 9.1613 1.26432 7.68018 1.90723C6.20719 2.54199 4.90918 3.42497 3.78613 4.55615C2.66309 5.6792 1.78011 6.98128 1.13721 8.4624C0.502441 9.93538 0.185059 11.5101 0.185059 13.1865C0.185059 14.863 0.502441 16.4417 1.13721 17.9229C1.78011 19.3958 2.66309 20.6979 3.78613 21.8291C4.91732 22.9521 6.2194 23.8311 7.69238 24.4658C9.1735 25.1087 10.7523 25.4302 12.4287 25.4302ZM8.77881 18.8506C8.57536 18.8506 8.40446 18.7855 8.26611 18.6553C8.1359 18.5251 8.0708 18.3664 8.0708 18.1792C8.0708 18.0083 8.12777 17.8415 8.2417 17.6787L11.4766 13.0767L8.37598 8.65771C8.23763 8.4624 8.16846 8.27523 8.16846 8.09619C8.16846 7.89274 8.2417 7.72184 8.38818 7.5835C8.53467 7.44515 8.7137 7.37598 8.92529 7.37598C9.08805 7.37598 9.22233 7.40853 9.32812 7.47363C9.44206 7.53874 9.55192 7.6486 9.65771 7.80322L12.4775 11.978H12.5386L15.334 7.81543C15.4316 7.65267 15.5334 7.53874 15.6392 7.47363C15.7531 7.40853 15.8874 7.37598 16.042 7.37598C16.2454 7.37598 16.4163 7.44108 16.5547 7.57129C16.7012 7.7015 16.7744 7.86426 16.7744 8.05957C16.7744 8.23047 16.7093 8.40137 16.5791 8.57227L13.3564 13.1133L16.5547 17.6299C16.6768 17.7926 16.7378 17.9635 16.7378 18.1426C16.7378 18.3542 16.6646 18.5251 16.5181 18.6553C16.3797 18.7855 16.2007 18.8506 15.981 18.8506C15.8263 18.8506 15.6961 18.818 15.5903 18.7529C15.4845 18.6878 15.3747 18.5739 15.2607 18.4111L12.4165 14.2485H12.3677L9.51123 18.4111C9.38916 18.5739 9.27523 18.6878 9.16943 18.7529C9.07178 18.818 8.94157 18.8506 8.77881 18.8506Z", fill: "black" }) })));
};
var WalletIcon = function () {
    return (jsx("svg", __assign({ width: "30", height: "18", viewBox: "0 0 30 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx("path", { d: "M4.47656 12.1367H6.62988C6.8877 12.1367 7.0957 12.0605 7.25391 11.9082C7.41211 11.75 7.49121 11.5449 7.49121 11.293V9.66699C7.49121 9.41504 7.41211 9.21289 7.25391 9.06055C7.0957 8.90234 6.8877 8.82324 6.62988 8.82324H4.47656C4.21875 8.82324 4.01074 8.90234 3.85254 9.06055C3.69434 9.21289 3.61523 9.41504 3.61523 9.66699V11.293C3.61523 11.5449 3.69434 11.75 3.85254 11.9082C4.01074 12.0605 4.21875 12.1367 4.47656 12.1367ZM1.3125 5.50977H20.6133V3.5498H1.3125V5.50977ZM3.3252 15.002H18.5654C19.4268 15.002 20.0742 14.7852 20.5078 14.3516C20.9414 13.9238 21.1582 13.2881 21.1582 12.4443V2.89941C21.1582 2.05566 20.9414 1.41699 20.5078 0.983398C20.0742 0.549805 19.4268 0.333008 18.5654 0.333008H3.3252C2.46973 0.333008 1.8252 0.546875 1.3916 0.974609C0.958008 1.40234 0.741211 2.04395 0.741211 2.89941V12.4443C0.741211 13.2939 0.958008 13.9326 1.3916 14.3604C1.8252 14.7881 2.46973 15.002 3.3252 15.002ZM3.35156 13.9297C2.85352 13.9297 2.47266 13.8008 2.20898 13.543C1.95117 13.2793 1.82227 12.8926 1.82227 12.3828V2.95215C1.82227 2.44824 1.95117 2.06445 2.20898 1.80078C2.47266 1.53711 2.85352 1.40527 3.35156 1.40527H18.5479C19.0342 1.40527 19.4092 1.53711 19.6729 1.80078C19.9424 2.06445 20.0771 2.44824 20.0771 2.95215V12.3828C20.0771 12.8926 19.9424 13.2793 19.6729 13.543C19.4092 13.8008 19.0342 13.9297 18.5479 13.9297H3.35156ZM38.359", fill: "white" }) })));
};
var BscscanIcon = function () {
    return (jsxs("svg", __assign({ width: "135", height: "16", viewBox: "0 0 135 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { d: "M7.70312 5.26172L6.99219 5.97949C7.50716 5.98405 7.94238 6.05697 8.29785 6.19824C8.65332 6.33496 8.96322 6.53548 9.22754 6.7998C9.63314 7.20996 9.9043 7.66569 10.041 8.16699C10.1777 8.66829 10.1777 9.1696 10.041 9.6709C9.9043 10.1676 9.62858 10.6234 9.21387 11.0381L6.98535 13.2598C6.57064 13.6745 6.11263 13.9502 5.61133 14.0869C5.11003 14.2282 4.60872 14.2305 4.10742 14.0938C3.61068 13.9616 3.15723 13.6927 2.74707 13.2871C2.33691 12.8724 2.06348 12.4144 1.92676 11.9131C1.7946 11.4118 1.79688 10.9128 1.93359 10.416C2.07487 9.91471 2.35286 9.45671 2.76758 9.04199L4.37402 7.43555C4.30111 7.2806 4.25553 7.10742 4.2373 6.91602C4.21908 6.72461 4.23047 6.53548 4.27148 6.34863L2.11816 8.50195C1.59408 9.02604 1.24316 9.6071 1.06543 10.2451C0.887695 10.8786 0.885417 11.5143 1.05859 12.1523C1.23633 12.7904 1.58952 13.3737 2.11816 13.9023C2.65592 14.4401 3.24382 14.7956 3.88184 14.9688C4.51986 15.1419 5.1556 15.1396 5.78906 14.9619C6.42708 14.7842 7.00586 14.4355 7.52539 13.916L9.85645 11.5781C10.3805 11.054 10.7314 10.4753 10.9092 9.8418C11.0869 9.20378 11.0892 8.56576 10.916 7.92773C10.7428 7.28971 10.3896 6.70638 9.85645 6.17773C9.60124 5.91797 9.30501 5.71061 8.96777 5.55566C8.63053 5.40072 8.20898 5.30273 7.70312 5.26172ZM8.31836 10.7578L9.0293 10.04C8.51432 10.0355 8.0791 9.96484 7.72363 9.82812C7.36816 9.68685 7.05827 9.48405 6.79395 9.21973C6.37923 8.80501 6.10352 8.34928 5.9668 7.85254C5.83464 7.35124 5.83691 6.84993 5.97363 6.34863C6.11491 5.84733 6.3929 5.3916 6.80762 4.98145L9.0293 2.75293C9.44857 2.34277 9.90658 2.06934 10.4033 1.93262C10.9046 1.79134 11.4036 1.78678 11.9004 1.91895C12.4017 2.05111 12.8574 2.32454 13.2676 2.73926C13.6777 3.14941 13.9512 3.60514 14.0879 4.10645C14.2246 4.60319 14.2223 5.10221 14.0811 5.60352C13.9443 6.10482 13.6686 6.56283 13.2539 6.97754L11.6475 8.57715C11.7204 8.73665 11.7637 8.91211 11.7773 9.10352C11.7956 9.29492 11.7842 9.48177 11.7432 9.66406L13.9033 7.51074C14.4229 6.98665 14.7715 6.40788 14.9492 5.77441C15.127 5.14095 15.1292 4.50521 14.9561 3.86719C14.7829 3.22917 14.4297 2.64355 13.8965 2.11035C13.3633 1.57715 12.7777 1.22396 12.1396 1.05078C11.5016 0.873047 10.8636 0.873047 10.2256 1.05078C9.59212 1.22852 9.01335 1.57943 8.48926 2.10352L6.1582 4.44141C5.63411 4.96549 5.2832 5.54655 5.10547 6.18457C4.93229 6.81803 4.93229 7.45378 5.10547 8.0918C5.27865 8.72982 5.63184 9.31315 6.16504 9.8418C6.42025 10.1016 6.71647 10.3089 7.05371 10.4639C7.39095 10.6188 7.8125 10.7168 8.31836 10.7578ZM29.4056 2.948H28.3556L25.0796 11.796L21.8316 2.948H20.7396L24.4916 13H25.6396L29.4056 2.948ZM32.0528 3.914C32.0528 3.494 31.7308 3.186 31.2548 3.186C30.7928 3.186 30.4708 3.494 30.4708 3.914C30.4708 4.348 30.7928 4.656 31.2548 4.656C31.7308 4.656 32.0528 4.348 32.0528 3.914ZM31.7588 13V5.622H30.7788V13H31.7588ZM36.7804 13.14C38.4744 13.14 39.7204 12.146 40.0564 10.508H39.0904C38.8524 11.684 37.9984 12.37 36.7664 12.37C35.3244 12.37 34.4004 11.292 34.3164 9.542H40.0284C40.1964 7.176 38.8244 5.482 36.7244 5.482C34.7644 5.482 33.3364 7.092 33.3364 9.248C33.3364 11.586 34.7084 13.14 36.7804 13.14ZM36.7104 6.238C38.0684 6.238 38.9224 7.218 39.0064 8.87H34.3164C34.4424 7.26 35.3804 6.238 36.7104 6.238ZM47.6436 13H48.6236L50.7936 5.622H49.8136L48.1056 11.628L46.2016 5.622H45.2356L43.3176 11.614L41.6096 5.622H40.6436L42.7996 13H43.7936L45.7116 6.924L47.6436 13ZM57.9457 13.14C59.9897 13.14 61.4597 11.53 61.4597 9.304C61.4597 7.092 59.9897 5.496 57.9457 5.496C55.9157 5.496 54.4457 7.092 54.4457 9.304C54.4457 11.53 55.9157 13.14 57.9457 13.14ZM57.9457 12.286C56.5177 12.286 55.4397 11.138 55.4397 9.304C55.4397 7.498 56.5177 6.35 57.9457 6.35C59.3877 6.35 60.4657 7.498 60.4657 9.304C60.4657 11.138 59.3877 12.286 57.9457 12.286ZM64.0245 8.702C64.0245 7.33 64.9485 6.336 66.0965 6.336C67.3005 6.336 67.9445 7.134 67.9445 8.548V13H68.9245V8.212C68.9245 6.462 67.9305 5.482 66.3905 5.482C65.3265 5.482 64.4305 6.098 63.9545 7.008V5.622H63.0445V13H64.0245V8.702ZM80.7456 10.186C80.7456 8.982 80.0456 8.1 78.6876 7.764C79.7096 7.386 80.3396 6.532 80.3396 5.538C80.3396 3.886 79.1916 2.948 77.2456 2.948H73.9836V13H77.4556C79.4296 13 80.7456 11.978 80.7456 10.186ZM77.1896 3.802C78.5476 3.802 79.3176 4.474 79.3176 5.594C79.3176 6.714 78.5476 7.386 77.1896 7.386H74.9636V3.802H77.1896ZM77.3996 8.24C78.8696 8.24 79.7376 8.954 79.7376 10.158C79.7376 11.418 78.8696 12.146 77.3996 12.146H74.9636V8.24H77.3996ZM89.7619 10.214C89.7619 8.702 88.7959 8.002 87.1019 7.652L85.8279 7.386C84.7079 7.162 83.6999 6.798 83.6999 5.608C83.6999 4.6 84.5259 3.662 86.0659 3.662C87.5079 3.662 88.4879 4.628 88.5579 5.958H89.6359C89.5239 4.04 88.0119 2.808 86.0519 2.808C84.0499 2.808 82.6359 4.054 82.6359 5.664C82.6359 7.414 84.0359 8.03 85.3659 8.296L86.6399 8.548C88.0679 8.842 88.6559 9.318 88.6559 10.354C88.6559 11.558 87.5359 12.286 86.1079 12.286C84.3719 12.286 83.4759 11.362 83.3779 9.934H82.3139C82.4119 11.838 83.7839 13.14 86.1219 13.14C88.4599 13.14 89.7619 11.81 89.7619 10.214ZM95.7826 13.21C98.1766 13.21 100.151 11.586 100.543 9.192H99.4366C99.1286 10.984 97.6446 12.272 95.7826 12.272C93.5566 12.272 91.9466 10.452 91.9466 7.96C91.9466 5.496 93.5566 3.676 95.7826 3.676C97.6306 3.676 99.1146 4.95 99.4366 6.742H100.543C100.151 4.348 98.1766 2.738 95.7826 2.738C92.9826 2.738 90.8686 5.006 90.8686 7.96C90.8686 10.928 92.9826 13.21 95.7826 13.21ZM112.211 10.214C112.211 8.702 111.245 8.002 109.551 7.652L108.277 7.386C107.157 7.162 106.149 6.798 106.149 5.608C106.149 4.6 106.975 3.662 108.515 3.662C109.957 3.662 110.937 4.628 111.007 5.958H112.085C111.973 4.04 110.461 2.808 108.501 2.808C106.499 2.808 105.085 4.054 105.085 5.664C105.085 7.414 106.485 8.03 107.815 8.296L109.089 8.548C110.517 8.842 111.105 9.318 111.105 10.354C111.105 11.558 109.985 12.286 108.557 12.286C106.821 12.286 105.925 11.362 105.827 9.934H104.763C104.861 11.838 106.233 13.14 108.571 13.14C110.909 13.14 112.211 11.81 112.211 10.214ZM116.853 13.154C118.589 13.154 119.835 12.02 120.101 10.144H119.107C118.883 11.516 118.057 12.3 116.853 12.3C115.481 12.3 114.543 11.096 114.543 9.304C114.543 7.54 115.481 6.336 116.853 6.336C118.043 6.336 118.883 7.134 119.107 8.478H120.101C119.807 6.63 118.575 5.482 116.853 5.482C114.921 5.482 113.549 7.064 113.549 9.304C113.549 11.572 114.907 13.154 116.853 13.154ZM126.219 13H127.059V8.198C127.059 6.49 126.051 5.482 124.329 5.482C122.649 5.482 121.515 6.574 121.473 8.212H122.369C122.383 7.008 123.139 6.266 124.343 6.266C125.463 6.266 126.121 6.994 126.121 8.226V8.842C125.393 8.786 125.057 8.758 124.609 8.758C122.369 8.758 121.221 9.514 121.221 10.956C121.221 12.286 122.215 13.14 123.741 13.14C124.889 13.14 125.785 12.58 126.219 11.656V13ZM122.159 10.928C122.159 9.906 122.971 9.416 124.651 9.416C125.057 9.416 125.491 9.43 126.121 9.486V10.144C126.121 11.53 125.253 12.426 123.881 12.426C122.845 12.426 122.159 11.824 122.159 10.928ZM130.101 8.702C130.101 7.33 131.025 6.336 132.173 6.336C133.377 6.336 134.021 7.134 134.021 8.548V13H135.001V8.212C135.001 6.462 134.007 5.482 132.467 5.482C131.403 5.482 130.507 6.098 130.031 7.008V5.622H129.121V13H130.101V8.702Z", fill: "url(#paint0_linear_1683_2182)" }), jsx("defs", { children: jsxs("linearGradient", __assign({ id: "paint0_linear_1683_2182", x1: "-1.23306", y1: "7.49959", x2: "134.912", y2: "2.99661", gradientUnits: "userSpaceOnUse" }, { children: [jsx("stop", { "stop-color": "#E27EAC" }), jsx("stop", { offset: "1", "stop-color": "#A35CE3" })] })) })] })));
};
var SuccessIcon = function () {
    return (jsx("svg", __assign({ width: "75", height: "75", viewBox: "0 0 75 75", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M37.5 0C16.7898 0 0 16.7898 0 37.5C0 58.2102 16.7898 75 37.5 75C58.2102 75 75 58.2102 75 37.5C75 16.7898 58.2102 0 37.5 0ZM53.7545 31.1591C54.0539 30.817 54.2817 30.4184 54.4247 29.9869C54.5677 29.5554 54.623 29.0997 54.5873 28.6465C54.5516 28.1934 54.4256 27.7519 54.2167 27.3482C54.0079 26.9444 53.7204 26.5865 53.3712 26.2955C53.022 26.0045 52.6181 25.7862 52.1833 25.6536C51.7485 25.521 51.2916 25.4767 50.8394 25.5233C50.3872 25.5699 49.9489 25.7064 49.5503 25.9249C49.1516 26.1434 48.8007 26.4394 48.5182 26.7955L33.8591 44.383L26.2739 36.7943C25.6309 36.1733 24.7698 35.8297 23.8759 35.8375C22.9821 35.8452 22.127 36.2038 21.4949 36.8358C20.8629 37.4679 20.5043 38.323 20.4966 39.2168C20.4888 40.1107 20.8324 40.9718 21.4534 41.6148L31.6807 51.842C32.0156 52.1768 32.4167 52.4381 32.8582 52.6093C33.2998 52.7805 33.7722 52.8578 34.2452 52.8363C34.7183 52.8148 35.1817 52.695 35.6059 52.4845C36.0302 52.274 36.4059 51.9774 36.7091 51.6136L53.7545 31.1591Z", fill: "#519F6C" }) })));
};
var FailedIcon = function () {
    return (jsx("svg", __assign({ width: "75", height: "75", viewBox: "0 0 75 75", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M37.5 0C16.7898 0 0 16.7898 0 37.5C0 58.2102 16.7898 75 37.5 75C58.2102 75 75 58.2102 75 37.5C75 16.7898 58.2102 0 37.5 0ZM50.1375 29.683C50.7585 29.04 51.1021 28.1789 51.0943 27.285C51.0866 26.3911 50.728 25.5361 50.096 24.904C49.4639 24.272 48.6089 23.9134 47.715 23.9057C46.8212 23.8979 45.96 24.2415 45.317 24.8625L37.5 32.6795L29.683 24.8625C29.3685 24.5369 28.9923 24.2772 28.5764 24.0985C28.1605 23.9198 27.7131 23.8258 27.2605 23.8219C26.8078 23.8179 26.3589 23.9042 25.9399 24.0756C25.521 24.247 25.1403 24.5002 24.8202 24.8202C24.5002 25.1403 24.247 25.521 24.0756 25.9399C23.9042 26.3589 23.8179 26.8078 23.8219 27.2605C23.8258 27.7131 23.9198 28.1605 24.0985 28.5764C24.2772 28.9923 24.5369 29.3685 24.8625 29.683L32.6795 37.5L24.8625 45.317C24.5369 45.6315 24.2772 46.0077 24.0985 46.4236C23.9198 46.8395 23.8258 47.2869 23.8219 47.7395C23.8179 48.1922 23.9042 48.6411 24.0756 49.0601C24.247 49.479 24.5002 49.8597 24.8202 50.1798C25.1403 50.4998 25.521 50.753 25.9399 50.9244C26.3589 51.0958 26.8078 51.1821 27.2605 51.1781C27.7131 51.1742 28.1605 51.0802 28.5764 50.9015C28.9923 50.7228 29.3685 50.4631 29.683 50.1375L37.5 42.3205L45.317 50.1375C45.96 50.7585 46.8212 51.1021 47.715 51.0943C48.6089 51.0866 49.4639 50.728 50.096 50.096C50.728 49.4639 51.0866 48.6089 51.0943 47.715C51.1021 46.8212 50.7585 45.96 50.1375 45.317L42.3205 37.5L50.1375 29.683Z", fill: "#D54E40" }) })));
};
var PendingIcon = function () {
    return (jsx("svg", __assign({ width: "76", height: "75", viewBox: "0 0 76 75", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsx("path", { d: "M37.4816 75C38.4152 75 39.2015 74.6683 39.8403 74.0049C40.5037 73.3415 40.8354 72.5553 40.8354 71.6462C40.8354 70.7371 40.5037 69.9509 39.8403 69.2875C39.2015 68.6486 38.4152 68.3292 37.4816 68.3292C36.597 68.3292 35.8231 68.6486 35.1597 69.2875C34.5209 69.9509 34.2015 70.7371 34.2015 71.6462C34.2015 72.5553 34.5209 73.3415 35.1597 74.0049C35.8231 74.6683 36.597 75 37.4816 75ZM48.0958 73.3047C49.0049 73.3047 49.7912 72.973 50.4545 72.3096C51.1179 71.6708 51.4496 70.8845 51.4496 69.9509C51.4496 69.0418 51.1179 68.2555 50.4545 67.5921C49.7912 66.9533 49.0049 66.6339 48.0958 66.6339C47.1867 66.6339 46.4005 66.9656 45.7371 67.629C45.0983 68.2924 44.7789 69.0663 44.7789 69.9509C44.7789 70.8845 45.0983 71.6708 45.7371 72.3096C46.4005 72.973 47.1867 73.3047 48.0958 73.3047ZM57.6413 68.4398C58.5504 68.4398 59.3366 68.1081 60 67.4447C60.6634 66.7813 60.9951 65.9951 60.9951 65.086C60.9951 64.1769 60.6634 63.4029 60 62.7641C59.3366 62.1007 58.5504 61.769 57.6413 61.769C56.7322 61.769 55.9459 62.1007 55.2826 62.7641C54.6437 63.4029 54.3243 64.1769 54.3243 65.086C54.3243 65.9951 54.6437 66.7813 55.2826 67.4447C55.9459 68.1081 56.7322 68.4398 57.6413 68.4398ZM65.1966 60.8477C66.1302 60.8477 66.9165 60.5283 67.5553 59.8894C68.2187 59.226 68.5504 58.4275 68.5504 57.4939C68.5504 56.6093 68.2187 55.8477 67.5553 55.2088C66.9165 54.5455 66.1302 54.2138 65.1966 54.2138C64.2875 54.2138 63.5012 54.5455 62.8378 55.2088C62.199 55.8477 61.8796 56.6093 61.8796 57.4939C61.8796 58.4275 62.199 59.226 62.8378 59.8894C63.5012 60.5283 64.2875 60.8477 65.1966 60.8477ZM70.0246 51.4128C70.9582 51.4128 71.7445 51.0811 72.3833 50.4177C73.0467 49.7543 73.3784 48.9681 73.3784 48.059C73.3784 47.1499 73.0467 46.3759 72.3833 45.7371C71.7445 45.0737 70.9582 44.742 70.0246 44.742C69.1155 44.742 68.3292 45.0737 67.6658 45.7371C67.027 46.3759 66.7076 47.1499 66.7076 48.059C66.7076 48.9681 67.027 49.7543 67.6658 50.4177C68.3292 51.0811 69.1155 51.4128 70.0246 51.4128ZM71.8305 40.8354C72.7641 40.8354 73.5504 40.5037 74.1892 39.8403C74.8526 39.1769 75.1843 38.3907 75.1843 37.4816C75.1843 36.5725 74.8526 35.7985 74.1892 35.1597C73.5504 34.4963 72.7641 34.1646 71.8305 34.1646C70.9459 34.1646 70.172 34.4963 69.5086 35.1597C68.8698 35.7985 68.5504 36.5725 68.5504 37.4816C68.5504 38.3907 68.8698 39.1769 69.5086 39.8403C70.1474 40.5037 70.9214 40.8354 71.8305 40.8354ZM70.0246 30.258C70.9582 30.258 71.7445 29.9386 72.3833 29.2998C73.0467 28.6364 73.3784 27.8501 73.3784 26.941C73.3784 26.0319 73.0467 25.2457 72.3833 24.5823C71.7445 23.9189 70.9582 23.5872 70.0246 23.5872C69.1155 23.5872 68.3292 23.9189 67.6658 24.5823C67.027 25.2457 66.7076 26.0319 66.7076 26.941C66.7076 27.8501 67.027 28.6364 67.6658 29.2998C68.3292 29.9386 69.1155 30.258 70.0246 30.258ZM65.1966 20.7862C66.1302 20.7862 66.9165 20.4668 67.5553 19.828C68.2187 19.1646 68.5504 18.3907 68.5504 17.5061C68.5504 16.5725 68.2187 15.7862 67.5553 15.1474C66.9165 14.484 66.1302 14.1523 65.1966 14.1523C64.2875 14.1523 63.5012 14.484 62.8378 15.1474C62.199 15.7862 61.8796 16.5725 61.8796 17.5061C61.8796 18.3907 62.199 19.1646 62.8378 19.828C63.5012 20.4668 64.2875 20.7862 65.1966 20.7862ZM57.6413 13.231C58.5504 13.231 59.3366 12.9115 60 12.2727C60.6634 11.6093 60.9951 10.8231 60.9951 9.914C60.9951 9.00491 60.6634 8.21867 60 7.55528C59.3366 6.89189 58.5504 6.5602 57.6413 6.5602C56.7322 6.5602 55.9459 6.89189 55.2826 7.55528C54.6437 8.21867 54.3243 9.00491 54.3243 9.914C54.3243 10.8231 54.6437 11.6093 55.2826 12.2727C55.9459 12.9115 56.7322 13.231 57.6413 13.231ZM48.0958 8.36609C49.0049 8.36609 49.7912 8.04668 50.4545 7.40786C51.1179 6.74447 51.4496 5.95823 51.4496 5.04914C51.4496 4.11548 51.1179 3.32924 50.4545 2.69042C49.7912 2.02703 49.0049 1.69533 48.0958 1.69533C47.1867 1.69533 46.4005 2.02703 45.7371 2.69042C45.0983 3.32924 44.7789 4.11548 44.7789 5.04914C44.7789 5.93366 45.0983 6.70762 45.7371 7.37101C46.4005 8.0344 47.1867 8.36609 48.0958 8.36609ZM37.4816 6.67076C38.4152 6.67076 39.2015 6.35135 39.8403 5.71253C40.5037 5.04914 40.8354 4.2629 40.8354 3.35381C40.8354 2.44472 40.5037 1.65848 39.8403 0.995086C39.2015 0.331695 38.4152 0 37.4816 0C36.597 0 35.8231 0.331695 35.1597 0.995086C34.5209 1.65848 34.2015 2.44472 34.2015 3.35381C34.2015 4.2629 34.5209 5.04914 35.1597 5.71253C35.8231 6.35135 36.597 6.67076 37.4816 6.67076ZM26.9779 8.36609C27.8624 8.36609 28.6364 8.0344 29.2998 7.37101C29.9631 6.70762 30.2948 5.93366 30.2948 5.04914C30.2948 4.11548 29.9631 3.32924 29.2998 2.69042C28.6609 2.02703 27.887 1.69533 26.9779 1.69533C26.0442 1.69533 25.2457 2.02703 24.5823 2.69042C23.9435 3.32924 23.6241 4.11548 23.6241 5.04914C23.6241 5.95823 23.9435 6.74447 24.5823 7.40786C25.2457 8.04668 26.0442 8.36609 26.9779 8.36609ZM17.4693 13.231C18.3784 13.231 19.1523 12.9115 19.7912 12.2727C20.4545 11.6093 20.7862 10.8231 20.7862 9.914C20.7862 9.00491 20.4545 8.21867 19.7912 7.55528C19.1523 6.89189 18.3784 6.5602 17.4693 6.5602C16.5602 6.5602 15.774 6.89189 15.1106 7.55528C14.4472 8.21867 14.1155 9.00491 14.1155 9.914C14.1155 10.8231 14.4472 11.6093 15.1106 12.2727C15.774 12.9115 16.5602 13.231 17.4693 13.231ZM9.95086 20.7862C10.8354 20.7862 11.6093 20.4668 12.2727 19.828C12.9361 19.1646 13.2678 18.3907 13.2678 17.5061C13.2678 16.5725 12.9361 15.7862 12.2727 15.1474C11.6339 14.484 10.86 14.1523 9.95086 14.1523C9.0172 14.1523 8.21867 14.484 7.55528 15.1474C6.91646 15.7862 6.59705 16.5725 6.59705 17.5061C6.59705 18.3907 6.91646 19.1646 7.55528 19.828C8.21867 20.4668 9.0172 20.7862 9.95086 20.7862ZM5.12285 30.258C6.00737 30.258 6.78133 29.9386 7.44472 29.2998C8.10811 28.6364 8.4398 27.8501 8.4398 26.941C8.4398 26.0319 8.10811 25.2457 7.44472 24.5823C6.8059 23.9189 6.03194 23.5872 5.12285 23.5872C4.18919 23.5872 3.39066 23.9189 2.72727 24.5823C2.08845 25.2457 1.76904 26.0319 1.76904 26.941C1.76904 27.8501 2.08845 28.6364 2.72727 29.2998C3.39066 29.9386 4.18919 30.258 5.12285 30.258ZM3.35381 40.8354C4.2629 40.8354 5.03685 40.5037 5.67568 39.8403C6.3145 39.1769 6.63391 38.3907 6.63391 37.4816C6.63391 36.5725 6.30221 35.7985 5.63882 35.1597C5 34.4963 4.23833 34.1646 3.35381 34.1646C2.44472 34.1646 1.65848 34.4963 0.995086 35.1597C0.331695 35.7985 0 36.5725 0 37.4816C0 38.3907 0.331695 39.1769 0.995086 39.8403C1.65848 40.5037 2.44472 40.8354 3.35381 40.8354ZM5.12285 51.4128C6.03194 51.4128 6.8059 51.0811 7.44472 50.4177C8.10811 49.7543 8.4398 48.9681 8.4398 48.059C8.4398 47.1499 8.10811 46.3759 7.44472 45.7371C6.78133 45.0737 6.00737 44.742 5.12285 44.742C4.18919 44.742 3.39066 45.0737 2.72727 45.7371C2.08845 46.3759 1.76904 47.1499 1.76904 48.059C1.76904 48.9681 2.08845 49.7543 2.72727 50.4177C3.39066 51.0811 4.18919 51.4128 5.12285 51.4128ZM9.95086 60.8477C10.86 60.8477 11.6339 60.5283 12.2727 59.8894C12.9361 59.226 13.2678 58.4275 13.2678 57.4939C13.2678 56.6093 12.9361 55.8477 12.2727 55.2088C11.6093 54.5455 10.8354 54.2138 9.95086 54.2138C9.0172 54.2138 8.21867 54.5455 7.55528 55.2088C6.91646 55.8477 6.59705 56.6093 6.59705 57.4939C6.59705 58.4275 6.91646 59.226 7.55528 59.8894C8.21867 60.5283 9.0172 60.8477 9.95086 60.8477ZM17.4693 68.4398C18.3784 68.4398 19.1523 68.1081 19.7912 67.4447C20.4545 66.7813 20.7862 65.9951 20.7862 65.086C20.7862 64.1769 20.4545 63.4029 19.7912 62.7641C19.1523 62.1007 18.3784 61.769 17.4693 61.769C16.5602 61.769 15.774 62.1007 15.1106 62.7641C14.4472 63.4029 14.1155 64.1769 14.1155 65.086C14.1155 65.9951 14.4472 66.7813 15.1106 67.4447C15.774 68.1081 16.5602 68.4398 17.4693 68.4398ZM26.9779 73.3047C27.887 73.3047 28.6609 72.973 29.2998 72.3096C29.9631 71.6708 30.2948 70.8845 30.2948 69.9509C30.2948 69.0663 29.9631 68.2924 29.2998 67.629C28.6364 66.9656 27.8624 66.6339 26.9779 66.6339C26.0442 66.6339 25.2457 66.9533 24.5823 67.5921C23.9435 68.2555 23.6241 69.0418 23.6241 69.9509C23.6241 70.8845 23.9435 71.6708 24.5823 72.3096C25.2457 72.973 26.0442 73.3047 26.9779 73.3047Z", fill: "#DDA125" }) })));
};
var GradtickIcon = function () {
    return (jsxs("svg", __assign({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 0C4.47727 0 0 4.47727 0 10C0 15.5227 4.47727 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47727 15.5227 0 10 0ZM14.3345 8.30909C14.4144 8.21786 14.4751 8.11158 14.5133 7.99652C14.5514 7.88145 14.5661 7.75992 14.5566 7.63908C14.5471 7.51823 14.5135 7.40051 14.4578 7.29284C14.4021 7.18517 14.3254 7.08973 14.2323 7.01213C14.1392 6.93453 14.0315 6.87633 13.9155 6.84097C13.7996 6.8056 13.6777 6.79378 13.5572 6.80621C13.4366 6.81863 13.3197 6.85504 13.2134 6.9133C13.1071 6.97156 13.0135 7.0505 12.9382 7.14545L9.02909 11.8355L7.00636 9.81182C6.83491 9.64622 6.60527 9.55459 6.36691 9.55666C6.12855 9.55873 5.90054 9.65434 5.73198 9.82289C5.56343 9.99145 5.46782 10.2195 5.46575 10.4578C5.46368 10.6962 5.55531 10.9258 5.72091 11.0973L8.44818 13.8245C8.53751 13.9138 8.64445 13.9835 8.7622 14.0291C8.87994 14.0748 9.00591 14.0954 9.13206 14.0897C9.25822 14.084 9.3818 14.052 9.49492 13.9959C9.60804 13.9397 9.70823 13.8606 9.78909 13.7636L14.3345 8.30909Z", fill: "url(#paint0_linear_1676_1535)" }), jsx("defs", { children: jsxs("linearGradient", __assign({ id: "paint0_linear_1676_1535", x1: "-0.0340236", y1: "9.99957", x2: "19.8625", y2: "9.9083", gradientUnits: "userSpaceOnUse" }, { children: [jsx("stop", { "stop-color": "#E27EAC" }), jsx("stop", { offset: "1", "stop-color": "#A35CE3" })] })) })] })));
};

var Container = styled.div(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  padding: 14px 18px;\n"], ["\n  padding: 14px 18px;\n"])));
var GradButton = styled.button(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);\n  border-radius: 5px !important;\n  color: #fff;\n  border: 0 !important;\n"], ["\n  background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);\n  border-radius: 5px !important;\n  color: #fff;\n  border: 0 !important;\n"])));
var CancelButton = styled.button(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  background: rgba(235, 59, 90, 0.1);\n  border: 0.5px solid #eb3b5a !important;\n  border-radius: 5px !important;\n  color: #eb3b5a;\n"], ["\n  background: rgba(235, 59, 90, 0.1);\n  border: 0.5px solid #eb3b5a !important;\n  border-radius: 5px !important;\n  color: #eb3b5a;\n"])));
var OutlineButton = styled.button(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  background: transparent;\n  border: 0.5px solid rgba(0, 0, 0, 0.5) !important;\n  border-radius: 5px !important;\n  color: #000;\n  display: flex;\n  align-items: Center;\n  justify-content: center;\n"], ["\n  background: transparent;\n  border: 0.5px solid rgba(0, 0, 0, 0.5) !important;\n  border-radius: 5px !important;\n  color: #000;\n  display: flex;\n  align-items: Center;\n  justify-content: center;\n"])));
var FibpalWidget = styled.div(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  width: 100%;\n  height: 400px;\n  font-size: 16px;\n  color: #000;\n  border: 0.5px solid rgba(0, 0, 0, 0.5);\n  border-radius: 18px;\n  overflow: hidden;\n  * {\n    font-family: \"General Sans\", sans-serif !important;\n  }\n"], ["\n  width: 100%;\n  height: 400px;\n  font-size: 16px;\n  color: #000;\n  border: 0.5px solid rgba(0, 0, 0, 0.5);\n  border-radius: 18px;\n  overflow: hidden;\n  * {\n    font-family: \"General Sans\", sans-serif !important;\n  }\n"])));
var WidgetHeader = styled.div(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n  margin-bottom: 0px;\n  display: flex;\n  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);\n  justify-content: space-between;\n  align-items: Center;\n  height: 60px;\n"], ["\n  margin-bottom: 0px;\n  display: flex;\n  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);\n  justify-content: space-between;\n  align-items: Center;\n  height: 60px;\n"])));
var WidgetContent = styled.div(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n  min-height: 296px;\n"], ["\n  min-height: 296px;\n"])));
var WidgetFooter = styled(Container)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-top: 0.5px solid rgba(0, 0, 0, 0.5);\n  margin-top: 0px;\n  font-size: 14px;\n  padding: 10px 18px;\n  .powered {\n    opacity: 0.75;\n  }\n  .feeblock {\n    background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    text-fill-color: transparent;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-top: 0.5px solid rgba(0, 0, 0, 0.5);\n  margin-top: 0px;\n  font-size: 14px;\n  padding: 10px 18px;\n  .powered {\n    opacity: 0.75;\n  }\n  .feeblock {\n    background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    text-fill-color: transparent;\n  }\n"])));
// widget header
var LeftHeader = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject([""], [""])));
var HeaderName = styled(Container)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-weight: 400;\n  font-size: 25px;\n  line-height: 34px;\n  color: rgba(0, 0, 0, 0.8);\n"], ["\n  font-weight: 400;\n  font-size: 25px;\n  line-height: 34px;\n  color: rgba(0, 0, 0, 0.8);\n"])));
var RightHeader = styled.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var Settings = styled.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  height: 60px;\n  width: 60px;\n  display: flex;\n  align-items: Center;\n  justify-content: Center;\n  border-left: 0.5px solid rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n"], ["\n  height: 60px;\n  width: 60px;\n  display: flex;\n  align-items: Center;\n  justify-content: Center;\n  border-left: 0.5px solid rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n"])));
var Close = styled.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  height: 60px;\n  width: 60px;\n  display: flex;\n  align-items: Center;\n  justify-content: Center;\n  cursor: pointer;\n"], ["\n  height: 60px;\n  width: 60px;\n  display: flex;\n  align-items: Center;\n  justify-content: Center;\n  cursor: pointer;\n"])));
var PriceBlock = styled.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  ", " {\n    display: flex;\n    align-items: center;\n  }\n  h2,\n  h5 {\n    margin: 0;\n  }\n  h2 {\n    font-style: normal;\n    font-weight: 500;\n    font-size: 25px;\n    line-height: 34px;\n    display: flex;\n    align-items: center;\n  }\n  img {\n    height: 25px;\n    margin-right: 8px;\n  }\n  h5 {\n    margin-left: 8px;\n    font-weight: 300;\n    opacity: 0.8;\n    font-size: 16px;\n    line-height: unset;\n    margin-top: 2px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  ", " {\n    display: flex;\n    align-items: center;\n  }\n  h2,\n  h5 {\n    margin: 0;\n  }\n  h2 {\n    font-style: normal;\n    font-weight: 500;\n    font-size: 25px;\n    line-height: 34px;\n    display: flex;\n    align-items: center;\n  }\n  img {\n    height: 25px;\n    margin-right: 8px;\n  }\n  h5 {\n    margin-left: 8px;\n    font-weight: 300;\n    opacity: 0.8;\n    font-size: 16px;\n    line-height: unset;\n    margin-top: 2px;\n  }\n"])), Container);
// widget content
var ChooseTokenOuter = styled.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  // max-height: 300px;\n  // overflow: hidden;\n  .searchboxOuter {\n    border-bottom: 0.5px solid rgba(0, 0, 0, 0.5) !important;\n    padding: 10px 16px;\n  }\n  .select_searchBox {\n    background: #f2f2f2;\n    border: 0.5px solid rgba(0, 0, 0, 0.5);\n    border-radius: 5px;\n\n    input {\n      background: transparent;\n      border: 0;\n      color: rgba(0, 0, 0, 0.5);\n    }\n  }\n  .select_options {\n    margin-top: 0px !important;\n    .select_item {\n      color: #000 !important;\n      margin-bottom: 0 !important;\n      padding: 10px 16px !important;\n      &.active {\n        background: linear-gradient(\n          89.74deg,\n          rgba(226, 126, 172, 0.2) 0.06%,\n          rgba(163, 92, 227, 0.2) 99.09%\n        ) !important;\n      }\n    }\n  }\n"], ["\n  // max-height: 300px;\n  // overflow: hidden;\n  .searchboxOuter {\n    border-bottom: 0.5px solid rgba(0, 0, 0, 0.5) !important;\n    padding: 10px 16px;\n  }\n  .select_searchBox {\n    background: #f2f2f2;\n    border: 0.5px solid rgba(0, 0, 0, 0.5);\n    border-radius: 5px;\n\n    input {\n      background: transparent;\n      border: 0;\n      color: rgba(0, 0, 0, 0.5);\n    }\n  }\n  .select_options {\n    margin-top: 0px !important;\n    .select_item {\n      color: #000 !important;\n      margin-bottom: 0 !important;\n      padding: 10px 16px !important;\n      &.active {\n        background: linear-gradient(\n          89.74deg,\n          rgba(226, 126, 172, 0.2) 0.06%,\n          rgba(163, 92, 227, 0.2) 99.09%\n        ) !important;\n      }\n    }\n  }\n"])));
var CoinSelectorDD = styled(Container)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  .tokeninner {\n    border: 0.5px solid rgba(0, 0, 0, 0.5);\n    border-radius: 5px;\n    height: 36px;\n    min-width: 150px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 16px;\n    width: 100%;\n    .select_control {\n      min-width: 100%;\n    }\n    * {\n      font-size: 15px;\n    }\n    .select_control {\n      width: 100%;\n      img {\n        margin-top: -3px;\n      }\n    }\n  }\n  .valueconverted {\n    font-size: 14px;\n    text-align: center;\n    margin-top: 8px;\n  }\n"], ["\n  .tokeninner {\n    border: 0.5px solid rgba(0, 0, 0, 0.5);\n    border-radius: 5px;\n    height: 36px;\n    min-width: 150px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 16px;\n    width: 100%;\n    .select_control {\n      min-width: 100%;\n    }\n    * {\n      font-size: 15px;\n    }\n    .select_control {\n      width: 100%;\n      img {\n        margin-top: -3px;\n      }\n    }\n  }\n  .valueconverted {\n    font-size: 14px;\n    text-align: center;\n    margin-top: 8px;\n  }\n"])));
var TotalPrice = styled(Container)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  padding-top: 0;\n  padding-bottom: 0;\n  .tokenimg {\n    height: 28px;\n    margin-right: 8px;\n  }\n  h6 {\n    font-weight: 400;\n    font-size: 12px;\n    line-height: 16px;\n    margin: 0;\n  }\n  h2 {\n    font-style: normal;\n    font-weight: 500;\n    font-size: 25px;\n    line-height: 34px;\n    margin: 0;\n    margin-top: 6px;\n    display: flex;\n    align-items: center;\n  }\n"], ["\n  padding-top: 0;\n  padding-bottom: 0;\n  .tokenimg {\n    height: 28px;\n    margin-right: 8px;\n  }\n  h6 {\n    font-weight: 400;\n    font-size: 12px;\n    line-height: 16px;\n    margin: 0;\n  }\n  h2 {\n    font-style: normal;\n    font-weight: 500;\n    font-size: 25px;\n    line-height: 34px;\n    margin: 0;\n    margin-top: 6px;\n    display: flex;\n    align-items: center;\n  }\n"])));
var StatusButtons = styled(Container)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  button {\n    margin: 0 !important;\n    width: 100% !important;\n    background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);\n    border-radius: 5px;\n    border: 0;\n    color: #fff;\n    p {\n      font-weight: 400 !important;\n    }\n  }\n"], ["\n  button {\n    margin: 0 !important;\n    width: 100% !important;\n    background: linear-gradient(89.74deg, #e27eac 0.06%, #a35ce3 99.09%);\n    border-radius: 5px;\n    border: 0;\n    color: #fff;\n    p {\n      font-weight: 400 !important;\n    }\n  }\n"])));
var templateObject_1$3, templateObject_2$3, templateObject_3$1, templateObject_4$1, templateObject_5$1, templateObject_6$1, templateObject_7$1, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18;

var UpperRow = styled(Container)(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  &.reviewdetails {\n    border-top: 0.5px solid rgba(0, 0, 0, 0.5);\n    .orgprice {\n      max-height: 36px;\n      overflow-y: Scroll;\n      overflow-x: hidden;\n    }\n    .rowOuter {\n      font-size: 14px;\n    }\n  }\n"], ["\n  &.reviewdetails {\n    border-top: 0.5px solid rgba(0, 0, 0, 0.5);\n    .orgprice {\n      max-height: 36px;\n      overflow-y: Scroll;\n      overflow-x: hidden;\n    }\n    .rowOuter {\n      font-size: 14px;\n    }\n  }\n"])));
var InputBx = styled.input(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  background: #f2f2f2;\n  border: 0.5px solid rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  padding: 4px 8px;\n"], ["\n  background: #f2f2f2;\n  border: 0.5px solid rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  padding: 4px 8px;\n"])));
var BlkHeading = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 19px;\n  margin-bottom: 6px;\n"], ["\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 19px;\n  margin-bottom: 6px;\n"])));
var Row = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding-bottom: 10px;\n  &.orgprice {\n    padding-bottom: 0;\n    ", " {\n      font-size: 16px;\n    }\n    .flexchain {\n      display: flex;\n      flex-flow: wrap;\n      ", " {\n        margin-top: 4px;\n        margin-right: 10px;\n        font-size: 13px;\n        img {\n          height: 18px;\n          margin-right: 5px;\n        }\n      }\n    }\n  }\n  &.transaction {\n    margin-top: 10px;\n    ", " {\n      width: 100%;\n    }\n  }\n  &.slippage {\n    .flexslip {\n      display: flex;\n      align-items: center;\n      ", " {\n        background: linear-gradient(\n          89.74deg,\n          rgba(226, 126, 172, 0.2) 0.06%,\n          rgba(163, 92, 227, 0.2) 99.09%\n        ) !important;\n        color: #000000;\n        border: 1px solid rgba(163, 92, 227, 0.2) !important;\n        padding: 5px 18px !important;\n        margin-right: 12px !important;\n        display: flex;\n        align-items: Center;\n        svg {\n          margin-left: 12px;\n        }\n      }\n    }\n  }\n  ", " {\n    background: linear-gradient(89.74deg, rgba(226, 126, 172, 0.2) 0.06%, rgba(163, 92, 227, 0.2) 99.09%);\n    color: #000000;\n    border: 0;\n    padding: 6px 18px !important;\n    margin-right: 12px;\n  }\n  ", " {\n    width: 100%;\n  }\n"], ["\n  padding-bottom: 10px;\n  &.orgprice {\n    padding-bottom: 0;\n    ", " {\n      font-size: 16px;\n    }\n    .flexchain {\n      display: flex;\n      flex-flow: wrap;\n      ", " {\n        margin-top: 4px;\n        margin-right: 10px;\n        font-size: 13px;\n        img {\n          height: 18px;\n          margin-right: 5px;\n        }\n      }\n    }\n  }\n  &.transaction {\n    margin-top: 10px;\n    ", " {\n      width: 100%;\n    }\n  }\n  &.slippage {\n    .flexslip {\n      display: flex;\n      align-items: center;\n      ", " {\n        background: linear-gradient(\n          89.74deg,\n          rgba(226, 126, 172, 0.2) 0.06%,\n          rgba(163, 92, 227, 0.2) 99.09%\n        ) !important;\n        color: #000000;\n        border: 1px solid rgba(163, 92, 227, 0.2) !important;\n        padding: 5px 18px !important;\n        margin-right: 12px !important;\n        display: flex;\n        align-items: Center;\n        svg {\n          margin-left: 12px;\n        }\n      }\n    }\n  }\n  ", " {\n    background: linear-gradient(89.74deg, rgba(226, 126, 172, 0.2) 0.06%, rgba(163, 92, 227, 0.2) 99.09%);\n    color: #000000;\n    border: 0;\n    padding: 6px 18px !important;\n    margin-right: 12px;\n  }\n  ", " {\n    width: 100%;\n  }\n"])), BlkHeading, OutlineButton, InputBx, GradButton, GradButton, InputBx);
var DisplayBlock = styled(Container)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  border-top: 0.5px solid rgba(0, 0, 0, 0.5);\n  margin-top: 0px;\n  .txt {\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 22px;\n  }\n"], ["\n  border-top: 0.5px solid rgba(0, 0, 0, 0.5);\n  margin-top: 0px;\n  .txt {\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 22px;\n  }\n"])));
var FlexText = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n"])));
var ButtonControls = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 16px;\n  button {\n    border: 0;\n    min-width: 120px;\n    margin: 0 5px;\n  }\n  &.paymentreview {\n    justify-content: flex-start;\n\n    margin: 0 -5px;\n    margin-top: 8px;\n    button {\n      &:last-child {\n        width: 100%;\n      }\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 16px;\n  button {\n    border: 0;\n    min-width: 120px;\n    margin: 0 5px;\n  }\n  &.paymentreview {\n    justify-content: flex-start;\n\n    margin: 0 -5px;\n    margin-top: 8px;\n    button {\n      &:last-child {\n        width: 100%;\n      }\n    }\n  }\n"])));
// @ts-ignore
var DisplaySwitch = styled(Switch)(function (_a) {
    _a.theme;
    return ({
        width: "28px !important",
        height: "16px !important",
        padding: "0 !important",
        display: "flex",
        "&:active": {
            "& .MuiSwitch-thumb": {
                width: 15,
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
                transform: "translateX(9px)",
            },
        },
        "& .MuiSwitch-switchBase": {
            padding: 2,
            "&.Mui-checked": {
                transform: "translateX(12px)",
                color: "#000",
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: "white",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
            background: "#000",
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: 200,
        },
        "& .MuiSwitch-track": {
            borderRadius: 16 / 2,
            opacity: 1,
            border: "0.5px solid #000",
            backgroundColor: "white",
            boxSizing: "border-box",
        },
    });
});
var templateObject_1$2, templateObject_2$2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;

var SettingsWidget = function (props) {
    var label = { inputProps: { "aria-label": "Switch demo" } };
    return (jsxs(Fragment, { children: [jsxs(UpperRow, { children: [jsxs(Row, __assign({ className: "slippage" }, { children: [jsx(BlkHeading, { children: "Slippage" }), jsxs("div", __assign({ className: "flexslip" }, { children: [jsxs(GradButton, { children: ["Auto", jsx(GradtickIcon, {})] }), jsx(InputBx, { placeholder: "40 minutes" })] }))] })), jsxs(Row, __assign({ className: "transaction" }, { children: [jsx(BlkHeading, { children: "Transaction Details" }), jsx(InputBx, { placeholder: "40 minutes" })] }))] }), jsxs(DisplayBlock, { children: [jsx(BlkHeading, { children: "Display Settings" }), jsxs(FlexText, { children: [jsx("div", __assign({ className: "txt" }, { children: "Dark Mode" })), jsx(DisplaySwitch, __assign({}, label, { defaultChecked: true, color: "default" }))] }), jsxs(ButtonControls, { children: [jsx(CancelButton, { children: "Cancel" }), jsx(GradButton, { children: "Save" })] })] })] }));
};

function SelectItem(props) {
    return (jsxs("div", __assign({ className: "select_item  mb-3 ".concat(props.active && "active"), onClick: props.selectItem }, { children: [jsx("div", __assign({ className: "select_item_img" }, { children: props.item.image && (jsx(IconImage, { src: props.item.image, className: "w-full", alt: props.item.symbol, width: 20, height: 20 })) })), jsx("div", __assign({ className: "ms-2 flex-grow-1" }, { children: jsx("h4", __assign({ className: " mb-0" }, { children: props.item.symbol })) })), jsx("div", { className: "select_item_circle" })] })));
}

function SelectNetwork(props) {
    return (jsxs("div", __assign({ className: "selectsqitem select_item  mb-3 ".concat(props.active && "active"), onClick: props.selectItem }, { children: [jsx("div", __assign({ className: "select_item_img" }, { children: props.item.image && (jsx(IconImage, { src: props.item.image, className: "w-full", alt: props.item.symbol, width: 20, height: 20 })) })), jsx("div", __assign({ className: "chname" }, { children: props.item.name }))] })));
}

function TokenSelectModal(props) {
    var _a = __read(useState(""), 2), inputSearch = _a[0], setInputSearch = _a[1];
    var filterTokens = function (tokens, search) {
        if (!search || !search.length)
            return tokens;
        var searchingAddress = isAddress(search);
        if (searchingAddress) {
            return tokens.filter(function (token) { return token.address.toLowerCase() === (search === null || search === void 0 ? void 0 : search.toLowerCase()); });
        }
        var lowerSearchParts = search === null || search === void 0 ? void 0 : search.toLowerCase().split(/\s+/).filter(function (s) { return s.length > 0; });
        if (lowerSearchParts.length === 0) {
            return tokens;
        }
        var matchesSearch = function (s) {
            var sParts = s
                .toLowerCase()
                .split(/\s+/)
                .filter(function (str) { return str.length > 0; });
            return lowerSearchParts.every(function (p) { return p.length === 0 || sParts.some(function (sp) { return sp.startsWith(p) || sp.endsWith(p); }); });
        };
        return tokens.filter(function (token) {
            var name = token.name, symbol = token.symbol;
            return (name && matchesSearch(name)) || (symbol && matchesSearch(symbol));
        });
    };
    var filteredTokens = useMemo(function () {
        return filterTokens(props.options, inputSearch);
    }, [props.options, filterTokens, inputSearch]);
    var filteredChains = ALL_CHAINS;
    useEffect(function () {
        setInputSearch("");
    }, []);
    return (jsx(Fragment, { children: jsxs(ChooseTokenOuter, { children: [jsx("div", __assign({ className: "searchboxOuter" }, { children: jsxs("div", __assign({ className: "d-flex align-items-center select_searchBox" }, { children: [jsx(FormControl, { className: "select_search_input", placeholder: "Search name or address", value: inputSearch, onChange: function (event) { return setInputSearch(event.target.value); } }), jsx(FiSearch, { className: "me-2" })] })) })), jsxs("div", __assign({ className: "tokenselectionbox" }, { children: [jsx("div", __assign({ className: "tokenselectionleft" }, { children: filteredChains &&
                                filteredChains.map(function (item, index) { return (jsx(SelectNetwork, { item: item, active: item.chain_id === props.selectedNetwork, selectItem: function () {
                                        props.selectNetwork(item);
                                    } }, index)); }) })), jsx("div", __assign({ className: "tokenselectionright" }, { children: jsx("div", __assign({ className: "select_options" }, { children: filteredTokens &&
                                    filteredTokens.map(function (item, index) {
                                        var _a;
                                        return (jsx(SelectItem, { item: item, active: ((_a = item === null || item === void 0 ? void 0 : item.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === props.selectedItem, selectItem: function () {
                                                props.selectItem(item);
                                            } }, index));
                                    }) })) }))] }))] }) }));
}
function TokenSelectData(_a) {
    var chainId = _a.chainId, assetId = _a.assetId, onSelectToken = _a.onSelectToken, onSelectNetwork = _a.onSelectNetwork; _a.onClick; _a.className; _a.children;
    var allTokens = useTokens().tokens;
    var _b = __read(useState([]), 2), tokens = _b[0], setTokens = _b[1];
    var _c = __read(useState(null), 2), selectedNetwork = _c[0], setSelectedNetwork = _c[1];
    var _d = __read(useState(null), 2), selectedItem = _d[0], setSelectedItem = _d[1];
    useEffect(function () {
        var _a, _b, _c;
        if (chainId && allTokens) {
            if (allTokens === null || allTokens === void 0 ? void 0 : allTokens[chainId]) {
                setTokens(allTokens[chainId]);
                setSelectedItem((_c = (_b = (_a = allTokens[chainId]) === null || _a === void 0 ? void 0 : _a.find(function (token) { return token.address.toLowerCase() === (assetId === null || assetId === void 0 ? void 0 : assetId.toLowerCase()); })) === null || _b === void 0 ? void 0 : _b.address) === null || _c === void 0 ? void 0 : _c.toLowerCase());
                setSelectedNetwork(chainId);
                return;
            }
        }
        setTokens([]);
    }, [chainId, assetId]);
    var handleSelectNetwork = function (item) {
        onSelectNetwork(item === null || item === void 0 ? void 0 : item.chain_id);
        setSelectedNetwork(item === null || item === void 0 ? void 0 : item.chain_id);
    };
    var handleSelectToken = function (item) {
        var _a, _b;
        onSelectToken((_a = item === null || item === void 0 ? void 0 : item.address) === null || _a === void 0 ? void 0 : _a.toLowerCase());
        setSelectedItem((_b = item === null || item === void 0 ? void 0 : item.address) === null || _b === void 0 ? void 0 : _b.toLowerCase());
    };
    return (jsx(Fragment, { children: jsx(TokenSelectModal, { chainId: chainId, options: tokens, selectNetwork: function (item) { return handleSelectNetwork(item); }, selectItem: function (item) { return handleSelectToken(item); }, selectedItem: selectedItem, selectedNetwork: selectedNetwork }) }));
}

var PaymentReview = function (props) {
    return (jsxs(Fragment, { children: [jsx(UpperRow, { children: jsxs(Row, __assign({ className: "orgprice" }, { children: [jsx(BlkHeading, { children: "Orignal Price: 0.045 ETH" }), jsxs("div", __assign({ className: "flexchain" }, { children: [jsxs(OutlineButton, { children: [jsx("img", { alt: "", src: "/logos/chains/binance.png" }), "Binance Smart Chain"] }), jsxs(OutlineButton, { children: [jsx("img", { alt: "", src: "/logos/chains/binance.png" }), "Binance Coin"] })] }))] })) }), jsx(UpperRow, __assign({ className: "reviewdetails" }, { children: jsxs(Row, __assign({ className: "orgprice" }, { children: [jsx(BlkHeading, { children: "Details:" }), jsxs("div", __assign({ className: "rowOuter" }, { children: [jsxs(FlexText, { children: [jsx("div", { children: "Network fees" }), jsx("div", { children: "5GWei" })] }), jsxs(FlexText, { children: [jsx("div", { children: "Relayer fees" }), jsx("div", { children: "0.005675 BNB" })] }), jsxs(FlexText, { children: [jsx("div", { children: "Rate conversion" }), jsx("div", { children: "1 ETH = 5.29 BNB" })] }), jsxs(FlexText, { children: [jsx("div", { children: "Slippage" }), jsx("div", { children: "0.01%" })] }), jsxs(FlexText, { children: [jsx("div", { children: "Slippage" }), jsx("div", { children: "0.01%" })] })] }))] })) })), jsxs(DisplayBlock, { children: [jsx(BlkHeading, { children: "Final Price:" }), jsxs(PriceBlock, { children: [jsxs("h2", { children: [jsx("img", { alt: "", src: "/logos/chains/binance.png" }), "1 BNB"] }), jsx("h5", { children: "($34.34)" })] }), jsxs(ButtonControls, __assign({ className: "paymentreview" }, { children: [jsx(CancelButton, { children: "Cancel" }), jsxs(GradButton, { children: [jsx(WalletIcon, {}), "Buy Now"] })] }))] })] }));
};

var PaymentStatus = function (props) {
    var status = props.status;
    return (jsx(Fragment, { children: jsxs(StatusLoader, { children: [jsxs(StatusContent, { children: [status == "successful" ? jsx(SuccessIcon, {}) : null, status == "successful" ? jsx("h2", __assign({ style: { color: "#519F6C" } }, { children: "Payment Successful" })) : null, status == "error" ? jsx(FailedIcon, {}) : null, status == "error" ? jsx("h2", __assign({ style: { color: "#D54E40" } }, { children: "Payment Failed" })) : null, status == "pending" ? jsx(PendingIcon, {}) : null, status == "pending" ? jsx("h2", __assign({ style: { color: "#DDA125" } }, { children: "Payment Pending" })) : null, status == "error" ? jsx("h6", { children: "Not enough funds in the wallet" }) : null] }), status != "pending" ? jsx("button", { children: "Continue" }) : null] }) }));
};
var StatusLoader = styled(Container)(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  min-height: 295px;\n  display: flex;\n  flex-direction: column;\n  align-items: Center;\n  justify-content: center;\n  button {\n    background: #f2f2f2;\n    border: 1px solid rgba(0, 0, 0, 0.75);\n    border-radius: 5px;\n    padding: 4px 18px;\n    margin-top: 20px;\n  }\n"], ["\n  min-height: 295px;\n  display: flex;\n  flex-direction: column;\n  align-items: Center;\n  justify-content: center;\n  button {\n    background: #f2f2f2;\n    border: 1px solid rgba(0, 0, 0, 0.75);\n    border-radius: 5px;\n    padding: 4px 18px;\n    margin-top: 20px;\n  }\n"])));
var StatusContent = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: Center;\n  justify-content: center;\n  h2 {\n    font-weight: 700;\n    font-size: 20px;\n    line-height: 34px;\n    margin-top: 8px;\n    margin-bottom: 0;\n  }\n  h6 {\n    font-size: 14px;\n    font-weight: 300;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: Center;\n  justify-content: center;\n  h2 {\n    font-weight: 700;\n    font-size: 20px;\n    line-height: 34px;\n    margin-top: 8px;\n    margin-bottom: 0;\n  }\n  h6 {\n    font-size: 14px;\n    font-weight: 300;\n  }\n"])));
var templateObject_1$1, templateObject_2$1;

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
function switchToNetwork(_a) {
    var _b;
    var library = _a.library, chainId = _a.chainId;
    return __awaiter(this, void 0, void 0, function () {
        var formattedChainId, error_1, chainInfo, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!((_b = library === null || library === void 0 ? void 0 : library.provider) === null || _b === void 0 ? void 0 : _b.request)) {
                        return [2 /*return*/];
                    }
                    if (!(!chainId && (library === null || library === void 0 ? void 0 : library.getNetwork))) return [3 /*break*/, 2];
                    return [4 /*yield*/, library.getNetwork()];
                case 1:
                    (chainId = (_c.sent()).chainId);
                    _c.label = 2;
                case 2:
                    formattedChainId = hexStripZeros(BigNumber$2.from(chainId).toHexString());
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 13]);
                    return [4 /*yield*/, (library === null || library === void 0 ? void 0 : library.provider.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: formattedChainId }],
                        }))];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 13];
                case 5:
                    error_1 = _c.sent();
                    if (!((error_1 === null || error_1 === void 0 ? void 0 : error_1.code) === 4902 && chainId !== undefined)) return [3 /*break*/, 11];
                    chainInfo = getChainInfo(chainId);
                    return [4 /*yield*/, library.provider.request({
                            method: "wallet_addEthereumChain",
                            params: [chainInfo.provider_params],
                        })];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, library.provider.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: formattedChainId }],
                        })];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 9:
                    error_2 = _c.sent();
                    console.debug("Added network but could not switch chains", error_2);
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11: throw error_1;
                case 12: return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}

var PaymentConfirm = function (props) {
    var _a, _b, _c, _d, _e, _f;
    // set this for different screens
    var _g = __read(useState(ActiveWidgetModal.Main), 2), widgetActive = _g[0], setWidgetActive = _g[1];
    var bridge = props.bridge, valid = props.valid;
    var isBrowserTabActiveRef = useIsBrowserTabActive();
    var _h = useWeb3React(), account = _h.account, chainId = _h.chainId, isActive = _h.isActive, provider = _h.provider;
    var tokens = useTokens().tokens;
    var _j = useNxtpSdk(0), sdk = _j.sdk, assetBalances = _j.assetBalances;
    var _k = __read(useState(), 2), bridgeState = _k[0], setBridgeState = _k[1];
    var tokenPrices = useCurrencyPrice(bridge === null || bridge === void 0 ? void 0 : bridge.toChainId, [bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toTransacting]);
    var gasPrice = useGasPrices(bridge === null || bridge === void 0 ? void 0 : bridge.toChainId);
    var nativeTokenPrices = useNativeTokenPrices().nativeTokenPrices;
    var _l = __read(useState(null), 2), controller = _l[0], setController = _l[1];
    var _m = __read(useState(null), 2), error = _m[0], setError = _m[1];
    var _o = __read(useState(null), 2), estimating = _o[0], setEstimating = _o[1];
    var _p = __read(useState(null), 2), estimateResponse = _p[0], setEstimateResponse = _p[1];
    var _q = __read(useState(null), 2), estimateCooldown = _q[0], setEstimateCooldown = _q[1];
    var _r = __read(useState(null), 2), estimateTrigger = _r[0], setEstimateTrigger = _r[1];
    var _s = __read(useState(null), 2), approving = _s[0], setApproving = _s[1];
    var _t = __read(useState(null), 2), approveResponse = _t[0], setApproveResponse = _t[1];
    var _u = __read(useState(null), 2), xcall = _u[0], setXcall = _u[1];
    var _v = __read(useState(null), 2), calling = _v[0], setCalling = _v[1];
    var _w = __read(useState(null), 2), xcallResponse = _w[0], setXcallResponse = _w[1];
    var fromBalance = useCurrencyBalance(bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId, bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromTransacting);
    // const fromBalanceEther = useMemo(
    //   () =>
    //     bridgeState && bridgeState?.fromChainId
    //       ? formatDecimalNumber(tokens, fromBalance, bridgeState?.fromChainId, bridgeState?.fromTransacting)
    //       : "0.0",
    //   [bridgeState, fromBalance, tokens],
    // );
    var fromTransactingToken = useMemo(function () {
        if (estimateResponse === null || estimateResponse === void 0 ? void 0 : estimateResponse.fromTransacting) {
            return getTokenInfoFromAddr(tokens, estimateResponse.fromChainId, estimateResponse.fromTransacting);
        }
        return null;
    }, [estimateResponse === null || estimateResponse === void 0 ? void 0 : estimateResponse.fromTransacting]);
    var hasSufficientBalance = useMemo(function () {
        var balance = fromBalance !== null && fromBalance !== void 0 ? fromBalance : BIG_ZERO;
        var estimated = estimateResponse
            ? parseDecimalNumber(tokens, estimateResponse.fromTransactingAmount, estimateResponse.fromChainId, estimateResponse.fromTransacting)
            : BIG_ZERO;
        return balance.gte(estimated);
    }, [fromBalance, estimateResponse]);
    useEffect(function () {
        setBridgeState(__assign(__assign({}, bridgeState), bridge));
    }, [bridge]);
    var fromChainInfo = useMemo(function () {
        var _a;
        var allChainIds = ALL_CHAINS.map(function (c) { return c.chain_id; });
        var fromChainId;
        if (!bridgeState || !bridgeState.toChainId) {
            return null;
        }
        else if (!chainId || chainId == bridgeState.toChainId) {
            fromChainId = (_a = allChainIds.filter(function (id) { return id !== bridgeState.toChainId; })) === null || _a === void 0 ? void 0 : _a[0];
        }
        else {
            fromChainId = chainId;
        }
        return getChainInfo(fromChainId);
    }, [chainId, bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toChainId]);
    var toTransactingToken = useMemo(function () {
        if ((bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toTransacting) && (bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toTransactingAmount)) {
            var tokenInfo = getTokenInfoFromAddr(tokens, bridgeState.toChainId, bridgeState.toTransacting);
            var priceUsd = (tokenPrices === null || tokenPrices === void 0 ? void 0 : tokenPrices[0]) || 0;
            return __assign(__assign({}, tokenInfo), { priceUsd: priceUsd });
        }
        return null;
    }, [bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toTransacting, bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toTransactingAmount, tokenPrices]);
    // fee estimate cooldown
    useEffect(function () {
        if (typeof estimateCooldown === "number") {
            if (estimateCooldown === 0) {
                var fromTransactingAmount = __assign({}, bridgeState).fromTransactingAmount;
                if (typeof fromTransactingAmount !== "number") {
                    setEstimateTrigger(moment().valueOf());
                }
            }
            else {
                var interval_1 = setInterval(function () {
                    var _estimateCooldown = estimateCooldown - 1;
                    if (_estimateCooldown > -1 && isBrowserTabActiveRef.current) {
                        setEstimateCooldown(_estimateCooldown);
                    }
                }, 10000);
                return function () { return clearInterval(interval_1); };
            }
        }
    }, [estimateCooldown]);
    // reset fee estimate cooldown
    useEffect(function () {
        if (typeof estimating === "boolean" && !estimating) {
            setEstimateCooldown(FEE_ESTIMATE_COOLDOWN);
        }
    }, [estimating]);
    // trigger estimate
    useEffect(function () {
        var _a = __assign({}, bridgeState), fromChainId = _a.fromChainId, toChainId = _a.toChainId, fromTransacting = _a.fromTransacting, toLocal = _a.toLocal, relayerFee = _a.relayerFee;
        if (fromChainId && toChainId && fromTransacting && new BigNumber$3(relayerFee).gt(0) && assetBalances && toLocal) {
            setEstimateTrigger(moment().valueOf());
        }
    }, [bridgeState, assetBalances]);
    // estimate trigger
    useEffect(function () {
        var _controller;
        if (estimateTrigger && !calling && !approving) {
            controller === null || controller === void 0 ? void 0 : controller.abort();
            _controller = new AbortController();
            setController(_controller);
            estimate(_controller);
        }
        return function () {
            _controller === null || _controller === void 0 ? void 0 : _controller.abort();
        };
    }, [estimateTrigger]);
    // when chain updated
    useEffect(function () {
        if (calling || approving || xcallResponse || approveResponse) {
            return;
        }
        var toLocalAsset = getLocalAsset(bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toChainId, bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toLocal);
        var fromLocalAsset = toLocalAsset && fromChainInfo ? getLocalAsset(fromChainInfo.chain_id, toLocalAsset.id) : null;
        setBridgeState(__assign(__assign({}, bridgeState), { originSender: account === null || account === void 0 ? void 0 : account.toLowerCase(), recovery: account === null || account === void 0 ? void 0 : account.toLowerCase(), fromChainId: fromChainInfo && isValidChainId(fromChainInfo.chain_id) ? fromChainInfo.chain_id : null, fromTransacting: ZERO_ADDRESS, fromLocal: fromLocalAsset ? fromLocalAsset.contract_address : null }));
    }, [fromChainInfo, account]);
    // when chain updated
    useEffect(function () {
        if (isValidChainId(bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId) && isValidChainId(bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toChainId)) {
            setBridgeState(__assign(__assign({}, bridgeState), { relayerFee: estimateRelayerFee() }));
            return;
        }
    }, [bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId, bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toChainId, gasPrice, nativeTokenPrices]);
    var estimateRelayerFee = function () {
        var gasLimit = getGasLimit(bridgeState.toChainId, Protocols.Airnfts);
        var fromNativePrice = nativeTokenPrices === null || nativeTokenPrices === void 0 ? void 0 : nativeTokenPrices[bridgeState.fromChainId];
        var toNativePrice = nativeTokenPrices === null || nativeTokenPrices === void 0 ? void 0 : nativeTokenPrices[bridgeState.toChainId];
        if (!gasPrice || +fromNativePrice === 0 || +toNativePrice === 0) {
            return "0";
        }
        var gasOnToChain = new BigNumber$3(gasPrice)
            .multipliedBy(Math.pow(10, 9))
            .multipliedBy(gasLimit)
            .multipliedBy(toNativePrice);
        return gasOnToChain.dividedBy(fromNativePrice).toFixed(0);
    };
    var estimate = function (controller) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!xcall) return [3 /*break*/, 4];
                    if (!checkSupport(tokens, bridgeState)) return [3 /*break*/, 4];
                    if (!sdk) return [3 /*break*/, 4];
                    setEstimating(true);
                    setApproveResponse(null);
                    setXcall(null);
                    setCalling(false);
                    setXcallResponse(null);
                    setError(null);
                    setEstimateResponse(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, swapEstimate(DEFAULT_SLIPPAGE, controller)];
                case 2:
                    result = _a.sent();
                    setEstimateResponse(result);
                    setEstimating(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== "Aborted") {
                        setError(error_1.message);
                        setEstimating(false);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var swapEstimate = function (slippage, controller) {
        return new Promise(function (resolve, reject) {
            var _a;
            getSwapEstimate(tokens, bridgeState, assetBalances, nativeTokenPrices, slippage)
                .then(function (response) {
                return resolve(response);
            })
                .catch(function () {
                return reject(new Error("Failed"));
            });
            if (controller === null || controller === void 0 ? void 0 : controller.signal) {
                (_a = controller === null || controller === void 0 ? void 0 : controller.signal) === null || _a === void 0 ? void 0 : _a.addEventListener("abort", function () {
                    return reject(new Error("Aborted"));
                });
            }
        });
    };
    var handleChangeFromToken = function (assetId) {
        setBridgeState(__assign(__assign({}, bridgeState), { fromTransacting: assetId }));
    };
    var handleChangeFromChain = function (chainId) {
        setBridgeState(__assign(__assign({}, bridgeState), { fromChainId: chainId }));
    };
    var call = function () { return __awaiter(void 0, void 0, void 0, function () {
        var infiniteApprove, _a, router, recovery, fromChainId, toChainId, fromTransacting, fromTransactingAmount, fromLocal, localAmount, toLocal, isEth, fromTo, fromData, toTo, toData, relayerFee, isExactInput, fromTransactingInfo, xcallParams, failed, signer, approve_request, approve_response, tx_hash, approve_receipt, error_2, xcall_request, gas_limit, xcall_response, tx_hash, xcall_receipt, error_3, errorMessage;
        var _b, _c, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    setCalling(true);
                    infiniteApprove = true;
                    if (!(sdk && estimateResponse)) return [3 /*break*/, 16];
                    _a = __assign({}, estimateResponse), router = _a.router, recovery = _a.recovery, fromChainId = _a.fromChainId, toChainId = _a.toChainId, fromTransacting = _a.fromTransacting, fromTransactingAmount = _a.fromTransactingAmount, fromLocal = _a.fromLocal, localAmount = _a.localAmount, toLocal = _a.toLocal, isEth = _a.isEth, fromTo = _a.fromTo, fromData = _a.fromData, toTo = _a.toTo, toData = _a.toData, relayerFee = _a.relayerFee, isExactInput = _a.isExactInput;
                    fromTransactingInfo = getTokenInfoFromAddr(tokens, fromChainId, fromTransacting);
                    xcallParams = {
                        params: {
                            router: router,
                            recovery: recovery,
                            origin: String(fromChainId),
                            destination: String(toChainId),
                            orgLocalAsset: fromLocal,
                            dstLocalAsset: toLocal,
                            isEth: isEth,
                            orgParam: {
                                to: fromTo,
                                data: fromData !== null && fromData !== void 0 ? fromData : "0x",
                            },
                            dstParam: {
                                to: toTo,
                                data: toData !== null && toData !== void 0 ? toData : "0x",
                            },
                        },
                        transactingAssetId: fromTransacting,
                        amount: getDecimalAmount(String(fromTransactingAmount), fromTransactingInfo.decimals).toString(),
                        localAmount: getDecimalAmount(String(localAmount), getTokenDecimalFromAddr(tokens, fromChainId, fromLocal)).toString(),
                        relayerFee: relayerFee,
                        isExactInput: isExactInput,
                    };
                    failed = false;
                    signer = provider.getSigner(account);
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, sdk.nxtpSdkBase.approveIfNeeded(String(xcallParams.params.origin), xcallParams.transactingAssetId, xcallParams.amount.toString(), infiniteApprove)];
                case 2:
                    approve_request = _k.sent();
                    if (!approve_request) return [3 /*break*/, 5];
                    setApproving(true);
                    return [4 /*yield*/, signer.sendTransaction(approve_request)];
                case 3:
                    approve_response = _k.sent();
                    tx_hash = approve_response === null || approve_response === void 0 ? void 0 : approve_response.hash;
                    setApproveResponse({
                        status: "pending",
                        message: "Wait for ".concat(fromTransactingInfo.symbol, " approval"),
                        tx_hash: tx_hash,
                    });
                    toast.success("Wait for ".concat(fromTransactingInfo.symbol, " approval"));
                    return [4 /*yield*/, signer.provider.waitForTransaction(tx_hash)];
                case 4:
                    approve_receipt = _k.sent();
                    setApproveResponse((approve_receipt === null || approve_receipt === void 0 ? void 0 : approve_receipt.status)
                        ? null
                        : {
                            status: "failed",
                            message: "Failed to approve ".concat(fromTransactingInfo.symbol),
                            tx_hash: tx_hash,
                        });
                    toast.error("Failed to approve ".concat(fromTransactingInfo.symbol));
                    failed = !(approve_receipt === null || approve_receipt === void 0 ? void 0 : approve_receipt.status);
                    setApproving(false);
                    _k.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _k.sent();
                    setApproveResponse({ status: "failed", message: ((_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.data) === null || _b === void 0 ? void 0 : _b.message) || (error_2 === null || error_2 === void 0 ? void 0 : error_2.message) });
                    failed = true;
                    setApproving(false);
                    toast.error(((_c = error_2 === null || error_2 === void 0 ? void 0 : error_2.data) === null || _c === void 0 ? void 0 : _c.message) || (error_2 === null || error_2 === void 0 ? void 0 : error_2.message));
                    return [3 /*break*/, 7];
                case 7:
                    if (!!failed) return [3 /*break*/, 15];
                    _k.label = 8;
                case 8:
                    _k.trys.push([8, 14, , 15]);
                    return [4 /*yield*/, sdk.nxtpSdkBase.xcall(xcallParams)];
                case 9:
                    xcall_request = _k.sent();
                    if (!xcall_request) return [3 /*break*/, 13];
                    return [4 /*yield*/, signer.estimateGas(xcall_request)];
                case 10:
                    gas_limit = (_k.sent()).toString();
                    if (gas_limit) {
                        gas_limit = FixedNumber.fromString(gas_limit)
                            .mulUnsafe(FixedNumber.fromString("1.3"))
                            .round(0)
                            .toString()
                            .replace(".0", "");
                        xcall_request.gasLimit = gas_limit;
                    }
                    return [4 /*yield*/, signer.sendTransaction(xcall_request)];
                case 11:
                    xcall_response = _k.sent();
                    tx_hash = xcall_response === null || xcall_response === void 0 ? void 0 : xcall_response.hash;
                    return [4 /*yield*/, signer.provider.waitForTransaction(tx_hash)];
                case 12:
                    xcall_receipt = _k.sent();
                    setXcall(xcall_receipt);
                    failed = !(xcall_receipt === null || xcall_receipt === void 0 ? void 0 : xcall_receipt.status);
                    setXcallResponse({
                        status: failed ? "failed" : "success",
                        message: failed
                            ? "Failed to send transaction"
                            : "".concat(fromTransactingInfo.symbol, " transfer detected, waiting for execution."),
                        tx_hash: tx_hash,
                    });
                    if (failed) {
                        toast.error("Failed to send transaction");
                    }
                    else {
                        toast.success("".concat(fromTransactingInfo.symbol, " transfer detected, waiting for execution."));
                    }
                    _k.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    error_3 = _k.sent();
                    console.log(error_3.error);
                    errorMessage = parseFibswapError(((_e = (_d = error_3 === null || error_3 === void 0 ? void 0 : error_3.error) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.data) || ((_h = (_g = (_f = error_3 === null || error_3 === void 0 ? void 0 : error_3.error) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.originalError) === null || _h === void 0 ? void 0 : _h.data)) ||
                        ((_j = error_3 === null || error_3 === void 0 ? void 0 : error_3.data) === null || _j === void 0 ? void 0 : _j.message) ||
                        (error_3 === null || error_3 === void 0 ? void 0 : error_3.message);
                    setXcallResponse({ status: "failed", message: errorMessage });
                    toast.error(errorMessage);
                    failed = true;
                    return [3 /*break*/, 15];
                case 15:
                    if (failed) {
                        setXcall(null);
                    }
                    _k.label = 16;
                case 16:
                    setCalling(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (jsx(Fragment, { children: jsxs(FibpalWidget, __assign({ className: "fibpalwidget" }, { children: [jsxs(WidgetHeader, { children: [jsxs(LeftHeader, { children: [widgetActive === ActiveWidgetModal.Main ? (jsx(PriceBlock, { children: jsxs(Container, { children: [jsxs("h2", { children: [jsx("img", { src: toTransactingToken && toTransactingToken.image, alt: "" }), (bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toTransactingAmount) || 0, " ", (toTransactingToken === null || toTransactingToken === void 0 ? void 0 : toTransactingToken.symbol) || ""] }), jsxs("h5", { children: ["($", formatNumber((bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toTransactingAmount) * (toTransactingToken === null || toTransactingToken === void 0 ? void 0 : toTransactingToken.priceUsd), 2), ")"] })] }) })) : null, widgetActive === ActiveWidgetModal.ConnectWallet ? jsx(HeaderName, { children: "Connect Wallet" }) : null, widgetActive === ActiveWidgetModal.Settings ? jsx(HeaderName, { children: "Settings" }) : null, widgetActive === ActiveWidgetModal.TokenSelect ? jsx(HeaderName, { children: "Choose a Token" }) : null, widgetActive === ActiveWidgetModal.PaymentReview ? jsx(HeaderName, { children: "Payment Review" }) : null, widgetActive === ActiveWidgetModal.PaymentStatus ? jsx(HeaderName, { children: "Payment Status" }) : null] }), jsxs(RightHeader, { children: [widgetActive === ActiveWidgetModal.Main ? (jsx(Settings, __assign({ onClick: function () { return setWidgetActive(ActiveWidgetModal.Settings); } }, { children: jsx(SettingsIcon, {}) }))) : null, widgetActive === ActiveWidgetModal.Settings ||
                                    widgetActive === ActiveWidgetModal.ConnectWallet ||
                                    widgetActive === ActiveWidgetModal.TokenSelect ||
                                    widgetActive === ActiveWidgetModal.PaymentStatus ||
                                    widgetActive === ActiveWidgetModal.PaymentReview ? (jsx(Close, __assign({ onClick: function () { return setWidgetActive(ActiveWidgetModal.Main); } }, { children: jsx(CloseIcon, {}) }))) : null] })] }), jsxs("div", __assign({ className: "widgetcontentmiddle" }, { children: [widgetActive === ActiveWidgetModal.Main ? (jsxs(WidgetContent, { children: [jsxs(CoinSelectorDD, { children: [jsx("div", __assign({ className: "tokeninner", onClick: function () { return setWidgetActive(ActiveWidgetModal.TokenSelect); } }, { children: jsx(TokenSelect, { chainId: (_a = bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId) !== null && _a !== void 0 ? _a : (fromChainInfo ? fromChainInfo.chain_id : null), assetId: (_b = bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromTransacting) !== null && _b !== void 0 ? _b : ZERO_ADDRESS }) })), estimateResponse && (jsxs("div", __assign({ className: "valueconverted" }, { children: ["1 ", (toTransactingToken === null || toTransactingToken === void 0 ? void 0 : toTransactingToken.symbol) || "", " =", " ", estimateResponse
                                                    ? "".concat(formatNumber((estimateResponse === null || estimateResponse === void 0 ? void 0 : estimateResponse.fromTransactingAmount) / estimateResponse.localAmount || 0, 4, 4), " ").concat((_c = getTokenInfoFromAddr(tokens, estimateResponse.fromChainId, estimateResponse.fromTransacting)) === null || _c === void 0 ? void 0 : _c.symbol)
                                                    : "-"] })))] }), jsxs(TotalPrice, { children: [jsx("h6", { children: "Total Price:" }), jsxs("h2", { children: [jsx("img", { src: fromTransactingToken ? fromTransactingToken.image : fromChainInfo && fromChainInfo.image, className: "tokenimg", alt: "" }), estimateResponse
                                                    ? "".concat(formatNumber((estimateResponse === null || estimateResponse === void 0 ? void 0 : estimateResponse.fromTransactingAmount) || 0, 4, 4), " ").concat((_d = getTokenInfoFromAddr(tokens, estimateResponse.fromChainId, estimateResponse.fromTransacting)) === null || _d === void 0 ? void 0 : _d.symbol)
                                                    : "-"] })] }), jsx(StatusButtons, { children: !(isActive && Boolean(account)) ? (jsx("button", __assign({ className: "complete", onClick: function () { return setWidgetActive(ActiveWidgetModal.ConnectWallet); } }, { children: jsx("p", __assign({ className: "d-inline-block fw-bold mb-0" }, { children: "Connect Wallet" })) }))) : chainId && (chainId == (bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.toChainId) || !isSupportedChain(chainId)) ? (jsx("button", __assign({ className: "complete", onClick: function () { } }, { children: jsx("p", __assign({ className: "d-inline-block  fw-bold mb-0" }, { children: "Unsupported Network" })) }))) : chainId &&
                                        (bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId) &&
                                        isSupportedChain(bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId) &&
                                        chainId !== (bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId) ? (jsx("button", __assign({ className: "complete", onClick: function () { return switchToNetwork({ library: provider, chainId: bridgeState.fromChainId }); } }, { children: jsx("p", __assign({ className: "d-inline-block  fw-bold mb-0" }, { children: "Switch Network" })) }))) : !valid ? (jsx("button", __assign({ className: "complete", onClick: function () { } }, { children: jsx("p", __assign({ className: "d-inline-block fw-bold mb-0" }, { children: "Unsupported" })) }))) : error ? (jsx("button", __assign({ className: "complete", onClick: function () { }, disabled: true }, { children: jsx("p", __assign({ className: "d-inline-block  fw-bold mb-0" }, { children: error && error.length <= 50 ? error : "Error" })) }))) : estimating ? (jsx("button", __assign({ className: "complete", onClick: function () { }, disabled: true }, { children: jsx("p", __assign({ className: "d-inline-block fw-bold mb-0" }, { children: "Estimating..." })) }))) : approving ? (jsx("button", __assign({ className: "complete", onClick: function () { }, disabled: true }, { children: jsx("p", __assign({ className: "d-inline-block  fw-bold mb-0" }, { children: "Approving..." })) }))) : calling ? (jsx("button", __assign({ className: "complete", onClick: function () { }, disabled: true }, { children: jsx("p", __assign({ className: "d-inline-block fw-bold mb-0" }, { children: "Transferring..." })) }))) : !estimateResponse ? (jsx("button", __assign({ className: "complete", onClick: function () { }, disabled: true }, { children: jsx("p", __assign({ className: "d-inline-block fw-bold mb-0" }, { children: "Loading..." })) }))) : estimateResponse && !hasSufficientBalance ? (jsx("button", __assign({ className: "complete", onClick: function () { }, disabled: true }, { children: jsx("p", __assign({ className: "d-inline-block  fw-bold mb-0" }, { children: "Insufficient Balance" })) }))) : estimateResponse ? (jsx("button", __assign({ className: "complete", onClick: call, disabled: !estimateResponse }, { children: jsxs("p", __assign({ className: "d-inline-block fw-bold mb-0" }, { children: [" ", jsx(WalletIcon, {}), " Complete Purchase"] })) }))) : null })] })) : null, widgetActive === ActiveWidgetModal.TokenSelect ? (jsx(WidgetContent, { children: jsx(TokenSelectData, { chainId: (_e = bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromChainId) !== null && _e !== void 0 ? _e : (fromChainInfo ? fromChainInfo.chain_id : null), assetId: (_f = bridgeState === null || bridgeState === void 0 ? void 0 : bridgeState.fromTransacting) !== null && _f !== void 0 ? _f : ZERO_ADDRESS, onSelectToken: function (assetId) {
                                    handleChangeFromToken(assetId);
                                }, onSelectNetwork: function (chainId) {
                                    handleChangeFromChain(chainId);
                                } }) })) : null, widgetActive === ActiveWidgetModal.Settings ? (jsx(WidgetContent, { children: jsx(SettingsWidget, {}) })) : null, widgetActive === ActiveWidgetModal.PaymentReview ? (jsx(WidgetContent, { children: jsx(PaymentReview, {}) })) : null, widgetActive === ActiveWidgetModal.PaymentStatus ? (jsx(WidgetContent, { children: jsx(PaymentStatus, { status: "pending" }) })) : null, widgetActive === ActiveWidgetModal.ConnectWallet ? (jsx(WidgetContent, { children: jsx(ConnectWalletModal, { show: true, onHide: function () { return setWidgetActive(ActiveWidgetModal.Main); } }) })) : null] })), widgetActive !== ActiveWidgetModal.TokenSelect && widgetActive !== ActiveWidgetModal.Settings ? (jsxs(WidgetFooter, { children: [jsx("div", __assign({ className: "powered" }, { children: "Powered by FibPal" })), widgetActive === ActiveWidgetModal.PaymentStatus ? (jsx("a", __assign({ href: "#" }, { children: jsx(BscscanIcon, {}) }))) : (jsxs("div", __assign({ className: "feeblock" }, { children: ["Fees ", SWAP_FEE, "%"] })))] })) : null] })) }));
};

function Wallet(_a) {
    _a.disabled;
    // Attempt to connect eagerly on mount
    var defaultChainId = useAtomValue$1(defaultChainIdAtom);
    useEffect(function () {
        connections.forEach(function (_a) {
            var _b = __read(_a, 2), wallet = _b[0]; _b[1];
            var success = wallet.connectEagerly ? wallet.connectEagerly(defaultChainId) : wallet.activate(defaultChainId);
            success === null || success === void 0 ? void 0 : success.catch(function () {
                if (stale)
                    return;
                console.log("Could not connect to ".concat(getConnectorName(wallet)));
            });
        });
        var stale = false;
        return function () {
            stale = true;
        };
    }, [defaultChainId]);
    return null;
}

var PaymentWidget = function (props) {
    var provider = props.provider; props.dialog; var className = props.className, tokenList = props.tokenList; props.onError; var order = props.order;
    var _a = __read(useState(), 2), bridgeState = _a[0], setBridgeState = _a[1];
    var _b = __read(useState(true), 2), valid = _b[0], setValid = _b[1];
    var _c = __read(useState(null), 2); _c[0]; var setError = _c[1];
    var width = useMemo(function () {
        var _a;
        if (props.width && props.width < 400) {
            console.warn("Widget width must be at least 400px (you set it to ".concat(props.width, "). Falling back to 400px."));
            return 400;
        }
        return (_a = props.width) !== null && _a !== void 0 ? _a : 400;
    }, [props.width]);
    var _d = __read(useState(null), 2); _d[0]; _d[1];
    var defaultChainId = useMemo(function () {
        if (!props.defaultChainId)
            return 1;
        if (!isSupportedChain(props.defaultChainId)) {
            console.warn("Unsupported chainId: ".concat(props.defaultChainId, ". Falling back to 1 (Ethereum Mainnet)."));
            return 1;
        }
        return props.defaultChainId;
    }, [props.defaultChainId]);
    var jsonRpcUrlMap = useMemo(function () {
        var e_1, _a;
        if (!props.jsonRpcUrlMap)
            return PROVIDERS_BY_CHAINS;
        try {
            for (var _b = __values(ALL_CHAINS.map(function (c) { return c.chain_id; })), _c = _b.next(); !_c.done; _c = _b.next()) {
                var supportedChainId = _c.value;
                if (!Object.keys(props.jsonRpcUrlMap).includes("".concat(supportedChainId))) {
                    console.warn("Did not provide a jsonRpcUrlMap for chainId: ".concat(supportedChainId, ". "));
                    props.jsonRpcUrlMap[supportedChainId] = PROVIDERS_BY_CHAINS[supportedChainId];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return props.jsonRpcUrlMap;
    }, [props.jsonRpcUrlMap]);
    useEffect(function () {
        if (order) {
            // validate
            var localAmount = order.localAmount || 0;
            if (localAmount === 0) {
                setValid(false);
                setBridgeState(null);
                setError("Price is invalid");
                return;
            }
            var originSender = order.originSender;
            var recovery = originSender;
            var router = ROUTER_ADDRESS;
            var toChainId = order.toChainId;
            if (!isSupportedChain(toChainId)) {
                setValid(false);
                setBridgeState(null);
                setError("Unsupported Network!");
                return;
            }
            var toTransacting = order.toTransacting;
            var isEth = toTransacting === ZERO_ADDRESS;
            var toLocal = isEth ? getWrappedToken(toChainId) : toTransacting;
            if (!toLocal || !isSupportedLocalToken(toChainId, toLocal)) {
                setValid(false);
                setBridgeState(null);
                setError("Unsupported Token Payment!");
                return;
            }
            if (!isAddress(order.toTo) || !order.toData || order.toData === "0x") {
                setValid(false);
                setBridgeState(null);
                setError("Invalid Transaction Data!");
                return;
            }
            setBridgeState(__assign(__assign({}, order), { localAmount: localAmount, fromChainId: undefined, toChainId: toChainId, toTransacting: toTransacting, toLocal: toLocal, toTransactingAmount: localAmount, toRouteQuote: null, router: router, isEth: isEth, isExactInput: false, originSender: originSender, recovery: recovery, relayerFee: "0", estimated: false }));
        }
    }, [order]);
    return (jsx(Fragment, { children: jsx(React.StrictMode, { children: jsx(WidgetWrapper, __assign({ width: width, className: className }, { children: jsx(ActiveWeb3Provider, __assign({ provider: provider, jsonRpcUrlMap: jsonRpcUrlMap, defaultChainId: defaultChainId }, { children: jsx(RefreshContextProvider, { children: jsx(TokensContextProvider, __assign({ defaultTokens: tokenList }, { children: jsxs(TokenPriceContextProvider, { children: [jsx(GlobalStyle, {}), jsx(Wallet, {}), jsx(PaymentConfirm, __assign({}, props, { bridge: bridgeState, valid: valid }))] }) })) }) })) })) }) }));
};
var GlobalStyle = createGlobalStyle(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .mynavbar {    \n    background: linear-gradient(106.89deg, #142949 -7.89%, #250F3A 106.45%);\n  }\n  .select_modal {\n    .modal-content{\n      *{\n        color:#000;\n      }\n    }\n    .border{\n      mix-blend-mode: unset !important;\n      background:rgba(0, 0, 0, 0.5) !important;\n    }\n    .headertag{\n      font-weight:400;\n      img{\n        display:none;\n      }\n    }\n    .modal-content{\n      background:#fff;\n      .select_searchBox{\n        background: #F2F2F2;\n        border: 0.5px solid rgba(0, 0, 0, 0.5);\n        border-radius: 5px;\n        .select_search_input{\n          color:#000 !important;\n          &::placeholder{\n            color: rgba(0, 0, 0, 0.5) !important;\n          }\n        }\n      }\n      .select_searchBox , .select_item{\n        color:#000;\n      }\n      .select_item .select_item_circle{\n        border: 2px solid #429AE3;\n        border-radius: 50%;\n        &::before{\n          background:#429AE3;\n        }\n      }\n    }\n  }\n"], ["\n  .mynavbar {    \n    background: linear-gradient(106.89deg, #142949 -7.89%, #250F3A 106.45%);\n  }\n  .select_modal {\n    .modal-content{\n      *{\n        color:#000;\n      }\n    }\n    .border{\n      mix-blend-mode: unset !important;\n      background:rgba(0, 0, 0, 0.5) !important;\n    }\n    .headertag{\n      font-weight:400;\n      img{\n        display:none;\n      }\n    }\n    .modal-content{\n      background:#fff;\n      .select_searchBox{\n        background: #F2F2F2;\n        border: 0.5px solid rgba(0, 0, 0, 0.5);\n        border-radius: 5px;\n        .select_search_input{\n          color:#000 !important;\n          &::placeholder{\n            color: rgba(0, 0, 0, 0.5) !important;\n          }\n        }\n      }\n      .select_searchBox , .select_item{\n        color:#000;\n      }\n      .select_item .select_item_circle{\n        border: 2px solid #429AE3;\n        border-radius: 50%;\n        &::before{\n          background:#429AE3;\n        }\n      }\n    }\n  }\n"])));
var WidgetWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  border-radius: 0.1em;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  font-feature-settings: \"ss01\" on, \"ss02\" on, \"cv01\" on, \"cv03\" on;\n  font-size: 16px;\n  font-smooth: always;\n  font-variant: none;\n  // height: 400px;\n  min-width: 400px;\n  padding: 0.25em;\n  position: relative;\n  user-select: none;\n  width: ", ";\n\n  * {\n    box-sizing: border-box;\n    font-family: \"Inter\", sans-serif;\n\n    @supports (font-variation-settings: normal) {\n      font-family: \"Inter\", sans-serif;\n    }\n  }\n"], ["\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  border-radius: 0.1em;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  font-feature-settings: \"ss01\" on, \"ss02\" on, \"cv01\" on, \"cv03\" on;\n  font-size: 16px;\n  font-smooth: always;\n  font-variant: none;\n  // height: 400px;\n  min-width: 400px;\n  padding: 0.25em;\n  position: relative;\n  user-select: none;\n  width: ", ";\n\n  * {\n    box-sizing: border-box;\n    font-family: \"Inter\", sans-serif;\n\n    @supports (font-variation-settings: normal) {\n      font-family: \"Inter\", sans-serif;\n    }\n  }\n"])), function (_a) {
    var width = _a.width;
    return width && (isNaN(Number(width)) ? width : "".concat(width, "px"));
});
var templateObject_1, templateObject_2;

if (window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
}
var FibapalWidget = function (props) {
    var order = {
        localAmount: 0.06,
        originSender: "0x94ec0Ba4c17C0a658B51ce375F73b1B18d2650cD",
        toChainId: 56,
        toData: "0x7053b116000000000000000000000000000000000000000000000000000000000004267600000000000000000000000094ec0ba4c17c0a658b51ce375f73b1b18d2650cd",
        toTo: "0xb28d74Cc439d522cba584E218BD62a0EBB0B3b78",
        toTransacting: "0x0000000000000000000000000000000000000000",
    };
    var orderprop = props.orderprop;
    return jsx(PaymentWidget, { order: orderprop ? orderprop : order });
};

export { FibapalWidget as default };
