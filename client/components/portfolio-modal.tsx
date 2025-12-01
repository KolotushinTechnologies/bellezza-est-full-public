"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  category: string
}

export function PortfolioModal({ isOpen, onClose, imageSrc, imageAlt, category }: PortfolioModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[80vh] w-full animate-in zoom-in-99 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 z-10"
          aria-label="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          
          {/* Category badge on image */}
          {category && (
            <div className="absolute bottom-6 left-6 z-10">
              <span className="inline-block px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium shadow-lg">
                {category}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
