import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  validateTitle,
  validateDescription,
  validateDueDate,
  validateDueTime,
} from "../validators";
import { useCreateTask } from "../util/hooks";
import { CreateTaskParams } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Round the time to the nearest next half hour
function getRoundedTime() {
  const date = new Date();
  const mins = date.getMinutes();
  const remainder = mins % 30;
  const addMins = remainder === 0 ? 30 : 30 - remainder;
  date.setMinutes(mins + addMins);
  return date;
}

function CreateTaskForm() {
  const now = getRoundedTime();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  const nowDateIso = now.toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateTaskParams>({
    reValidateMode: "onSubmit",
    defaultValues: {
      dueDate: nowDateIso,
      dueTime: `${hh}:${mm}`,
    },
  });

  const [submittedData, setSubmittedData] = useState<CreateTaskParams | null>(
    null,
  );

  const { mutate } = useCreateTask();

  const onSubmit = (params: CreateTaskParams) => {
    setSubmittedData(params);
    mutate(params!);
  };

  if (!submittedData) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
              <Input
                id="title"
                {...register("title", { validate: validateTitle })}
                className={errors.title ? "border-red-500" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <p className="text-sm text-muted-foreground">(Optional)</p>
              <Textarea
                id="description"
                {...register("description", { validate: validateDescription })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due date</Label>
              {errors.dueDate && (
                <p className="text-sm text-red-600">{errors.dueDate.message}</p>
              )}
              <Input
                id="dueDate"
                type="date"
                defaultValue={nowDateIso}
                {...register("dueDate", {
                  validate: validateDueDate,
                })}
                className={errors.dueDate ? "border-red-500" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueTime">Due time</Label>
              {errors.dueTime && (
                <p className="text-sm text-red-600">{errors.dueTime.message}</p>
              )}
              <Input
                id="dueTime"
                type="time"
                {...register("dueTime", {
                  validate: (time) => {
                    const curDueDate = getValues("dueDate");
                    return validateDueTime(time, new Date(curDueDate));
                  },
                })}
                className={errors.dueTime ? "border-red-500" : ""}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (submittedData) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xs">
              <h3 className="text-lg font-semibold text-green-800">
                Task created
              </h3>
            </div>
            <Button
              onClick={() => {
                setSubmittedData(null);
              }}
              className="w-full"
            >
              Add Another Task
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // TODO: add ui for when server returns an error
}

export default CreateTaskForm;
