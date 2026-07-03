import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { TimelineView } from "@/components/timeline/timeline-view";
import { timelineEntries } from "@/lib/data/timeline";

export const metadata: Metadata = {
  title: "Travel timeline",
  description:
    "A scroll-driven, chronological timeline of every trip — from the first stamp to the latest chapter.",
};

export default function TimelinePage() {
  return (
    <>
      <PageHeader
        eyebrow="Milestone 2"
        title="Follow the journey"
        description="Every trip in order, drawn as you scroll — trips, photo moments and site milestones from the first stamp to the Prague chapter."
      />
      <Container className="max-w-5xl pb-24">
        <TimelineView entries={timelineEntries} />
      </Container>
    </>
  );
}
