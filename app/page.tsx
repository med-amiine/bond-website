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
      
      {/* Pre-curtain: Hero and Partners (z-index: 1) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Partners />
      </div>
      
      {/* Spacer to allow scrolling for curtain effect */}
      <div style={{ height: '200vh', position: 'relative', zIndex: 0 }} />
      
      {/* THE CURTAIN: Build section (z-index: 10) */}
      <SnapV1 />
      
      {/* Spacer to release curtain */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 0 }} />
      
      {/* Post-curtain: Everything else slides over (z-index: 20) */}
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
