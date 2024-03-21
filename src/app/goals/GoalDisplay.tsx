"use client";

import { Goal, LifeArea } from "@prisma/client";
import { useState } from "react";
import { FaHeartbeat, FaUser, FaUsers } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import GoalEntry from "./GoalEntry";
import LifeAreaButton from "./LifeAreaButton";
import { updateDone } from "./action";

export default function GoalDisplay({
  aggregatedGoalsTotal,
  aggregatedGoals,
  goals,
}: {
  goals: Goal[];
  aggregatedGoalsTotal: { [key: string]: number };
  aggregatedGoals: { [key: string]: number };
}) {
  const iconProps = {
    className: "text-gray-100 text-2xl",
  };
  const [selectedArea, setSelectedArea] = useState<LifeArea | null>(null);

  const handleAreaClick = (area: LifeArea) => {
    // toggle if already selected
    setSelectedArea((prev) => (prev === area ? null : area));
  };

  return (
    <>
      <div className="w-full flex justify-between relative">
        <LifeAreaButton
          achievedPercentage={
            (aggregatedGoals[LifeArea.Health] /
              aggregatedGoalsTotal[LifeArea.Health]) *
            100
          }
          lifeArea={LifeArea.Health}
          onClick={() => handleAreaClick(LifeArea.Health)}
        >
          {/* Health */}
          <FaHeartbeat {...iconProps} />
        </LifeAreaButton>
        <LifeAreaButton
          achievedPercentage={
            (aggregatedGoals[LifeArea.Personal] /
              aggregatedGoalsTotal[LifeArea.Personal]) *
            100
          }
          lifeArea={LifeArea.Personal}
          onClick={() => handleAreaClick(LifeArea.Personal)}
        >
          {/* personal */}
          <FaUser {...iconProps} />
        </LifeAreaButton>
        <LifeAreaButton
          achievedPercentage={
            (aggregatedGoals[LifeArea.Relationships] /
              aggregatedGoalsTotal[LifeArea.Relationships]) *
            100
          }
          lifeArea={LifeArea.Relationships}
          onClick={() => handleAreaClick(LifeArea.Relationships)}
        >
          {/* Relationships */}
          <FaUsers {...iconProps} />
        </LifeAreaButton>

        <LifeAreaButton
          achievedPercentage={
            (aggregatedGoals[LifeArea.Professional] /
              aggregatedGoalsTotal[LifeArea.Professional]) *
            100
          }
          lifeArea={LifeArea.Professional}
          onClick={() => handleAreaClick(LifeArea.Professional)}
        >
          {/* professional */}
          <MdFactory {...iconProps} />
        </LifeAreaButton>
      </div>
      <div className="w-full flex justify-between flex-col mt-8">
        {goals.filter((goal) =>
          selectedArea ? goal.lifeArea === selectedArea : true
        ).length === 0 && (
          <div>
            <h2 className="text-2xl">No goals found</h2>
          </div>
        )}

        {goals
          .filter((goal) =>
            selectedArea ? goal.lifeArea === selectedArea : true
          )
          .filter((goal) => !goal.done)
          .sort((a, b) => (a.deadline > b.deadline ? 1 : -1))
          .map((goal) => (
            <GoalEntry
              key={goal.id}
              goal={goal}
              toggleCheckboxAction={updateDone}
            />
          ))}

        {goals
          .filter((goal) =>
            selectedArea ? goal.lifeArea === selectedArea : true
          )
          .filter((goal) => goal.done)
          .sort((a, b) => (a.deadline > b.deadline ? 1 : -1))
          .map((goal) => (
            <GoalEntry
              key={goal.id}
              goal={goal}
              toggleCheckboxAction={updateDone}
            />
          ))}
      </div>
    </>
  );
}
