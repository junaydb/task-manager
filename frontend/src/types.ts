/*
 * TEMPORARY
 * These are duplicates of types that already exist on the backend.
 * TODO: remove these later and pull the types directly from the backend.
 */

export type Status = "TODO" | "IN_PROGRESS" | "DONE";
export type SortBy = "created" | "dueDate";
export type SortOrder = "ASC" | "DESC";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  due_date: Date;
  created_at: Date;
};

export interface TaskResponse {
  success: boolean;
  data: Task;
}

export interface TaskArrayResponse {
  success: boolean;
  data: { tasks: Task[] };
  meta: { cursor: string | null };
}

export interface UpdateTaskResponse {
  success: boolean;
  data: { newStatus: Status };
}

export interface NoContentResponse {
  success: boolean;
}

export interface TaskCountResponse {
  success: boolean;
  data: { count: number };
}

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

export type DeleteTaskParams = {
  id: number;
};
