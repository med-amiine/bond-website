'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import SnapV1 from '@/components/SnapV1'
import Frameworks from '@/components/Frameworks'
import TrustedPartners from '@/components/TrustedPartners'
import Testimonials from '@/components/Testimonials'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Create the curtain effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#curtain-trigger',
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: '#snap-v1-wrapper',
      },
    })

    tl.fromTo(
      '#frameworks-curtain',
      { yPercent: 100 },
      { yPercent: 0 }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main className="bg-[#050505] overflow-x-hidden">
      <Navbar />

      {/* Section 1: Hero - Gets covered */}
      <div className="relative z-0">
        <Hero />
        <Partners />
      </div>

      {/* Wrapper for curtain effect */}
      <div className="relative">
        {/* Section being covered (SnapV1) */}
        <div id="snap-v1-wrapper" className="relative z-10">
          <SnapV1 />
        </div>

        {/* Trigger point */}
        <div
          id="curtain-trigger"
          className="absolute bottom-0 left-0 w-full h-px"
        />
      </div>

      {/* The Curtain - slides over snap-v1 */}
      <div
        id="frameworks-curtain"
        className="relative z-20 bg-[#050505] border-t border-[#ccff00]/10"
        style={{ boxShadow: '0 -20px 40px rgba(0,0,0,0.5)' }}
      >
        <Frameworks />
        <TrustedPartners />
        <Testimonials />
        <FooterCTA />
        <Footer />
      </div>
    </main>
  )
}
