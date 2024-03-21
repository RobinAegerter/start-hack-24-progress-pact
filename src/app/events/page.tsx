import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { getServerSession } from "next-auth";
import AddEvent from "./AddEvent";
import EventItem from "./EventItem";
export default async function EventsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>You must be signed in to view this page</div>;
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.dbId },
    include: { interests: true },
  });

  if (!user) {
    return <div>You must be signed in to view this page</div>;
  }

  const events = await prisma.event.findMany({
    orderBy: {
      time: "desc",
    },
    include: { participants: true, creator: true },
    where: {
      interests: {
        some: {
          title: {
            in: user.interests.map((interest) => interest.title),
          },
        },
      },
    },
    take: 10,
  });

  return (
    <div className="mx-auto max-w-6xl p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Events</h2>
        <AddEvent interests={user.interests} />
      </div>
      <div className="mt-5">
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            joinedAlready={
              !!event.participants.find(
                (participant) => participant.id == session.user.dbId
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
