"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe2, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { ParticleField } from "@/components/landing/particle-field";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { travelStats } from "@/lib/data/stats";
import { formatCompact } from "@/lib/utils";

const rotatingWords = ["wander", "wonder", "discover", "belong"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Layered animated background */}
      <motion.div style={{ scale }} className="absolute inset-0 -z-20">
        <div className="bg-aurora absolute inset-0 opacity-90" />
        <div className="animate-aurora bg-aurora absolute -inset-[20%] opacity-60 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
      </motion.div>
      <ParticleField className="absolute inset-0 -z-10 h-full w-full opacity-70" />

      <Container className="relative flex min-h-[100svh] flex-col items-center justify-center pt-24 text-center">
        <motion.div style={{ y, opacity }} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          >
            <Sparkles className="size-4 text-accent" />
            <span className="text-foreground/80">An immersive atlas of every journey</span>
          </motion.div>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">The world is</span>
            <span className="relative inline-flex h-[1.15em] items-center justify-center overflow-hidden align-bottom">
              <span className="sr-only">yours to explore.</span>
              <RotatingWords />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 max-w-xl text-pretty text-lg text-muted-foreground"
          >
            Spin the globe, trace the timeline, wander the galleries. A cinematic
            travel portfolio that turns your journeys into a living story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button variant="gradient" size="lg" asChild>
              <Link href="/globe">
                <Globe2 className="size-5" />
                Explore the globe
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link href="/timeline">
                Follow the journey
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Stat teasers */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-14 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4"
          >
            {travelStats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-3xl font-semibold tracking-tight">
                  {formatCompact(s.value)}
                  {s.suffix ?? ""}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <MapPin className="size-4" />
          <div className="flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-1.5 w-1 rounded-full bg-current"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function RotatingWords() {
  return (
    <span className="relative block">
      {rotatingWords.map((word, i) => (
        <motion.span
          key={word}
          className="text-gradient absolute inset-0 flex items-center justify-center whitespace-nowrap font-semibold"
          initial={{ opacity: 0, y: "100%" }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: ["100%", "0%", "0%", "-100%"],
          }}
          transition={{
            duration: 3.2,
            times: [0, 0.15, 0.85, 1],
            repeat: Infinity,
            delay: i * 3.2,
            repeatDelay: rotatingWords.length * 3.2 - 3.2,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.span>
      ))}
      {/* Reserve width for the widest word */}
      <span className="invisible font-semibold">discover</span>
    </span>
  );
}
