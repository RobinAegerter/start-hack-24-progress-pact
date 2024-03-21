"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md mx-auto stretch">
      <h2 className="text-2xl">Coach</h2>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 flex-row fixed bottom-0 w-[calc(100%-1rem)] left-0 p-4 bg-white shadow-md"
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
