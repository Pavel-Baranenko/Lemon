import cn from 'classnames'
import FlyingScene from './FlyingScene'
import Altimeter, { GameState } from './Altimeter'
import React, { memo } from 'react'
import { useFlyingStore } from '../stores/flyingStore'
import { formatEther } from 'viem'
import { getAltitudeBySeconds } from '../../utils/time'


export type GameFrameProps = {
    disabled?: boolean
   } & GameState

export const GameFrame = memo(function GF({disabled,...gameState}:GameFrameProps)  {
    const {outcomeEvent} = useFlyingStore()
    const payoutLJTS = formatEther(outcomeEvent ? outcomeEvent.payout : BigInt(0))
    return (
       <>
           <div
            className={cn ('app-flying')}>

            <FlyingScene disabled={disabled}
                         gameState={gameState}/>
            <Altimeter {...gameState} payoutLJTS={payoutLJTS}/>

            </div>
     {/*    <div>

              <div>outcomeEvent.payout: {formatEther((outcomeEvent||{payout: BigInt(0)}).payout)}</div>
               <div>outcomeEvent.x: {Number((outcomeEvent||{}).x)/100}</div>
               <div>stage: {gameState.stage}</div>
               <div>flyingTime: {gameState.flyingTime}</div>
               <div>altitude: {getAltitudeBySeconds (gameState.flyingTime/1000)}</div>
               <div>endXValue: {gameState.endXValue}</div>
           </div> */}
       </>
    )
})
