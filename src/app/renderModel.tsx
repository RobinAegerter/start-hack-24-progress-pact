"use client";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import "client-only";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import RotateMesh from "./rotatemesh";
import { Button } from "@/components/ui/button";

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
}

const Model = ({ gltf, animationNumber }: any) => {
  const mixerRef = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    console.log(gltf.animations.length);
    if (gltf.animations.length > 0 && animationNumber !== null) {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
      const mixer = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[animationNumber]);
      action.setLoop(THREE.LoopOnce, 10);
      action.clampWhenFinished = true;
      action.play();
      mixerRef.current = mixer;
      
      mixer.addEventListener('finished', () => {
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

  return <primitive object={gltf.scene} args={[-10, -50,0]} />;
};


function RenderModelComponent({ url }: { url: string }) {
  const [animationNumber, setAnimationNumber] = useState<number | null>(null);
  const gltf = useLoader(GLTFLoader, url);
  
  return (
    <>
      <Canvas style={{ width: "100%", height: "1000px" }}>
         <PerspectiveCamera
    makeDefault
    fov={50}
    position={[0, 8, 12]}
    rotation={[0,-150,0]}
  />
        <ambientLight intensity={Math.PI / 2} />
        <RotateMesh />
        <Model gltf={gltf} animationNumber={animationNumber} />
        <spotLight
          position={[10, 22, 20]}
          angle={0.15}
          penumbra={1}
          decay={0.2}
          intensity={Math.PI}
        />
        <OrbitControls
          enableZoom={false}
          
          enablePan={false}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      </Canvas>
      <div className="m-5">
        <Button onClick={() => setAnimationNumber(0)}>Animation 1</Button>
        <Button onClick={() => setAnimationNumber(1)}>Animation 2</Button>
        <Button onClick={() => setAnimationNumber(2)}>Animation 3</Button>
      </div>
    </>
  );
}


export default dynamic(() => Promise.resolve(RenderModelComponent), {
  ssr: false,
});
