import { UniswapPair, TradeDirection, appendEthToContractAddress } from "simple-uniswap-sdk";
import _ from "lodash";
import { getChainInfo, getTokenDecimalFromAddr, getTokenInfoFromAddr, getWrappedToken } from "./getHelper";
import { BridgeState } from "config/types";
import { BigNumber, utils } from "ethers";
import { BigNumber as BigNumberJs } from "bignumber.js";
import { getDecimalAmount } from "./formatBalance";
import { equals_ignore_case } from "./number";
import { ALL_LOCAL_ASSETS, ROUTER_ADDRESS, SWAP_FEE, ZERO_ADDRESS } from "config";
import { Interface, isAddress } from "ethers/lib/utils";
import { DEFAULT_DESTINATION_SLIPPAGE, getPairSettings, MAX_LIMIT_USD } from "config/swapConfig";
import FibswapABI from "../config/abi/fibswap.json";

export const getTradeInfo = async (
  chainId: number,
  fromToken: string,
  toToken: string,
  account: string,
  amount: number,
  isExactInput: boolean,
  slippage: number,
) => {
  if (!chainId) {
    throw new Error("Unsupported Chain!");
  }

  const chainInfo = getChainInfo(chainId);
  const pairSettings = getPairSettings(chainId, slippage);

  if (!pairSettings || pairSettings.length === 0) {
    throw new Error("Unsupported Chain!");
  }

  try {
    const uniswapPair = new UniswapPair({
      fromTokenContractAddress: fromToken === ZERO_ADDRESS ? getWrappedToken(chainId) : fromToken,
      toTokenContractAddress: toToken === ZERO_ADDRESS ? appendEthToContractAddress(getWrappedToken(chainId)) : toToken,
      ethereumAddress: account,
      chainId: chainId,
      providerUrl: _.sample(chainInfo.provider_params.rpcUrls),
      settings: pairSettings?.[0],
    });

    const uniswapPairFactory = await uniswapPair.createFactory();

    const trade = await uniswapPairFactory.trade(
      String(amount),
      isExactInput ? TradeDirection.input : TradeDirection.output,
    );

    return trade.allTriedRoutesQuotes?.[0] ?? null;
  } catch (e: any) {
    console.log("get trade info error", chainId, fromToken, toToken, amount, e);
    throw new Error(e);
  }
};

export const checkSupport = (tokens: any, bridge: BridgeState) => {
  const { fromChainId, toChainId, fromTransacting, toTransacting } = { ...bridge };
  const source_asset_data = getTokenInfoFromAddr(tokens, fromChainId, fromTransacting);
  const destination_asset_data = getTokenInfoFromAddr(tokens, toChainId, toTransacting);
  return fromChainId && toChainId && source_asset_data && destination_asset_data && fromChainId !== toChainId;
};

export const getSwapEstimate = async (
  tokens: any,
  bridgeState: BridgeState,
  liquidity: any,
  nativePrices: any,
  slippage: number,
) => {
  const bridge = _.cloneDeep(bridgeState);
  const routerAddress = ROUTER_ADDRESS?.toLowerCase();
  if (!routerAddress) {
    throw new Error("Invalid Router");
  }

  if (!checkSupport(tokens, bridge)) {
    throw new Error("Unsupported swap");
  }

  const { fromChainId, toChainId, fromLocal, localAmount } = bridge;
  const fromFibswap = getChainInfo(fromChainId)?.fibswap;
  const toFibswap = getChainInfo(toChainId)?.fibswap;

  if (!isAddress(fromFibswap) || !isAddress(toFibswap)) {
    throw new Error("Invalid Config");
  }

  bridge.router = routerAddress;
  bridge.slippage = slippage;
  if (bridge.isExactInput === false || (fromLocal && localAmount > 0)) {
    return await estimateSwapOuput(bridge, liquidity);
  } else {
    return await estimateSwapInput(bridge, liquidity, nativePrices);
  }
};

