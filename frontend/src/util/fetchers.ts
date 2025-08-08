import axios from "axios";
import type {
  TaskResponse,
  UpdateTaskResponse,
  Status,
  SortBy,
  SortOrder,
  IdParam,
  NoContentResponse,
  TaskCountResponse,
  TaskArrayResponse,
  TaskArrayResponseWithMeta,
} from "../types";
import { combineDateAndTimeToISO } from "./helpers";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/tasks",
});

export async function createTask(params: {
  title: string;
  dueDate: string;
  dueTime: string;
  description?: string;
}) {
  const isoDateTime = combineDateAndTimeToISO(params.dueDate, params.dueTime);
  return api
    .post<TaskResponse>("", {
      title: params.title,
      description: params.description,
      due_date: isoDateTime,
    })
    .then((res) => res.data);
}

export async function updateTaskStatus(params: { id: number; status: Status }) {
  return api
    .patch<UpdateTaskResponse>(`/status/${params.id}`, {
      status: params.status,
    })
    .then((res) => res.data);
}

export async function deleteTask({ id }: IdParam) {
  return api.delete<NoContentResponse>(`/${id}`).then((res) => res.data);
}

export async function getNextPage(params: {
  status: Status;
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
  cursor?: string;
}) {
  return api
    .get<TaskArrayResponseWithMeta>(`/page`, {
      params: {
        status: params.status,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        pageSize: params.pageSize,
        cursor: params.cursor,
      },
    })
    .then((res) => res.data);
}

export async function getTaskById({ id }: IdParam) {
  return api.get<TaskResponse>(`/${id}`).then((res) => res.data);
}

export async function getTaskCount() {
  return api.get<TaskCountResponse>("/count").then((res) => res.data);
}

export async function getAllTasks() {
  return api.get<TaskArrayResponse>("/all").then((res) => res.data);
}
