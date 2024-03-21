"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { IInterest } from "./selectPreferences";
import { redirect } from "next/navigation";

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

  // await prisma.user.update({
  //     where: {
  //         id: session.user.dbId,
  //     },
  //     data: {
  //         interests: {
  //             connect: {
  //                 id:
  //             }
  //         },
  //     },
  // })
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
    redirect("/app");
  }
