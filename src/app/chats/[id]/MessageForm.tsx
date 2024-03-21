"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function MessageForm({
  addMessageAction,
}: {
  addMessageAction: (chatMessage: string) => void;
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    addMessageAction(message);
    setMessage("");
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Send a message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <Button onClick={handleSubmit}>
        <PaperPlaneIcon />
      </Button>
    </div>
  );
}
