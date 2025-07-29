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
} from "../types";
import { combineDateAndTimeToISO } from "./helpers";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/tasks",
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access");
    } else if (error.response?.status === 404) {
      console.error("Resource not found");
    } else if (error.response?.status >= 500) {
      console.error("Server error");
    } else if (!error.response) {
      console.error("Network error - please check your connection");
    }

    return Promise.reject(error);
  },
);

export async function createTask(params: {
  title: string;
  dueDate: string;
  dueTime: string;
  description?: string;
}): Promise<TaskResponse> {
  const isoDateTime = combineDateAndTimeToISO(params.dueDate, params.dueTime);
  return api
    .post<TaskResponse>("", {
      title: params.title,
      description: params.description,
      due_date: isoDateTime,
    })
    .then((res) => res.data);
}

export async function updateTaskStatus(params: {
  id: number;
  status: Status;
}): Promise<UpdateTaskResponse> {
  return api
    .patch<UpdateTaskResponse>(`/status/${params.id}`, {
      status: params.status,
    })
    .then((res) => res.data);
}

export async function deleteTask({ id }: IdParam): Promise<NoContentResponse> {
  return api.delete<NoContentResponse>(`/${id}`).then((res) => res.data);
}

export async function getNextPage(params: {
  status: Status;
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
  cursor?: string;
}): Promise<TaskArrayResponse> {
  return api
    .get<TaskArrayResponse>(`/page`, {
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

export async function getTaskById({ id }: IdParam): Promise<TaskResponse> {
  return api.get<TaskResponse>(`/${id}`).then((res) => res.data);
}

export async function getTaskCount(): Promise<TaskCountResponse> {
  return api.get<TaskCountResponse>("/count").then((res) => res.data);
}
