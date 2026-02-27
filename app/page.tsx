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
    <main className="bg-[#050505]">
      <Navbar />

      {/* Hero Section - z-10 */}
      <div className="relative z-10">
        <Hero />
        <Partners />
      </div>

      {/* SnapV1 Section - sticky, covers Hero */}
      <SnapV1 />

      {/* Frameworks Section - sticky, covers SnapV1 (THE CURTAIN) */}
      <div className="sticky top-0 z-30 bg-[#050505] min-h-screen shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
        <div className="border-t border-[#ccff00]/20">
          <Frameworks />
          <TrustedPartners />
          <Testimonials />
          <FooterCTA />
          <Footer />
        </div>
      </div>
    </main>
  )
}
