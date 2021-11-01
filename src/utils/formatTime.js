import { format, formatDistanceToNow } from "date-fns";

export function fDate(date) {
  return !!date ? format(new Date(date), "dd MMMM yyyy") : "";
}

export function fDateTime(date) {
  return !!date ? format(new Date(date), "dd MMM yyyy HH:mm") : "";
}
