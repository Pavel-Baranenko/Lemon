import cn from 'classnames'
import useApp from 'src/context/AppContext'
import { useLjtMint } from 'src/hooks/useLjtMint'
import { PropsWithChildren, useEffect } from 'react'


interface ljtMintProps {
  className: string,
  amount: string,
  to: `0x${string}`,
  contract: `0x${string}`
}

export default function LjtMintButton({ className, contract, amount, to, children }: PropsWithChildren & ljtMintProps) {
  
  const { balance } = useApp();
  console.log(balance)
  const { ljtMint, ljtMintPending, ljtMintLoading, ljtMintSuccess } = useLjtMint({ contract, to });

  const handleljtMint = async () => {
    ljtMint(amount)
  }

  useEffect(() => {
    if (!ljtMintSuccess) return;
    balance.refresh();
  }, [ljtMintSuccess])

  return (<>
    <button className={cn(className, { disabled: ljtMintPending || ljtMintLoading })} onClick={handleljtMint}>
      { ljtMintPending || ljtMintLoading ?
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>{children}</>
      }
    </button>
  </>
  );
};
