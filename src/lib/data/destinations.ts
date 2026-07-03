import type { Destination } from "@/lib/types";

/**
 * Seed data for the travel portfolio. Every destination is a real trip
 * backed by original, color-graded media in /public. In production this is
 * backed by Supabase/Prisma; the shapes match `Destination` exactly so the
 * swap is clean.
 */
export const destinations: Destination[] = [
  {
    id: "d9",
    slug: "prague",
    name: "Prague",
    country: "Czech Republic",
    countryCode: "CZ",
    region: "Bohemia",
    continent: "Europe",
    coordinates: { lat: 50.0875, lng: 14.4213 },
    tagline: "A hundred spires and a clock that has kept time for six centuries",
    description:
      "Prague wears its thousand years openly — the Orloj still performs its hourly mechanical theatre, Charles Bridge funnels the world beneath Gothic towers, and St. Vitus Cathedral cuts the sky above the castle. At night the Old Town Square turns cinematic: Týn Church floodlit over cobbles, trams sliding past baroque façades, and the smell of trdelník in the cold.",
    coverImage: "/media/prague/photos/old-town-night.webp",
    gallery: [
      "/media/prague/photos/charles-bridge-tower.webp",
      "/media/prague/photos/astronomical-clock.webp",
      "/media/prague/photos/old-town-hall.webp",
      "/media/prague/photos/st-nicholas-interior.webp",
    ],
    tags: ["history", "architecture", "unesco", "nightlife"],
    rating: 5,
    visited: true,
    visitDate: "2026-02-25",
    accentColor: "#d99a2b",
    stats: { photos: 20, days: 3, distanceKm: 5300 },
    highlights: [
      "The Orloj's hourly show on Old Town Square",
      "Charles Bridge at first light, before the crowds",
      "St. Vitus Cathedral and the castle district",
      "Baroque interiors of St. Nicholas Church",
      "The Winged Lion Memorial and Kampa riverside",
    ],
  },
  {
    id: "d0",
    slug: "doha",
    name: "Doha",
    country: "Qatar",
    countryCode: "QA",
    region: "Hamad International",
    continent: "Asia",
    coordinates: { lat: 25.2609, lng: 51.6138 },
    tagline: "A layover that felt like an art museum",
    description:
      "Hamad International is less an airport than a gallery you happen to fly through — a giant Lamp Bear keeping watch over the CDE concourse, a bronze menagerie taking tea beneath a tropical glass dome, and gilded sculptures floating above the marble.",
    coverImage: "/media/qatar/photos/lamp-bear.webp",
    gallery: [
      "/media/qatar/photos/golden-hour.webp",
      "/media/qatar/photos/animal-banquet.webp",
      "/media/qatar/photos/golden-orb.webp",
      "/media/qatar/photos/orchard-elephant.webp",
    ],
    tags: ["airport", "art", "layover", "architecture"],
    rating: 5,
    visited: true,
    visitDate: "2026-07-02",
    accentColor: "#c9a227",
    stats: { photos: 7, days: 1, distanceKm: 5100 },
    highlights: [
      "The Lamp Bear under the CDE concourse",
      "The Orchard's tropical glass dome",
      "Gilded sculpture floating above the atrium",
    ],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

export const visitedDestinations = destinations.filter((d) => d.visited);
export const wishlistDestinations = destinations.filter((d) => !d.visited);

/* ------------------------------------------------------------------ */
/* M3 — country → city hierarchy                                       */
/* ------------------------------------------------------------------ */

export interface CountryGroup {
  country: string;
  countryCode: string;
  continent: Destination["continent"];
  cities: Destination[];
  visitedCount: number;
}

/** Destinations grouped by country (cities sorted alphabetically). */
export const countryGroups: CountryGroup[] = Object.values(
  destinations.reduce<Record<string, CountryGroup>>((acc, d) => {
    const g = (acc[d.countryCode] ??= {
      country: d.country,
      countryCode: d.countryCode,
      continent: d.continent,
      cities: [],
      visitedCount: 0,
    });
    g.cities.push(d);
    if (d.visited) g.visitedCount++;
    return acc;
  }, {})
).sort((a, b) => a.country.localeCompare(b.country));

/** Other cities in the same country (M3 sibling navigation). */
export function siblingCities(d: Destination) {
  return destinations.filter(
    (x) => x.countryCode === d.countryCode && x.id !== d.id
  );
}
