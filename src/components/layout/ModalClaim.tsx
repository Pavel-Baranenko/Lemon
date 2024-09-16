import LjtMintButton from 'src/components/buttons/LjtMintButton'
import UnauthButton from 'src/components/buttons/UnauthButton'
import useApp from 'src/context/AppContext'
import { useState } from 'react'


interface ModalClaimProps {
}

export default function ModalClaim({}: ModalClaimProps) {
  const { address, contracts, chain, balance } = useApp();
  const [ amount, setAmount ] = useState<string>('10')

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value)
  };


  if (address && chain && contracts?.ljt) {
    return (<div style={{maxWidth: '400px'}}>
      <div className="row mb-3">
        <div className="col-6">
          <div style={{fontSize: '11px'}}>YOU WIN:</div>
          <input className="form-control form-control-lg text-center mt-1" type="number" defaultValue={'125'} readOnly />
        </div>
        <div className="col-6">
          <div style={{fontSize: '11px'}}>BALANCE:</div>
          <input className="form-control form-control-lg text-center mt-1" type="number" value={balance.value} readOnly />
        </div>
      </div>
      <div style={{fontSize: '11px'}}>SET AMOUNT:</div>
      <input className="form-control form-control-lg text-center mt-2" type="number" value={amount} onChange={handleChangeAmount} />
      <LjtMintButton className="btn btn-lg btn-dark rounded-3 w-100 mt-3" to={address} contract={contracts?.ljt} amount={amount}>
        CLAIM LJT
      </LjtMintButton>
    </div>)
  }

  return (<div style={{maxWidth: '400px'}}>
    <div className="row mb-3">
      <div className="col-6">
        <div style={{fontSize: '11px'}}>YOU WIN:</div>
        <input className="form-control form-control-lg text-center mt-1" type="string" value={'-'} readOnly />
      </div>
      <div className="col-6">
        <div style={{fontSize: '11px'}}>BALANCE:</div>
        <input className="form-control form-control-lg text-center mt-1" type="string" value={'-'} readOnly />
      </div>
    </div>
    <div style={{fontSize: '11px'}}>SET AMOUNT:</div>
    <input className="form-control form-control-lg text-center mt-2" type="string" value={'-'} readOnly />
    <UnauthButton className="btn btn-lg btn-dark rounded-3 w-100 mt-3" />
  </div>)
}
