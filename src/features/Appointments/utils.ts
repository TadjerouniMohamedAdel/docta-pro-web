export const getDateKey = (date: Date) =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
