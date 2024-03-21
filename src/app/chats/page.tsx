import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ChatForm from "./ChatForm";

export default async function Chats() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.dbId,
    },
  });

  const chats = await prisma.chat.findMany({
    where: {
      participants: {
        some: {
          id: session.user.dbId,
        },
      },
    },
    include: {
      participants: {
        where: {
          id: {
            not: {
              equals: session.user.dbId,
            },
          },
        },
      },
    },
  });

  const organisationUsers = await prisma.user.findMany({
    where: {
      AND: [
        {
          organisationId: user?.organisationId,
        },
        {
          id: {
            not: session.user.dbId,
          },
        },
      ],
    },
    take: 10,
  });
  return (
    <div className="mx-auto max-w-6xl p-5">
      <h2 className="text-2xl">Chats</h2>
      {chats.length === 0 && <p className="">No chats yet</p>}
      {chats.map((chat) => (
        <Link href={`/chats/${chat.id}`} key={chat.id}>
          <Card className="mb-3">
            <div className="flex justify-between items-center">
              <CardHeader className="">
                <CardTitle className="inline">{chat.leadingQuestion}</CardTitle>
              </CardHeader>
              <Button className="mr-5">
                <EyeOpenIcon />
              </Button>
            </div>
            <CardContent>
              <p>
                {chat.participants
                  .map((participant) => participant.name)
                  .join(", ")}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
      <ChatForm users={organisationUsers} />
    </div>
  );
}
