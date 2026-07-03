import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { WorldMap } from "@/components/map/world-map";
import { destinations } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "Scratch map",
  description:
    "An animated world map you scratch to reveal visited countries and the routes between them.",
};

export default function MapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Milestone 2"
        title="Scratch map"
        description="Rub away the foil to reveal every country conquered so far — then watch the routes between trips draw themselves."
      />
      <Container className="pb-24">
        <WorldMap destinations={destinations} />
      </Container>
    </>
  );
}
