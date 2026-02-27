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
      
      {/* Pre-curtain: Hero and Partners */}
      <Hero />
      <Partners />
      
      {/* THE CURTAIN: Build section with stacked cards (400vh provides scroll distance) */}
      <SnapV1 />
      
      {/* Post-curtain sections - these scroll OVER the curtain */}
      <div style={{ position: 'relative', zIndex: 20, background: '#050505' }}>
        <Frameworks />
        <TrustedPartners />
        <Testimonials />
        <FooterCTA />
        <Footer />
      </div>
    </main>
  )
}
