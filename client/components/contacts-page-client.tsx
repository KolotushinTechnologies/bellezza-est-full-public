"use client"

import { useEffect, useState } from "react"
import { Instagram, Phone, MapPin } from "lucide-react"
import { getContact, Contact } from "@/lib/api"
import { ContactCardSkeleton, ContactCTASkeleton } from "./skeletons/contact-skeleton"

export function ContactsPageClient() {
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
  const instagram = contact?.instagram || '@bellezza_estetica_nhk'
  const address = contact?.address || 'г. Находка, Приморский край'

  return (
    <section className="pt-32 pb-24 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6">Связаться со мной</h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Запишитесь на консультацию или задайте вопрос
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Phone */}
            {loading ? (
              <ContactCardSkeleton />
            ) : (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-muted/50 group-hover:bg-muted transition-colors mb-4">
                  <Phone className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-medium mb-2">Телефон</h3>
                <p className="text-muted-foreground text-sm">{phone}</p>
              </a>
            )}

            {/* Instagram */}
            {loading ? (
              <ContactCardSkeleton />
            ) : (
              <a
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-muted/50 group-hover:bg-muted transition-colors mb-4">
                  <Instagram className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-medium mb-2">Instagram</h3>
                <p className="text-muted-foreground text-sm">{instagram}</p>
              </a>
            )}

            {/* Location */}
            {loading ? (
              <ContactCardSkeleton />
            ) : (
              <div className="group p-8 rounded-3xl bg-card border border-border/50 text-center">
                <div className="inline-flex p-4 rounded-2xl bg-muted/50 mb-4">
                  <MapPin className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Адрес</h3>
                <p className="text-muted-foreground text-sm">{address}</p>
              </div>
            )}
          </div>

          {/* CTA */}
          {loading ? (
            <ContactCTASkeleton />
          ) : (
            <div className="text-center p-12 rounded-3xl bg-muted/30 border border-border/30">
              <p className="font-serif text-2xl md:text-3xl font-light mb-4">Bellezza Estetica</p>
              <p className="text-muted-foreground mb-6">Записывайтесь на консультацию — она бесплатна</p>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="organic-btn inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:shadow-lg"
              >
                Позвонить
                <Phone className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
