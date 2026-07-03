"use client";

/**
 * M2 — Scroll-driven travel timeline.
 * A central line draws itself as you scroll; entries alternate sides on
 * desktop and reveal with spring motion. Trips, photo moments and site
 * milestones each get their own badge.
 */

import { motion, useScroll, useSpring } from "framer-motion";
import { Camera, Flag, MapPin, Plane } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/lib/types";

const KIND: Record<
  TimelineEntry["kind"],
  { label: string; icon: typeof Plane; classes: string }
> = {
  trip: { label: "Trip", icon: Plane, classes: "bg-ocean/15 text-ocean" },
  photo: { label: "Photo", icon: Camera, classes: "bg-sunset/15 text-sunset" },
  milestone: { label: "Milestone", icon: Flag, classes: "bg-aurora/15 text-aurora" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function TimelineView({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div ref={ref} className="relative">
      {/* rail */}
      <div className="absolute inset-y-0 left-5 w-px bg-border md:left-1/2" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-y-0 left-5 w-px origin-top bg-gradient-to-b from-ocean via-sunset to-aurora md:left-1/2"
      />

      <ol className="space-y-14">
        {sorted.map((entry, i) => {
          const kind = KIND[entry.kind];
          const Icon = kind.icon;
          const left = i % 2 === 0;
          return (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className={cn(
                "relative pl-14 md:w-1/2 md:pl-0",
                left ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
              )}
            >
              {/* node */}
              <span
                className={cn(
                  "absolute left-5 top-2 grid size-9 -translate-x-1/2 place-items-center rounded-full border border-border bg-background",
                  "md:top-2",
                  left ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                )}
              >
                <Icon className="size-4 text-foreground/80" />
              </span>

              <article
                className={cn(
                  "group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg",
                  left ? "md:text-right" : ""
                )}
              >
                <Link href={`/destinations/${entry.destinationSlug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.image.startsWith("/") ? asset(entry.image) : entry.image}
                      alt={entry.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className={cn(
                        "absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur",
                        kind.classes
                      )}
                    >
                      <Icon className="size-3.5" />
                      {kind.label}
                    </span>
                  </div>
                  <div className="p-6">
                    <time className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {formatDate(entry.date)}
                    </time>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">{entry.title}</h3>
                    <p
                      className={cn(
                        "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground",
                        left ? "md:justify-end" : ""
                      )}
                    >
                      <MapPin className="size-3.5" />
                      {entry.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entry.summary}
                    </p>
                  </div>
                </Link>
              </article>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
