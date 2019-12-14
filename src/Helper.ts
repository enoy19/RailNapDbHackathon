export function unixToDate(timestamp: number): Date {
  return new Date(timestamp);
}

export function paddedTime(date: Date) {
  return (
    `${date.getUTCHours()}`.padStart(2, "0") +
    `:` +
    `${date.getUTCMinutes()}`.padStart(2, "0")
  );
}
