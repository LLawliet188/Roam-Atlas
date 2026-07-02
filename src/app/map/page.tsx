import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Scratch map" };

export default function MapPage() {
  return (
    <ComingSoon
      title="Scratch map"
      description="An animated world map you scratch to reveal the countries you've conquered — a satisfying, shareable progress view."
      milestone="Milestone 2"
    />
  );
}
