import useApp from 'src/context/AppContext'
import LjtBalance from './LjtBalance'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { truncate } from 'src/utils/misc'
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";


export const ConnectButton = () => {
  const { isConnected, chain, address } = useApp()
  const { open, close } = useWeb3Modal()
  const { isDisconnected } = useAccount()

  useEffect(() => {
    isDisconnected && close()
  }, [isDisconnected]);


  return (
    <div>
      {(() => {
        if (!isConnected) {
          return (
            <button className="btn btn-outline-light rounded-4 px-5" onClick={() => open()}
              type="button">
              Connect
            </button>
          );
        }
        if (!chain) {
          return (
            <button className="btn btn-outline-light rounded-4 px-4"
              onClick={() => open({ view: 'Networks' })} type="button">
              Wrong network
            </button>
          );
        }
        return (
          <div style={{ display: 'flex', gap: 5 }}>
            <button
              className={'btn btn-link p-0'}
              onClick={() => open({ view: 'Networks' })}
              style={{ display: 'flex', alignItems: 'center' }}
              type="button"
            >
              {chain && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    overflow: 'hidden',
                    marginRight: 4,
                  }}
                >
                  <img
                    alt={chain.name ?? 'Chain icon'}
                    src="https://arbitrum.io/logo_monochrome.svg"
                    style={{ width: 28, height: 28 }}
                  />
                </div>
              )}
            </button>

            <div className="input-group">
              <div className="input-group-text text-dark rounded-start-4" id="btnGroupAddon">
                <LjtBalance symbol="LJT" />
              </div>
              <button className="btn btn-outline-light rounded-end-4 account-button"
                onClick={() => open()} type="button">
                <span className="d-none d-md-block">{truncate(address, 4)}</span>
                <span className="d-md-none px-1">
                  <svg style={{ position: 'absolute', top: '8px', left: '5px' }} width="20"
                    fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 60.671 60.671"
                    xmlSpace="preserve"><g><g><ellipse cx="30.336" cy="12.097" rx="11.997"
                      ry="12.097" /><path
                        d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z" /></g></g></svg>
                </span>
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
