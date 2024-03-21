"use client";

import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiPlus } from "react-icons/fi";
import CreateGoalDialogForm from "./CreateGoalDialogForm";
import { createGoal } from "./action";
import { useState } from "react";

export default function CreateGoalDialog() {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <Dialog open={popupOpen} onOpenChange={(e) => setPopupOpen(e)}>
      <div className="w-full flex justify-end pb-7 pt-2">
        <DialogTrigger asChild>
          <Button onClick={() => setPopupOpen(true)} variant={"outline"}>
            <FiPlus />
            <span>New goal</span>
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
          <DialogDescription>
            Create your S.M.A.R.T. goal to improve one of your life areas.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full">
          <CreateGoalDialogForm
            createAction={createGoal}
            closePopup={() => setPopupOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
