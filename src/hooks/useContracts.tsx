
import { useEffect, useState } from 'react';
import { Chain } from 'viem';

export enum Contracts {
  LJT = "ljt",
  BETS = "bets"
}
export const blockExplorer: Record<number,string> = {
  42161: 'https://arbiscan.io', // Arbitrum Mainnet
  421614: 'https://sepolia.arbiscan.io/', // Arbitrum Sepolia Testnet
  59144: 'https://lineascan.build', // Linea Mainnet
  59140: 'https://sepolia.lineascan.build', // Linea Sepolia Testnet
}

export function useContracts(chain: Chain | undefined) {
  const [ contracts, setContracts ] = useState<Record<Contracts, `0x${string}` | undefined> | undefined>()
  
  useEffect(() => {
    if (!chain) return;
        
    if ([42161, 421614].includes(chain.id)) {
      setContracts({
        [Contracts.BETS]: process.env['NEXT_PUBLIC_CONTRACT_ARBITRUM_BETS'] as '0x',
        [Contracts.LJT]: process.env['NEXT_PUBLIC_CONTRACT_ARBITRUM_LJT'] as '0x'
      })
      return;
    }

    if ([59144, 59140].includes(chain.id)) {
      setContracts({
        [Contracts.BETS]: process.env['NEXT_PUBLIC_CONTRACT_LINEA_BETS'] as '0x',
        [Contracts.LJT]: process.env['NEXT_PUBLIC_CONTRACT_LINEA_LJT'] as '0x'
      })
      return;
    }
  }, [chain])

  return contracts;
}