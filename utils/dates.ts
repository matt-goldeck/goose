import { format } from "date-fns";

export function formatDate(isoString: string) {
  try {
    return format(new Date(isoString), "MMM d, yyyy");
  } catch {
    return "—";
  }
}