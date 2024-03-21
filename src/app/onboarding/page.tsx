import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import OnboardingTabs from "./OnboardingTabs";

export default async function Chats() {
  const session = await getServerSession(authOptions);

  const interestsList = await prisma.interest.findMany();
  const organizationList = await prisma.organisation.findMany();
  const departmentList = await prisma.department.findMany();

  return (
    <div className="mx-auto max-w-6xl p-5">
      <OnboardingTabs
        interests={interestsList}
        organization={organizationList}
        department={departmentList}
      />
    </div>
  );
}
