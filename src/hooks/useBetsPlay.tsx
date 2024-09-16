import { useEffect, useState } from 'react';
import { useWriteLemonJetPlay } from './generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-toastify';
import { parseEther } from 'viem';
import { getErrorTitle } from 'src/utils/errorHandler';

interface BetsPlayProps {
  contract: Contract
}

export type Contract = `0x${string}`

export function useBetsPlay({ contract }: BetsPlayProps) {
  const { writeContractAsync, data: hash, isPending, error } = useWriteLemonJetPlay();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

  const betsPlay = (amount: string, multiplier: number) => writeContractAsync({
    address: contract,
    args: [parseEther(amount), BigInt(multiplier), `0x0000000000000000000000000000000000000000`]
  })


  useEffect(() => {
    if (!error) return;
    const message = getErrorTitle(error);
    toast.error(message);
  }, [error])

  return {
    betsPlay: betsPlay,
    betsPlayPending: isPending,
    betsPlayLoading: isLoading,
    betsPlaySuccess: isSuccess
  };
}
