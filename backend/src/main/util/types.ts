import { z } from "zod";
import {
  ByCreatedCursorSchema,
  ByDueDateCursorSchema,
  SortOrderSchema,
} from "../routes/tasks.schemas";

export type ByCreatedCursor = z.infer<typeof ByCreatedCursorSchema>;
export type ByDueDateCursor = z.infer<typeof ByDueDateCursorSchema>;
export type Cursors = ByCreatedCursor | ByDueDateCursor;

export type SortOrder = z.infer<typeof SortOrderSchema>;
