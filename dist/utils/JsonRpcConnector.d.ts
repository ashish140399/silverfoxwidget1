import { JsonRpcProvider } from "@ethersproject/providers";
import { Actions, Connector } from "@web3-react/types";
export default class JsonRpcConnector extends Connector {
    customProvider: JsonRpcProvider;
    constructor(actions: Actions, customProvider: JsonRpcProvider);
    activate(): Promise<void>;
}
