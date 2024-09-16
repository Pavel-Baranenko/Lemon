import cn from 'classnames'
import { useFlyingStore } from 'src/components/stores/flyingStore'
import useApp from 'src/context/AppContext'
import { useBetsPlay } from 'src/hooks/useBetsPlay'
import { useBetsWatch }                           from 'src/hooks/useBetsWatch'
import { PropsWithChildren, useEffect, useState } from 'react'
import useGame, { GameStage }                     from 'src/hooks/useGame'
import { sleep } from 'src/utils/time'


interface BetsPlayProps {
  className: string;
  multiplier: number;
  amount: string;
  contract: `0x${string}`;
  address: `0x${string}`;
}

export default function BetsPlayButton({
  contract,
  amount,
  multiplier,
  className,
  children,
  address,
}: PropsWithChildren & BetsPlayProps) {
  useBetsWatch({ contract, address });
  const { setOutcomeEvent, outcomeEvent } = useFlyingStore();
  const { balance } = useApp();
  const { betsPlay, betsPlayPending, betsPlayLoading, betsPlaySuccess } = useBetsPlay({ contract });
  const { isStartAvailable,stage,setStage} = useGame()

  const [isDisabled, setIsDisabled] = useState(true);
  const [isWritingPlay, setIsWritingPlay] = useState(false);
  const handleLjtApprove = async () => {
    setOutcomeEvent(undefined);
    setStage(GameStage.SCHEDULED);
    setIsWritingPlay(true);
    try {
      const result = await betsPlay (amount, multiplier);

    }catch(e){
      console.error('BetsPlay error:', e);

    }
    setIsWritingPlay(false);
  };

  useEffect(() => {
    if (!betsPlaySuccess || !outcomeEvent) return;
    balance.refresh();
  }, [betsPlaySuccess]);

  const isAmountValid = !isNaN(Number(amount)) && Number(amount) > 0 && Number(amount) <= Number(balance.value);

  const isMultiplierValid = !isNaN(Number(multiplier)) && multiplier >= 1.1 && multiplier <= 5000;
  useEffect (() => {
    const currentDisabled =isWritingPlay|| betsPlayPending || betsPlayLoading || !isStartAvailable || !isAmountValid || !isMultiplierValid;

    if(isDisabled!==currentDisabled) {
      setIsDisabled(currentDisabled);
/*
      console.log ('BET_PLAY_BUTTOM', currentDisabled, {isWritingPlay,
        stage, betsPlayPending , betsPlayLoading , isStartAvailable , isAmountValid ,isMultiplierValid,
      outcomeEvent
    } 
  )*/
    }
  }, [stage, betsPlayPending , betsPlayLoading ,isWritingPlay, isStartAvailable , isAmountValid ,isMultiplierValid])


  return (
    <>
      <button
        className={cn(className, { disabled: isDisabled })}
        onClick={ handleLjtApprove}
        disabled={isDisabled}
        role="status"
      >
        START
      </button>
    </>
  );
}
