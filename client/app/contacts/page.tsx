import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Instagram, Phone, MapPin } from "lucide-react"

export default function ContactsPage() {
  return (
    <main className="min-h-screen">
      <Header />

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
              <a
                href="tel:+7XXXXXXXXXX"
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-muted/50 group-hover:bg-muted transition-colors mb-4">
                  <Phone className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-medium mb-2">Телефон</h3>
                <p className="text-muted-foreground text-sm">+7 (XXX) XXX-XX-XX</p>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/bellezza_estetica_nhk"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-muted/50 group-hover:bg-muted transition-colors mb-4">
                  <Instagram className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-medium mb-2">Instagram</h3>
                <p className="text-muted-foreground text-sm">@bellezza_estetica_nhk</p>
              </a>

              {/* Location */}
              <div className="group p-8 rounded-3xl bg-card border border-border/50 text-center">
                <div className="inline-flex p-4 rounded-2xl bg-muted/50 mb-4">
                  <MapPin className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Адрес</h3>
                <p className="text-muted-foreground text-sm">г. Находка, Приморский край</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center p-12 rounded-3xl bg-muted/30 border border-border/30">
              <p className="font-serif text-2xl md:text-3xl font-light mb-4">Bellezza Estetica</p>
              <p className="text-muted-foreground mb-6">Записывайтесь на консультацию — она бесплатна</p>
              <a
                href="tel:+7XXXXXXXXXX"
                className="organic-btn inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:shadow-lg"
              >
                Позвонить
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
