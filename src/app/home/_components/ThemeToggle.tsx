"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Default to dark mode if nothing is stored (since the mockup design is dark)
    const isDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark) || !storedTheme;

    if (isDark) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border bg-card text-foreground hover:bg-muted hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-secondary fill-secondary" />
      )}
    </button>
  );
}
