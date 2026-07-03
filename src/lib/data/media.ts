/**
 * Real media from the road.
 * - Prague (Czech Republic): 11 color-graded WebP photos, February 2026.
 * - Doha (Qatar, Hamad International): 7 photos + 7 muted, re-encoded videos.
 * Paths are relative to /public; `next/image` receives plain paths, while raw
 * <video>/poster URLs are wrapped with `asset()` at the point of use.
 */

export type MediaDestination = "prague" | "doha";

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  orientation: "landscape" | "portrait";
  destination: MediaDestination;
}

export interface GalleryVideo {
  id: string;
  src: string;
  poster: string;
  caption: string;
  destination: MediaDestination;
}

const PR = "/media/prague/photos";
const P = "/media/qatar/photos";
const V = "/media/qatar/videos";

export const praguePhotos: GalleryPhoto[] = [
  { id: "pr-old-town-night", src: `${PR}/old-town-night.webp`, caption: "Týn Church rising over Old Town Square at night", orientation: "portrait", destination: "prague" },
  { id: "pr-old-town-hall", src: `${PR}/old-town-hall.webp`, caption: "Old Town Hall under a theatre of clouds", orientation: "landscape", destination: "prague" },
  { id: "pr-astronomical-clock", src: `${PR}/astronomical-clock.webp`, caption: "The Orloj — Prague's six-century-old astronomical clock", orientation: "portrait", destination: "prague" },
  { id: "pr-charles-bridge-tower", src: `${PR}/charles-bridge-tower.webp`, caption: "Old Town Bridge Tower, gateway to Charles Bridge", orientation: "portrait", destination: "prague" },
  { id: "pr-jan-hus", src: `${PR}/jan-hus-memorial.webp`, caption: "Jan Hus Memorial on Old Town Square", orientation: "landscape", destination: "prague" },
  { id: "pr-st-vitus", src: `${PR}/st-vitus-cathedral.webp`, caption: "St. Vitus Cathedral, Prague Castle", orientation: "portrait", destination: "prague" },
  { id: "pr-st-nicholas", src: `${PR}/st-nicholas-interior.webp`, caption: "Baroque light inside St. Nicholas Church", orientation: "landscape", destination: "prague" },
  { id: "pr-winged-lion", src: `${PR}/winged-lion-memorial.webp`, caption: "The Winged Lion Memorial to Czechoslovak airmen", orientation: "landscape", destination: "prague" },
  { id: "pr-vintage-car", src: `${PR}/vintage-car-tram.webp`, caption: "Vintage sightseeing car meets modern tram", orientation: "landscape", destination: "prague" },
  { id: "pr-matryoshka", src: `${PR}/matryoshka-shop.webp`, caption: "A wall of matryoshka in an Old Town souvenir shop", orientation: "landscape", destination: "prague" },
  { id: "pr-praha-plaque", src: `${PR}/praha-plaque.webp`, caption: "Praha · Prague · Praga · Prag — city of a hundred spires", orientation: "portrait", destination: "prague" },
];

export const dohaPhotos: GalleryPhoto[] = [
  { id: "p-lamp-bear", src: `${P}/lamp-bear.webp`, caption: "The Lamp Bear beneath the CDE concourse", orientation: "landscape", destination: "doha" },
  { id: "p-golden-hour", src: `${P}/golden-hour.webp`, caption: "Golden hour across the terminal", orientation: "landscape", destination: "doha" },
  { id: "p-orchard-elephant", src: `${P}/orchard-elephant.webp`, caption: "Bronze elephant in The Orchard garden", orientation: "portrait", destination: "doha" },
  { id: "p-animal-banquet", src: `${P}/animal-banquet.webp`, caption: "The animal banquet, under The Orchard's glass dome", orientation: "landscape", destination: "doha" },
  { id: "p-golden-orb", src: `${P}/golden-orb.webp`, caption: "A gilded orb suspended above the atrium", orientation: "landscape", destination: "doha" },
  { id: "p-explore-qatar", src: `${P}/explore-qatar.webp`, caption: "Explore Qatar", orientation: "landscape", destination: "doha" },
  { id: "p-a350-dusk", src: `${P}/a350-dusk.webp`, caption: "Qatar Airways A350 at the gate, dusk", orientation: "landscape", destination: "doha" },
];

/** All photos, newest chapter first. */
export const galleryPhotos: GalleryPhoto[] = [...praguePhotos, ...dohaPhotos];

export const galleryVideos: GalleryVideo[] = [
  { id: "v1", src: `${V}/clip-4.mp4`, poster: `${V}/clip-4.jpg`, caption: "A slow wander through Hamad International", destination: "doha" },
  { id: "v2", src: `${V}/clip-7.mp4`, poster: `${V}/clip-7.jpg`, caption: "Through the heart of the terminal", destination: "doha" },
  { id: "v3", src: `${V}/clip-5.mp4`, poster: `${V}/clip-5.jpg`, caption: "Doha, in transit", destination: "doha" },
  { id: "v4", src: `${V}/clip-3.mp4`, poster: `${V}/clip-3.jpg`, caption: "Under the CDE canopy", destination: "doha" },
  { id: "v5", src: `${V}/clip-6.mp4`, poster: `${V}/clip-6.jpg`, caption: "Terminal light", destination: "doha" },
  { id: "v6", src: `${V}/clip-1.mp4`, poster: `${V}/clip-1.jpg`, caption: "A moment at the gate", destination: "doha" },
  { id: "v7", src: `${V}/clip-2.mp4`, poster: `${V}/clip-2.jpg`, caption: "Passing through", destination: "doha" },
];

/** Featured subset for the landing reel. */
export const reelVideos = [galleryVideos[0], galleryVideos[1], galleryVideos[2], galleryVideos[3]];

/** Real photo sets keyed by destination slug (M3 richer destination pages). */
export const photosByDestination: Record<string, GalleryPhoto[]> = {
  prague: praguePhotos,
  doha: dohaPhotos,
};

export const videosByDestination: Record<string, GalleryVideo[]> = {
  doha: galleryVideos,
};
