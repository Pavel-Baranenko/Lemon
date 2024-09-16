import Layout from 'src/components/layout/Web3Layout'
import { GameContainer } from './GameContainer'
import PaymentServicesPanel from './PaymentServicesPanel'
import StakingPanel from './StakingPanel'


export default function HomePage() {
  return (
    <Layout>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-7 order-md-2">
            <GameContainer
							multiplier={2}
							bet={Number(2)} />
          </div>
          <div className="col-md-5 order-md-1 d-flex align-items-center align-content-stretch">
            <div className="left-form my-1 d-flex flex-column">
              <PaymentServicesPanel/>
              <StakingPanel/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
