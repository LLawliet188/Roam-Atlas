import type { Metadata } from "next";
import { ExploreGrid } from "@/components/destinations/explore-grid";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { destinations } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "Explore",
  description: "Browse every destination — visited and dreamed of.",
};

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Explore the atlas"
        description="Every place worth remembering, from lantern-lit Kyoto to the granite spires of Patagonia. Filter by status or vibe."
      />
      <Container className="pb-24">
        <ExploreGrid destinations={destinations} />
      </Container>
    </>
  );
}
