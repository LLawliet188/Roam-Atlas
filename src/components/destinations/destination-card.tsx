"use client";

import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@/lib/types";
import { blur } from "@/lib/data/images";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function DestinationCard({
  destination,
  className,
  priority = false,
}: {
  destination: Destination;
  className?: string;
  priority?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <Link href={`/destinations/${destination.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={asset(destination.coverImage)}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
            placeholder="blur"
            blurDataURL={blur(destination.slug)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute left-4 top-4 flex gap-2">
            {!destination.visited && (
              <Badge variant="glass" className="text-white">
                Wishlist
              </Badge>
            )}
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <Star className="size-3.5 fill-gold text-gold" />
            {destination.rating.toFixed(1)}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <div className="flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="size-3.5" />
              {destination.country}
            </div>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">{destination.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {destination.tagline}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {destination.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
