"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destinations/destination-card";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "all" | "visited" | "wishlist";

export function ExploreGrid({ destinations }: { destinations: Destination[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(destinations.flatMap((d) => d.tags))).sort(),
    [destinations]
  );

  const filtered = useMemo(
    () =>
      destinations.filter((d) => {
        const byStatus =
          filter === "all" || (filter === "visited" ? d.visited : !d.visited);
        const byTag = !tag || d.tags.includes(tag);
        return byStatus && byTag;
      }),
    [destinations, filter, tag]
  );

  const chip =
    "rounded-full px-4 py-2 text-sm font-medium transition-colors border";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "visited", "wishlist"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              chip,
              filter === f
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border hover:bg-muted"
            )}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="mx-1 h-6 w-px bg-border" />
        <button
          onClick={() => setTag(null)}
          className={cn(chip, !tag ? "border-transparent bg-accent/15 text-accent" : "border-border hover:bg-muted")}
        >
          All tags
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t === tag ? null : t)}
            className={cn(
              chip,
              tag === t ? "border-transparent bg-accent/15 text-accent" : "border-border hover:bg-muted"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} destination{filtered.length === 1 ? "" : "s"}
      </p>

      <motion.div layout className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((d) => (
            <motion.div
              key={d.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
            >
              <DestinationCard destination={d} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          Nothing matches those filters yet.
        </p>
      )}
    </div>
  );
}
