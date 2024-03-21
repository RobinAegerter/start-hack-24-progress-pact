"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { LifeArea } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createGoal(form: {
  title: string;
  date: string;
  lifeArea: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  await prisma.goal.create({
    data: {
      title: form.title,
      deadline: new Date(form.date),
      lifeArea: LifeArea[form.lifeArea as LifeArea],
      done: false,
      user: {
        connect: {
          id: session.user.dbId,
        },
      },
    },
  });
  revalidatePath("/goals");
}
