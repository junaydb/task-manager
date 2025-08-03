import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarPlus, Clock } from "lucide-react";
import type { Task, Status } from "../types";
import ModalButton from "./ModalButton";
import SelectStatusForm from "./SelectStatusForm";
import DeleteTaskConfirmation from "./DeleteConfirmation";

const columnProps = {
  TODO: {
    title: "TO DO",
    badgeClassName: "bg-gray-100 text-gray-800",
  },
  IN_PROGRESS: {
    title: "IN PROGRESS",
    badgeClassName: "bg-blue-100 text-blue-800",
  },
  DONE: {
    title: "DONE",
    badgeClassName: "bg-green-100 text-green-800",
  },
};

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dueDate = new Date(task.due_date);
  const dueDateStr = dueDate.toLocaleDateString();
  const dueTimeStr = dueDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const createdDate = new Date(task.created_at);
  const createdDateStr = createdDate.toLocaleDateString();

  const props = columnProps[task.status as Status];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white border border-gray-200">
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm line-clamp-1 max-w-3/5">
                  {task.title}
                </h4>
                <Badge
                  variant="secondary"
                  className={`-mb-2 text-xs ${props.badgeClassName}`}
                >
                  {props.title}
                </Badge>
              </div>

              {task.description && (
                <p className="text-xs text-muted-foreground line-clamp-1 max-w-3/4">
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-500 mb-0.5" />{" "}
                  {dueDateStr}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-green-500 mb-[0.1rem]" />{" "}
                  {dueTimeStr}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl max-w-[90%]">
            {task.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge className={props.badgeClassName}>{props.title}</Badge>
          </div>

          {task.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" /> Due at
              </h4>
              <p className="text-muted-foreground">
                {dueDateStr} at {dueTimeStr}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CalendarPlus className="w-4 h-4 text-purple-500" /> Created on
              </h4>
              <p className="text-muted-foreground">{createdDateStr}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <ModalButton text="Move" colour="#1d70b8">
              <SelectStatusForm id={task.id} status={task.status} />
            </ModalButton>
            <ModalButton text="Delete" colour="#d4351c">
              <DeleteTaskConfirmation id={task.id} />
            </ModalButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TaskCard;

