"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Instagram, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/care", label: "Уход" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 ease-out",
          isScrolled ? "top-3" : "top-6",
        )}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-foreground/10 backdrop-blur-sm rounded-[2rem] transition-all duration-500" 
          style={{
            borderRadius: isScrolled ? '1.5rem' : '2rem'
          }}
        />
        
        {/* Liquid Glass Container */}
        <div
          className={cn(
            "relative liquid-glass rounded-[2rem] px-6 py-4 md:px-8 md:py-5 transition-all duration-500",
            isScrolled && "rounded-[1.5rem] py-3 md:py-4",
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-medium tracking-wide text-foreground transition-all group-hover:tracking-wider">
                Bellezza
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground -mt-1">
                Estetica
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right side: Instagram + Mobile Menu */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/bellezza_estetica_nhk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-foreground/5 transition-colors"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="absolute inset-0 bg-foreground/10 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-24 left-4 right-4 liquid-glass rounded-3xl p-6 transition-all duration-500 transform",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-2 text-foreground hover:text-muted-foreground transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
