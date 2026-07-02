import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <ComingSoon
      title="AI semantic search"
      description="Describe a feeling — “misty mountains at dawn” — and find the exact photo or place. Natural-language search over your whole atlas."
      milestone="Milestone 5"
    />
  );
}
