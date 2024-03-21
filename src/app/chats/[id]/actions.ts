"use server";

import { translateMessage } from "@/lib/ai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addMessage(
  chatId: number,
  participantLanguage: string,
  content: string
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.message.create({
    data: {
      content,
      translatedContent: await translateMessage(content, participantLanguage),
      chatId,
      authorId: session.user.dbId,
      time: new Date(),
    },
  });

  revalidatePath(`/chats/${chatId}`);
}
