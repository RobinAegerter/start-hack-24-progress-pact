"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { Interest } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function joinEvent(eventId: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be signed in to join an event");
  }

  await prisma.event.update({
    where: { id: eventId },
    data: {
      participants: {
        connect: {
          id: session.user.dbId,
        },
      },
    },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);
}

export async function addEvent(
  title: string,
  content: string,
  location: string,
  time: Date,
  interests: Interest[]
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be signed in to add an event");
  }

  const data = {
    title,
    content,
    location,
    time,
    interests: {
      connect: interests.map((interest) => ({ id: interest.id })),
    },
    participants: {
      connect: {
        id: session.user.dbId,
      },
    },
    creator: {
      connect: {
        id: session.user.dbId,
      },
    },
  };

  await prisma.event.create({ data });

  revalidatePath("/events");
}
