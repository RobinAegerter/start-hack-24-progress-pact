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
import { deleteAccount } from "./actions";

export default function DeleteAccountComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-3" variant="destructive">
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>This action can not be undone!</DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center w-full items-center sm:justify-start">
          <form className="my-3" action={deleteAccount}>
            <Button variant={"destructive"} type="submit">
              Delete account permanently
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
