import { Camera, Globe2, Map, Route, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Globe2,
    title: "Interactive 3D globe",
    desc: "Spin a photoreal Earth and drop into any place you've been. Every pin is a story.",
    href: "/globe",
    span: "sm:col-span-2 sm:row-span-2",
    tint: "from-ocean/25 to-aurora/10",
  },
  {
    icon: Route,
    title: "Travel timeline",
    desc: "Scroll your journey chronologically, trip by trip.",
    href: "/timeline",
    span: "",
    tint: "from-coral/25 to-transparent",
  },
  {
    icon: Camera,
    title: "Pinterest gallery",
    desc: "A masonry wall of every frame worth keeping.",
    href: "/gallery",
    span: "",
    tint: "from-jungle/25 to-transparent",
  },
  {
    icon: Map,
    title: "Scratch map",
    desc: "Reveal the countries you've conquered.",
    href: "/map",
    span: "",
    tint: "from-gold/25 to-transparent",
  },
  {
    icon: Search,
    title: "AI semantic search",
    desc: "Ask for “misty mountains at dawn” and find it.",
    href: "/search",
    span: "",
    tint: "from-aurora/25 to-transparent",
  },
  {
    icon: Sparkles,
    title: "AI travel assistant",
    desc: "Plan the next adventure with a companion that knows your taste.",
    href: "/assistant",
    span: "sm:col-span-2",
    tint: "from-primary/25 to-transparent",
  },
];

export function Capabilities() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            One platform
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Every way to relive the road
          </h2>
          <p className="mt-4 text-muted-foreground">
            From a spinning globe to AI-powered search, Wanderlust turns raw photos
            and pins into an experience worth revisiting.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} index={i} className={cn(f.span)}>
              <Link
                href={f.href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    f.tint
                  )}
                />
                <span className="relative grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <f.icon className="size-6" />
                </span>
                <div className="relative mt-6">
                  <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
