import type { Destination } from "@/lib/types";
import { img } from "@/lib/data/images";

/**
 * Seed data for the travel portfolio. Prague and Doha are backed by real,
 * color-graded media in /public; the rest use seeded placeholders. In
 * production this is backed by Supabase/Prisma; the shapes match
 * `Destination` exactly so the swap is clean.
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
  {
    id: "d1",
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    countryCode: "JP",
    region: "Kansai",
    continent: "Asia",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    tagline: "Lantern-lit alleys and a thousand shrines",
    description:
      "Ancient capital of Japan where moss gardens, bamboo groves and wooden machiya houses hold centuries of quiet ritual. Cherry blossoms in spring, fiery maples in autumn.",
    coverImage: img("kyoto-cover"),
    gallery: [img("kyoto-1"), img("kyoto-2"), img("kyoto-3"), img("kyoto-4")],
    tags: ["culture", "temples", "food", "spring"],
    rating: 5,
    visited: true,
    visitDate: "2024-04-08",
    accentColor: "#e0607e",
    stats: { photos: 428, days: 6, distanceKm: 9200 },
  },
  {
    id: "d2",
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    countryCode: "GR",
    region: "Cyclades",
    continent: "Europe",
    coordinates: { lat: 36.3932, lng: 25.4615 },
    tagline: "White-washed cliffs above a drowned volcano",
    description:
      "Cubist villages spill down caldera cliffs into the Aegean. Blue domes, sunset-gold light and wine grown in volcanic ash.",
    coverImage: img("santorini-cover"),
    gallery: [img("santorini-1"), img("santorini-2"), img("santorini-3"), img("santorini-4")],
    tags: ["islands", "sunset", "romance"],
    rating: 5,
    visited: true,
    visitDate: "2023-06-21",
    accentColor: "#3b82f6",
    stats: { photos: 512, days: 5, distanceKm: 2400 },
  },
  {
    id: "d3",
    slug: "patagonia",
    name: "Patagonia",
    country: "Argentina",
    countryCode: "AR",
    region: "Santa Cruz",
    continent: "South America",
    coordinates: { lat: -50.4967, lng: -73.1377 },
    tagline: "Granite spires at the end of the world",
    description:
      "Wind-scoured steppe rising into the jagged towers of the Fitz Roy and Torres del Paine massifs. Glaciers calve into milk-blue lakes.",
    coverImage: img("patagonia-cover"),
    gallery: [img("patagonia-1"), img("patagonia-2"), img("patagonia-3"), img("patagonia-4")],
    tags: ["mountains", "hiking", "glaciers", "wild"],
    rating: 5,
    visited: true,
    visitDate: "2023-11-12",
    accentColor: "#14b8a6",
    stats: { photos: 690, days: 11, distanceKm: 13800 },
  },
  {
    id: "d4",
    slug: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    countryCode: "MA",
    region: "Marrakech-Safi",
    continent: "Africa",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    tagline: "A labyrinth of spice, tile and rooftop calls to prayer",
    description:
      "The red city hums with souks, riads hidden behind unmarked doors, and the theatre of Jemaa el-Fnaa at dusk.",
    coverImage: img("marrakech-cover"),
    gallery: [img("marrakech-1"), img("marrakech-2"), img("marrakech-3"), img("marrakech-4")],
    tags: ["markets", "culture", "desert"],
    rating: 4,
    visited: true,
    visitDate: "2022-10-03",
    accentColor: "#f97316",
    stats: { photos: 356, days: 4, distanceKm: 3100 },
  },
  {
    id: "d5",
    slug: "banff",
    name: "Banff",
    country: "Canada",
    countryCode: "CA",
    region: "Alberta",
    continent: "North America",
    coordinates: { lat: 51.4968, lng: -115.9281 },
    tagline: "Turquoise lakes cradled by the Rockies",
    description:
      "Glacier-fed lakes so vividly blue they look retouched, framed by pine forest and snow-dusted peaks.",
    coverImage: img("banff-cover"),
    gallery: [img("banff-1"), img("banff-2"), img("banff-3"), img("banff-4")],
    tags: ["mountains", "lakes", "wildlife"],
    rating: 5,
    visited: true,
    visitDate: "2024-07-19",
    accentColor: "#0ea5e9",
    stats: { photos: 474, days: 7, distanceKm: 7600 },
  },
  {
    id: "d6",
    slug: "reykjavik",
    name: "Reykjavík",
    country: "Iceland",
    countryCode: "IS",
    continent: "Europe",
    coordinates: { lat: 64.1466, lng: -21.9426 },
    tagline: "Aurora, black sand and geothermal steam",
    description:
      "Basecamp for waterfalls, volcanic beaches and the northern lights dancing over a treeless, elemental landscape.",
    coverImage: img("reykjavik-cover"),
    gallery: [img("reykjavik-1"), img("reykjavik-2"), img("reykjavik-3"), img("reykjavik-4")],
    tags: ["aurora", "waterfalls", "winter"],
    rating: 5,
    visited: false,
    accentColor: "#8b5cf6",
    stats: { photos: 0, days: 0, distanceKm: 0 },
  },
  {
    id: "d7",
    slug: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    countryCode: "NZ",
    region: "Otago",
    continent: "Oceania",
    coordinates: { lat: -45.0312, lng: 168.6626 },
    tagline: "Adventure capital ringed by the Remarkables",
    description:
      "A lakeside town where every horizon is a mountain and every afternoon has an adrenaline option.",
    coverImage: img("queenstown-cover"),
    gallery: [img("queenstown-1"), img("queenstown-2"), img("queenstown-3"), img("queenstown-4")],
    tags: ["adventure", "lakes", "mountains"],
    rating: 4,
    visited: false,
    accentColor: "#22c55e",
    stats: { photos: 0, days: 0, distanceKm: 0 },
  },
  {
    id: "d8",
    slug: "petra",
    name: "Petra",
    country: "Jordan",
    countryCode: "JO",
    region: "Ma'an",
    continent: "Asia",
    coordinates: { lat: 30.3285, lng: 35.4444 },
    tagline: "A rose-red city half as old as time",
    description:
      "Facades carved straight into sandstone canyons by the Nabataeans, glowing amber at first light.",
    coverImage: img("petra-cover"),
    gallery: [img("petra-1"), img("petra-2"), img("petra-3"), img("petra-4")],
    tags: ["history", "desert", "unesco"],
    rating: 5,
    visited: true,
    visitDate: "2022-03-15",
    accentColor: "#e11d48",
    stats: { photos: 298, days: 3, distanceKm: 4200 },
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
