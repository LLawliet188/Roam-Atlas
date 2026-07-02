import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Interactive globe" };

export default function GlobePage() {
  return (
    <ComingSoon
      title="Spin the interactive globe"
      description="A photoreal 3D Earth you can spin, zoom and drop into. Every visited place becomes a glowing pin that opens its story."
      milestone="Milestone 2"
    />
  );
}
