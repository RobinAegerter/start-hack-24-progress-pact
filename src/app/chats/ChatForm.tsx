"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@prisma/client";
import { addChatWithUser } from "./actions";

export default function ChatForm({ users }: { users: User[] }) {
  return (
    <div className="mt-5">
      <h2 className="text-lg">Start a Chat</h2>

      <Select onValueChange={(userId) => addChatWithUser(parseInt(userId))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a colleague" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Colleagues</SelectLabel>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
