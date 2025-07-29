import * as React from "react";
import CreateTaskForm from "./CreateTaskForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

function AddTaskButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <CreateTaskForm />
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskButton;