const estimateSwapOuput = async (bridge: BridgeState, liquidity: any) => {
  bridge.isExactInput = false;
  const routerAddress = ROUTER_ADDRESS?.toLowerCase();
  const { fromChainId, toChainId, fromLocal, localAmount } = bridge;
  const fromFibswap = getChainInfo(fromChainId)?.fibswap;

  for (const local of ALL_LOCAL_ASSETS) {
    const senderLocal = local.contracts.find((l) => l.chain_id === fromChainId);
    if (senderLocal && equals_ignore_case(senderLocal.contract_address, fromLocal)) {
      const recvLocal = local.contracts.find((l) => l.chain_id === toChainId);

      if (!recvLocal) {
        throw new Error("Invaild asset on receiving side");
      }
      const recvLocalLiquidity = BigNumber.from(
        liquidity[toChainId]?.find(
          (l) => l.router_address === routerAddress && equals_ignore_case(l.local, recvLocal.contract_address),
        )?.amount || "0",
      );
      if (recvLocalLiquidity.lt(getDecimalAmount(String(localAmount), recvLocal.contract_decimals).toString())) {
        throw new Error("Insufficient liquidity");
      }

      if (equals_ignore_case(bridge.fromLocal, bridge.fromTransacting)) {
        bridge.fromTransactingAmount = getAmountWithFee(bridge.localAmount, senderLocal.contract_decimals);
        bridge.fromTo = ZERO_ADDRESS;
        bridge.fromData = "0x";
        bridge.fromRouteQuote = null;

        return bridge;
      } else {
        const fromQuoteExactOut = await getTradeInfo(
          fromChainId,
          bridge.fromTransacting,
          bridge.fromLocal,
          fromFibswap,
          bridge.localAmount,
          false,
          bridge.slippage,
        );

        if (fromQuoteExactOut && fromQuoteExactOut.transaction) {
          bridge.fromTransactingAmount = getAmountWithFee(
            parseFloat(fromQuoteExactOut.expectedConvertQuote),
            fromQuoteExactOut.routePathArrayTokenMap[0].decimals,
          );

          const fromQuote = await getTradeInfo(
            fromChainId,
            bridge.fromTransacting,
            bridge.fromLocal,
            fromFibswap,
            bridge.fromTransactingAmount,
            true,
            bridge.slippage,
          );
          if (fromQuote && fromQuote.transaction) {
            bridge.fromTo = fromQuote.transaction.to;
            bridge.fromData = fromQuote.transaction.data;
            bridge.fromRouteQuote = fromQuote;
            bridge.estimated = true;

            return bridge;
          }
        }
        throw new Error("Failed to estimate");
      }
    }
  }
};

