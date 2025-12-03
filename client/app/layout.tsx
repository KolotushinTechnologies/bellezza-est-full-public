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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bellezza-estetica.ru'),
  title: "Bellezza Estetica — Эстетическая косметология в Находке",
  description:
    "Кабинет эстетической косметологии Bellezza Estetica в Находке. Профессиональный уход за кожей, инъекционные методики, научный подход pro age.",
  keywords: "косметология, Находка, эстетическая косметология, уход за кожей, ботулинотерапия, контурная пластика, разработка сайтов KolTech, веб-разработка Михаил Колотушин, создание сайтов для бизнеса",
  icons: {
    icon: "/Bellezza_Estetica_Logo.svg",
    apple: "/Bellezza_Estetica_Logo.svg",
  },
  openGraph: {
    title: "Bellezza Estetica — Эстетическая косметология в Находке",
    description: "Кабинет эстетической косметологии Bellezza Estetica в Находке. Профессиональный уход за кожей, инъекционные методики, научный подход pro age.",
    url: "https://bellezza-estetica.ru",
    siteName: "Bellezza Estetica",
    images: [
      {
        url: "/Bellezza_Estetica_Logo.svg",
        width: 1200,
        height: 630,
        alt: "Bellezza Estetica Logo",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellezza Estetica — Эстетическая косметология в Находке",
    description: "Кабинет эстетической косметологии Bellezza Estetica в Находке. Профессиональный уход за кожей, инъекционные методики, научный подход pro age.",
    images: ["/Bellezza_Estetica_Logo.svg"],
  },
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
