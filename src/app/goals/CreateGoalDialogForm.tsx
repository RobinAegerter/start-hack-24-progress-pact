"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LifeArea } from "@prisma/client";
import { DatePicker } from "@/components/DatePicker/datepicker";

export default function CreateGoalDialogForm({
  createAction,
  closePopup,
}: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [lifeArea, setLifeArea] = useState("");

  async function onSubmit() {
    if (!title || !date || !lifeArea) return;
    await createAction({ title, date, lifeArea });
    closePopup();
  }

  return (
    <form action={onSubmit} className="w-full">
      <Input
        type="text"
        placeholder="Title"
        className="mb-4 w-full"
        required
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <DatePicker date={date} setDate={setDate} />
      <div className="my-4"></div>
      <Select onValueChange={(e) => setLifeArea(e)} value={lifeArea}>
        <SelectTrigger>
          <SelectValue placeholder="Select life area" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={LifeArea.Health}>Health</SelectItem>
            <SelectItem value={LifeArea.Personal}>Personal</SelectItem>
            <SelectItem value={LifeArea.Professional}>Professional</SelectItem>
            <SelectItem value={LifeArea.Relationships}>
              Relationships
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="w-full mb-4 flex justify-end mt-8">
        <Button type="submit">Set goal</Button>
      </div>
    </form>
  );
}