const estimateSwapInput = async (bridge: BridgeState, liquidity: any, nativePrices: any) => {
  const routerAddress = ROUTER_ADDRESS?.toLowerCase();
  const { fromChainId, toChainId } = bridge;
  const fromFibswap = getChainInfo(fromChainId)?.fibswap;

  bridge.isExactInput = true;
  bridge.isEth = bridge.toTransacting === ZERO_ADDRESS;
  for (const local of ALL_LOCAL_ASSETS) {
    const senderLocal = local.contracts.find((l) => l.chain_id === fromChainId);
    const recvLocal = local.contracts.find((l) => l.chain_id === toChainId);

    if (!senderLocal || !recvLocal) {
      continue;
    }

    const senderLiquidity = BigNumber.from(
      liquidity?.[fromChainId]?.find(
        (l) => l.router_address === routerAddress && equals_ignore_case(l.local, senderLocal.contract_address),
      )?.amount || "0",
    );
    const recvLiquidity = BigNumber.from(
      liquidity?.[toChainId]?.find(
        (l) => l.router_address === routerAddress && equals_ignore_case(l.local, recvLocal.contract_address),
      )?.amount || "0",
    );

    if (senderLiquidity.lte(0) || recvLiquidity.lte(0)) {
      continue;
    }

    const selectedSenderLocal = {
      ...senderLocal,
      liquidity: senderLiquidity,
    };

    const selectedRecvLocal = {
      ...recvLocal,
      liquidity: recvLiquidity,
    };

    bridge.fromLocal = selectedSenderLocal.contract_address;
    bridge.toLocal = selectedRecvLocal.contract_address;

    // first calculate from chain route quote
    if (equals_ignore_case(bridge.fromLocal, bridge.fromTransacting)) {
      bridge.fromTo = ZERO_ADDRESS;
      bridge.fromData = "0x";
      bridge.fromRouteQuote = null;
      bridge.localAmount = getAmountWithOutFee(bridge.fromTransactingAmount, selectedSenderLocal.contract_decimals);
    } else {
      const fromQuote = await getTradeInfo(
        fromChainId,
        bridge.fromTransacting,
        bridge.fromLocal,
        fromFibswap,
        bridge.fromTransactingAmount,
        true,
        bridge.slippage,
      );
      if (fromQuote && fromQuote.transaction) {
        bridge.fromTo = fromQuote.transaction.to;
        bridge.fromData = fromQuote.transaction.data;
        bridge.fromRouteQuote = fromQuote;
        bridge.localAmount = getAmountWithOutFee(
          parseFloat(fromQuote.expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
          selectedSenderLocal.contract_decimals,
        );
      } else {
        throw new Error("Failed to estimate");
      }
    }

    // check max limit per swap
    let priceUsd = 0;
    if (local.is_stablecoin) {
      priceUsd = 1;
    } else if (local.is_wrapped) {
      priceUsd = nativePrices?.[local.wrapped_chain_id] || 0;
    } else {
      priceUsd = 0;
    }
    const totalUsd = bridge.localAmount * priceUsd;
    if (totalUsd > MAX_LIMIT_USD) {
      throw new Error("Too big amount!");
    }

    const neededRecvLocal = getDecimalAmount(String(bridge.localAmount), selectedRecvLocal.contract_decimals);
    if (selectedRecvLocal.liquidity.lt(neededRecvLocal)) {
      continue;
    }

    const wrappedTo = getWrappedToken(bridge.toChainId);
    if (equals_ignore_case(bridge.toLocal, bridge.toTransacting)) {
      bridge.toTo = bridge.originSender;
      bridge.toData = "0x";
      bridge.toTransactingAmount = bridge.localAmount;
      bridge.toRouteQuote = null;
    } else if (
      equals_ignore_case(bridge.toLocal, wrappedTo) &&
      equals_ignore_case(bridge.toTransacting, ZERO_ADDRESS)
    ) {
      bridge.toTo = bridge.originSender;
      bridge.toData = "0x";
      bridge.toTransactingAmount = bridge.localAmount;
      bridge.toRouteQuote = null;
      bridge.isEth = true;
    } else {
      const toQuote = await getTradeInfo(
        toChainId,
        bridge.toLocal,
        bridge.toTransacting,
        bridge.originSender,
        parseFloat(new BigNumberJs(bridge.localAmount).minus(1e-6).toFixed(selectedSenderLocal.contract_decimals)),
        true,
        DEFAULT_DESTINATION_SLIPPAGE,
      );
      if (toQuote && toQuote.transaction) {
        bridge.toTo = toQuote.transaction.to;
        bridge.toData = toQuote.transaction.data;
        bridge.toTransactingAmount = parseFloat(toQuote.expectedConvertQuote);
        bridge.toRouteQuote = toQuote;
      } else {
        throw new Error("Failed to estimate");
      }
    }
    console.log(bridge);
    bridge.estimated = true;
    return bridge;
  }

  throw new Error("Insufficient Liquidity");
};

export const convertToXCallParams = (tokens: any, bridge: BridgeState): any => {
  const {
    router,
    recovery,
    fromChainId,
    toChainId,
    fromTransacting,
    fromTransactingAmount,
    fromLocal,
    localAmount,
    toLocal,
    isEth,
    fromTo,
    fromData,
    toTo,
    toData,
    relayerFee,
    isExactInput,
  } = { ...bridge };

  const fromTransactingInfo = getTokenInfoFromAddr(tokens, fromChainId, fromTransacting);

  return {
    params: {
      router,
      recovery,
      origin: String(fromChainId),
      destination: String(toChainId),
      orgLocalAsset: fromLocal,
      dstLocalAsset: toLocal,
      isEth,
      orgParam: {
        to: fromTo,
        data: fromData ?? "0x",
      },
      dstParam: {
        to: toTo,
        data: toData ?? "0x",
      },
    },
    transactingAssetId: fromTransacting,
    amount: getDecimalAmount(String(fromTransactingAmount), fromTransactingInfo.decimals).toString(),
    localAmount: getDecimalAmount(
      String(localAmount),
      getTokenDecimalFromAddr(tokens, fromChainId, fromLocal),
    ).toString(),
    relayerFee,
    isExactInput,
  };
};

export const getAmountWithOutFee = (amount: number, decimals: number): number => {
  return parseFloat(
    new BigNumberJs(amount)
      .multipliedBy(100 - SWAP_FEE)
      .dividedBy(100)
      .toFixed(decimals),
  );
};

export const getAmountWithFee = (amount: number, decimals: number): number => {
  return parseFloat(
    new BigNumberJs(amount)
      .multipliedBy(100)
      .dividedBy(100 - SWAP_FEE)
      .multipliedBy(1.0025)
      .toFixed(decimals),
  );
};

export const parseFibswapError = (errorData: string | undefined): string | null => {
  const iErrors = new Interface(FibswapABI);
  if (!errorData) {
    return null;
  }
  if (errorData.startsWith("0x08c379a0")) {
    // decode Error(string)

    const content = `0x${errorData.substring(10)}`;
    const reason = utils.defaultAbiCoder.decode(["string"], content);

    return reason[0]; // reason: string; for standard revert error string
  }

  if (errorData.startsWith("0x4e487b71")) {
    // decode Panic(uint)
    const content = `0x${errorData.substring(10)}`;
    const code = utils.defaultAbiCoder.decode(["uint"], content);

    return code[0];
  }

  try {
    const errDescription = iErrors.parseError(errorData);
    const name = errDescription?.name;
    console.log(errDescription);
    switch (name) {
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
  } catch (e: any) {
    console.error(e);
  }
  return null;
};
