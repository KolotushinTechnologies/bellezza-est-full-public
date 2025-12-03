"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getServices, Service } from "@/lib/api"
import { ImageLoader } from "@/components/image-loader"
import { ServicesPreviewSkeleton } from "@/components/skeletons/services-preview-skeleton"

export function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getServices()
        // Get last 3 services
        const lastThree = data.slice(-3).reverse()
        setServices(lastThree)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* X-ray scan effect background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="currentColor" strokeWidth="0.1" />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4">Услуги</h2>
              <p className="text-muted-foreground max-w-md">Современные методики эстетической косметологии</p>
            </div>
            <Link
              href="/services"
              className="pill-btn inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-sm hover:border-foreground/40 transition-colors self-start md:self-auto"
            >
              Все услуги
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Services grid */}
          {isLoading ? (
            <ServicesPreviewSkeleton />
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Услуги скоро появятся</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Link
                  key={service._id}
                  href={`/services#${service._id}`}
                  className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5"
                >
                  {/* Image with loader */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <ImageLoader
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      aspectRatio="aspect-[4/3]"
                      priority={index === 0}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* X-ray overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 xray-lines" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2 group-hover:text-foreground/80 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute top-6 right-6 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
