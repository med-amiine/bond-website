'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  { name: 'a16z', abbr: 'a16z' },
  { name: 'Coinbase Ventures', abbr: 'CB' },
  { name: 'Polychain', abbr: 'PC' },
  { name: 'Paradigm', abbr: 'PD' },
  { name: 'Sequoia', abbr: 'SQ' },
  { name: 'Binance Labs', abbr: 'BL' },
]

const bullets = [
  'Strategic investment from top VCs',
  'Technical partnerships with leading protocols',
  'Enterprise clients across industries',
]

export default function TrustedPartners() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const contentEl = contentRef.current

    if (!section || !contentEl) return

    const ctx = gsap.context(() => {
      // Fade in content from right
      gsap.from(contentEl, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 80,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Staggered fade for partner items from right
      const items = gsap.utils.toArray<HTMLElement>('.partner-item')
      gsap.from(items, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 60,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Partner logos list */}
          <div className="space-y-6">
            {partners.map((p, i) => (
              <div key={i} className="partner-item group">
                <div className="text-[#ccff00] text-2xl font-bold mb-1">{p.abbr}</div>
                <div className="text-white text-sm">{p.name}</div>
              </div>
            ))}
          </div>

          {/* Right text */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
              Our Trusted <span className="text-gradient">Partners</span>
            </h2>
            <p className="text-lg text-[#a1a1aa] mb-8 leading-relaxed">
              We proudly collaborate with industry leaders to bring you the best in innovation,
              reliability, and success. Our partners share our vision of making blockchain
              infrastructure accessible to everyone.
            </p>
            <div className="space-y-4 mb-8">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ccff00]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#ccff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#a1a1aa]">{b}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary">Become a Partner</button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />
    </section>
  )
}
