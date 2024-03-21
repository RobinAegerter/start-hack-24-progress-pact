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
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Lights from "./lights";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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

function RenderModelComponent({ url }: { url: string }) {
  const model = useRef<THREE.Object3D>();
  const [animationNumber, setAnimationNumber] = useState<number | null>(null);
  const gltf = useLoader(GLTFLoader, url);
  const villageGltf = useLoader(GLTFLoader, "village.gltf");
  useEffect(() => {
    gltf.scene.traverse((child) => {
      child.castShadow = true;
    });
    gltf.scene.position.setY(-3);
    gltf.scene.position.setX(0.5);
    villageGltf.scene.position.setY(-3);
  }, [gltf.scene, villageGltf.scene]);

  useEffect(() => {
    if (url.includes("Sad")) {
      setAnimationNumber(3);
    } else if (url.includes("Mid")) {
      setAnimationNumber(0);
    } else if (url.includes("Happy")) {
      setAnimationNumber(1);
    } else if (url.includes("Running")) {
      setAnimationNumber(2);
    } else {
      setAnimationNumber(0);
    }
  }, [url]);

  const texture = useLoader(THREE.TextureLoader, "/grass.jpg");

  // assuming you want the texture to repeat in both directions:
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // how many times to repeat in each direction; the default is (1,1),
  //   which is probably why your example wasn't working
  texture.repeat.set(100, 100);

  const [randomQuestion, setRandomQuestion] = useState<any>(null);

  const whatIfQuestions = [
    {
      question: "What if I achieve my HEALTH goal?",
      answer: (animationNumber) => {
        const remember = animationNumber;
        setAnimationNumber(2);
        setTimeout(() => {
          setAnimationNumber(remember);
        }, 3000);
      },
    },
    {
      question: "What if I don't care about my health?",
      answer: (animationNumber) => {
        const remember = animationNumber;
        setAnimationNumber(3);
        setTimeout(() => {
          setAnimationNumber(remember);
        }, 3000);
      },
    },
    {
      question: "What if I engage in social activities?",
      answer: (animationNumber) => {
        const remember = animationNumber;
        setAnimationNumber(1);
        setTimeout(() => {
          setAnimationNumber(remember);
        }, 3000);
      },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setRandomQuestion(
        whatIfQuestions[Math.floor(Math.random() * whatIfQuestions.length)] ||
          whatIfQuestions[0]
      );
    }, 1400);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {randomQuestion && (
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 10,
            zIndex: 100000,
            maxWidth: "calc(100% - 20px)",
          }}
        >
          <Button
            onClick={() => {
              randomQuestion.answer(animationNumber);
              setRandomQuestion(null);
            }}
            style={{
              zIndex: 100,
              backgroundColor: "rgba(130, 130, 200, 0.9)",
              backdropFilter: "blur(5px)",
              fontSize: "1.2rem",
            }}
          >
            {randomQuestion.question}
          </Button>
        </div>
      )}
      <Canvas
        style={{
          width: "110vw",
          marginLeft: "-10vw",
          marginTop: "-20px",
          height: "calc(100vh - 108px)",
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
