'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const perks = ['No credit card required', 'Free forever tier', 'Cancel anytime']

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const contentEl = contentRef.current

    if (!section || !contentEl) return

    const ctx = gsap.context(() => {
      // Fade in content
      gsap.from(contentEl, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ccff00]/10 rounded-full blur-[150px]" />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111111] to-[#0a0a0a]" />
          <div className="absolute inset-0 border border-[#27272a] rounded-3xl" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ccff00]/20 rounded-full blur-[100px]" />

          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 mb-8">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ccff00" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span className="text-sm text-[#ccff00]">Start for free today</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Ready to build your <span className="text-gradient">blockchain?</span>
            </h2>

            <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto mb-10">
              Join thousands of developers building the future of decentralized applications.
              Get started in minutes with our free tier.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary group text-base px-8 py-4">
                Start Building Free
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn-secondary text-base px-8 py-4">Talk to Sales</button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-[#27272a]">
              {perks.map(perk => (
                <div key={perk} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#ccff00]/20 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-[#ccff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-[#71717a]">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
