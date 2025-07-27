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
import type { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/tasks",
});

export async function createTask(params: {
  title: string;
  dueDate: string;
  dueTime: string;
  description?: string;
}): Promise<TaskResponse> {
  const isoDateTime = new Date(
    `${params.dueDate}T${params.dueTime}`,
  ).toISOString();
  return api
    .post<TaskResponse, AxiosResponse<TaskResponse>>("", {
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
    .patch<UpdateTaskResponse, AxiosResponse<UpdateTaskResponse>>(
      `/status/${params.id}`,
      {
        status: params.status,
      },
    )
    .then((res) => res.data);
}

export async function deleteTask({ id }: IdParam): Promise<NoContentResponse> {
  return api
    .delete<NoContentResponse, AxiosResponse<NoContentResponse>>(`/${id}`)
    .then((res) => res.data);
}

export async function getNextPage(params: {
  status: Status;
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
  cursor?: string;
}): Promise<TaskArrayResponse> {
  return api
    .get<TaskArrayResponse, AxiosResponse<TaskArrayResponse>>(`/page`, {
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
  return api
    .get<TaskResponse, AxiosResponse<TaskResponse>>(`/${id}`)
    .then((res) => res.data);
}

export async function getTaskCount(): Promise<TaskCountResponse> {
  return api
    .get<TaskCountResponse, AxiosResponse<TaskCountResponse>>("/count")
    .then((res) => res.data);
}
