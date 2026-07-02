import { Capabilities } from "@/components/landing/capabilities";
import { CtaSection } from "@/components/landing/cta";
import { FeaturedDestinations } from "@/components/landing/featured-destinations";
import { Hero } from "@/components/landing/hero";
import { DestinationMarquee } from "@/components/landing/marquee";
import { MediaReel } from "@/components/landing/media-reel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationMarquee />
      <FeaturedDestinations />
      <MediaReel />
      <Capabilities />
      <CtaSection />
    </>
  );
}
