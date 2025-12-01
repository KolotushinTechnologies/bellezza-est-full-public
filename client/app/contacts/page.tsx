import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactsPageClient } from "@/components/contacts-page-client"

export default function ContactsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactsPageClient />
      <Footer />
    </main>
  )
}
