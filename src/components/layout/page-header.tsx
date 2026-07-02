import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/** Standard page hero: clears the fixed navbar and frames a title + intro. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden pt-32 pb-12 sm:pt-40", className)}>
      <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-25" />
      <Container>
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">{description}</p>
        )}
        {children}
      </Container>
    </header>
  );
}
