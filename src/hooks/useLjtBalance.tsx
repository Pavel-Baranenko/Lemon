import { useEffect } from 'react';
import { useReadLjtBalanceOf } from './generated';
import { formatEther } from 'viem';

interface ljtBalanceProps {
  address: `0x${string}` | undefined,
  contract: `0x${string}` | undefined
}

export function useLjtBalance({ address, contract }: ljtBalanceProps) {
  const balance = useReadLjtBalanceOf(address && contract && { 
    address: contract,
    args: [address]
  })

  const onFocus = () => {
    balance?.refetch()
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  
  return {
    value: formatEther(balance?.data || BigInt(0)),
    refresh: balance?.refetch
  };
}