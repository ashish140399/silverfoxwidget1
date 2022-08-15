import { connections, defaultChainIdAtom, getConnectorName } from "../../hooks/useWeb3React";
import { useAtomValue } from "jotai/utils";
import { useEffect } from "react";

interface WalletProps {
  disabled?: boolean;
}

export default function Wallet({ disabled }: WalletProps) {
  // Attempt to connect eagerly on mount
  const defaultChainId = useAtomValue(defaultChainIdAtom);
  useEffect(() => {
    connections.forEach(([wallet, _]) => {
      const success = wallet.connectEagerly ? wallet.connectEagerly(defaultChainId) : wallet.activate(defaultChainId);
      (success as Promise<void>)?.catch(() => {
        if (stale) return;
        console.log(`Could not connect to ${getConnectorName(wallet)}`);
      });
    });

    let stale = false;
    return () => {
      stale = true;
    };
  }, [defaultChainId]);

  return null;
}
