import { useScene } from 'react-babylonjs'
import '@babylonjs/core/Debug/debugLayer'
import { useOnMount } from '../../hooks/useOnMount'


export default function DebugLayer() {
  const scene = useScene();

  const loadDebugLayer = async () => {
    if (!scene) return;
    await import("@babylonjs/inspector");
    scene.debugLayer.show({
      globalRoot: document.body,
    });
  };

  useOnMount(() => {
    loadDebugLayer();
  });

  return <></>;
}
