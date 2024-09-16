import { useState } from 'react';
import { useWatchLemonJetOutcomeEventEvent } from './generated';
import { OutcomeEvent, useFlyingStore } from 'src/components/stores/flyingStore';

interface BetsPlayProps {
  contract: `0x${string}`
  address: `0x${string}`
}

export function useBetsWatch({ contract, address }: BetsPlayProps) {
  const { setOutcomeEvent } = useFlyingStore()

  useWatchLemonJetOutcomeEventEvent(contract && {
    address: contract,
    args: {
      playerAddress: address
    },
    onLogs(logs) {
      console.log(logs)
      if (logs?.length) {
        setOutcomeEvent(logs[0].args as OutcomeEvent)
      }
    }
  });
}