"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getContact, Contact } from "@/lib/api"

export function HeroSectionClient() {
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContact() {
      try {
        const data = await getContact()
        setContact(data)
      } catch (error) {
        console.error("Error loading contact:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchContact()
  }, [])

  // Default fallback values
  const phone = contact?.phone || '+7 (XXX) XXX-XX-XX'
  const address = contact?.address || 'г. Находка'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* X-ray decorative background */}
      <div className="absolute inset-0 xray-lines opacity-50" />

      {/* Floating organic shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-muted/30 to-transparent blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-muted/20 to-transparent blur-3xl" />

      {/* X-ray scan lines decorative element */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <ellipse cx="200" cy="150" rx="120" ry="140" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="200" cy="150" rx="100" ry="120" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="200" cy="150" rx="80" ry="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="200" cy="150" rx="60" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="0.3" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-8">
            <span className="w-2 h-2 rounded-full bg-foreground/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Находка</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-balance">
            Bellezza
            <span className="block text-3xl md:text-4xl lg:text-5xl font-normal mt-2 tracking-[0.15em]">Estetica</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 tracking-wide">Эстетическая косметология</p>

          {/* Description */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
              Цель эстетической косметологии — улучшить общее состояние кожи, вернуть ей упругость, выровнять рельеф и
              цвет лица без инвазивного хирургического вмешательства.
            </p>

            {/* Goals list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mt-8">
              {[
                "Улучшение состояния кожи, повышение тонуса",
                "Очищение от ороговевших клеток",
                "Профилактика возрастных изменений",
                "Коррекция контуров лица",
              ].map((goal, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-2xl bg-card/50 border border-border/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-2 shrink-0" />
                  <span className="text-sm text-muted-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacts"
              className="organic-btn inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:shadow-lg"
            >
              Записаться
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="pill-btn inline-flex items-center gap-3 px-8 py-4 border border-foreground/20 text-foreground text-sm tracking-wide hover:border-foreground/40"
            >
              Услуги
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            {loading ? (
              <>
                <div className="h-4 bg-muted/50 rounded w-40 animate-pulse" />
                <span className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="h-4 bg-muted/50 rounded w-24 animate-pulse" />
              </>
            ) : (
              <>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">
                  {phone}
                </a>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>{address}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
