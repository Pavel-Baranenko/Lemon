import HomePage from './home/HomePage'
import { useOnMount } from 'src/hooks/useOnMount'
import { ConnectionController } from '@web3modal/core'
import { useEffect } from 'react'
import type { Web3Modal } from '@web3modal/wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { WebApp as WebAppTypes } from '@twa-dev/types'


interface WebAppProps {
  modal: Web3Modal
  webApp: WebAppTypes
}

export default function WebAppPage({ modal, webApp }: WebAppProps) {
  console.log(webApp)
  const queryClient = useQueryClient()
  console.log("webApp")
  useOnMount(() => {
    webApp.MainButton.hide();
    // Expand the Telegram Mini App to full screen
    webApp.expand();
    // Initialize the Telegram Mini App SDK
    webApp.ready();
    // Enable the closing confirmation
    // WebApp.enableClosingConfirmation();
    // Set color header
    webApp.setHeaderColor('#1a1a1a');
  })

  useEffect(() => {
    const sub1 = ConnectionController.subscribeKey('wcUri', val => {
      webApp.openLink(`https://metamask.app.link/wc?uri=${encodeURIComponent(val!)}`);
    })

    const sub2 = queryClient.getMutationCache().subscribe(event => {
      if (event.type == 'added' && event.mutation?.options.mutationKey && event.mutation.options.mutationKey.includes("writeContract")) {
        webApp.openLink(`https://metamask.app.link`)
      }
    })

    const sub3 = modal.subscribeEvents(({ data }) => {
      if (data.event === "SELECT_WALLET" && data.properties.name == 'MetaMask') {
        if (!ConnectionController.state.wcUri) return;
        webApp.openLink(`https://metamask.app.link/wc?uri=${encodeURIComponent(ConnectionController.state.wcUri)}`);
      }
    })

    return () => {
      sub1();
      sub2();
      sub3();
    }
  }, [])

  return (<>
    <HomePage />
  </>);
};
