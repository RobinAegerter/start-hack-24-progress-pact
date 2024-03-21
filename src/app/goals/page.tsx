import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import CreateGoalDialog from "./CreateGoalDialog";
import GoalDisplay from "./GoalDisplay";
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

  return (
    <>
      <CreateGoalDialog />

      <GoalDisplay
        aggregatedGoalsTotal={aggregatedGoalsTotal}
        aggregatedGoals={aggregatedGoals}
        goals={goals}
      />
    </>
  );
};

export default NextComponent;