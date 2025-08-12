import { z } from "zod";
import {
  ByCreatedCursorSchema,
  ByDueDateCursorSchema,
  SortOrderSchema,
} from "../routes/tasks.schemas.js";

export type ByCreatedCursor = z.infer<typeof ByCreatedCursorSchema>;
export type ByDueDateCursor = z.infer<typeof ByDueDateCursorSchema>;
export type Cursors = ByCreatedCursor | ByDueDateCursor;

export type SortOrder = z.infer<typeof SortOrderSchema>;

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}

export type Cursor = { cursor: string | null };

export interface ApiResponseWithMeta<T = any> extends ApiResponse<T> {
  meta: Cursor;
}

export type ErrorMessage = {
  param: string;
  message: string;
};
export interface ErrorPayload {
  success: boolean;
  message: string;
  errors?: ErrorMessage[];
}
