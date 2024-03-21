import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import OnboardingTabs from "./OnboardingTabs";

export default async function Chats() {
  const session = await getServerSession(authOptions);

  if (session) {
    console.log(session.user.dbId);
  }

  const interestsList = await prisma.interest.findMany();
  const organizationList = await prisma.organisation.findMany();
  const departmentList = await prisma.department.findMany();

  console.log(departmentList);

  return (
    <OnboardingTabs
      interests={interestsList}
      organization={organizationList}
      department={departmentList}
    />
  );
}
