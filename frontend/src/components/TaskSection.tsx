import * as GovUK from "govuk-react";
import type { Status, SortBy, SortOrder } from "../types";
import { useGetNextPage } from "../util/hooks";
import { statusEnumToDisplay } from "../util/helpers";
import { useState } from "react";
import ModalButton from "./ModalButton";
import SelectStatusForm from "./SelectStatusForm";
import DeleteTaskConfirmation from "./DeleteConfirmation";
import "../style/globals.css";

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
    return <GovUK.Paragraph>Loading tasks...</GovUK.Paragraph>;
  }

  return (
    <>
      <div className="task-section-header">
        <GovUK.H3>{statusEnumToDisplay(status)}</GovUK.H3>
        <div className="task-section-radios">
          <GovUK.H4>Sort by:</GovUK.H4>
          <GovUK.Radio sizeVariant="SMALL" value="created">
            Created
          </GovUK.Radio>
          <GovUK.Radio sizeVariant="SMALL" value="dueDate">
            Due date
          </GovUK.Radio>
        </div>
      </div>

      <div className="tasks-table">
        <div className="tasks-header-row">
          <div className="tasks-cell" style={{ width: "25%" }}>
            Title
          </div>
          <div className="tasks-cell" style={{ width: "50%" }}>
            Description
          </div>
          <div className="tasks-cell" style={{ width: "12.5%" }}>
            Due date
          </div>
          <div className="tasks-cell" style={{ width: "12.5%" }}>
            Created at
          </div>
          <div className="tasks-cell" style={{ width: "12.5%" }}></div>
          <div className="tasks-cell" style={{ width: "12.5%" }}></div>
        </div>
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
              <div key={task.id} className="tasks-row">
                <div className="tasks-cell">{task.title}</div>
                <div className="tasks-cell">{task.description}</div>
                <div className="tasks-cell">
                  {dueDateStr}, {dueTimeStr}
                </div>
                <div className="tasks-cell">
                  {createdDateStr}, {createdTimeStr}
                </div>
                <div className="tasks-cell">
                  <ModalButton text="Move" colour="#1d70b8">
                    <SelectStatusForm id={task.id} status={status} />
                  </ModalButton>
                </div>
                <div className="tasks-cell">
                  <ModalButton text="Delete" colour="#d4351c">
                    <DeleteTaskConfirmation id={task.id} />
                  </ModalButton>
                </div>
              </div>
            );
          }),
        )}
      </div>

      {hasNextPage && (
        <div className="pagination-controls">
          <GovUK.Button onClick={fetchNextPage}>Load more</GovUK.Button>

          <GovUK.Select
            input={{
              name: "group1",
              value: String(pageParams.pageSize),
              onChange: handlePageSizeChange,
            }}
            label=""
            className="drop-down"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </GovUK.Select>
        </div>
      )}
    </>
  );
}

export default TaskSection;
