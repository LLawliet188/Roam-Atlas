import type { Metadata } from "next";
import { MediaGallery } from "@/components/media/media-gallery";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { galleryPhotos, galleryVideos } from "@/lib/data/media";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and films from the road — Prague's hundred spires and a Doha layover, color-graded and ready to browse.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media library"
        title="The gallery wall"
        description="Every frame worth keeping — color-graded stills and silent, looping films. Latest chapter: three winter days in Prague. Filter by destination or dive straight into the lightbox."
      />
      <Container className="pb-24">
        <MediaGallery photos={galleryPhotos} videos={galleryVideos} showFilters />
      </Container>
    </>
  );
}
