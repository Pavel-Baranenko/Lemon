import NumberInput from '../../layout/NumberInput'
import BetsPlayButton from '../../buttons/BetsPlayButton'
import UnauthButton from '../../buttons/UnauthButton'
import useApp from 'src/context/AppContext'
import { useEffect, useState } from 'react'
import { useIsMounted } from '../../../hooks/useIsMounted'

const DEFAULT_BET = Number(process.env.NEXT_PUBLIC_DEFAULT_BET || '100');

export default function StakingPanel ()  {
    const { address, contracts, chain, balance } = useApp();
    const getDefaultBet = () =>
        String(Number(balance.value) > Number(DEFAULT_BET) ? DEFAULT_BET : balance.value)

    const truncateToTwoDecimals = (value: number) => {
        return Math.floor(value * 100) / 100;
    };

    const [bet, setBet] = useState(getDefaultBet()); // Initialize bet with 100

    useEffect (() => {
        if(bet === '0' || Number(bet) > Number(balance.value))
            setBet(getDefaultBet())
    }, [balance.value])

    const [multiplier, setMultiplier] = useState<string>('2');
    const isMounted = useIsMounted();

    const handleDouble = () => {
        const newBet = Math.min(Number(bet) * 2, Number(balance.value)).toString(); // Ensure bet doesn't exceed balance
        setBet(newBet);
    };

    const handleHalve = () => {
        const newBet = (Number(bet) / 2).toString();
        setBet(newBet);
    };

    const calculateWinChance = (multiplier: number) => {
        return (Math.min(100, 100 / multiplier) * 0.99).toFixed(2);
    };

    const handleMaxBet = () => {
        setBet(truncateToTwoDecimals(Number(balance.value)).toFixed(2)); // Set the bet to the full balance value, truncated to 2 decimals
    };
return <>
    <div className="row">
        <div className="col-sm-12 col-9">
            <label className="px-2 py-2">LJT
                amount:</label>
            <label
                className="float-end px-2 py-2"> {( Number (bet) * 0.14 ).toFixed (2)} USDT</label>

            <NumberInput
                state={[ bet, setBet ]}
                className="form-control border-0 form-control-lg text-center"
                size={38}
                step={1}
                min={1}
                max={Number (balance.value)}

            />
        </div>
        <div
            className="col-sm-12 col-3 ps-0 ps-sm-3">
            <div
                className="d-flex gap-2 flex-column flex-sm-row mt-4 mt-sm-0"
                style={{paddingTop: '6px'}}>
                <div className="col">
                    <button
                        className="btn btn-secondary btn-sm w-100 rounded-4 py-0 py-sm-1"
                        onClick={handleHalve}
                        disabled={Number (bet) / 2 < 1}
                    >
                        /2
                    </button>
                </div>
                <div
                    className="col d-none d-sm-block">
                    <button
                        className="btn btn-secondary btn-sm w-100 rounded-4 py-0 py-sm-1"
                        onClick={handleMaxBet}
                    >
                        MAX
                    </button>
                </div>
                <div className="col">
                    <button
                        className="btn btn-secondary btn-sm w-100 rounded-4 py-0 py-sm-1"
                        onClick={handleDouble}
                        disabled={Number (bet)  >= Number (balance.value)} // Disable button if bet equals or exceeds balance
                    >
                        x2
                    </button>
                </div>
            </div>
        </div>
    </div>
    <hr className="my-1 my-sm-3"/>
    <div className="row">
        <div className="col-sm-12 col-8">
            <label
                className="px-2 py-2">Chance: <strong>{calculateWinChance (Number (multiplier))}%</strong></label>
            <label
                className="float-end px-2 py-2"><strong>{( Number (bet) * Number (multiplier) ).toFixed (2)} LJT</strong>
            </label>

            <NumberInput
                state={[
                    multiplier,
                    setMultiplier
                ]}
                className="form-control border-0 text-center"
                size={30}
                step={0.1}
                min={1.1}
                max={5000}

            />
        </div>

        <div
            className="col-sm-12 col-4 ps-0 ps-sm-3 mt-3 mt-sm-0">
            {address && chain && contracts?.bets
             ? (
                 <BetsPlayButton
                     className="btn btn-lg btn-dark w-100 rounded-4 py-2 my-3"
                     address={address}
                     contract={contracts.bets}
                     amount={bet}
                     multiplier={Math.round (Number (multiplier) * 100)}
                 >
                     START
                 </BetsPlayButton>
             ) : (
                 <UnauthButton
                     className="btn btn-lg btn-dark w-100 rounded-4 py-2 my-3"
                     address={address}
                     chain={chain}
                 />
             )}
        </div>
    </div>
</>
}
