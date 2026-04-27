import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { CertificatesSection } from "@/components/sections/certificates-section"
import { FeedbackSection } from "@/components/sections/feedback-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <CertificatesSection />
      <FeedbackSection />
      <ContactSection />
      <Footer />
    </main>
  )
}