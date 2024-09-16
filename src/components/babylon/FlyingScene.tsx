import { Scene as BabylonScene } from '@babylonjs/core/scene'
import { Nullable } from '@babylonjs/core/types.js'
import { Color4, Vector3 } from '@babylonjs/core/Maths'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader.js'
import { Engine, ILoadedModel, Model, Scene } from 'react-babylonjs' ///dist/engine/Engine' ///dist/hooks/loaders/loadedModel' ///dist/Scene'
import '@babylonjs/loaders'
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders/glTF/glTFFileLoader.js'
//import DebugLayer from
// '../../components/babylon/DebugLayer'
import { Suspense, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { LemonAnimator, lemonAnimator } from './lemon-animator'
import { useAnimator } from './useAnimator'
import type { GameState } from './Altimeter'
import { ArcRotateCamera, FxaaPostProcess } from '@babylonjs/core'


export default function FlyingScene ({gameState}:{gameState:GameState , disabled?: boolean})  {
    const sceneRef = useRef<Nullable<BabylonScene>> (null)
    const [ animator,setAnimator,] = useState(undefined as any as LemonAnimator)
    const lightRef = useRef (null)
    //@ts-ignore
   // window.light = lightRef.current
    const onSceneMount = ({scene}: {
        scene: BabylonScene
    }) => {
        sceneRef.current = scene
        //@ts-ignore
        window.scene = scene
        SceneLoader.OnPluginActivatedObservable.add (function (loader) {
            ( loader as GLTFFileLoader ).animationStartMode = GLTFLoaderAnimationStartMode.NONE
        })
    }

    const onCameraMount = (camera: ArcRotateCamera) => {
        console.log('onCameraMount', camera)
        var postProcess = new FxaaPostProcess("fxaa", 1.0, camera);
        postProcess.enablePixelPerfectMode=true
    }
    const [backLoaded, setBackLoaded] = useState<ILoadedModel|undefined>(undefined)
    const [jetLoaded, setJetLoaded] = useState<ILoadedModel|undefined>(undefined)

    useEffect( ()=> {
        if (backLoaded && jetLoaded) {
            const scene = sceneRef.current!
            scene.setActiveCameraByName ('Camera_lemon')
            scene.clearColor = new Color4 (0, 0, 0, 0)

            setAnimator(lemonAnimator(scene!))
        }
    },[backLoaded, jetLoaded])



    return (
        <>
            {animator && <Animator animator={animator} gameState={gameState}/>}
            <Engine
                observeCanvasResize={true}
                    engineOptions={{deterministicLockstep: true,timeStep: 1 / 60,
                        lockstepMaxSteps: 16,antialias:true,
                        useHighPrecisionMatrix:true,
                        adaptToDeviceRatio:true,
                        useExactSrgbConversions:true,
                        useHighPrecisionFloats:true,


                    }}
        className={cn('babylon babylon-canvas ',{visible: backLoaded && jetLoaded})}
                    canvasId="babylon-canvas">
                <Scene

                    onSceneMount={onSceneMount}>
                    <arcRotateCamera
                        onCreated={onCameraMount}
                        name="box-camera"
                        alpha={0.2}
                        lowerAlphaLimit={0.2}
                        upperAlphaLimit={0.2}
                        beta={1.6}
                        lowerBetaLimit={1.6}
                        upperBetaLimit={1.6}
                        radius={2.8}
                        lowerRadiusLimit={2.8}
                        upperRadiusLimit={2.8}
                        target={new Vector3 (1, 1, 0.2)}
                    />

                    <hemisphericLight
                        name="light1"
                        ref={lightRef}
                        intensity={1}
                        direction={new Vector3 (0, 1, 0)}
                    />

                    <Suspense >
                        <Model
                            id={'BTLN_Lemon_Jet_Back'}
                            name={'BTLN_Lemon_Jet_Back'}
                            rootUrl={'babylon/prev/sky/'}
                            sceneFilename={`sky.gltf`}
                            scaleToDimension={undefined}
                            scaling={new Vector3 (0.5, 0.5, 0.5)}
                            onModelLoaded={model => {setBackLoaded(model);}}
                        />
                        <Model
                        onModelLoaded={setJetLoaded}
                        id={'BTLN_Lemon_Jet'}
                        name={'BTLN_Lemon_Jet'}
                        rootUrl={'babylon/prev/jet/'}
                        sceneFilename={`jet.gltf`}
                        scaleToDimension={undefined}
                        scaling={new Vector3 (0.63, 0.63, 0.63)}
                        rotation={new Vector3(0,-0.2,0)}
                    />

                    </Suspense>

                    {/*debug && <DebugLayer/>*/}
                </Scene>
            </Engine>
        </>
    )
}

const Animator = ({gameState, animator}: {gameState: GameState, animator:LemonAnimator}) => {
   useAnimator(gameState,animator)
    return null
}
