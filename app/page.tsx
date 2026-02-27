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
      
      {/* Section 1: Hero (gets covered) - z-index: 10 */}
      <div className="relative z-10">
        <Hero />
        <Partners />
      </div>

      {/* Section 2: Everything you need to build (covers hero, then gets covered) - z-index: 20 */}
      <SnapV1 />

      {/* Section 3: Works with your favorite tools (covers build section) - z-index: 30 */}
      <section className="sticky top-0 z-30 bg-[#050505]">
        <Frameworks />
      </section>

      {/* Spacer to allow final section to scroll away naturally */}
      <div className="relative z-30 bg-[#050505]">
        <TrustedPartners />
        <Testimonials />
        <FooterCTA />
        <Footer />
      </div>
    </main>
  )
}
