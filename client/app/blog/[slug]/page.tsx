import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This would normally come from a CMS or database
const blogContent = {
  "pro-age-philosophy": {
    title: "Философия Pro Age: красота в любом возрасте",
    date: "15 ноября 2025",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
      <p>Современная эстетическая косметология переживает важный сдвиг парадигмы. Мы отходим от агрессивной «борьбы» с возрастом к более гармоничному подходу — Pro Age.</p>
      
      <h2>Что такое Pro Age?</h2>
      <p>Pro Age — это философия, которая принимает естественный процесс старения и фокусируется на поддержании здоровья и качества кожи, а не на попытках «обмануть время». Это не отказ от процедур, а их осознанное применение.</p>
      
      <h2>Принципы подхода</h2>
      <ul>
        <li>Поддержание здоровья кожи изнутри и снаружи</li>
        <li>Естественный результат без «эффекта маски»</li>
        <li>Профилактика вместо агрессивной коррекции</li>
        <li>Индивидуальный подход к каждому возрасту</li>
      </ul>
      
      <p>В нашем кабинете мы придерживаемся именно этой философии, подбирая процедуры, которые подчеркнут вашу естественную красоту в любом возрасте.</p>
    `,
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogContent[slug as keyof typeof blogContent] || {
    title: "Статья",
    date: "",
    image: "/placeholder.svg?height=600&width=1200",
    content: "<p>Содержание статьи будет добавлено позже.</p>",
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
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-balance">{post.title}</h1>

              {/* Featured image */}
              <div className="rounded-3xl overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
              </div>
            </header>

            {/* Article content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
