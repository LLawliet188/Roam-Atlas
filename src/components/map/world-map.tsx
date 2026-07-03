"use client";

/**
 * M2 — Animated world map + scratch map.
 * SVG map (Natural Earth countries, natural-earth projection) with visited
 * countries tinted, animated great-circle routes between trips, and a
 * scratch-foil canvas overlay you rub away to reveal the map beneath.
 */

import { AnimatePresence, motion } from "framer-motion";
import { Eraser, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import type { Destination } from "@/lib/types";

const W = 960;
const H = 500;

/** ISO alpha-2 → ISO numeric (world-atlas feature ids) for atlas countries. */
const NUMERIC: Record<string, string> = {
  CZ: "203",
  QA: "634",
  JP: "392",
  GR: "300",
  AR: "032",
  MA: "504",
  CA: "124",
  JO: "400",
  IS: "352",
  NZ: "554",
};

export function WorldMap({ destinations }: { destinations: Destination[] }) {
  const [countries, setCountries] = useState<FeatureCollection<Geometry> | null>(null);
  const [scratching, setScratching] = useState(true);
  const [revealed, setRevealed] = useState(0); // 0..1 estimate
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const strokes = useRef(0);

  const projection = useMemo(
    () => geoNaturalEarth1().fitSize([W, H], { type: "Sphere" }),
    []
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  const visited = destinations.filter((d) => d.visited);
  const visitedNumeric = new Set(
    visited.map((d) => NUMERIC[d.countryCode]).filter(Boolean)
  );
  const wishlistNumeric = new Set(
    destinations.filter((d) => !d.visited).map((d) => NUMERIC[d.countryCode]).filter(Boolean)
  );
  const accentByNumeric = new Map(
    visited.map((d) => [NUMERIC[d.countryCode], d.accentColor] as const)
  );

  useEffect(() => {
    let alive = true;
    fetch(asset("/data/countries-110m.json"))
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (!alive) return;
        setCountries(
          feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>
        );
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  /* ----------------------------- scratch foil ----------------------------- */

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#233047");
    grad.addColorStop(0.5, "#31415e");
    grad.addColorStop(1, "#1d2739");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    // subtle diagonal sheen
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let x = -H; x < W; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + H, H);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "600 26px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal the countries you've conquered", W / 2, H / 2 - 8);
    ctx.font = "400 15px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillText("drag across the foil — or press “Reveal all”", W / 2, H / 2 + 22);
    strokes.current = 0;
    setRevealed(0);
  }, []);

  useEffect(() => {
    paintFoil();
  }, [paintFoil]);

  const scratchAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    const y = ((clientY - rect.top) / rect.height) * H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    strokes.current += 1;
    if (strokes.current % 12 === 0) {
      // cheap reveal estimate: sample alpha on a sparse grid
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clear = 0;
      let total = 0;
      for (let i = 3; i < img.data.length; i += 4 * 397) {
        total++;
        if (img.data[i] === 0) clear++;
      }
      setRevealed(clear / Math.max(total, 1));
    }
  }, []);

  const revealAll = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillRect(0, 0, W, H);
    setRevealed(1);
    setScratching(false);
  }, []);

  const foilGone = revealed > 0.985 || !scratching;

  /* ------------------------------ trip routes ----------------------------- */

  const routes = useMemo(() => {
    const sorted = [...visited].sort((a, b) =>
      (a.visitDate ?? "").localeCompare(b.visitDate ?? "")
    );
    const segs: { id: string; d: string }[] = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = projection([sorted[i].coordinates.lng, sorted[i].coordinates.lat]);
      const b = projection([sorted[i + 1].coordinates.lng, sorted[i + 1].coordinates.lat]);
      if (!a || !b) continue;
      const mx = (a[0] + b[0]) / 2;
      const my = (a[1] + b[1]) / 2 - Math.min(120, Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.35);
      segs.push({
        id: `${sorted[i].slug}-${sorted[i + 1].slug}`,
        d: `M ${a[0]},${a[1]} Q ${mx},${my} ${b[0]},${b[1]}`,
      });
    }
    return segs;
  }, [visited, projection]);

  const countryFeatures = (countries?.features ?? []) as Feature<Geometry>[];
  const visitedCount = new Set(visited.map((d) => d.countryCode)).size;

  return (
    <div>
      {/* stats + controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6 text-sm">
          <span>
            <strong className="text-2xl font-semibold text-gradient">{visitedCount}</strong>
            <span className="ml-1.5 text-muted-foreground">/ 195 countries</span>
          </span>
          <span>
            <strong className="text-2xl font-semibold text-gradient">
              {((visitedCount / 195) * 100).toFixed(1)}%
            </strong>
            <span className="ml-1.5 text-muted-foreground">of the world</span>
          </span>
          <span>
            <strong className="text-2xl font-semibold text-gradient">
              {new Set(visited.map((d) => d.continent)).size}
            </strong>
            <span className="ml-1.5 text-muted-foreground">/ 7 continents</span>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={revealAll}
            className={cn(
              "flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted",
              foilGone && "opacity-50"
            )}
          >
            <Eraser className="size-4" />
            Reveal all
          </button>
          <button
            type="button"
            onClick={() => {
              setScratching(true);
              paintFoil();
            }}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <RotateCcw className="size-4" />
            Reset foil
          </button>
        </div>
      </div>

      {/* map + scratch overlay */}
      <div
        ref={wrapRef}
        className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-[#0a121f]"
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="World map of visited countries">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#d99a2b" />
              <stop offset="1" stopColor="#e0607e" />
            </linearGradient>
          </defs>
          <path
            d={path({ type: "Sphere" } as GeoPermissibleObjects) ?? undefined}
            fill="#0d1930"
          />
          {countryFeatures.map((f, i) => {
            const id = String(f.id ?? i).padStart(3, "0");
            const isVisited = visitedNumeric.has(id);
            const isWishlist = wishlistNumeric.has(id);
            return (
              <path
                key={id + i}
                d={path(f) ?? undefined}
                fill={
                  isVisited
                    ? accentByNumeric.get(id) ?? "#d99a2b"
                    : isWishlist
                      ? "rgba(139,92,246,0.35)"
                      : "#22304a"
                }
                fillOpacity={isVisited ? 0.85 : 1}
                stroke="#0a121f"
                strokeWidth={0.6}
              >
                <title>{isVisited ? "Visited" : isWishlist ? "Wishlist" : undefined}</title>
              </path>
            );
          })}
          {/* animated travel routes */}
          {foilGone &&
            routes.map((r, i) => (
              <motion.path
                key={r.id}
                d={r.d}
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeDasharray="6 7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeInOut" }}
              />
            ))}
          {/* destination markers */}
          {destinations.map((d) => {
            const p = projection([d.coordinates.lng, d.coordinates.lat]);
            if (!p) return null;
            return (
              <g key={d.id} transform={`translate(${p[0]},${p[1]})`}>
                <circle r={9} fill={d.accentColor} opacity={0.18}>
                  <animate attributeName="r" values="6;12;6" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle r={3.4} fill={d.visited ? d.accentColor : "#8b5cf6"} stroke="#0a121f" strokeWidth={1} />
                <title>{`${d.name}, ${d.country}`}</title>
              </g>
            );
          })}
        </svg>

        {/* scratch foil */}
        <AnimatePresence>
          {!foilGone && (
            <motion.canvas
              key="foil"
              ref={canvasRef}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
              className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                scratchAt(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (e.buttons > 0) scratchAt(e.clientX, e.clientY);
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* visited legend */}
      <div className="mt-6 flex flex-wrap gap-2">
        {visited
          .sort((a, b) => (a.visitDate ?? "").localeCompare(b.visitDate ?? ""))
          .map((d) => (
            <Link
              key={d.id}
              href={`/destinations/${d.slug}`}
              className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:bg-muted"
            >
              <span className="size-2.5 rounded-full" style={{ background: d.accentColor }} />
              {d.name}
              <span className="text-xs text-muted-foreground">{d.country}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
