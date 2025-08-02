export function validateTitle(value?: string) {
  if (!value) {
    return "A title is required";
  }
  if (value.length > 100) {
    return "Cannot contain more than 100 characters";
  }
  return true;
}

export function validateDescription(value?: string) {
  if (value && value.length > 10000) {
    return "Cannot contain more than 10000 characters";
  }
  return true;
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
