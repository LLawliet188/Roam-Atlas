import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Journal" };

export default function BlogPage() {
  return (
    <ComingSoon
      title="The journal"
      description="Long-form travel writing powered by MDX — with a vlog section, reading progress, comments and bookmarks."
      milestone="Milestone 4"
    />
  );
}
