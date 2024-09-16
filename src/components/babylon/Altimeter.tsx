import React from 'react'
import cn from 'classnames'
import { getAltitudeBySeconds } from '../../utils/time'
import { GameStage } from '../../hooks/useGame'

export type GameState = {
    stage: GameStage
    flyDuration: number
    flyingTime: number
    endXValue: number
}

export default function Altimeter({stage,endXValue,flyingTime,flyDuration,payoutLJTS}: GameState & {payoutLJTS: string}) {

  const altitude = stage ===GameStage.COMPLETED ?
                       endXValue :
                       getAltitudeBySeconds(Math.min(flyingTime, flyDuration) / 1000);

  const isStageWithAltitude = stage === GameStage.STARTED || stage === GameStage.COMPLETED;

  const currentX = isStageWithAltitude
    ? altitude.toFixed(2)
    : "1.00";

  return (
    <>
      <div className="payout" style={{ filter: "drop-shadow(2px 4px 6px black)" }}>
            <div className="payout-multiplayer">
              <span>{currentX}</span>x
            </div>
            {
                stage == GameStage.COMPLETED &&
                <PayoutAmount>{payoutLJTS}</PayoutAmount>
            }
      </div>
        <Axis value={altitude}/>
    </>
  );
}

const PayoutAmount = ({children}:{children: React.ReactNode}) => {
    return <>
        <div className="payout-subtitle">Current Payout</div>
        <div className="payout-value">{children} LJT</div>
    </>
}



const Axis = ({value}:{value: number}) => {
    const minVisibleMarkIndex = Math.floor (value * 10) - 3
    const maxVisibleMarkIndex = Math.ceil (value * 10) + 5
    const marks = []

    for (
        let current = minVisibleMarkIndex;
        current <= maxVisibleMarkIndex;
        current++
    ) {
        marks.push (
            <Mark key={current} currentAltitude={value} markValue={current / 10}/>,
        )
    }

    return (<div className="axis">
                <div className="axis-container">
                    <div className={cn ('axis-linear')}>{marks}</div>
                </div>
            </div>
    )
}

type MarkProps = {
    currentAltitude: number,
    markValue: number
}

const Mark = ({
                  currentAltitude, markValue,
              }: MarkProps) => {
    const xvalue = 1 - currentAltitude
    const markOffset = (xvalue * -500  ) + markValue * -500
    const text = markValue.toFixed (2)+'x'
    const isInteger = (markValue % 1 === 0) && markValue !== 1
    return <div id={'Mark_' + markValue}
                className={'unit-meter '+ (isInteger ? 'unit-meter-integer':' ')}
                style={{bottom: -markOffset + 'px'}}
            >
            <div className="short-last"></div>

            <div className="short"></div>
            <div className="short"></div>
            <div className="short"></div>
            <div className="short"></div>

            <span className="x-text">{text}</span>
        </div>
}
