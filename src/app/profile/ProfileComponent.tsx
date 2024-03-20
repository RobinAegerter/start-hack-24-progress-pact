import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import DeleteAccountComponent from "./DeleteAccountComponent";

import { prisma } from "@/lib/client";
import { ProfileForm } from "./ProfileFormComponent";

export default async function ProfileComponent() {
  unstable_noStore();
  const session = await getServerSession(authOptions);

  const sessionUser = session?.user;

  if (!sessionUser || !sessionUser.email) {
    return <div>Something went wrong</div>;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: sessionUser.email,
    },
  });

  if (!user) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <h2 className="text-2xl">Your Profile</h2>
        <div>
          <p className="text-xs text-muted-foreground">
            Last change: {user.updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      <ProfileForm user={user} />
      <DeleteAccountComponent />
    </>
  );
}
