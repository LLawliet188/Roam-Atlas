import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { GlobeExperience } from "@/components/globe/globe-experience";
import { destinations } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "Interactive globe",
  description:
    "Spin a stylised 3D Earth — every destination is a glowing pin that opens its story.",
};

export default function GlobePage() {
  return (
    <>
      <PageHeader
        eyebrow="Milestone 2"
        title="Spin the globe"
        description="A dotted-land Earth rendered in real time. Gold pins are places already visited; violet pins are still on the wishlist. Click any pin to open its story."
      />
      <Container className="pb-24">
        <GlobeExperience destinations={destinations} />
      </Container>
    </>
  );
}
