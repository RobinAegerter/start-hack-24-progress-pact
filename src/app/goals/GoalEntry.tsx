"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Goal } from "@prisma/client";
import React from "react";
import { bgColors } from "./bgColors";
import Image from "next/image";

const GoalEntry: React.FC<any> = ({
  goal,
  toggleCheckboxAction,
}: {
  goal: Goal;
  toggleCheckboxAction: (e: boolean, id: number) => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  async function toggleCheckbox(e: boolean) {
    setLoading(true);
    await toggleCheckboxAction(e, goal.id);
    setLoading(false);
  }
  return (
    <Card className="my-2">
      <CardContent className="p-5">
        <div className="flex justify-between w-full h-full items-center">
          <p style={{ textDecoration: goal.done ? "line-through" : "none" }}>
            {goal.title}
          </p>
          {loading ? (
            <Image
              src={"/loading.gif"}
              height={40}
              width={40}
              alt={"Loading"}
            />
          ) : (
            <Checkbox
              className="w-6 h-6"
              checked={goal.done}
              onCheckedChange={(e) => toggleCheckbox(!!e)}
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <p>{goal.deadline.toDateString()}</p>
          <Badge
            className={`${
              bgColors.find((c) => c.lifeArea === goal.lifeArea)?.badge
            }`}
          >
            {goal.lifeArea}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GoalEntry;
