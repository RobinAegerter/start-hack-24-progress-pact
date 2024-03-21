"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Interest } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { addEvent } from "./actions";
export default function AddEvent({ interests }: { interests: Interest[] }) {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [location, setLocation] = useState<string>();

  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);

  const [date, setDate] = useState<Date>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new event</DialogTitle>
          <DialogDescription>Add a new event here!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="title"
              name="title"
              placeholder="Title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              id="content"
              name="content"
              placeholder="..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              id="location"
              placeholder="Stadium"
              name="location"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interests" className="text-right">
              Interests
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !selectedInterests.length && "text-muted-foreground"
                  )}
                >
                  {selectedInterests.length
                    ? selectedInterests
                        .map((interest) => interest.title)
                        .join(", ")
                    : "Select interests"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="grid gap-4 p-4">
                  {interests.map((interest) => (
                    <Button
                      key={interest.id}
                      variant={
                        selectedInterests.includes(interest)
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setSelectedInterests((prev) =>
                          prev.includes(interest)
                            ? prev.filter((i) => i !== interest)
                            : [...prev, interest]
                        )
                      }
                    >
                      {interest.title}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogClose>
          <DialogFooter>
            <Button
              onClick={() => {
                addEvent(title!, content!, location!, date!, selectedInterests);
                // reset all inputs
                setTitle("");
                setContent("");
                setLocation("");
                setDate(undefined);
                setSelectedInterests([]);
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
