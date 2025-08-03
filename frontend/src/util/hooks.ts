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

// Query key factory for consistent key management
const queryKeys = {
  tasks: {
    all: ["tasks"],
    lists: () => [...queryKeys.tasks.all, "list"],
    list: (params: object) => [...queryKeys.tasks.lists(), params],
    details: () => [...queryKeys.tasks.all, "detail"],
    detail: (id: number) => [...queryKeys.tasks.details(), id],
    count: () => [...queryKeys.tasks.all, "count"],
  },
};

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<TaskResponse, AxiosError<ErrorPayload>, CreateTaskParams>({
    mutationFn: (params) => {
      if (!params) {
        throw new Error("CreateTask parameters are required");
      }
      return createTask(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
    onError: (error) => {
      console.error(
        "Failed to create task:",
        error.response?.data?.message || error.message,
      );
    },
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateTaskResponse,
    AxiosError<ErrorPayload>,
    UpdateTaskStatusParams
  >({
    mutationFn: (params) => {
      if (!params) {
        throw new Error("UpdateTaskStatus parameters are required");
      }
      return updateTaskStatus(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
    onError: (error) => {
      console.error(
        "Failed to update task status:",
        error.response?.data?.message || error.message,
      );
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<NoContentResponse, AxiosError<ErrorPayload>, IdParam>({
    mutationFn: (params) => {
      if (!params) {
        throw new Error("DeleteTask parameters are required");
      }
      return deleteTask(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
    onError: (error) => {
      console.error(
        "Failed to delete task:",
        error.response?.data?.message || error.message,
      );
    },
  });
}

export function useGetTaskById(id: number) {
  return useQuery<TaskResponse, AxiosError<ErrorPayload>>({
    queryKey: queryKeys.tasks.detail(id),
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
    queryKey: queryKeys.tasks.list(params),
    queryFn: ({ pageParam }) => {
      const cursor = pageParam ? String(pageParam) : undefined;
      return getNextPage({ ...params, cursor });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.cursor || undefined;
    },
  });
}

export function useGetTaskCount() {
  return useQuery<TaskCountResponse, AxiosError<ErrorPayload>>({
    queryKey: queryKeys.tasks.count(),
    queryFn: () => getTaskCount(),
  });
}
