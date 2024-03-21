import { prisma } from "@/lib/client";
import RenderModel from "./renderModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LifeArea } from "@prisma/client";

export default async function App() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const goals = await prisma.goal.findMany({
    where: {
      userId: session.user.dbId,
      done: true,
    },
  });
  const events = await prisma.event.findMany({
    where: {
      participants: {
        some: { id: session.user.dbId },
      },
    },
  });

  const url = () => {
    let url = "";
    if (events.length < 1) {
      url = "Sad";
    }
    if (events.length >= 1 || goals.length >= 1) {
      url = "Mid";
    }
    if (events.length >= 1 && goals.length >= 1) {
      url = "Happy";
    }
    if (
      goals.length >= 1 &&
      goals.some((goal) => goal.lifeArea === LifeArea.Health && goal.done)
    ) {
      url = "Running";
    }

    return url + ".gltf";
  };
  return <RenderModel url={url()} />;
}
