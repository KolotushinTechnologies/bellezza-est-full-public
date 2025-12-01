"use client"

import { useState } from "react"
import { PortfolioGridClient } from "./portfolio-grid-client"
import { PortfolioModal } from "./portfolio-modal"

interface PortfolioItem {
  _id: string
  src: string
  category: string
}

interface PortfolioPageClientProps {
  items: PortfolioItem[]
}

export function PortfolioPageClient({ items }: PortfolioPageClientProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    imageSrc: string
    category: string
  }>({
    isOpen: false,
    imageSrc: "",
    category: "",
  })

  const handleImageClick = (imageSrc: string, category: string) => {
    setModalState({
      isOpen: true,
      imageSrc,
      category,
    })
  }

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      imageSrc: "",
      category: "",
    })
  }

  return (
    <>
      <PortfolioGridClient items={items} onImageClick={handleImageClick} />
      
      <PortfolioModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        imageSrc={modalState.imageSrc}
        imageAlt={`Работа: ${modalState.category}`}
        category={modalState.category}
      />
    </>
  )
}
