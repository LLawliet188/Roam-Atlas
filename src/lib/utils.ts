import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number compactly, e.g. 12_400 -> "12.4k". */
export function formatCompact(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

/** Format an ISO date string as e.g. "Mar 2024". */
export function formatMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en", { month: "short", year: "numeric" });
}

/** Deterministic pseudo-random in [0,1) from a numeric seed (SSR-safe). */
export function seededRandom(seed: number) {
  const x = Math.sin(seed * 9973.13) * 43758.5453;
  return x - Math.floor(x);
}
