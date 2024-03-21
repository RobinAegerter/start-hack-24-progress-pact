"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import RenderModel from "./avatar/renderModel";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const navigator = useRouter();
  if (session.data?.user.dbId) {
    navigator.push("/avatar");
  } else {
    navigator.push("/auth/sign-in");
  }
  return <div></div>;
}
