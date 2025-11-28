"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  priority?: boolean
}

export function ImageLoader({ src, alt, className, aspectRatio = "aspect-[4/3]", priority = false }: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden bg-neutral-100", aspectRatio, className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-neutral-200 border-t-neutral-700 animate-spin" />
            <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-t-neutral-500 animate-spin animation-delay-150" />
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  )
}
