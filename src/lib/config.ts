/** Global site configuration and navigation. */
export const siteConfig = {
  name: "Wanderlust",
  tagline: "A living atlas of every journey.",
  description:
    "An immersive travel portfolio — interactive 3D globe, cinematic destination stories, timelines, galleries and more.",
  url: "https://wanderlust.example.com",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Explore", href: "/explore" },
  { label: "Globe", href: "/globe" },
  { label: "Timeline", href: "/timeline" },
  { label: "Stories", href: "/stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/blog" },
];
