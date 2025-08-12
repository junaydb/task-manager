import type {
  ApiResponse,
  ApiResponseWithMeta,
  Cursor,
  ErrorMessage,
  ErrorPayload,
} from "./types.js";

// Standard response format:
// Consumers can check if the request succeeded via the `success` field.
// Errors will always contain a message and sometimes more detailed error information in the `errors` field.

export function successResponse(data?: {}): ApiResponse {
  return { success: true, data: { ...data } };
}

export function successResponseWithMeta(
  data: {},
  meta: Cursor,
): ApiResponseWithMeta {
  return { success: true, data: { ...data }, meta: meta };
}

export function errorResponse(
  message: string,
  errors?: ErrorMessage[],
): ErrorPayload {
  return { success: false, message: message, errors: errors };
}
