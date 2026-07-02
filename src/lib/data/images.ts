/**
 * Placeholder image helper.
 *
 * Uses Lorem Picsum (seeded → stable across renders) so the app is fully
 * populated with zero API keys. Swap this single function for a Cloudinary
 * URL builder later and every image updates.
 */
export function img(seed: string, w = 1200, h = 800) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

/** Low-res blur placeholder for next/image. */
export function blur(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/16/10`;
}
