import { prisma } from "@/lib/client";
import RenderModel from "./renderModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LifeArea } from "@prisma/client";

export default async function App() {
  const url = "AvatarOhneSchuhe.gltf";
  return <RenderModel hasHealthGoalAchieved={1} url={url} />;
}
