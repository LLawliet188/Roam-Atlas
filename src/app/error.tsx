"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this would report to an error-tracking service.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center text-center">
      <span className="grid size-16 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-8" />
      </span>
      <h1 className="mt-8 text-2xl font-semibold">Something went sideways</h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        An unexpected error occurred while loading this view. You can try again.
      </p>
      <Button variant="primary" className="mt-6" onClick={reset}>
        <RotateCcw className="size-4" />
        Try again
      </Button>
    </Container>
  );
}
