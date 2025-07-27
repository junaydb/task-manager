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
