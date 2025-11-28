import { Skeleton } from "@/components/ui/skeleton"

export function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-3xl overflow-hidden bg-card border border-border/50">
          <Skeleton className="aspect-[7/5] w-full" />
          <div className="p-8 space-y-4">
            <Skeleton className="h-7 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
