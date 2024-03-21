"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import RenderModel from "./renderModel";
import React, { useState } from "react";

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const handleAnimation = () => {
    setAnimate(!animate);
  };
  return (
    <div>
      <main className="m-5"></main>
      {/* <Copter /> */}
      <RenderModel url="AvatarMitSchuhe.gltf" />
      {/* <Stocks /> */}
      {/* <App /> */}
    </div>
  );
}
