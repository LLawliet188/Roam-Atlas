"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Compass, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { mainNav, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <Container
        className={cn(
          "mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:mt-4",
          scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,var(--ocean),var(--aurora))] text-white shadow-lg shadow-primary/30 transition-transform group-hover:rotate-12">
            <Compass className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-muted"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden sm:grid">
            <Link href="/search" aria-label="Search">
              <Search className="size-5" />
            </Link>
          </Button>
          <ThemeToggle />
          <Button variant="gradient" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/globe">Start exploring</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-border bg-background/40 backdrop-blur lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden"
          >
            <Container className="mt-2">
              <div className="glass flex flex-col gap-1 rounded-3xl p-3">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button variant="gradient" className="mt-1 w-full" asChild>
                  <Link href="/globe" onClick={() => setOpen(false)}>
                    Start exploring
                  </Link>
                </Button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
