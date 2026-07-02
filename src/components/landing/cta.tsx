import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border p-10 text-center sm:p-16">
            <div className="bg-aurora absolute inset-0 -z-10 opacity-40" />
            <div className="animate-aurora bg-aurora absolute -inset-1/4 -z-10 opacity-40 blur-3xl" />
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[linear-gradient(135deg,var(--ocean),var(--aurora))] text-white shadow-lg shadow-primary/30">
              <Compass className="size-7" />
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Your next chapter is waiting
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Start mapping your adventures today. Spin the globe and let the world
              open up.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/globe">
                  Launch the globe
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/explore">Browse destinations</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
