export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getDefaultStartDate(): Date {
  const today = new Date();
  // Set to the first day of next month
  return new Date(today.getFullYear(), today.getMonth() + 1, 1);
}