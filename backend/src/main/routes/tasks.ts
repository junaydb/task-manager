import type { IGetTasksByCreatedAscParams as IPageParams } from "../queries/taskQueries.queries.js";
import Task from "../models/Task.js";
import {
  successResponse,
  successResponseWithMeta,
} from "../util/responseWrappers.js";
import {
  TaskIdParamSchema,
  CreateTaskSchema,
  UpdateStatusSchema,
  PaginationQuerySchema,
} from "./tasks.schemas.js";
import * as pagination from "../util/pagination.js";
import { publicProcedure, router } from "../trpc.js";

/*
 * All routes that take parameters validate those parameters using Zod schemas.
 * Zod throws a `ZodError` when validation fails.
 *
 * Errors are handled at the top level in `index.ts` with the `app.onError` handler,
 * so try/catch blocks are not needed.
 *
 * When validation fails, a helpful error message (sourced from the given Zod schema)
 * is sent to the browser, in the standard response format defined in `./util/responseWrappers.ts`.
 */

export const tasksRouter = router({
  getAll: publicProcedure.query(async () => {
    const allTasks = await Task.getAll();
    return successResponse({ tasks: allTasks });
  }),

  getCount: publicProcedure.query(async () => {
    const numTasks = await Task.getNumTasks();
    return successResponse({ count: numTasks });
  }),

  getPage: publicProcedure
    .input(PaginationQuerySchema)
    .query(async ({ input }) => {
      const { status, sortBy, sortOrder, pageSize, cursor } = input;

      const sortStrat = pagination.strategies[sortBy];

      let params: IPageParams;

      if (!cursor) {
        params = { status, pageSize };
      } else {
        const decodedCursor = pagination.decodeCursor(cursor);
        const validatedCursor = sortStrat.cursorSchema.parse(decodedCursor);
        params = { ...validatedCursor, status, pageSize };
      }

      const page = await sortStrat.getTasks(sortOrder, params);

      const nextPageExists = page.length === pageSize;
      let nextCursor: string | null = null;
      if (nextPageExists) {
        const lastTask = page[page.length - 1];
        const cursor = sortStrat.getNextCursor(lastTask);
        nextCursor = pagination.encodeCursor(cursor);
      }

      return successResponseWithMeta({ tasks: page }, { cursor: nextCursor });
    }),

  getById: publicProcedure.input(TaskIdParamSchema).query(async ({ input }) => {
    const { id } = input;
    const task = await Task.findById({ taskId: id });
    return successResponse(task);
  }),

  create: publicProcedure
    .input(CreateTaskSchema)
    .mutation(async ({ input }) => {
      const { title, status, due_date, description } = input;
      const task = await Task.save({ title, status, due_date, description });
      return successResponse({ task: { ...task } });
    }),

  updateStatus: publicProcedure
    .input(TaskIdParamSchema.merge(UpdateStatusSchema))
    .mutation(async ({ input }) => {
      const { id, status } = input;
      const result = await Task.updateStatus({ taskId: id, newStatus: status });
      return successResponse({ new_status: result.status });
    }),

  delete: publicProcedure
    .input(TaskIdParamSchema)
    .mutation(async ({ input }) => {
      const { id } = input;
      await Task.delete({ taskId: id });
      return successResponse();
    }),
});
