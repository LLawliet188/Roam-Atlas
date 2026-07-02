"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Muted, looping, inline video that only plays while on screen (saves CPU/
 * battery). All source videos have their audio track stripped, so these are
 * silent by construction.
 */
export function LazyVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("h-auto w-full object-cover", className)}
      poster={poster ? asset(poster) : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
    >
      <source src={asset(src)} type="video/mp4" />
    </video>
  );
}
