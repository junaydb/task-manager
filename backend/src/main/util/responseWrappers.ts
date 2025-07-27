// Standard response format:
// Consumers can check if the request succeeded via the `success` field.
// Errors will always contain a message and sometimes more detailed error information in the `errors` field.

export function successResponse(data?: {} | [], meta?: any) {
  if (!data && !meta) {
    return { success: true };
  }
  if (Array.isArray(data)) {
    return { success: true, data: data, meta: meta };
  }
  return { success: true, data: { ...data }, meta: meta };
}

export function errorResponse(message: string, errors?: {} | []) {
  if (!errors) {
    return { success: false, message: message };
  }
  if (Array.isArray(errors)) {
    return { success: false, message: message, errors: errors };
  }
  return { success: false, message: message, errors: { ...errors } };
}
