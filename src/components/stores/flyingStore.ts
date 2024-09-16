import { Nullable, ParticleSystem, Scene as BabylonScene } from '@babylonjs/core'
import { create } from 'zustand'
import {  } from '../../hooks/useGame'
export enum GameStage {
    SCHEDULED = 'scheduled',
    PREPARING = 'preparing',
    STARTED = 'started',
    COMPLETED = 'completed',
    FAILED = 'failed',
}


export interface OutcomeEvent {
    requestId: bigint;
    playerAddress: `0x${string}`;
    wager: bigint;
    payout: bigint;
    x: bigint;
    threshold: bigint;
    multiplier: bigint;
}

interface StoreInterface {
  outcomeEvent: OutcomeEvent | undefined
  setOutcomeEvent: (event: OutcomeEvent | undefined) => void
  stage: GameStage,
  setStage: (stage: GameStage) => void,
  flyingTime: number,
  setFlyingTime: (time: number) => void

}

export const useFlyingStore = create<StoreInterface>((set, get) => ({
  outcomeEvent: undefined,
  stage: GameStage.SCHEDULED,
  setStage: (stage: GameStage) => set({ stage }),
  setOutcomeEvent: (event) => {
    set({ outcomeEvent: event })
  },
    flyingTime:0,
    setFlyingTime: (milliseconds: number) => set({ flyingTime: milliseconds })
}))
