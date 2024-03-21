"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addChatWithUser(userId: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const chat = await prisma.chat.create({
    data: {
      participants: {
        connect: [{ id: userId }, { id: session.user.dbId }],
      },
    },
  });

  revalidatePath("/chats");
}
