"use client";
import { Department, Interest, Organisation } from "@prisma/client";

import SelectPreferences from "./selectPreferences";
import { prisma } from "@/lib/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IInterest } from "./selectPreferences";
import { useState } from "react";
import OrganizationCards from "./SelectFacility";
import DepartementCards from "./SelectDepartement";
import { redirect } from "next/navigation";

export default function OnboardingTabs({
  interests: interestsList,
  organization: OrganisationList,
  department: DepartementList,
}: {
  interests: Interest[];
  organization: Organisation[];
  department: Department[];
}) {
  const [tab, setTab] = useState("Interst-selection");
  const containerSytle: React.CSSProperties = {
    padding: "1rem",
    textAlign: "center",
  };
  return (
    <div>
      <Tabs value={tab}>
        <TabsList>
          <TabsTrigger value="Interst-selection">Interest</TabsTrigger>
          <TabsTrigger value="working-facility">working facility</TabsTrigger>
          <TabsTrigger value="Departement">Departement</TabsTrigger>
        </TabsList>
        <TabsContent value="Interst-selection">
          <div style={containerSytle}>
            <h1 className="text-3xl">Choose your interests</h1>
            <p className="m-5">
              Select your passions to help us connect you with individuals who
              share similar interests.
            </p>
            <SelectPreferences
              preference={interestsList}
              onSubmit={() => setTab("working-facility")}
            />
          </div>
        </TabsContent>
        <TabsContent value="working-facility">
          <div style={containerSytle}>
            <h1 className="text-3xl">Choose your working facility</h1>
            <p className="m-5">
              Help us connect you with your local colleagues by choosing your
              work location.
            </p>
            <OrganizationCards
              organizationsData={OrganisationList}
              onSubmit={() => setTab("Departement")}
            />
          </div>
        </TabsContent>
        <TabsContent value="Departement">
          <div style={containerSytle}>
            <h1 className="text-3xl">Choose your Departement</h1>
            <p className="m-5">
              Please select your department to indicate your area of work.
            </p>
            <DepartementCards DepartementsData={DepartementList} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
