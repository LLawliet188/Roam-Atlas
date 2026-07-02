import type { Metadata } from "next";
import { MediaGallery } from "@/components/media/media-gallery";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { galleryPhotos, galleryVideos } from "@/lib/data/media";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and films from the road — starting at Hamad International, Doha.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media library"
        title="The gallery wall"
        description="Every frame worth keeping — color-graded stills and silent, looping films. Opening chapter: a layover at Hamad International, Doha."
      />
      <Container className="pb-24">
        <MediaGallery photos={galleryPhotos} videos={galleryVideos} />
      </Container>
    </>
  );
}
