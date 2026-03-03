import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import SnapV1 from '@/components/SnapV1'
import Frameworks from '@/components/Frameworks'
import TrustedPartners from '@/components/TrustedPartners'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[var(--bg)]">
      <Navbar />

      {/* Hero - scrolls normally */}
      <Hero />
      <Partners />

      {/* SnapV1 - pinned with GSAP */}
      <SnapV1 />

      {/* Curtain effect: Frameworks slides over SnapV1 like a curtain closing */}
      <div 
        className="relative z-[20] bg-[var(--bg)]" 
        style={{ marginTop: '-35vh' }}
      >
        {/* Shadow edge for curtain effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--bg))',
            transform: 'translateY(-100%)'
          }}
        />
        <Frameworks />
      </div>

      <TrustedPartners />
      <Testimonials />
      <Blog />
      <FooterCTA />
      <Footer hideNewsletter />
    </main>
  )
}
