import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTask,
  getTaskById,
  getNextPage,
  getTaskCount,
  updateTaskStatus,
  deleteTask,
} from "./fetchers";
import type {
  SortOrder,
  SortBy,
  Status,
  CreateTaskParams,
  UpdateTaskStatusParams,
  ErrorPayload,
  TaskResponse,
  UpdateTaskResponse,
  IdParam,
  NoContentResponse,
  TaskCountResponse,
  TaskArrayResponse,
} from "../types";
import { AxiosError } from "axios";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<TaskResponse, AxiosError<ErrorPayload>, CreateTaskParams>({
    mutationFn: (params) => createTask(params!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateTaskResponse,
    AxiosError<ErrorPayload>,
    UpdateTaskStatusParams
  >({
    mutationFn: (params) => updateTaskStatus(params!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<NoContentResponse, AxiosError<ErrorPayload>, IdParam>({
    mutationFn: (params) => deleteTask(params!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useGetTaskById(id: number) {
  return useQuery<TaskResponse, AxiosError<ErrorPayload>, IdParam>({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById({ id }),
  });
}

export function useGetNextPage(params: {
  status: Status;
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
}) {
  return useInfiniteQuery<TaskArrayResponse, AxiosError<ErrorPayload>>({
    queryKey: ["tasks", params],
    queryFn: ({ pageParam }) => getNextPage({ ...params, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.cursor;
    },
  });
}

export function useGetTaskCount() {
  return useQuery<TaskCountResponse, AxiosError<ErrorPayload>>({
    queryKey: ["tasks", "count"],
    queryFn: () => getTaskCount(),
  });
}
