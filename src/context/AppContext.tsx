import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import  { type Contracts, useContracts } from "src/hooks/useContracts";

import { Config, useAccount } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { useLjtBalance } from "src/hooks/useLjtBalance";

type AppState = {
  isConnected: boolean
  address: `0x${string}` | undefined
  chain: Chain | undefined
  contracts: Record<Contracts, `0x${string}` | undefined> | undefined
  balance: {
    value: string
    refresh: () => any
  },
  projectId: string;
  wagmiConfig: Config | undefined;
};

// 1. create a context with AppState and initialize it to null
export const AppContext = createContext<AppState>({
  isConnected: false,
  address: undefined,
  chain: undefined,
  contracts: undefined,
  balance: {
    value: '0',
    refresh: () => {}
  },
  projectId: '',
  wagmiConfig: undefined
});

const useApp = (): AppState => {
  // 2. use the useContext hook
  const context = useContext(AppContext);

  // 3. Make sure it's not null!
  if (!context) {
    throw new Error("Please use AppProvider in parent component");
  }

  return context;
};

type AppProviderProps = {
  chains: Chain[];
  projectId: string;
  wagmiConfig: Config;
} & PropsWithChildren;

export const AppProvider = ({ chains, wagmiConfig, projectId, children }: AppProviderProps) => {
  const [ isConnected, setIsConnected ] = useState<boolean>(false);
  const { address, chain } = useAccount();
  const refProgram = { referrer: undefined, refresh: () => {} }
  const supportedChain = chains.find(x => x.id == chain?.id);
  const contracts = useContracts(chain);
  const balance = useLjtBalance({ contract: contracts?.ljt, address });

  useEffect(() => {
    setIsConnected(address !== undefined)
  }, [address])

  return (
    <AppContext.Provider value={{ isConnected, address, chain: supportedChain, contracts, balance, wagmiConfig, projectId  }}>
      {children}
    </AppContext.Provider>
  );
};

export default useApp;
