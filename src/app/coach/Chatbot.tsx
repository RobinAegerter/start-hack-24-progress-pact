"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useChat } from "ai/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { useState } from "react";

export default function ChatBotComponent({ userImage }: { userImage: string }) {
  const clickButton = (text: string) => {
    // Call handleInputChange
    handleInputChange({
      target: { value: text },
    } as any);

    // Use a second setTimeout to ensure the state update from handleInputChange
    // has taken place, before calling handleSubmit
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as any);
    }, 200);
  };

  const defaultQuestions = () => {
    return (
      <div className="flex flex-col gap-2 p-3">
        <p>Ask a question</p>
        <Button
          className="m-2 p-2 whitespace-normal"
          variant={"outline"}
          onClick={() => {
            clickButton(
              "Can you help me set a realistic exercise goal for the month?"
            );
          }}
        >
          Can you help me set a realistic exercise goal for the month?
        </Button>
        <Button
          className="m-2 whitespace-normal"
          variant={"outline"}
          onClick={() =>
            clickButton(
              "How many calories should I aim to eat each day if I want to lose weight?"
            )
          }
        >
          How many calories should I aim to eat each day if I want to lose
          weight?
        </Button>
        <Button
          className="m-2 whitespace-normal"
          variant={"outline"}
          onClick={() =>
            clickButton(
              "What are some key tips for setting realistic health and nutrition goals?"
            )
          }
        >
          What are some key tips for setting realistic health and nutrition
          goals?
        </Button>
      </div>
    );
  };
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md mx-auto stretch">
      <h2 className="text-3xl mb-5 m-2">Coach</h2>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          <div className="flex items-center m-3">
            <Avatar className="w-9 h-9">
              <AvatarImage
                src={
                  m.role === "user" ? userImage : "/android-chrome-192x192.png"
                }
              />
            </Avatar>
            <h2 className="font-bold text-base ml-1">
              {m.role === "user" ? "User" : "AI"}
            </h2>
          </div>
          <p className="m-6">{m.content}</p>
        </div>
      ))}
      {messages.length === 0 ? defaultQuestions() : <div></div>}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 flex-row fixed bottom-12 w-[calc(100%-1rem)] left-0 p-4 bg-white shadow-md"
      >
        <Input
          className=""
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <Button size="icon">
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
}
