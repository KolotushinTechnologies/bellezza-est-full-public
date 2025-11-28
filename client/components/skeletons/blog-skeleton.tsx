import { Skeleton } from "@/components/ui/skeleton"

export function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-3xl overflow-hidden bg-card border border-border/50">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5">
              <Skeleton className="aspect-[3/2] md:h-full w-full" />
            </div>
            <div className="md:w-3/5 p-8 md:p-10 space-y-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-32 mt-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
