"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CreateGoalDialogForm from "./CreateGoalDialogForm";
import { createGoal } from "./action";

export default function CreateGoalDialog() {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <Dialog open={popupOpen} onOpenChange={(e) => setPopupOpen(e)}>
      <div className="w-full flex justify-between items-center pb-7 pt-2">
        <h2 className="text-2xl">Goals</h2>
        <DialogTrigger asChild>
          <Button
            onClick={() => setPopupOpen(true)}
            variant={"outline"}
            className="flex gap-2"
          >
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
