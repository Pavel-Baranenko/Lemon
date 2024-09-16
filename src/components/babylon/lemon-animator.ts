import { Scene } from '@babylonjs/core/scene.js'
import * as BABYLON from '@babylonjs/core'
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem'
import rocketParticle from './rocket_fire_a.json'
import { AnimationGroup } from '@babylonjs/core/Animations/animationGroup'


export const SKY = {
  BACK_IDLE: "back_idle",
  BACK_PROGRESS: "back_progress",
};

export const JET = {
    BARREL:'barrel',
    END_START:'end_start',
    END_MID:'end_mid',
    END_LATE:'end_late',
    END_LATE_IDLE:'end_late_idle',
    IDLE:'idle',
    START:'start',
    FLY:'fly',
    IDLE_TO_START:'idle_to_start',
    START_TO_IDLE:'start_to_idle',
}
export const JetTimings: {[key in keyof typeof JET]: number} = {
    BARREL: 1250,
    END_START: 3.334,
    END_MID: 2500,
    END_LATE: 5000,
    END_LATE_IDLE: 2500,
    IDLE: 7143,
    IDLE_TO_START: 840,
    START: 1250,
    FLY: 1250,
    START_TO_IDLE: 840,
}
type T_JET = typeof JET
type T_SKY = typeof SKY

export type Jet ={[key in keyof  T_JET]: AnimationGroup}
export type Sky ={[key in keyof T_SKY]: AnimationGroup}

export type LemonAnimator = ReturnType<typeof lemonAnimator>

export type AnimatorListener = (animator: LemonAnimator) => boolean
export const lemonAnimator = (scene: Scene) => {


    //window.BABYLON = BABYLON
    const particleParent = scene.getMeshById ('ph_jet_vfx')


    const particle = ParticleSystem.Parse (rocketParticle, scene, '', true)
        particle.minInitialRotation = 0
        particle.maxInitialRotation = 0

        particle.maxScaleY = 1.8
        particle.minScaleY = 1.2
        particle.worldOffset =  new BABYLON.Vector3(0.18, -0.35, 0)
        particle.emitter = particleParent
    const fire =    particle
   // window.particle = particle
    const stopAll = () => {
         scene.stopAllAnimations();
        fire.stop()
    }

   // window.fire = fire
    const jetGroups:  Jet = {} as any

    Object.keys(JET).forEach(
        //@ts-ignore
        ( k: keyof  T_JET) => {
            //@ts-ignore
            window[k]= jetGroups[k] = scene.getAnimationGroupByName(JET[k])!
    })
    const skyGroups:  Sky = {} as any
    Object.keys(SKY).forEach(
        //@ts-ignore
        ( k: keyof T_SKY) => {
            skyGroups[k] = scene.getAnimationGroupByName(SKY[k])!
    })

    const getAniLength = (name: keyof  T_JET) =>
        JetTimings[name]

    const getAniFrame = (name: keyof  T_JET )=> {
        return jetGroups[name].targetedAnimations[0]?.animation?.runtimeAnimations[0].currentFrame
    }
    const getAniTime = (name: keyof  T_JET )=> {
        const frame = getAniFrame(name)
        const group = jetGroups[name]
        const totalFrames = group.to
        const totalTime = getAniLength(name)
        const  currentTime = (frame / totalFrames) * totalTime
        return currentTime
    }
    const skyRestart = () => {
        skyGroups.BACK_PROGRESS.reset()
    }
    const skyStart = () => {
        skyGroups.BACK_PROGRESS.start (true, 1);
    }
    const skyStop = () => {
        skyGroups.BACK_PROGRESS.pause();
    }
    const fireStart = (delay: number = 0) => {
        fire.start (delay)
    }

    const fireStop = () =>{
          fire.reset()
          fire.stop ()
    }


    const resetAnimations = () =>{
        scene.animationGroups.forEach (ag => {
            ag.onAnimationGroupEndObservable.clear ()
            ag.reset ().stop ()
        })
        const jet_idle = scene.getAnimationGroupByName ('idle')
        jet_idle?.start (true, 0.7)
        const back_idle = scene.getAnimationGroupByName ('back_idle')
        skyGroups.BACK_IDLE.start(true, 0.3)

    }
    //@ts-ignore
    window.skyGroups = skyGroups
    const animator = {
        scene,
        getAniFrame,
        getAniLength,
        getAniTime,
        listenFor: (predicate: AnimatorListener, maxIdle: number = 10000 ) => new Promise((resolve, reject) => {

            const free = () => {
                scene.onAfterRenderObservable.remove(listener);
                clearTimeout(id);
                resolve(animator);
            }
            const id = setTimeout(free, maxIdle);
            const listener = scene.onAfterRenderObservable.add(() => {
                if (predicate(animator)) {
                   free()
                }
            })
        }),skyRestart,
    skyStart,skyStop,fireStart,fireStop,
        resetAnimations,
        stopAll,
        jetGroups,
        ...jetGroups,
        skyGroups
    }
    return animator
}
