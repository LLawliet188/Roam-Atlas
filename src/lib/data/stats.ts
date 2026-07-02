import type { TravelStat } from "@/lib/types";
import { destinations, visitedDestinations } from "@/lib/data/destinations";

const totalPhotos = destinations.reduce((s, d) => s + (d.stats?.photos ?? 0), 0);
const totalDistance = destinations.reduce((s, d) => s + (d.stats?.distanceKm ?? 0), 0);
const countries = new Set(visitedDestinations.map((d) => d.countryCode)).size;
const continents = new Set(visitedDestinations.map((d) => d.continent)).size;

export const travelStats: TravelStat[] = [
  { label: "Countries", value: countries, icon: "Flag", accent: "var(--ocean)" },
  { label: "Continents", value: continents, suffix: "/7", icon: "Globe", accent: "var(--aurora)" },
  { label: "Kilometres", value: totalDistance, icon: "Plane", accent: "var(--coral)" },
  { label: "Photos", value: totalPhotos, icon: "Camera", accent: "var(--jungle)" },
];
