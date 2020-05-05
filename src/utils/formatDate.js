import format from "date-fns/format";

export function formatDate(date, separator = " ") {
  const dateFormat = `P${separator}p`;
  return format(date, dateFormat);
}
