"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid size-11 place-items-center rounded-full border border-border bg-background/40 backdrop-blur transition-colors hover:bg-muted",
        className
      )}
    >
      {/* Avoid hydration mismatch: render a neutral icon until mounted */}
      <Sun
        className={cn(
          "size-5 transition-all duration-500",
          mounted && isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute size-5 transition-all duration-500",
          mounted && isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        )}
      />
    </button>
  );
}
