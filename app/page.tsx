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

      {/* Hero - scrolls normally */}
      <div className="relative z-10">
        <Hero />
        <Partners />
      </div>

      {/* SnapV1 - sticky, stays in place while being covered */}
      <div className="sticky top-0 z-20">
        <SnapV1 />
      </div>

      {/* Frameworks - THE CURTAIN: scrolls up to cover SnapV1 */}
      <div 
        className="relative z-30 bg-[#050505]"
        style={{
          boxShadow: '0 -30px 60px rgba(0,0,0,0.8)',
        }}
      >
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
