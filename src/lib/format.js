export const dayOf = (iso) => new Date(iso).getDate();
export const monthOf = (iso) => new Date(iso).toLocaleString("en-GB", { month: "short" });
export const fullDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
export const shortDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const timeOf = (iso) =>
  new Date(iso).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true });
export const isPast = (iso) => new Date(iso) <= new Date();

const pad = (n) => String(n).padStart(2, "0");
// Value format that <input type="datetime-local"> understands.
export function toLocalInput(value) {
  const d = new Date(value);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
