import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPortfolio } from "@/lib/api"
import { PortfolioSkeleton } from "@/components/skeletons/portfolio-skeleton"
import { PortfolioPageClient } from "@/components/portfolio-page-client"

async function PortfolioGrid() {
  const portfolioItems = await getPortfolio()
  return <PortfolioPageClient items={portfolioItems} />
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
