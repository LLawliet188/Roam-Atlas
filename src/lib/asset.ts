/**
 * Prefix a public asset path with the deploy base path.
 *
 * On GitHub Pages the site is served under `/Roam-Atlas`, so raw URLs used
 * outside `next/image` (e.g. `<video src>`, `poster`, CSS backgrounds) must be
 * prefixed. `next/image` handles local `src` prefixing itself, so pass plain
 * paths to it and use `asset()` everywhere else.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
