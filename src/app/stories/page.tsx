import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Stories" };

export default function StoriesPage() {
  return (
    <ComingSoon
      title="Stories"
      description="Tap-through, full-bleed visual stories from the road — the ephemeral, cinematic way to relive a moment."
      milestone="Milestone 4"
    />
  );
}
