import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { LazyVideo } from "@/components/media/lazy-video";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { reelVideos } from "@/lib/data/media";

export function MediaReel() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-20" />
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
              <MapPin className="size-4" />
              From the road · Doha
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Motion, captured
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Silent, looping films from a layover at Hamad International — the
              Lamp Bear, The Orchard garden and the shimmering CDE canopy.
            </p>
          </Reveal>
          <Reveal index={1}>
            <Button variant="outline" asChild>
              <Link href="/gallery">
                Open the gallery
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {reelVideos.map((v, i) => (
            <Reveal key={v.id} index={i % 4}>
              <figure className="group relative overflow-hidden rounded-2xl border border-border">
                <LazyVideo
                  src={v.src}
                  poster={v.poster}
                  className="aspect-[3/4] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-white">
                  {v.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
