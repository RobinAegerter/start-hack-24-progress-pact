"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md stretch mx-auto p-5">
      <h2 className="text-2xl">Coach</h2>
      {messages.map((m) =>
        m.role === "user" ? (
          <div key={m.id} className="w-full flex justify-end mt-6">
            <Card
              className="whitespace-pre-wrap"
              style={{ maxWidth: "calc(100% - 30px)" }}
            >
              <CardHeader className="bg-gray-200 px-4 py-2 m-0 rounded-t-md">
                <CardTitle>User</CardTitle>
              </CardHeader>
              <CardContent className="m-0 px-4 py-2">{m.content}</CardContent>
            </Card>
          </div>
        ) : (
          <div key={m.id} className="w-full flex justify-start mt-6">
            <Card
              className="whitespace-pre-wrap"
              style={{ maxWidth: "calc(100% - 30px)" }}
            >
              <CardHeader className="bg-gray-200 px-4 py-2 m-0 rounded-t-md">
                <CardTitle>Personal Coach</CardTitle>
              </CardHeader>
              <CardContent className="m-0 px-4 py-2">{m.content}</CardContent>
            </Card>
          </div>
        )
      )}

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
