import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import SelectPreferences from "./selectPreferences";
import { prisma } from "@/lib/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="mx-auto max-w-6xl p-5">
      <OnboardingTabs
        interests={interestsList}
        organization={organizationList}
        department={departmentList}
      />
    </div>
  );
}
