import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="pt-40">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="mt-4 h-14 w-2/3" />
      <Skeleton className="mt-4 h-5 w-1/2" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/5] w-full rounded-3xl" />
        ))}
      </div>
    </Container>
  );
}
