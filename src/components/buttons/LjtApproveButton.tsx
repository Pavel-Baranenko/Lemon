import cn from 'classnames'
import { useLjtApprove } from 'src/hooks/useLjtApprove'
import { PropsWithChildren } from 'react'


interface ljtApproveProps {
  className: string,
  amount: string,
  spender: `0x${string}`,
  contract: `0x${string}`
}

export default function LjtApproveButton({ className, contract, amount, spender, children }: PropsWithChildren & ljtApproveProps) {
  const { ljtApprove, ljtApprovePending, ljtApproveLoading } = useLjtApprove({ contract, spender });

  const handleLjtApprove = async () => {
    ljtApprove(amount)
  }

  return (<>
    <button className={cn(className, { disabled: ljtApprovePending || ljtApproveLoading })} onClick={handleLjtApprove}>
      { ljtApprovePending || ljtApproveLoading ?
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>{children}</>
      }
    </button>
  </>
  );
};
