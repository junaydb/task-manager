export class TaskNotFoundError extends Error {
  constructor() {
    super("Task(s) not found");
    this.name = "TaskNotFoundError";
  }
}
