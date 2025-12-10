import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProgramSection } from "@/components/program-section"
import { PensionSection } from "@/components/pension-section"
import { ReservationSection } from "@/components/reservation-section"
import { InquirySection } from "@/components/inquiry-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProgramSection />
      <PensionSection />
      <ReservationSection />
      <InquirySection />
      <Footer />
    </main>
  )
}
