export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Header skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link skeleton */}
            <div className="h-5 w-32 bg-muted animate-pulse rounded mb-8" />

            {/* Article header skeleton */}
            <header className="mb-12">
              {/* Date skeleton */}
              <div className="h-4 w-24 bg-muted animate-pulse rounded mb-4" />
              
              {/* Title skeleton */}
              <div className="space-y-3 mb-4">
                <div className="h-12 bg-muted animate-pulse rounded w-full" />
                <div className="h-12 bg-muted animate-pulse rounded w-3/4" />
              </div>
              
              {/* Excerpt skeleton */}
              <div className="space-y-2 mb-8">
                <div className="h-5 bg-muted animate-pulse rounded w-full" />
                <div className="h-5 bg-muted animate-pulse rounded w-5/6" />
              </div>

              {/* Image skeleton */}
              <div className="rounded-3xl overflow-hidden bg-muted animate-pulse aspect-video" />
            </header>

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-11/12" />
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-10/12" />
              
              <div className="h-8 bg-muted animate-pulse rounded w-2/3 mt-8" />
              
              <div className="h-4 bg-muted animate-pulse rounded w-full mt-4" />
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-9/12" />
              
              <div className="h-8 bg-muted animate-pulse rounded w-1/2 mt-8" />
              
              <div className="h-4 bg-muted animate-pulse rounded w-full mt-4" />
              <div className="h-4 bg-muted animate-pulse rounded w-11/12" />
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
