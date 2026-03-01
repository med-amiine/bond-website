import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import SnapV1 from '@/components/SnapV1'
import Frameworks from '@/components/Frameworks'
import TrustedPartners from '@/components/TrustedPartners'
import Testimonials from '@/components/Testimonials'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[var(--bg)]">
      <Navbar />

      {/* Hero - scrolls normally */}
      <Hero />
      <Partners />

      {/* SnapV1 - pinned with GSAP, Frameworks scrolls over it */}
      <SnapV1 />

      {/* Frameworks - scrolls up to cover SnapV1 (curtain effect) */}
      <Frameworks />
      <TrustedPartners />
      <Testimonials />
      <FooterCTA />
      <Footer />
    </main>
  )
}
