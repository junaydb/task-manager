import { useState, useEffect } from "react";
import type { Status } from "../types";
import { useGetNextPage } from "../util/hooks";
import TaskCard from "./TaskCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ViewAllTasksModalProps {
  status: Status;
  title: string;
}

function ViewAllTasksModal({ status, title }: ViewAllTasksModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { isPending, data, fetchNextPage, hasNextPage } = useGetNextPage({
    status,
    sortBy: "created",
    sortOrder: "DESC",
    pageSize: 20,
  });

  const allTasks = data?.pages.flatMap((page) => page.data.tasks) || [];

  const filteredTasks = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleModalChange = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleModalChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-sm">
          View all
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>All {title} Tasks</DialogTitle>
        </DialogHeader>

        <div className="px-1">
          <Input
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {isPending ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 && searchTerm ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground text-sm">
                No tasks found matching "{searchTerm}"
              </p>
            </div>
          ) : allTasks.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground text-sm">No tasks yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}

              {hasNextPage && (
                <div className="pt-4 flex justify-center">
                  <Button onClick={() => fetchNextPage()} variant="outline">
                    Load more
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewAllTasksModal;

