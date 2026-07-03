"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destinations/destination-card";
import type { CountryGroup } from "@/lib/data/destinations";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "all" | "visited" | "wishlist";
type View = "grid" | "countries";

export function ExploreGrid({
  destinations,
  countryGroups,
}: {
  destinations: Destination[];
  /** M3 — country → city hierarchy view. */
  countryGroups?: CountryGroup[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [tag, setTag] = useState<string | null>(null);
  const [view, setView] = useState<View>("grid");

  const tags = useMemo(
    () => Array.from(new Set(destinations.flatMap((d) => d.tags))).sort(),
    [destinations]
  );

  const matches = (d: Destination) => {
    const byStatus =
      filter === "all" || (filter === "visited" ? d.visited : !d.visited);
    const byTag = !tag || d.tags.includes(tag);
    return byStatus && byTag;
  };

  const filtered = useMemo(
    () => destinations.filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [destinations, filter, tag]
  );

  const groups = useMemo(
    () =>
      (countryGroups ?? [])
        .map((g) => ({ ...g, cities: g.cities.filter(matches) }))
        .filter((g) => g.cities.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countryGroups, filter, tag]
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
        {countryGroups && (
          <>
            <span className="mx-1 h-6 w-px bg-border" />
            {(["grid", "countries"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  chip,
                  view === v
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted"
                )}
              >
                {v === "grid" ? "Grid" : "By country"}
              </button>
            ))}
          </>
        )}
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
        {view === "countries" ? ` across ${groups.length} countr${groups.length === 1 ? "y" : "ies"}` : ""}
      </p>

      {view === "countries" && countryGroups ? (
        <div className="mt-4 space-y-12">
          {groups.map((g) => (
            <section key={g.countryCode}>
              <div className="flex items-baseline gap-3">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <MapPin className="size-4 text-accent" />
                  {g.country}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {g.continent} · {g.cities.length} place{g.cities.length === 1 ? "" : "s"}
                  {g.visitedCount > 0 ? ` · ${g.visitedCount} visited` : ""}
                </span>
              </div>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.cities.map((d) => (
                  <DestinationCard key={d.id} destination={d} />
                ))}
              </div>
            </section>
          ))}
          {groups.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">
              Nothing matches those filters yet.
            </p>
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
