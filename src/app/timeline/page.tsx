import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Travel timeline" };

export default function TimelinePage() {
  return (
    <ComingSoon
      title="Follow the journey"
      description="A scroll-driven, chronological timeline of every trip — animated as you move, with maps, photos and milestones."
      milestone="Milestone 2"
    />
  );
}
