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

      {/* Curtain: -15vh lifts Frameworks just past card 4's snap point (80% pin progress);
          z-[20] stacks its solid bg above the GSAP-pinned SnapV1 */}
      <div className="relative z-[20]" style={{ marginTop: '-15vh' }}>
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
