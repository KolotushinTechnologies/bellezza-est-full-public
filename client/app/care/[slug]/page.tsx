import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Sparkles, Clock, Heart } from "lucide-react"
import { getCareArticleBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import "./care-article.css"

export default async function CareArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Try to get by slug first, if fails try by ID (for old articles)
  let article = await getCareArticleBySlug(slug)
  
  // If not found by slug, try to get by ID (fallback for old articles without slug)
  if (!article) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/care/${slug}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      article = data.success ? data.data : null;
    } catch (error) {
      console.error('Error fetching care article by ID:', error);
    }
  }

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/care"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Все статьи по уходу
            </Link>

            {/* Article header with decorative elements */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Советы по уходу
                </div>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance leading-tight">
                {article.title}
              </h1>
              
              {/* Excerpt with icon */}
              {article.excerpt && (
                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
                  <Heart className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 leading-relaxed">{article.excerpt}</p>
                </div>
              )}

              {/* Featured image with overlay */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </header>

            {/* Two column layout */}
            <div className="grid lg:grid-cols-[1fr_300px] gap-12">
              {/* Main content */}
              <div className="care-article-content font-serif">
                <div
                  dangerouslySetInnerHTML={{ __html: article.content || '<p>Содержание статьи будет добавлено позже.</p>' }}
                />
              </div>

              {/* Sidebar with tips */}
              <aside className="lg:sticky lg:top-32 h-fit space-y-6">
                {/* Quick tips card */}
                {article.sidebarTips && article.sidebarTips.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold text-gray-900">Важно помнить</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {article.sidebarTips.map((tip, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-gray-600">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Time estimate card */}
                {article.sidebarTimeText && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-gray-700" />
                      <h3 className="font-semibold text-gray-900">Время на уход</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {article.sidebarTimeText}
                    </p>
                  </div>
                )}
              </aside>
            </div>

            {/* Back to care */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link
                href="/care"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Все статьи по уходу
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
