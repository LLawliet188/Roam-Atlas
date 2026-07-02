import { Capabilities } from "@/components/landing/capabilities";
import { CtaSection } from "@/components/landing/cta";
import { FeaturedDestinations } from "@/components/landing/featured-destinations";
import { Hero } from "@/components/landing/hero";
import { DestinationMarquee } from "@/components/landing/marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationMarquee />
      <FeaturedDestinations />
      <Capabilities />
      <CtaSection />
    </>
  );
}
