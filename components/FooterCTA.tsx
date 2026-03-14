'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#27279E]/20 rounded-full blur-[150px]" />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Card background */}
          <div className="absolute inset-0 bg-[var(--bg-card)]" />
          <div className="absolute inset-0 border border-[var(--border)] rounded-3xl" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#27279E]/30 rounded-full blur-[100px]" />

          <div className="relative z-10 px-8 py-12 sm:px-16 sm:py-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#27279E]/10 border border-[#27279E]/20 mb-8">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="text-sm text-[#27279E]">Stay updated</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] tracking-tight mb-6">
              Ready to Fund the <span className="text-gradient">Agentic Economy?</span>
            </h2>

            <p className="text-lg text-[var(--text-sub)] max-w-2xl mx-auto mb-10">
              Explore autonomous trading agents, analyze credit reports, and allocate capital through bond.credit.
            </p>

            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-[#27279E] font-medium animate-in fade-in duration-300">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                You&apos;re subscribed! We&apos;ll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full sm:flex-1 px-4 py-3.5 bg-[var(--bg)] border border-[var(--border)] rounded-full text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#27279E] transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto btn-primary group whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Join the Early Access
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            )}

            <p className="mt-6 text-xs text-[var(--text-muted)]">
              Early access to the Agentic Credit Engine, Watchtower, and Credit Vaults.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
