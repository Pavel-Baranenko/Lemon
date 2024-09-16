import cn from 'classnames'
import { PropsWithChildren } from 'react'
import { Chain } from 'viem'


interface UnauthProps {
  address?: `0x${string}` | undefined,
  chain?: Chain | undefined
  className?: string
}

export default function UnauthButton({ className, address, chain, children }: PropsWithChildren & UnauthProps) {
  return (
    <>
      { !address ? (
        <button className={cn(className, 'disabled')}>{children || 'Connect'}</button>
      ) : !chain ? (
        <button className={cn(className, 'disabled')}>{children || 'Switch'}</button>
      ) : (
        <button className={cn(className, 'disabled')}>{children || 'Whoops'}</button>
      )}
    </>
  );
};
