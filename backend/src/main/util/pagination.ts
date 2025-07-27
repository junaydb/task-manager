import Task from "../models/task";
import {
  ByCreatedCursorSchema,
  ByDueDateCursorSchema,
} from "../routes/tasks.schemas";
import type { IGetAllTasksResult as ITask } from "../queries/taskQueries.queries";
import type { ByCreatedCursor, ByDueDateCursor, Cursors } from "./types";

export function decodeCursor(cursor: string) {
  return JSON.parse(Buffer.from(cursor, "base64").toString());
}

export function encodeCursor(cursor: Cursors) {
  return Buffer.from(JSON.stringify(cursor)).toString("base64");
}

export const strategies = {
  created: {
    getTasks: Task.getTasksByCreatedSafe,
    cursorSchema: ByCreatedCursorSchema,
    getNextCursor: (lastTask: ITask): ByCreatedCursor => ({
      prevId: lastTask.id,
      prevCreatedAt: lastTask.created_at,
    }),
  },
  dueDate: {
    getTasks: Task.getTasksByDueDateSafe,
    cursorSchema: ByDueDateCursorSchema,
    getNextCursor: (lastTask: ITask): ByDueDateCursor => ({
      prevId: lastTask.id,
      prevDueDate: lastTask.due_date,
    }),
  },
};
