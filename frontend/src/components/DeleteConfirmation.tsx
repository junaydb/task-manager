import { useState } from "react";
import * as GovUK from "govuk-react";
import { useDeleteTask } from "../util/hooks";
import { DeleteTaskParams } from "../types";

interface Props {
  id: number;
}

function DeleteTaskConfirmation(id: Props) {
  const [submittedData, setSubmittedData] = useState<DeleteTaskParams | null>(
    null,
  );

  const { mutate } = useDeleteTask();

  const onConfirm = (id: DeleteTaskParams) => {
    setSubmittedData(id);
    mutate(id!);
  };

  if (!submittedData) {
    return (
      <>
        <GovUK.H3>Are you sure?</GovUK.H3>
        <GovUK.HintText>This action cannot be undone</GovUK.HintText>
        <div>
          <GovUK.Button onClick={() => onConfirm(id)}>Confirm</GovUK.Button>
        </div>
      </>
    );
  }
}

export default DeleteTaskConfirmation;
