import { PropsWithChildren } from 'react'
import Header from './Header'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import ModalClaim from './ModalClaim'
import ModalReferrals from './ModalReferrals'


Modal.setAppElement('#__next');

export default function Web3Layout({ children }: PropsWithChildren) {
  const router = useRouter()

  return (
    <div className="min-vh-100">
      <Header />
      {children}
      <Modal
        isOpen={!!router.query.modal}
        onRequestClose={() => router.push(router.basePath)}
        contentLabel="Post modal"
      >
        {router.query.modal === 'claim' && <ModalClaim />}
        {router.query.modal === 'referrals' && <ModalReferrals />}
      </Modal>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  )
}
