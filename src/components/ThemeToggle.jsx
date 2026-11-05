"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "mohollah-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "mohollah");
  }, []);

  function toggle() {
    const next = theme === "mohollahnight" ? "mohollah" : "mohollahnight";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setTheme(next);
  }

  const dark = theme === "mohollahnight";
  return (
    <button
      onClick={toggle}
      suppressHydrationWarning
      className="btn btn-ghost btn-circle btn-sm text-base-content/80 hover:text-primary hover:bg-base-200/80 transition-all duration-300 hover:rotate-12 active:scale-90"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
