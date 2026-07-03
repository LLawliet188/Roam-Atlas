import type { TimelineEntry } from "@/lib/types";
import { img } from "@/lib/data/images";

/**
 * Chronological journey data for the M2 scroll-driven timeline.
 * Prague and Doha entries use real photos; earlier trips use seeded
 * placeholders until their archives are digitised.
 */
export const timelineEntries: TimelineEntry[] = [
  {
    id: "t1",
    destinationSlug: "petra",
    title: "First stamp: the rose-red city",
    date: "2022-03-15",
    location: "Petra, Jordan",
    coordinates: { lat: 30.3285, lng: 35.4444 },
    summary:
      "Walking the Siq at dawn and watching the Treasury ignite amber — the trip that started the atlas.",
    image: img("petra-cover"),
    kind: "trip",
  },
  {
    id: "t2",
    destinationSlug: "marrakech",
    title: "Lost in the souks",
    date: "2022-10-03",
    location: "Marrakech, Morocco",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    summary:
      "Four days of spice pyramids, hidden riads and the nightly theatre of Jemaa el-Fnaa.",
    image: img("marrakech-cover"),
    kind: "trip",
  },
  {
    id: "t3",
    destinationSlug: "santorini",
    title: "Sunsets over the caldera",
    date: "2023-06-21",
    location: "Santorini, Greece",
    coordinates: { lat: 36.3932, lng: 25.4615 },
    summary:
      "Blue domes, volcanic wine and the longest golden hour of the year, timed to the solstice.",
    image: img("santorini-cover"),
    kind: "trip",
  },
  {
    id: "t4",
    destinationSlug: "patagonia",
    title: "The end of the world",
    date: "2023-11-12",
    location: "Patagonia, Argentina",
    coordinates: { lat: -50.4967, lng: -73.1377 },
    summary:
      "Eleven days under Fitz Roy's granite teeth — wind, glaciers and the wildest skies of the atlas so far.",
    image: img("patagonia-cover"),
    kind: "trip",
  },
  {
    id: "t5",
    destinationSlug: "kyoto",
    title: "Sakura season",
    date: "2024-04-08",
    location: "Kyoto, Japan",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    summary:
      "A week of temples, tea houses and cherry blossom snowing over the Philosopher's Path.",
    image: img("kyoto-cover"),
    kind: "trip",
  },
  {
    id: "t6",
    destinationSlug: "banff",
    title: "Turquoise water, granite walls",
    date: "2024-07-19",
    location: "Banff, Canada",
    coordinates: { lat: 51.4968, lng: -115.9281 },
    summary:
      "Moraine Lake before sunrise and grizzly tracks on the trail by breakfast.",
    image: img("banff-cover"),
    kind: "trip",
  },
  {
    id: "t7",
    destinationSlug: "prague",
    title: "Three days in the city of spires",
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
