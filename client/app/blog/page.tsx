import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getBlogPosts } from "@/lib/api"
import { ImageLoader } from "@/components/image-loader"
import { BlogSkeleton } from "@/components/skeletons/blog-skeleton"

async function BlogPostsList() {
  const blogPosts = await getBlogPosts()
  
  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
          <h3 className="text-2xl font-medium mb-3">Блог в разработке</h3>
          <p className="text-muted-foreground">
            Готовим интересные статьи о косметологии и уходе за кожей
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {blogPosts.map((post, index) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug}`}
          className="group block rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image with loader */}
            <div className="md:w-2/5 aspect-[3/2] md:aspect-auto overflow-hidden">
              <ImageLoader
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                aspectRatio="aspect-[3/2] md:aspect-auto"
                priority={index < 2}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs text-muted-foreground mb-3">{post.date}</span>
              <h2 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-foreground/80 transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-6">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Читать статью
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-16">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6">Статьи о красоте</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Полезные материалы о косметологии, уходе и здоровье кожи
              </p>
            </div>

            {/* Blog posts with Suspense */}
            <Suspense fallback={<BlogSkeleton />}>
              <BlogPostsList />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
