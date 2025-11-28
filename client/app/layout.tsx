import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Bellezza Estetica — Эстетическая косметология в Находке",
  description:
    "Кабинет эстетической косметологии Bellezza Estetica в Находке. Профессиональный уход за кожей, инъекционные методики, научный подход pro age.",
  keywords: "косметология, Находка, эстетическая косметология, уход за кожей, ботулинотерапия, контурная пластика, разработка сайтов KolTech, веб-разработка Михаил Колотушин, создание сайтов для бизнеса",
}

export const viewport: Viewport = {
  themeColor: "#F5F5F2",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
