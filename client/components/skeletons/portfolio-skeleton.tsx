import { Skeleton } from "@/components/ui/skeleton"

export function PortfolioSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="group relative overflow-hidden rounded-xl bg-white shadow-sm">
          <Skeleton className="aspect-square w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform group-hover:translate-y-0">
            <Skeleton className="h-5 w-2/3 bg-white/20" />
          </div>
        </div>
      ))}
    </div>
  )
}
