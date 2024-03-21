"use client";
import { Message, User } from "@prisma/client";
import { useEffect, useRef } from "react";
import MessageComponent from "./MessageComponent";

export default function MessageDisplay({
  messages,
  authorId,
}: {
  authorId: number;
  messages: (Message & { author: User })[];
}) {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow overflow-scroll">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex  ${
            authorId == message.authorId ? "justify-end" : "justify-start"
          } mb-3`}
        >
          <MessageComponent message={message} />
        </div>
      ))}

      <div ref={endOfMessagesRef} />
    </div>
  );
}
