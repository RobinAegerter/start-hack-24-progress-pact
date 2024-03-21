import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import SelectPreferences from "./selectPreferences";
import { prisma } from "@/lib/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingTabs from "./OnboardingTabs";

export default async function Chats() {
  const session = await getServerSession(authOptions);

  const interestsList = await prisma.interest.findMany();
  const organizationList = await prisma.organisation.findMany();
  const departmentList = await prisma.department.findMany();

  return (
    <OnboardingTabs
      interests={interestsList}
      organization={organizationList}
      department={departmentList}
    />
  );
}
