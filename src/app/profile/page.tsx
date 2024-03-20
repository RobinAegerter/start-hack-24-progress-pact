import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileComponent from "./ProfileComponent";

import { prisma } from "@/lib/client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user || !session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <ProfileComponent />
    </>
  );
}
