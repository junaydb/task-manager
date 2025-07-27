export function validateTitle(value?: string) {
  return value ? true : "A title is required";
}

export function validateDueDate(date: string): true | string {
  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected >= today ? true : "This date must be in the future";
}

export function validateDueTime(time: string, dueDate: Date): true | string {
  const now = new Date();
  const dueDateIsToday =
    dueDate.getFullYear() === now.getFullYear() &&
    dueDate.getMonth() === now.getMonth() &&
    dueDate.getDate() === now.getDate();

  if (dueDateIsToday) {
    const [h, m] = time.split(":").map(Number);

    // Build the complete date/time input as a Date object
    const dueAt = new Date(now);
    dueAt.setHours(h, m);

    if (dueAt < now) {
      return "Time must be later than now when date is today";
    }
  }

  return true;
}
