import { Recycle, Sprout, HandHeart, Soup, Droplet, BookOpen, Stethoscope } from "lucide-react";

export const EVENT_TYPES = {
  Cleanup: { icon: Recycle, tone: "#0f7b6c" },
  Plantation: { icon: Sprout, tone: "#2f7d32" },
  Donation: { icon: HandHeart, tone: "#c7402d" },
  "Food Distribution": { icon: Soup, tone: "#b9770a" },
  "Blood Drive": { icon: Droplet, tone: "#a8232f" },
  Education: { icon: BookOpen, tone: "#2563a8" },
  "Health Camp": { icon: Stethoscope, tone: "#6b4aa8" },
};

export const TYPE_NAMES = Object.keys(EVENT_TYPES);

export const AREAS = [
  "Mirpur",
  "Mohammadpur",
  "Uttara",
  "Dhanmondi",
  "Old Dhaka",
  "Badda",
  "Jatrabari",
  "Tejgaon",
  "Gulshan",
  "Khilgaon",
];
