import { GameFrame } from '../../babylon/GameFrame'
import { type OutcomeEvent, useFlyingStore } from '../../stores/flyingStore'
import useApp from 'src/context/AppContext'
import { getAltitudeBySeconds, getSecondsByAltitude, sleep } from 'src/utils/time'
import { formatEther } from 'viem'
import { useEffect, useRef, useState } from 'react'
import useGame, { GameStage } from 'src/hooks/useGame'
interface GameContainerProps {
    multiplier: number;
    bet: number;
  }

export const GameContainer: React.FC<GameContainerProps> = ({ multiplier, bet }) => {
    const store = useFlyingStore ()
    const outcomeEvent: OutcomeEvent | undefined = store.outcomeEvent

    const  x = Number ((outcomeEvent ? Number(outcomeEvent.x): 0)/100)
    const   payout=formatEther((outcomeEvent? outcomeEvent.payout: 0n))

    const requestId =outcomeEvent?outcomeEvent.requestId : '0'
    //@ts-ignore
    return <Rend x={x} payout={payout} requestId={requestId} >

    </Rend>
}

const Rend = ({x, payout,requestId}: { x: number, payout: number,requestId: string}) => {
    const {balance} = useApp()
    const flyDuration = getSecondsByAltitude (x) * 1000
    const {stage,setStage,flyingTime, setFlyingTime} = useGame()

    const strtedRef = useRef(null)

    useEffect (() => {
        if(strtedRef.current === requestId || requestId=='0')
            return
        //@ts-ignore
        strtedRef.current = requestId

        //@ts-ignore
        let interval
        let cancelled = false
        let  f = async () =>{
            if(!x || requestId === '0') return

            setStage (GameStage.PREPARING)
            await sleep(1500)

           if(cancelled)
               return
           setStage (GameStage.STARTED)
            const start = new Date().getTime()
            interval = setInterval(async () => {
                let diff = new Date().getTime() - start

                const newXValue =getAltitudeBySeconds(diff/1000)
                if(diff >= flyDuration || newXValue >= x ) {
                    diff = flyDuration
                    setFlyingTime(diff)
                    //@ts-ignore
                    clearInterval(interval)

                    balance.refresh()
                    setStage(GameStage.COMPLETED)
                  /*  await sleep(7000)
                    if(cancelled)
                        return
                    setStage(GameStage.SCHEDULED)
                    setFlyingTime(0)*/

                }else {
                    setFlyingTime(diff)
                }

            }, 10)

        }

        f()

        return () =>{
            //@ts-ignore
            if(interval) clearInterval(interval)
            cancelled = true
        }
    },[requestId])

    return     <GameFrame  {...{
        stage: stage,
        endXValue:x,
        flyingTime,
        flyDuration:flyDuration,
    }


    }/>
}
