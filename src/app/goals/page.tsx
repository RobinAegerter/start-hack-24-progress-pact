import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import { FaHeartbeat, FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdFactory } from "react-icons/md";
import GoalEntry from "./GoalEntry";
import LifeAreaButton from "./LifeAreaButton";
import { LifeArea } from "@prisma/client";
import CreateGoalDialog from "./CreateGoalDialog";
import { revalidatePath } from "next/cache";
const NextComponent: React.FC = async () => {
  const session = await getServerSession(authOptions);
  const goals = await prisma.goal.findMany({
    where: {
      userId: session?.user.dbId,
    },
  });

  const aggregatedGoals = goals.reduce((acc, goal) => {
    if (acc[goal.lifeArea]) {
      acc[goal.lifeArea] += goal.done ? 1 : 0;
    } else {
      acc[goal.lifeArea] = goal.done ? 1 : 0;
    }
    return acc;
  }, {} as { [key: string]: number });

  const aggregatedGoalsTotal = goals.reduce((acc, goal) => {
    if (acc[goal.lifeArea]) {
      acc[goal.lifeArea] += 1;
    } else {
      acc[goal.lifeArea] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  const iconProps = {
    className: "text-gray-100 text-2xl",
  };

  async function updateDone(done: boolean, id: number) {
    "use server";
    await prisma.goal.update({
      where: {
        id,
      },
      data: {
        done,
      },
    });
    revalidatePath("/goals");
  }

  return (
    <>
      <CreateGoalDialog />

      <div className="w-full flex justify-between relative">
        <LifeAreaButton
          achievedPercentage={
            (aggregatedGoals[LifeArea.Health] /
              aggregatedGoalsTotal[LifeArea.Health]) *
            100
          }
          lifeArea={LifeArea.Health}
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
        >
          {/* professional */}
          <MdFactory {...iconProps} />
        </LifeAreaButton>
      </div>
      <div className="w-full flex justify-between flex-col mt-8">
        {goals
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
};

export default NextComponent;
