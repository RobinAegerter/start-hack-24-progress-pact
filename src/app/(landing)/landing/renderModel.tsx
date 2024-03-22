"use client";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  View,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import "client-only";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Lights from "./lights";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  const villageGltf = useLoader(GLTFLoader, "village.gltf");
  const sentences = [
    "Boost your health and happiness with your own personal avatar!",
    "Make friends with other people at bellfood!",
    "Join fun challenges and events that can help improve your health!",
    "Watch your avatar grow and change as you reach your health goals!",
    "Take charge of your wellbeing with your very own custom avatar!",
    "Expand your circle and get to know more colleagues at Bellfood!",
    "Participate in easy-to-follow and enjoyable health challenges!",
    "Witness your avatar change and evolve with each health milestone you achieve!",
    "Stay motivated to reach your health objectives with engaging reward systems!",
    "Increase your energy and productivity by participating in our wellness programs!",
    "Enjoy a healthier lifestyle while having fun with your personalized avatar!",
    "Join the club and bond with like-minded colleagues from Bellfood!",
    "Track your progress and celebrate each health victory with your evolving avatar!",
    "Take fun health challenges and observe real improvement in your wellbeing!",
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sentences.length);
      setAnimationNumber((prev) => (prev! + 1) % 4);
    }, 10000);
    gltf.scene.traverse((child) => {
      child.castShadow = true;
    });
    gltf.scene.position.setY(-3);
    gltf.scene.position.setX(0.5);
    villageGltf.scene.position.setY(-3);
    return () => clearInterval(interval);
  }, [gltf.scene, villageGltf.scene]);

  useEffect(() => {
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
      <motion.div
        key={sentences[index]}
        style={{
          position: "absolute",
          width: "100%",
          top: 100,
          zIndex: 10000,
          padding: "10px",
        }}
        initial={{ top: 110, opacity: 0, zIndex: 100 }}
        animate={{
          top: 100,
          opacity: 1,
          transition: { delay: 0.5, duration: 0.7 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.7 } }}
      >
        <div className="text-black w-full bg-black bg-opacity-10 rounded-2xl">
          <p className="m-5 pt-2 pb-2">{sentences[index]}</p>
        </div>
      </motion.div>
      <Canvas
        style={{
          width: "110vw",
          marginLeft: "-10vw",
          marginTop: "-20px",
          height: "calc(100vh - 56px)",
        }}
      >
        <SetRendererCorrectly>
          <PerspectiveCamera makeDefault fov={65} position={[0, 3, 10]} />
          <Environment preset="night" />
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
            <Model gltf={villageGltf} />
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
