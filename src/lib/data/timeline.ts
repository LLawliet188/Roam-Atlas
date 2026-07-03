import type { TimelineEntry } from "@/lib/types";

/**
 * Chronological journey data for the M2 scroll-driven timeline.
 * Every entry is a real trip backed by original photos.
 */
export const timelineEntries: TimelineEntry[] = [
  {
    id: "t7",
    destinationSlug: "prague",
    title: "First stamp: three days in the city of spires",
    date: "2026-02-25",
    location: "Prague, Czech Republic",
    coordinates: { lat: 50.0875, lng: 14.4213 },
    summary:
      "Charles Bridge in winter light, the Orloj's hourly show, baroque naves and floodlit Týn Church over the Old Town cobbles.",
    image: "/media/prague/photos/old-town-night.webp",
    kind: "trip",
  },
  {
    id: "t8",
    destinationSlug: "prague",
    title: "Under the astronomical clock",
    date: "2026-02-26",
    location: "Old Town Square, Prague",
    coordinates: { lat: 50.087, lng: 14.4208 },
    summary:
      "Six centuries of gears still performing on the hour — the oldest astronomical clock still operating anywhere.",
    image: "/media/prague/photos/astronomical-clock.webp",
    kind: "photo",
  },
  {
    id: "t9",
    destinationSlug: "doha",
    title: "The art-museum layover",
    date: "2026-07-02",
    location: "Hamad International, Doha",
    coordinates: { lat: 25.2609, lng: 51.6138 },
    summary:
      "A giant Lamp Bear, a bronze banquet under a glass dome, and an A350 waiting at dusk.",
    image: "/media/qatar/photos/lamp-bear.webp",
    kind: "trip",
  },
  {
    id: "t10",
    destinationSlug: "doha",
    title: "Roam Atlas ships milestones 2 & 3",
    date: "2026-07-03",
    location: "Somewhere over the Gulf",
    coordinates: { lat: 25.2609, lng: 51.6138 },
    summary:
      "Interactive globe, scratch map and this very timeline go live, alongside the Prague photo chapter.",
    image: "/media/prague/photos/old-town-hall.webp",
    kind: "milestone",
  },
];
