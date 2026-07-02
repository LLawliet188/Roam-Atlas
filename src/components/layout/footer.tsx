import { AtSign, Camera, Compass, Rss } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { mainNav, siteConfig } from "@/lib/config";

const social = [
  { icon: Camera, href: "#", label: "Photos" },
  { icon: AtSign, href: "#", label: "Contact" },
  { icon: Rss, href: "#", label: "Feed" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border">
      <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-30" />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,var(--ocean),var(--aurora))] text-white">
                <Compass className="size-5" />
              </span>
              <span className="text-lg font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{siteConfig.description}</p>
            <div className="mt-6 flex gap-2">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Stay in the loop</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Fresh dispatches from the road, no spam.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="h-11 w-full rounded-full border border-input bg-background/50 px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring/40"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Crafted for wanderers.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
