"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { IInterest } from "./selectPreferences";
import { redirect } from "next/navigation";
import { Language, LifeArea } from "@prisma/client";

export async function selectInterests(interests: IInterest[]) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  await prisma.user.update({
    where: {
      // replace userId with the actual user's id
      id: session.user.dbId,
    },
    data: {
      interests: {
        connect: interests
          .filter((interest) => interest.selected)
          .map((interest) => ({ id: interest.id })),
      },
    },
  });
  try {
    await assignRandomChatPartner();
  } catch (error) {
    console.log(error);
  }

  try {
    await assignDefaultGoals();
  } catch (error) {
    console.log(error);
  }
}

export async function selectLanguage(language: Language) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  await prisma.user.update({
    where: {
      id: session.user.dbId,
    },
    data: {
      language: language,
    },
  });
}

export async function selectFacility(facilityId: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  await prisma.user.update({
    where: {
      id: session.user.dbId,
    },
    data: {
      organisation: {
        connect: {
          id: facilityId,
        },
      },
    },
  });
}

export async function selectDepartment(departmentId: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  await prisma.user.update({
    where: {
      id: session.user.dbId,
    },
    data: {
      department: {
        connect: {
          id: departmentId,
        },
      },
    },
  });
  redirect("/avatar");
}

async function assignRandomChatPartner() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const ownUser = await prisma.user.findFirst({
    where: {
      id: session.user.dbId,
    },
    include: {
      interests: true,
    },
  });
  if (!ownUser) {
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: {
        not: session.user.dbId,
      },
      interests: {
        some: {
          id: {
            in: ownUser.interests.map((interest) => interest.id),
          },
        },
      },
    },
    orderBy: {
      chats: {
        _count: "asc",
      },
    },
  });
  if (!user) {
    throw new Error("No chat partners available");
  }
  await prisma.chat.create({
    data: {
      participants: {
        connect: [
          {
            id: ownUser.id,
          },
          {
            id: user.id,
          },
        ],
      },
    },
  });
}

async function assignDefaultGoals() {
  const goals = [
    {
      title: "Drink less coffee at work",
      deadline: new Date("2024-12-01"),
      lifeArea: LifeArea.Professional,
      done: false,
    },
    {
      title: "Go for a walk",
      deadline: new Date("2024-03-22"),
      lifeArea: LifeArea.Health,
      done: false,
    },
    {
      title: "Learn a new language",
      deadline: new Date("2024-12-31"),
      lifeArea: LifeArea.Personal,
      done: false,
    },
    {
      title: "Code an application",
      deadline: new Date("2024-03-22"),
      lifeArea: LifeArea.Professional,
      done: true,
    },
  ];

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.goal.createMany({
    data: goals.map((goal) => ({
      title: goal.title,
      deadline: goal.deadline,
      lifeArea: goal.lifeArea,
      done: goal.done,
      userId: session.user.dbId,
    })),
  });
}
