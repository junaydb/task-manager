/*
 * TEMPORARY
 * These are duplicates of types that already exist on the backend.
 * TODO: remove these later and pull the types directly from the backend.
 */

export type Status = "TODO" | "IN_PROGRESS" | "DONE";
export type SortBy = "created" | "dueDate";
export type SortOrder = "ASC" | "DESC";

// Generic API response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}

// API response with pagination metadata
export interface ApiResponseWithMeta<T = any> extends ApiResponse<T> {
  meta: { cursor: string | null };
}

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  due_date: Date;
  created_at: Date;
};

export interface TaskResponse extends ApiResponse<Task> {}

export interface TaskArrayResponse extends ApiResponse<{ tasks: Task[] }> {}

export interface TaskArrayResponseWithMeta
  extends ApiResponseWithMeta<{ tasks: Task[] }> {}

export interface UpdateTaskResponse
  extends ApiResponse<{ newStatus: Status }> {}

export interface NoContentResponse extends Omit<ApiResponse, "data"> {}

export interface TaskCountResponse extends ApiResponse<{ count: number }> {}

type ErrorMessage = {
  param: string;
  message: string;
};
export interface ErrorPayload {
  success: boolean;
  message: string;
  errors: ErrorMessage[];
}

export type CreateTaskParams = {
  title: string;
  description?: string;
  dueDate: string;
  dueTime: string;
};

export type UpdateTaskStatusParams = {
  id: number;
  status: Status;
};

export type IdParam = {
  id: number;
};

// Use IdParam instead of DeleteTaskParams for consistency
export type DeleteTaskParams = IdParam;
