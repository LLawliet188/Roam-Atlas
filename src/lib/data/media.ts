/**
 * Real media captured at Hamad International Airport, Doha (Qatar).
 * Photos are color-graded WebP; videos are muted, color-graded MP4 with posters.
 * Paths are relative to /public; `next/image` receives plain paths, while raw
 * <video>/poster URLs are wrapped with `asset()` at the point of use.
 */

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  orientation: "landscape" | "portrait";
}

export interface GalleryVideo {
  id: string;
  src: string;
  poster: string;
  caption: string;
}

const P = "/media/qatar/photos";
const V = "/media/qatar/videos";

export const galleryPhotos: GalleryPhoto[] = [
  { id: "p-lamp-bear", src: `${P}/lamp-bear.webp`, caption: "The Lamp Bear beneath the CDE concourse", orientation: "landscape" },
  { id: "p-golden-hour", src: `${P}/golden-hour.webp`, caption: "Golden hour across the terminal", orientation: "landscape" },
  { id: "p-orchard-elephant", src: `${P}/orchard-elephant.webp`, caption: "Bronze elephant in The Orchard garden", orientation: "portrait" },
  { id: "p-animal-banquet", src: `${P}/animal-banquet.webp`, caption: "The animal banquet, under The Orchard's glass dome", orientation: "landscape" },
  { id: "p-golden-orb", src: `${P}/golden-orb.webp`, caption: "A gilded orb suspended above the atrium", orientation: "landscape" },
  { id: "p-explore-qatar", src: `${P}/explore-qatar.webp`, caption: "Explore Qatar", orientation: "landscape" },
  { id: "p-a350-dusk", src: `${P}/a350-dusk.webp`, caption: "Qatar Airways A350 at the gate, dusk", orientation: "landscape" },
];

export const galleryVideos: GalleryVideo[] = [
  { id: "v1", src: `${V}/clip-4.mp4`, poster: `${V}/clip-4.jpg`, caption: "A slow wander through Hamad International" },
  { id: "v2", src: `${V}/clip-7.mp4`, poster: `${V}/clip-7.jpg`, caption: "Through the heart of the terminal" },
  { id: "v3", src: `${V}/clip-5.mp4`, poster: `${V}/clip-5.jpg`, caption: "Doha, in transit" },
  { id: "v4", src: `${V}/clip-3.mp4`, poster: `${V}/clip-3.jpg`, caption: "Under the CDE canopy" },
  { id: "v5", src: `${V}/clip-6.mp4`, poster: `${V}/clip-6.jpg`, caption: "Terminal light" },
  { id: "v6", src: `${V}/clip-1.mp4`, poster: `${V}/clip-1.jpg`, caption: "A moment at the gate" },
  { id: "v7", src: `${V}/clip-2.mp4`, poster: `${V}/clip-2.jpg`, caption: "Passing through" },
];

/** Featured subset for the landing reel. */
export const reelVideos = [galleryVideos[0], galleryVideos[1], galleryVideos[2], galleryVideos[3]];
