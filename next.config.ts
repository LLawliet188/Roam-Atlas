import type { NextConfig } from "next";

/**
 * `PAGES=true` is set only in the GitHub Pages CI build. It switches on the
 * static export + project-site base path. Local `next dev` stays at the root.
 */
const isPages = process.env.PAGES === "true";
const repo = "Roam-Atlas";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        trailingSlash: true,
      }
    : {}),
  images: {
    // GitHub Pages has no image optimizer, so serve images as-is there.
    unoptimized: isPages,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    qualities: [50, 75, 90, 100],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Exposed to the client so raw asset URLs (e.g. <video src>) can be prefixed
  // with the Pages base path. next/image adds basePath to local images itself.
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "",
  },
};

export default nextConfig;
