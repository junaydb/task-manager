import type { Context } from "hono";
import type { IGetTasksByCreatedAscParams as IPageParams } from "../queries/taskQueries.queries.js";
import Task from "../models/Task.js";
import { Hono } from "hono";
import { successResponse } from "../util/responseWrappers.js";
import {
  TaskIdParamSchema,
  CreateTaskSchema,
  UpdateStatusSchema,
  PaginationQuerySchema,
} from "./tasks.schemas.js";
import * as pagination from "../util/pagination.js";

const tasks = new Hono();

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

/**
 * GET /tasks
 * Retrieves all tasks.
 */
tasks.get("/all", async (c: Context) => {
  const allTasks = await Task.getAll();
  return c.json(successResponse(allTasks), 200);
});

/**
 * GET /count
 * Retrieves the number of tasks.
 */
tasks.get("/count", async (c: Context) => {
  const numTasks = await Task.getNumTasks();
  return c.json(successResponse({ count: numTasks }), 200);
});

/**
 * GET /tasks/page
 * Retrieves tasks with pagination using cursor-based pagination.
 * Query parameters:
 * - status: 'TODO', 'IN_PROGRESS' or 'DONE'
 * - sortBy: 'created' or 'dueDate'
 * - sortOrder: 'ASC' or 'DESC'
 * - pageSize: number
 * - cursor: base64 encoded cursor for pagination (not required for first page)
 */
tasks.get("/page", async (c: Context) => {
  const queryValidation = PaginationQuerySchema.parse(c.req.query());
  let { status, sortBy, sortOrder, pageSize, cursor } = queryValidation;

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
    console.log(cursor);
    nextCursor = pagination.encodeCursor(cursor);
  }

  return c.json(successResponse({ tasks: page }, { cursor: nextCursor }), 200);
});

/**
 * GET /tasks/:id
 * Retrieves a single task by its ID.
 */
tasks.get("/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({
    id: c.req.param("id"),
  });
  const task = await Task.findById({ taskId: id });
  return c.json(successResponse(task), 200);
});

/**
 * POST /tasks
 * Creates a new task.
 */
tasks.post("/", async (c: Context) => {
  const body = await c.req.json();
  const { title, status, due_date, description } = CreateTaskSchema.parse(body);

  const task = await Task.save({ title, status, due_date, description });

  return c.json(successResponse({ task: { ...task } }), 201);
});

/**
 * PATCH /tasks/status/:id
 * Updates the status of an existing task.
 */
tasks.patch("/status/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({ id: c.req.param("id") });
  const body = await c.req.json();
  const { status } = UpdateStatusSchema.parse(body);

  const result = await Task.updateStatus({ taskId: id, newStatus: status });

  return c.json(successResponse({ new_status: result.status }), 200);
});

/**
 * DELETE /tasks/:id
 * Deletes a task by its ID.
 */
tasks.delete("/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({
    id: c.req.param("id"),
  });

  await Task.delete({ taskId: id });

  return c.json(successResponse(), 200);
});

export default tasks;
