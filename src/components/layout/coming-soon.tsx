import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

/**
 * Placeholder for features scheduled in upcoming milestones. Keeps the whole
 * app navigable (no 404s) while communicating what's coming.
 */
export function ComingSoon({
  title,
  eyebrow = "On the roadmap",
  description,
  milestone,
}: {
  title: string;
  eyebrow?: string;
  description: string;
  milestone?: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <Container className="pb-24">
        <div className="glass flex flex-col items-center gap-4 rounded-3xl p-12 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-7" />
          </span>
          <p className="max-w-md text-muted-foreground">
            This experience is being crafted{milestone ? ` in ${milestone}` : ""}. The
            foundation, design system and data layer are already in place.
          </p>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back home
            </Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
