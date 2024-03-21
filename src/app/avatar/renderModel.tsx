"use client";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import "client-only";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Lights from "./lights";

/* 
function Box(props: any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => ((meshRef.current as any).rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
} */

const Model = ({ gltf, animationNumber }: any) => {
  const mixerRef = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    if (gltf.animations.length > 0 && animationNumber !== null) {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
      const mixer = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[animationNumber]);
      action.setLoop(THREE.LoopRepeat, 1000000);
      action.clampWhenFinished = true;
      action.play();
      mixerRef.current = mixer;

      mixer.addEventListener("finished", () => {
        action.stop();
      });
    }

    return () => {
      mixerRef.current?.stopAllAction();
    };
  }, [gltf, animationNumber]);

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={gltf.scene} args={[-10, -50, 0]} />;
};

function RenderModelComponent({
  url,
  hasHealthGoalAchieved,
}: {
  url: string;
  hasHealthGoalAchieved: number;
}) {
  const model = useRef<THREE.Object3D>();
  const [animationNumber, setAnimationNumber] = useState<number | null>(null);
  const gltf = useLoader(GLTFLoader, url);
  useEffect(() => {
    gltf.scene.traverse((child) => {
      child.castShadow = true;
    });
    gltf.scene.position.setY(-3);
    gltf.scene.position.setX(0.5);
  }, [gltf.scene]);

  useEffect(() => {
    console.log(hasHealthGoalAchieved);
    if (hasHealthGoalAchieved === 0) {
      setAnimationNumber(3);
    } else if (hasHealthGoalAchieved === 1) {
      setAnimationNumber(0);
    } else if (hasHealthGoalAchieved === 2) {
      setAnimationNumber(1);
    } else if (hasHealthGoalAchieved > 2) {
      setAnimationNumber(2);
    }
  }, [hasHealthGoalAchieved]);

  const texture = useLoader(THREE.TextureLoader, "/grass.jpg");

  // assuming you want the texture to repeat in both directions:
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // how many times to repeat in each direction; the default is (1,1),
  //   which is probably why your example wasn't working
  texture.repeat.set(100, 100);

  return (
    <div className="overflow-x-hidden">
      <Canvas
        style={{
          width: "110vw",
          marginLeft: "-10vw",
          marginTop: "-20px",
          height: "calc(100vh - 108px)",
        }}
      >
        <SetRendererCorrectly>
          <PerspectiveCamera makeDefault fov={50} position={[0, 3, 12]} />
          <Environment preset="park" background />
          <Plane
            castShadow
            receiveShadow
            args={[1000, 1000]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            material={new THREE.MeshLambertMaterial({ map: texture })}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <Model ref={model} gltf={gltf} animationNumber={animationNumber} />
          </Suspense>
          <Lights />
          <OrbitControls enablePan={false} enableZoom={false} />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
        </SetRendererCorrectly>
      </Canvas>
    </div>
  );
}

export default dynamic(() => Promise.resolve(RenderModelComponent), {
  ssr: false,
});

function SetRendererCorrectly({ children }: { children: React.ReactNode }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.shadowMap.enabled = true;
  });
  return children;
}
