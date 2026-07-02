import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DestinationCard } from "@/components/destinations/destination-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { destinations } from "@/lib/data/destinations";

export function FeaturedDestinations() {
  const featured = destinations.slice(0, 6);
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Featured
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Places that left a mark
            </h2>
          </Reveal>
          <Reveal index={1}>
            <Button variant="outline" asChild>
              <Link href="/explore">
                View all destinations
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d, i) => (
            <Reveal key={d.id} index={i % 3}>
              <DestinationCard destination={d} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
