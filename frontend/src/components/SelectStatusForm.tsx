import { useState } from "react";
import { useUpdateTaskStatus } from "../util/hooks";
import { UpdateTaskStatusParams } from "../types";
import { statusEnumToDisplay, getSetStatusOptions } from "../util/helpers";
import type { Status } from "../types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  id: number;
  status: Status;
  onClose?: () => void;
}

function SelectStatusForm({ id, status, onClose }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<Status | "">("");
  const [submittedData, setSubmittedData] = useState<UpdateTaskStatusParams | null>(null);

  const { mutate } = useUpdateTaskStatus();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStatus) {
      setSubmittedData({ id, status: selectedStatus as Status });
      mutate({ id, status: selectedStatus as Status });
      onClose?.();
    }
  };

  if (!submittedData) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select new status</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-3">
            {!selectedStatus && (
              <p className="text-sm text-red-600">An option must be selected</p>
            )}
            <RadioGroup
              value={selectedStatus}
              onValueChange={(value: Status) => setSelectedStatus(value)}
            >
              {getSetStatusOptions(status).map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>
                    {statusEnumToDisplay(option)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button type="submit" disabled={!selectedStatus} className="w-full">
            Confirm
          </Button>
        </form>
      </div>
    );
  }
}

export default SelectStatusForm;
