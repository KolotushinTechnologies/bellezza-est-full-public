import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPortfolio } from "@/lib/api"
import { ImageLoader } from "@/components/image-loader"
import { PortfolioSkeleton } from "@/components/skeletons/portfolio-skeleton"

async function PortfolioGrid() {
  const portfolioItems = await getPortfolio()
  
  if (portfolioItems.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-medium mb-3">Портфолио в разработке</h3>
          <p className="text-muted-foreground">
            Скоро здесь появятся примеры наших работ и результаты процедур
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {portfolioItems.map((item, index) => (
        <div
          key={item._id}
          className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-500"
        >
          <div className="relative">
            <img
              src={item.src || "/placeholder.svg"}
              alt={`Работа: ${item.category}`}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>

          {/* Overlay with category */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-sm">
                {item.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-16">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6">Мои работы</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Результаты процедур и примеры работ</p>
            </div>

            {/* Masonry grid with Suspense */}
            <Suspense fallback={<PortfolioSkeleton />}>
              <PortfolioGrid />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
