import type { Status } from "../types";
import { useGetNextPage } from "../util/hooks";
import TaskCard from "./TaskCard";

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
} as const;

function TaskColumn({ status }: { status: Status }) {
  const { isPending, data, fetchNextPage, hasNextPage } = useGetNextPage({
    status,
    sortBy: "created",
    sortOrder: "DESC",
    pageSize: 20,
  });

  const props = columnProps[status];

  const allTasks = data?.pages.flatMap((page) => page.data.tasks) || [];
  const taskCount = allTasks.length;

  if (isPending) {
    return (
      <div
        className={`flex flex-col h-full min-h-[600px] rounded-lg border-2 ${props.className} p-4`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{props.title}</h3>
          <span className="text-sm text-muted-foreground bg-white px-2 py-1 rounded">
            0
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full min-h-[600px] rounded-lg border-2 ${props.className} p-4`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{props.title}</h3>
        <span className="text-sm text-muted-foreground bg-white px-2 py-1 rounded font-medium">
          {taskCount}
        </span>
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
              <div className="pt-2">
                <button
                  onClick={() => fetchNextPage()}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Load more tasks...
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
