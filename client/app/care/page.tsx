import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { getCareArticles } from "@/lib/api"
import { ImageLoader } from "@/components/image-loader"
import { CareSkeleton } from "@/components/skeletons/care-skeleton"
import Link from "next/link"

async function CareArticlesList() {
  const careArticles = await getCareArticles()
  
  if (careArticles.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h3 className="text-2xl font-medium mb-3">Статьи готовятся</h3>
          <p className="text-muted-foreground">
            Мы готовим полезные материалы по уходу за кожей. Скоро они появятся здесь!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {careArticles.map((article, index) => (
        <Link
          key={article._id}
          href={`/care/${article.slug || article._id}`}
          className="group rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl block"
        >
          {/* Image with loader */}
          <ImageLoader
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            aspectRatio="aspect-[5/3]"
            priority={index < 2}
            className="transition-transform duration-700 group-hover:scale-105"
          />

          {/* Content */}
          <div className="p-8">
            <h2 className="text-xl font-medium mb-3 group-hover:text-foreground/80 transition-colors">
              {article.title}
            </h2>
            <p className="text-muted-foreground mb-4">{article.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Читать
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function CarePage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-16">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
                Рекомендации по уходу
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Домашний уход за лицом и телом для продления эффекта процедур
              </p>
            </div>

            {/* Articles grid with Suspense */}
            <Suspense fallback={<CareSkeleton />}>
              <CareArticlesList />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
