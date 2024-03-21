"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import RenderModel from "./avatar/renderModel";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigator = useRouter();
  navigator.push("/avatar");
  return <div></div>;
}
