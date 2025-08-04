import type { Status, SortBy, SortOrder } from "../types";
import { useGetNextPage } from "../util/hooks";
import { statusEnumToDisplay } from "../util/helpers";
import { useState } from "react";
import ModalButton from "./ModalButton";
import SelectStatusForm from "./SelectStatusForm";
import DeleteTaskConfirmation from "./DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PageParamState {
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
}

function TaskSection({ status }: { status: Status }) {
  const [pageParams, setPageParams] = useState<PageParamState>({
    sortBy: "created",
    sortOrder: "DESC",
    pageSize: 5,
  });

  function handleSortByChange(sortBy: SortBy) {
    setPageParams({ ...pageParams, sortBy });
  }

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log("New page size:", parseInt(e.target.value));
    setPageParams({ ...pageParams, pageSize: parseInt(e.target.value) });
  }

  const { isPending, data, fetchNextPage, hasNextPage } = useGetNextPage({
    status,
    ...pageParams,
  });

  if (isPending) {
    return <p className="text-muted-foreground">Loading tasks...</p>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{statusEnumToDisplay(status)}</CardTitle>
        <div className="flex items-center space-x-4">
          <Label className="text-sm font-medium">Sort by:</Label>
          <RadioGroup
            value={pageParams.sortBy}
            onValueChange={(value: SortBy) => handleSortByChange(value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="created" id={`created-${status}`} />
              <Label htmlFor={`created-${status}`} className="text-sm">Created</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dueDate" id={`dueDate-${status}`} />
              <Label htmlFor={`dueDate-${status}`} className="text-sm">Due date</Label>
            </div>
          </RadioGroup>
        </div>
      </CardHeader>
      <CardContent>

        <div className="space-y-3">
          {data?.pages.map((page) =>
            page.data.tasks.map((task) => {
              const dueDate = new Date(task.due_date);
              const dueDateStr = dueDate.toLocaleDateString();
              const dueTimeStr = dueDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const createdDate = new Date(task.created_at);
              const createdDateStr = createdDate.toLocaleDateString();
              const createdTimeStr = createdDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium">{task.title}</h4>
                      {task.description && (
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      )}
                      <div className="flex space-x-4 text-xs text-muted-foreground">
                        <span>Due: {dueDateStr}, {dueTimeStr}</span>
                        <span>Created: {createdDateStr}, {createdTimeStr}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <ModalButton text="Move" variant="default">
                        <SelectStatusForm id={task.id} status={status} />
                      </ModalButton>
                      <ModalButton text="Delete" variant="destructive">
                        <DeleteTaskConfirmation id={task.id} />
                      </ModalButton>
                    </div>
                  </div>
                </Card>
              );
            }),
          )}
        </div>

        {hasNextPage && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <Button onClick={() => fetchNextPage()}>Load more</Button>
            <div className="flex items-center space-x-2">
              <Label className="text-sm">Page size:</Label>
              <Select
                value={String(pageParams.pageSize)}
                onValueChange={(value) => handlePageSizeChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TaskSection;
