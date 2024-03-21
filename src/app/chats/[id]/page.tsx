import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { addMessage } from "./actions";
import MessageForm from "./MessageForm";
import MessageDisplay from "./MessagesDisplay";

export default async function Chat({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>something went wrong</div>;
  }
  const chat = await prisma.chat.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
        take: 10,
      },
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

  if (!chat) {
    return <div>Chat not found</div>;
  }
  const addMessageAction = addMessage.bind(
    null,
    chat.id,
    chat.participants[0].language
  );
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-116px)] mx-auto max-w-6xl p-5">
      <div className="flex gap-2 items-center mb-3">
        <Button size={"icon"} variant={"ghost"} asChild>
          <Link href={`/chats`}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <h2 className="text-2xl">{chat.leadingQuestion}</h2>
      </div>
      <MessageDisplay
        messages={[...chat.messages].reverse()}
        authorId={session.user.dbId}
      />
      <MessageForm addMessageAction={addMessageAction} />
    </div>
  );
}
