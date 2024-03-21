"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Message, User } from "@prisma/client";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function MessageComponent({
  message,
}: {
  message: Message & { author: User };
}) {
  const [showTranslated, setShowTranslated] = useState(false);
  return (
    <Card className="w-fit ">
      <div className="m-3">
        <div className="flex  justify-between items-center  gap-2">
          <div className="flex gap-2">
            <span className="text-sm">{message.author.name}</span>
            <span className="text-sm text-muted-foreground">
              {message.createdAt.toLocaleDateString()}
            </span>
          </div>
          {message.translatedContent && (
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setShowTranslated((prev) => !prev)}
            >
              <UpdateIcon />
            </Button>
          )}
        </div>
        <p>{showTranslated ? message.translatedContent : message.content}</p>
      </div>
    </Card>
  );
}
