import { z } from "zod";

const StatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

const IdSchema = z.coerce
  .number({ message: "ID is required and must be a number" })
  .int({ message: "ID must be an integer" })
  .min(1, { message: "ID must be > 0" });

const DateSchema = z
  .string({ message: "A date and time is required" })
  .datetime({
    message:
      "Invalid datetime format. Datetimes must be supplied in ISO 8601 format in UTC time.",
  })
  .transform((str) => new Date(str));

export const TaskIdParamSchema = z.object({
  id: IdSchema,
});

export const CreateTaskSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title cannot be blank" }),
  description: z.string().optional(),
  status: StatusEnum.default("TODO"),
  due_date: DateSchema.refine(
    (date) => {
      return typeof date === "string" || date > new Date();
    },
    { message: "Due date must be in the future" },
  ),
});

export const UpdateStatusSchema = z.object({
  status: StatusEnum,
});

export const ByCreatedCursorSchema = z.object({
  prevId: IdSchema,
  prevCreatedAt: DateSchema,
});

export const ByDueDateCursorSchema = z.object({
  prevId: IdSchema,
  prevDueDate: DateSchema,
});

export const SortOrderSchema = z.enum(["ASC", "DESC"]).default("DESC");

export const PaginationQuerySchema = z.object({
  status: StatusEnum,
  sortBy: z.enum(["created", "dueDate"]).default("created"),
  sortOrder: SortOrderSchema,
  pageSize: z.coerce
    .number({ message: "Page size is required must be a number" })
    .int({ message: "Page size must be an integer" }),
  cursor: z
    .string()
    .base64({ message: "Cursor must be base64 encoded" })
    .optional(),
});
