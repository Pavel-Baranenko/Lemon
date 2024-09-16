import { useEffect, useState } from 'react';
import { useWriteLjtApprove } from './generated';
import { useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-toastify';
import { parseEther } from 'viem';
import { getErrorTitle } from 'src/utils/errorHandler';

interface ljtApproveProps {
  spender: `0x${string}`,
  contract: `0x${string}`
}

export function useLjtApprove({ contract, spender }: ljtApproveProps) {
  const { writeContract, data: hash, isPending, error } = useWriteLjtApprove();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash }) 

  const ljtApprove = (amount: string) => writeContract({
    address: contract,
    args: [spender, parseEther(amount)]
  })

  useEffect(() => {
    if (!error) return;
    const message = getErrorTitle(error);
    toast.error(message);
  }, [error])

  return {
    ljtApprove: ljtApprove,
    ljtApprovePending: isPending,
    ljtApproveLoading: isLoading,
    ljtApproveSuccess: isSuccess
  };
}