import { useState } from "react";
import * as GovUK from "govuk-react";
import { useForm } from "react-hook-form";
import { useUpdateTaskStatus } from "../util/hooks";
import { UpdateTaskStatusParams } from "../types";
import { statusEnumToDisplay, getSetStatusOptions } from "../util/helpers";
import type { Status } from "../types";

interface Props {
  id: number;
  status: Status;
}

function SelectStatusForm({ id, status }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskStatusParams>({
    reValidateMode: "onSubmit",
  });

  const [submittedData, setSubmittedData] =
    useState<UpdateTaskStatusParams | null>(null);

  const { mutate } = useUpdateTaskStatus();

  const onSubmit = (formValues: { status: Status }) => {
    setSubmittedData({ id, status: formValues.status });
    mutate({ id, status: formValues.status });
  };

  if (!submittedData) {
    return (
      <>
        <GovUK.H3>Select new status</GovUK.H3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GovUK.FormGroup error={errors.status ? true : false}>
            <GovUK.Label>
              {errors.status && (
                <GovUK.ErrorText>An option must be selected</GovUK.ErrorText>
              )}
              <GovUK.MultiChoice label="">
                {getSetStatusOptions(status).map((option) => (
                  <GovUK.Radio
                    key={option}
                    {...register("status", { required: true })}
                    value={option}
                  >
                    {statusEnumToDisplay(option)}
                  </GovUK.Radio>
                ))}
              </GovUK.MultiChoice>
            </GovUK.Label>
          </GovUK.FormGroup>
          <GovUK.Button type="submit">Confirm</GovUK.Button>
        </form>
      </>
    );
  }
}

export default SelectStatusForm;
