import { useEffect, useState } from 'react';
import { useWriteLjtMint } from './generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-toastify';
import { parseEther } from 'viem';
import { getErrorTitle } from 'src/utils/errorHandler';

interface ljtMintProps {
  to: `0x${string}`,
  contract: `0x${string}`
}

export function useLjtMint({ contract, to }: ljtMintProps) {
  const { writeContract, data: hash, isPending, error } = useWriteLjtMint();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash }) 
console.log(contract)
  const ljtMint = (amount: string) => writeContract({
    address: contract,
    args: [to, parseEther(amount)]
  })

  useEffect(() => {
    if (!error) return;
    const message = getErrorTitle(error);
    toast.error(message);
  }, [error])

  return {
    ljtMint: ljtMint,
    ljtMintPending: isPending,
    ljtMintLoading: isLoading,
    ljtMintSuccess: isSuccess
  };
}