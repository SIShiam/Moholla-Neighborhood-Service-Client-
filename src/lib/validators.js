import { TYPE_NAMES } from "./constants";

export const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const urlOk = (v) => {
  try {
    const u = new URL(v.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export function passwordError(v) {
  if (v.length < 6) return "Password needs at least 6 characters.";
  if (!/[A-Z]/.test(v)) return "Add at least one uppercase letter (A to Z).";
  if (!/[a-z]/.test(v)) return "Add at least one lowercase letter (a to z).";
  return "";
}

export function eventErrors(f, { allowSameDate } = {}) {
  const e = {};
  if (f.title.trim().length < 5 || f.title.trim().length > 80) e.title = "Use 5 to 80 characters for the title.";
  const d = f.description.trim().length;
  if (d < 30 || d > 1000) e.description = `Describe the event in 30 to 1000 characters. You have written ${d}.`;
  if (!TYPE_NAMES.includes(f.eventType)) e.eventType = "Pick an event type from the list.";
  if (!urlOk(f.thumbnail)) e.thumbnail = "Enter a full image link starting with http:// or https://.";
  if (f.location.trim().length < 3) e.location = "Enter the place where people should meet.";
  const date = new Date(f.eventDate);
  if (!f.eventDate || Number.isNaN(date.getTime())) e.eventDate = "Choose a date and time.";
  else if (date <= new Date() && !(allowSameDate && f.eventDate === allowSameDate))
    e.eventDate = "The event date must be in the future.";
  const n = Number(f.volunteersNeeded);
  if (!Number.isInteger(n) || n < 1 || n > 1000) e.volunteersNeeded = "Enter a number between 1 and 1000.";
  return e;
}
