export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back link skeleton */}
            <div className="h-5 w-40 bg-muted animate-pulse rounded mb-8" />

            {/* Article header skeleton */}
            <header className="mb-12">
              {/* Badge skeleton */}
              <div className="h-8 w-36 bg-gray-100 animate-pulse rounded-full mb-6" />
              
              {/* Title skeleton */}
              <div className="space-y-4 mb-6">
                <div className="h-14 bg-muted animate-pulse rounded w-full" />
                <div className="h-14 bg-muted animate-pulse rounded w-3/4" />
              </div>
              
              {/* Excerpt card skeleton */}
              <div className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-200 mb-8">
                <div className="w-6 h-6 bg-gray-200 animate-pulse rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted animate-pulse rounded w-full" />
                  <div className="h-5 bg-muted animate-pulse rounded w-5/6" />
                </div>
              </div>

              {/* Image skeleton */}
              <div className="rounded-3xl overflow-hidden bg-muted animate-pulse aspect-video shadow-xl" />
            </header>

            {/* Two column layout */}
            <div className="grid lg:grid-cols-[1fr_300px] gap-12">
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
              </div>

              {/* Sidebar skeleton */}
              <aside className="space-y-6">
                {/* Tips card skeleton */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                  </div>
                </div>

                {/* Time card skeleton */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="h-5 w-28 bg-muted animate-pulse rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-4/5" />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
