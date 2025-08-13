import type { IGetAllTasksResult as Task } from "../queries/taskQueries.queries.js";
import type { status } from "../queries/taskQueries.queries.js";
import { z } from "zod";
import {
  ByCreatedCursorSchema,
  ByDueDateCursorSchema,
  SortOrderSchema,
} from "../routes/tasks.schemas.js";

export type ByCreatedCursor = z.infer<typeof ByCreatedCursorSchema>;
export type ByDueDateCursor = z.infer<typeof ByDueDateCursorSchema>;
export type Cursors = ByCreatedCursor | ByDueDateCursor;

export type SortOrder = z.infer<typeof SortOrderSchema>;

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}

export interface ApiResponseWithMeta<T = any> extends ApiResponse<T> {
  meta: Cursor;
}

export interface TaskResponse extends ApiResponse<Task> {}

export interface TaskArrayResponse extends ApiResponse<{ tasks: Task[] }> {}

export interface TaskArrayResponseWithMeta
  extends ApiResponseWithMeta<{ tasks: Task[] }> {}

export interface TaskUpdateResponse 
  extends ApiResponse<{ newStatus: status }> {}

export interface NoContentResponse extends Omit<ApiResponse, "data"> {}

export interface TaskCountResponse extends ApiResponse<{ count: number }> {}

export type Cursor = { cursor: string | null };
