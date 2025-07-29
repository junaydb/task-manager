import { Status } from "../types";

export function statusEnumToDisplay(status: Status) {
  const statusMapper = {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    DONE: "Done",
  };

  return statusMapper[status];
}

export function getSetStatusOptions(status: Status) {
  const statusArr: Status[] = ["TODO", "IN_PROGRESS", "DONE"];
  return statusArr.filter((cur) => status !== cur);
}

export function combineDateAndTimeToISO(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString();
}

export function formatDateForDisplay(date: Date): string {
  return date.toLocaleDateString();
}

export function formatTimeForDisplay(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
