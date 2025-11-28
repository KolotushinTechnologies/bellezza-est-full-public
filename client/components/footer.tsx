import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="font-serif text-2xl font-medium tracking-wide">Bellezza</span>
                <span className="block text-xs tracking-[0.3em] uppercase text-muted-foreground -mt-1">Estetica</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Кабинет эстетической косметологии в Находке. Научный подход к красоте и здоровью кожи.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wide">Навигация</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { href: "/services", label: "Услуги" },
                  { href: "/portfolio", label: "Портфолио" },
                  { href: "/care", label: "Рекомендации по уходу" },
                  { href: "/blog", label: "Блог" },
                  { href: "/contacts", label: "Контакты" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wide">Контакты</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>г. Находка</p>
                <a href="tel:+7XXXXXXXXXX" className="block hover:text-foreground transition-colors">
                  +7 (XXX) XXX-XX-XX
                </a>
                <a
                  href="https://instagram.com/bellezza_estetica_nhk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @bellezza_estetica_nhk
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© Bellezza Estetica, Находка, 2025</p>
            <p className="flex items-center gap-2">
              Разработка сайта:
              <a 
                href="https://koltech.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                KolTech
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
