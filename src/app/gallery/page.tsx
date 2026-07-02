import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <ComingSoon
      title="The gallery wall"
      description="A Pinterest-style masonry gallery with infinite scroll, lightbox, and buttery lazy-loaded imagery."
      milestone="Milestone 3"
    />
  );
}
