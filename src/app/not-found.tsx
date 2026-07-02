import { Compass, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center text-center">
      <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-20" />
      <span className="animate-float grid size-16 place-items-center rounded-full bg-[linear-gradient(135deg,var(--ocean),var(--aurora))] text-white shadow-lg shadow-primary/30">
        <Compass className="size-8" />
      </span>
      <p className="mt-8 text-7xl font-semibold tracking-tight">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Off the map</h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        This route doesn&apos;t exist yet — but plenty of the world does. Let&apos;s get you back.
      </p>
      <Button variant="gradient" className="mt-6" asChild>
        <Link href="/">
          <Home className="size-4" />
          Back home
        </Link>
      </Button>
    </Container>
  );
}
