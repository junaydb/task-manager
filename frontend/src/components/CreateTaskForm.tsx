import { useState } from "react";
import * as GovUK from "govuk-react";
import { useForm } from "react-hook-form";
import { validateTitle, validateDueDate, validateDueTime } from "../validators";
import { useCreateTask } from "../util/hooks";
import { CreateTaskParams } from "../types";

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
      <>
        <GovUK.H3>Create task</GovUK.H3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GovUK.FormGroup error={errors.title ? true : false}>
            <GovUK.Label>
              <GovUK.LabelText>Title</GovUK.LabelText>

              {errors.title && (
                <GovUK.ErrorText>{errors.title.message}</GovUK.ErrorText>
              )}

              <GovUK.Input
                {...register("title", { validate: validateTitle })}
              />
            </GovUK.Label>
          </GovUK.FormGroup>

          <GovUK.FormGroup>
            <GovUK.TextArea
              hint="(Optional)"
              input={{ ...register("description") }}
            >
              Description
            </GovUK.TextArea>
          </GovUK.FormGroup>

          <GovUK.FormGroup error={errors.dueDate ? true : false}>
            <GovUK.Label>
              <GovUK.LabelText>Due date</GovUK.LabelText>

              {errors.dueDate && (
                <GovUK.ErrorText>{errors.dueDate.message}</GovUK.ErrorText>
              )}

              <GovUK.Input
                type="date"
                defaultValue={nowDateIso}
                {...register("dueDate", {
                  validate: validateDueDate,
                })}
              />
            </GovUK.Label>
          </GovUK.FormGroup>

          <GovUK.FormGroup error={errors.dueTime ? true : false}>
            <GovUK.Label>
              <GovUK.LabelText>Due time</GovUK.LabelText>

              {errors.dueTime && (
                <GovUK.ErrorText>{errors.dueTime.message}</GovUK.ErrorText>
              )}

              <GovUK.Input
                type="time"
                {...register("dueTime", {
                  validate: (time) => {
                    const curDueDate = getValues("dueDate");
                    return validateDueTime(time, new Date(curDueDate));
                  },
                })}
              />
            </GovUK.Label>
          </GovUK.FormGroup>

          <GovUK.Button type="submit">Submit</GovUK.Button>
        </form>
      </>
    );
  }

  if (submittedData) {
    return (
      <div>
        <GovUK.Panel title="Task created" />
        <GovUK.Button
          onClick={() => {
            setSubmittedData(null);
          }}
        >
          Add Another Task
        </GovUK.Button>
      </div>
    );
  }

  // TODO: add ui for when server returns an error
}

export default CreateTaskForm;
