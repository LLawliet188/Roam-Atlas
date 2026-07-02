import { ArrowLeft, Calendar, Camera, MapPin, Route, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DestinationCard } from "@/components/destinations/destination-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { destinations, getDestination } from "@/lib/data/destinations";
import { blur } from "@/lib/data/images";
import { formatCompact, formatMonthYear } from "@/lib/utils";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return { title: "Not found" };
  return {
    title: `${d.name}, ${d.country}`,
    description: d.tagline,
    openGraph: { images: [d.coverImage] },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const related = destinations
    .filter((d) => d.continent === destination.continent && d.id !== destination.id)
    .slice(0, 3);

  const stat = destination.stats;

  return (
    <article>
      {/* Cinematic hero */}
      <section className="relative h-[70svh] min-h-[520px] w-full overflow-hidden">
        <Image
          src={destination.coverImage}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blur(destination.slug)}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <Container className="absolute inset-x-0 bottom-0 pb-12">
          <Button variant="glass" size="sm" asChild className="mb-6 text-white">
            <Link href="/explore">
              <ArrowLeft className="size-4" />
              All destinations
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-3 text-white/90">
            <Badge variant="glass" className="text-white">
              <MapPin className="size-3.5" />
              {destination.region ? `${destination.region}, ` : ""}
              {destination.country}
            </Badge>
            {destination.visited ? (
              <Badge variant="glass" className="text-white">
                <Star className="size-3.5 fill-gold text-gold" />
                {destination.rating.toFixed(1)}
              </Badge>
            ) : (
              <Badge variant="glass" className="text-white">
                Wishlist
              </Badge>
            )}
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
            {destination.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">{destination.tagline}</p>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight">About {destination.name}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {destination.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {destination.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </Reveal>

            {/* Gallery */}
            <Reveal className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Gallery</h2>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {destination.gallery.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-2xl ${
                      i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${destination.name} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={blur(`${destination.slug}-${i}`)}
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar: facts */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">Trip facts</h3>
              <dl className="mt-4 space-y-4">
                {destination.visitDate && (
                  <Fact icon={<Calendar className="size-4" />} label="Visited">
                    {formatMonthYear(destination.visitDate)}
                  </Fact>
                )}
                {stat && stat.days > 0 && (
                  <Fact icon={<Route className="size-4" />} label="Duration">
                    {stat.days} days
                  </Fact>
                )}
                {stat && stat.photos > 0 && (
                  <Fact icon={<Camera className="size-4" />} label="Photos">
                    {formatCompact(stat.photos)}
                  </Fact>
                )}
                <Fact icon={<MapPin className="size-4" />} label="Coordinates">
                  {destination.coordinates.lat.toFixed(2)}, {destination.coordinates.lng.toFixed(2)}
                </Fact>
              </dl>
              <Button variant="gradient" className="mt-6 w-full" asChild>
                <Link href="/globe">View on the globe</Link>
              </Button>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-semibold tracking-tight">
              More in {destination.continent}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}

function Fact({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="text-sm font-medium">{children}</dd>
    </div>
  );
}
