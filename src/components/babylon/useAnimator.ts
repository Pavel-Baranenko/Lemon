import { useEffect, useRef }    from 'react'
import { getAltitudeBySeconds } from '../../utils/time'
import { type GameState }       from './Altimeter'
import type { LemonAnimator }   from './lemon-animator'
import { GameStage }            from '../../hooks/useGame'


const preparingTimeoutMS = 1500

export const useAnimator = (gameState: GameState, animator: LemonAnimator) => {
  const {flyingTime,stage,flyDuration} = gameState

  const timeoutRef = useRef(0);
  useEffect(() => {
    if (stage === GameStage.STARTED && flyDuration > 1500) animator.fireStart();
    else animator.fireStop();
  }, [stage])


  useEffect(() => {
    const scene = animator.scene;
    if (stage=== GameStage.STARTED) {
      const jet_crash = scene.getAnimationGroupByName("end_mid");
      jet_crash?.start();
      jet_crash?.stop().reset();


    }

    if (stage === GameStage.SCHEDULED) {

      animator.resetAnimations();
      animator.skyRestart();

    } else {
    }
    if (stage === GameStage.PREPARING) {
      animator.IDLE.stop();
      animator.IDLE_TO_START.start();

      if (flyDuration < 700) {
        //@ts-ignore
        timeoutRef.current = setTimeout(() => {
          animator.IDLE_TO_START.stop();
          if (!animator.jetGroups.FLY.isPlaying) {
            animator.END_START.start();
            animator.fireStop();
          }
        }, preparingTimeoutMS - 700);
      } else {
        //@ts-ignore
        timeoutRef.current = setTimeout(() => {
          animator.IDLE_TO_START.stop();
          if (!animator.jetGroups.FLY.isPlaying) {
            animator.START.start();
          }
        }, preparingTimeoutMS - 700);
        animator.START.onAnimationGroupEndObservable.addOnce(() => {
          animator.FLY.play(true);
          animator.fireStart();
        });
      }
    }
    if(stage === GameStage.STARTED) {


      animator.skyGroups.BACK_PROGRESS.start(true, 2)

    }
    if (stage === GameStage.STARTED && flyDuration > 700) {

      animator.IDLE.stop();
    } else if (stage === "started") {
      animator.START.start(false, 1, 200).stop();
      animator.jetGroups.START.onAnimationGroupEndObservable.clear();
      animator.fireStop();
    }
    if(stage === GameStage.COMPLETED)
    {
      animator.fireStop();

      animator.skyGroups.BACK_PROGRESS.pause()
    }
    if (stage === GameStage.COMPLETED && flyDuration > 700) {
      animator.IDLE.stop();
      animator.fireStop();
      animator.jetGroups.FLY.pause();


      if (getAltitudeBySeconds(flyDuration / 1000) < 100) {
        animator.jetGroups.END_MID.start();
        animator.fireStop();
      } else if (flyDuration > 700) {
        animator.jetGroups.END_LATE.start().onAnimationGroupEndObservable.addOnce(
          () => {
            animator.jetGroups.END_LATE_IDLE.start();
          }
        );
      }
    } else {

      animator.jetGroups.END_LATE.onAnimationGroupEndObservable.clear();
    }
  }, [animator, stage]);
  //@ts-ignore
  return Object.assign(animator, { flyDuration,flyingTime,stage });
};
