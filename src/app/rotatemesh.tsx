"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function RotateMesh({ children }: any) {
  const modelRef = useRef() as any;

  useFrame((state, delta) => {
    // Rotate the model on the Y axis at a constant speed
    modelRef.current.rotation.y += delta * 1;
  });

  return <mesh ref={modelRef}>{children}</mesh>;
}
