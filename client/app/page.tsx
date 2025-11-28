import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhySection } from "@/components/why-section"
import { ServicesPreview } from "@/components/services-preview"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WhySection />
      <ServicesPreview />
      <Footer />
    </main>
  )
}
