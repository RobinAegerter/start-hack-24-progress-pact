"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Event, User } from "@prisma/client";
import Link from "next/link";
import { joinEvent } from "./actions";

export default function EventItem({
  event,
  joinedAlready,
}: {
  event: Event & { participants: User[]; creator: User };
  joinedAlready: boolean;
}) {
  const joinEventAction = joinEvent.bind(null, event.id);
  return (
    <Card className="mb-3">
      <div className="flex justify-between items-end">
        <div className="flex flex-col p-5 mb-0 gap-[-2px]">
          <h2 className="text-lg">{event.title}</h2>
          <span className="text-muted-foreground text-sm">
            {event.creator.name}
          </span>
        </div>
        <p className="mr-5">{event.time.toDateString()}</p>
      </div>
      <CardContent>
        <p>{event.content}</p>
        <div className="mt-2 flex gap-2 flex-wrap">
          {event.participants.map((participant) => (
            <Avatar key={participant.id}>
              <AvatarImage
                src={participant.imageUrl!}
                alt={participant.name!.at(0)}
              />
              <AvatarFallback>
                {participant
                  .name!.split(" ")
                  .map((slug) => slug.at(0))
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {!joinedAlready && (
          <Button onClick={() => joinEventAction()}>Join</Button>
        )}
        <Button asChild variant={"outline"}>
          <Link
            target="_blank"
            href={`https://www.google.com/maps/search/${encodeURI(
              event.location
            )}`}
          >
            Open Map
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
