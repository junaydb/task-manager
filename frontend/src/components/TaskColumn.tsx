import type { Status } from "../types";
import { useGetNextPage } from "../util/hooks";
import TaskCard from "./TaskCard";
import LoadingSpinner from "./LoadingSpinner";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const columnProps = {
  TODO: {
    title: "To do",
    className: "border-gray-300 bg-gray-50",
  },
  IN_PROGRESS: {
    title: "In progress",
    className: "border-blue-300 bg-blue-50",
  },
  DONE: {
    title: "Done",
    className: "border-green-300 bg-green-50",
  },
};

function TaskColumn({ status }: { status: Status }) {
  const { isPending, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetNextPage({
      status,
      sortBy: "created",
      sortOrder: "DESC",
      pageSize: 10,
    });

  const props = columnProps[status];
  const { ref, inView } = useInView();

  const allTasks = data?.pages.flatMap((page) => page.data.tasks) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div
        className={`flex flex-col h-full min-h-[600px] rounded-xs border-2 ${props.className} p-4`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{props.title}</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full min-h-[600px] rounded-xs border-2 ${props.className} p-4`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{props.title}</h3>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {allTasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No tasks yet
          </div>
        ) : (
          <>
            {allTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {hasNextPage && (
              <div ref={ref} className="flex items-center justify-center py-4">
                {isFetchingNextPage && <LoadingSpinner />}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
