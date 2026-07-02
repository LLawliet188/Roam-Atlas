import { Plane } from "lucide-react";
import { destinations } from "@/lib/data/destinations";

/** Infinite CSS marquee of visited places — pure CSS, no JS cost. */
export function DestinationMarquee() {
  const items = [...destinations, ...destinations];
  return (
    <section className="border-y border-border bg-muted/30 py-6" aria-hidden>
      <div className="group relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
          {items.map((d, i) => (
            <div key={`${d.id}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
              <Plane className="size-4 text-primary" />
              <span className="text-lg font-medium text-foreground/70">{d.name}</span>
              <span className="text-sm text-muted-foreground">{d.country}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
