import useApp from 'src/context/AppContext'
import React from 'react'


interface LjtBalanceProps {
  symbol: string
}

const LjtBalance = React.memo(({ symbol }: LjtBalanceProps) => {
  const { balance } = useApp();
  return (
    <span>{Math.round(parseFloat(balance.value) * 10) / 10} {symbol}</span>
  );
});

LjtBalance.displayName = 'LjtBalance';

export default LjtBalance;
