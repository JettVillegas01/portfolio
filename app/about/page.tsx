import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutPageContent } from "@/components/sections/about-page-content"

export const metadata = {
  title: "About — Jett Villegas",
  description: "Gallery, education, and more about Jett Villegas.",
}

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutPageContent />
      <Footer />
    </main>
  )
}