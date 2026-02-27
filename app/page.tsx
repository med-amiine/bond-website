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
    <main className="bg-[#050505] overflow-x-hidden">
      <Navbar />
      
      {/* Section 1: Hero (z-10) - Gets covered by SnapV1 */}
      <div className="relative z-10">
        <Hero />
        <Partners />
      </div>

      {/* Section 2: Everything you need to build (z-20) - Covers Hero, gets covered by Frameworks */}
      <SnapV1 />

      {/* Section 3: Works with your favorite tools (z-30) - Covers SnapV1 */}
      <div className="relative z-30 bg-[#050505]">
        <Frameworks />
        <TrustedPartners />
        <Testimonials />
        <FooterCTA />
        <Footer />
      </div>
    </main>
  )
}
