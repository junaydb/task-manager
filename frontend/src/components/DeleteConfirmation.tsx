import { useState } from "react";
import { useDeleteTask } from "../util/hooks";
import { DeleteTaskParams } from "../types";
import { Button } from "@/components/ui/button";

interface Props {
  id: number;
  onClose?: () => void;
}

function DeleteTaskConfirmation({ id, onClose }: Props) {
  const [submittedData, setSubmittedData] = useState<DeleteTaskParams | null>(null);

  const { mutate } = useDeleteTask();

  const onConfirm = () => {
    const deleteParams = { id };
    setSubmittedData(deleteParams);
    mutate(deleteParams);
    onClose?.();
  };

  if (!submittedData) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Are you sure?</h3>
        <p className="text-sm text-muted-foreground">This action cannot be undone</p>
        <div className="flex space-x-2">
          <Button variant="destructive" onClick={onConfirm} className="flex-1">
            Confirm
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default DeleteTaskConfirmation;
