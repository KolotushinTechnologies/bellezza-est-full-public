import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getServices } from "@/lib/api"
import { ImageLoader } from "@/components/image-loader"
import { ServicesSkeleton } from "@/components/skeletons/services-skeleton"

async function ServicesList() {
  const services = await getServices()
  
  if (services.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-2xl font-medium mb-3">Услуги скоро появятся</h3>
          <p className="text-muted-foreground">
            Мы работаем над наполнением каталога услуг. Следите за обновлениями!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <article
          key={service._id}
          className="group rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl"
        >
          {/* Image with loader */}
          <div className="relative aspect-[7/5] overflow-hidden">
            <ImageLoader
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              aspectRatio="aspect-[7/5]"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4 group-hover:text-foreground/80 transition-colors">
              {service.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-16">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6">Услуги</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Современные методики эстетической косметологии для сохранения молодости и красоты вашей кожи
              </p>
            </div>

            {/* Services grid with Suspense */}
            <Suspense fallback={<ServicesSkeleton />}>
              <ServicesList />
            </Suspense>

            {/* Note about prices */}
            <div className="mt-16 p-8 rounded-3xl bg-muted/30 border border-border/30 text-center">
              <p className="text-muted-foreground">
                Стоимость процедур уточняйте по телефону или в Instagram. Консультация — бесплатно.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
