/**
 * Core domain types for the Wanderlust travel platform.
 * Kept framework-agnostic so they can back mock data today and a
 * Supabase/Prisma schema later without churn.
 */

export type ID = string;

export type Continent =
  | "Africa"
  | "Antarctica"
  | "Asia"
  | "Europe"
  | "North America"
  | "Oceania"
  | "South America";

export interface GeoPoint {
  lat: number;
  lng: number;
}

/** A place the traveller has visited or wants to visit. */
export interface Destination {
  id: ID;
  slug: string;
  name: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  region?: string; // state / province
  continent: Continent;
  coordinates: GeoPoint;
  /** Short evocative tagline shown on cards. */
  tagline: string;
  description: string;
  /** Primary hero image (remote URL or local path). */
  coverImage: string;
  gallery: string[];
  tags: string[];
  /** 0–5 personal rating. */
  rating: number;
  visited: boolean;
  visitDate?: string; // ISO
  /** Accent color used for theming this destination's UI. */
  accentColor: string;
  /** Trip highlights shown on the destination page (M3). */
  highlights?: string[];
  stats?: {
    photos: number;
    days: number;
    distanceKm: number;
  };
}

export interface TimelineEntry {
  id: ID;
  destinationSlug: string;
  title: string;
  date: string; // ISO
  location: string;
  coordinates: GeoPoint;
  summary: string;
  image: string;
  kind: "trip" | "milestone" | "photo";
}

export interface Story {
  id: ID;
  title: string;
  cover: string;
  location: string;
  publishedAt: string;
  durationSec: number;
}

export interface BucketItem {
  id: ID;
  title: string;
  location: string;
  image: string;
  continent: Continent;
  done: boolean;
  targetYear?: number;
}

export interface TravelStat {
  label: string;
  value: number;
  suffix?: string;
  icon: string; // lucide icon name
  accent: string;
}
