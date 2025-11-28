import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import "../blog-article.css"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к блогу
            </Link>

            {/* Article header */}
            <header className="mb-12">
              {post.date && <span className="text-sm text-muted-foreground mb-4 block">{post.date}</span>}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-balance">{post.title}</h1>
              
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>
              )}

              {/* Featured image */}
              <div className="rounded-3xl overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </header>

            {/* Article content */}
            <div
              className="article-content font-serif"
              dangerouslySetInnerHTML={{ __html: post.content || '<p>Содержание статьи будет добавлено позже.</p>' }}
            />

            {/* Back to blog */}
            <div className="mt-16 pt-8 border-t border-border/50">
              <Link
                href="/blog"
                className="pill-btn inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-sm hover:border-foreground/40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Все статьи
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
