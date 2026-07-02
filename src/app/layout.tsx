import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SoundProvider } from "@/components/providers/sound-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { siteConfig } from "@/lib/config";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["travel", "portfolio", "3d globe", "map", "photography", "adventure"],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SoundProvider>
            <SmoothScroll>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </SmoothScroll>
            <SoundToggle />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
