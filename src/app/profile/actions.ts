"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { profileFormSchema } from "./profileSchema";

export async function updateProfile(values: z.infer<typeof profileFormSchema>) {
  const payload = profileFormSchema.safeParse(values);
  if (!payload.success) {
    return {
      error: payload.error.errors,
    };
  }

  const userId = await getUserId();

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: payload.data.name,
    },
  });

  revalidatePath("/profile");
  return {
    error: [],
  };
}

async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email)
    throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");
  console.log(user);

  return user.id;
}

export async function deleteAccount() {
  const userId = await getUserId();
  await prisma.user.delete({ where: { id: userId } });
  redirect("/api/auth/signout");
}
