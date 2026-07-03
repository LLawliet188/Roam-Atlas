"use client";

/**
 * M3 — Pinterest-style media gallery with lightbox.
 * Masonry columns of photos and silent looping films, filterable by
 * destination, with a keyboard-navigable lightbox.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LazyVideo } from "@/components/media/lazy-video";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import type { GalleryPhoto, GalleryVideo } from "@/lib/data/media";

type Item =
  | ({ type: "photo" } & GalleryPhoto)
  | ({ type: "video" } & GalleryVideo);

type Filter = "all" | "films" | string; // string = destination key

const DESTINATION_LABEL: Record<string, string> = {
  prague: "Prague",
  doha: "Doha",
};

/** Interleave photos and videos for a lively masonry rhythm. */
function interleave(photos: GalleryPhoto[], videos: GalleryVideo[]): Item[] {
  const out: Item[] = [];
  const max = Math.max(photos.length, videos.length);
  for (let i = 0; i < max; i++) {
    if (photos[i]) out.push({ type: "photo", ...photos[i] });
    if (videos[i] && i % 2 === 0) out.push({ type: "video", ...videos[i] });
  }
  // Append any remaining videos not yet placed.
  videos.forEach((v, i) => {
    if (!(i % 2 === 0) || i >= max) out.push({ type: "video", ...v });
  });
  // De-dup by id (interleave + append can overlap).
  const seen = new Set<string>();
  return out.filter((it) => (seen.has(it.id) ? false : seen.add(it.id)));
}

export function MediaGallery({
  photos,
  videos,
  showFilters = false,
}: {
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
  /** Show destination/films filter chips (used on the main gallery page). */
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);

  const destinationKeys = useMemo(
    () =>
      Array.from(
        new Set([...photos, ...videos].map((m) => m.destination))
      ),
    [photos, videos]
  );

  const items = useMemo(() => {
    if (filter === "films")
      return videos.map((v) => ({ type: "video", ...v }) as Item);
    const p = filter === "all" ? photos : photos.filter((x) => x.destination === filter);
    const v = filter === "all" ? videos : videos.filter((x) => x.destination === filter);
    return interleave(p, v);
  }, [filter, photos, videos]);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : items[active];
  const chip =
    "rounded-full px-4 py-2 text-sm font-medium transition-colors border";

  return (
    <>
      {showFilters && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {(["all", ...destinationKeys, "films"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setActive(null);
              }}
              className={cn(
                chip,
                filter === f
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted"
              )}
            >
              {f === "all"
                ? "Everything"
                : f === "films"
                  ? "Films"
                  : DESTINATION_LABEL[f] ?? f}
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {items.length} item{items.length === 1 ? "" : "s"}
          </span>
        </div>
      )}

      <motion.div layout className="[column-fill:_balance] columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.04 }}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative overflow-hidden">
                {item.type === "photo" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(item.src)}
                    alt={item.caption}
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <>
                    <LazyVideo
                      src={item.src}
                      poster={item.poster}
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur">
                      <Play className="size-4 fill-current" />
                    </span>
                  </>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] max-w-5xl flex-col items-center gap-3"
            >
              {current.type === "photo" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(current.src)}
                  alt={current.caption}
                  className="max-h-[78vh] w-auto rounded-xl object-contain"
                />
              ) : (
                <video
                  src={asset(current.src)}
                  poster={asset(current.poster)}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="max-h-[78vh] w-auto rounded-xl"
                />
              )}
              <figcaption className="text-center text-sm text-white/80">
                {current.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
