import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Task } from "../types";
import ModalButton from "./ModalButton";
import SelectStatusForm from "./SelectStatusForm";
import DeleteTaskConfirmation from "./DeleteConfirmation";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-gray-100 text-gray-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "DONE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm line-clamp-2 flex-1">{task.title}</h4>
                <Badge variant="secondary" className={`ml-2 text-xs ${getStatusColor(task.status)}`}>
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>
              
              {task.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>📅 {dueDateStr}</span>
                <span>🕒 {dueTimeStr}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
          
          {task.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">📅 Due Date</h4>
              <p className="text-muted-foreground">{dueDateStr} at {dueTimeStr}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">👤 Created</h4>
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