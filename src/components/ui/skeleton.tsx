import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Shimmering placeholder block for loading states. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("shimmer rounded-xl bg-muted", className)}
      aria-hidden
      {...props}
    />
  );
}
