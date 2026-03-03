'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'fast',
    number: '01',
    tag: 'Performance',
    title: 'Lightning Fast',
    description: 'Deploy your blockchain in under 60 seconds with our optimized infrastructure.',
    stat: '< 60s',
    statLabel: 'Deployment Time',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 'security',
    number: '02',
    tag: 'Security',
    title: 'Enterprise Security',
    description: 'Bank-grade protection with multi-sig wallets, audit trails, and compliance tools.',
    stat: '99.99%',
    statLabel: 'Security Uptime',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'scale',
    number: '03',
    tag: 'Infrastructure',
    title: 'Scalable Infra',
    description: 'Scale from testnet to mainnet seamlessly with auto-scaling that grows with your needs.',
    stat: '∞',
    statLabel: 'Scalability',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    id: 'support',
    number: '04',
    tag: 'Support',
    title: '24/7 Support',
    description: 'Round-the-clock expert support from our team of blockchain engineers.',
    stat: '24/7',
    statLabel: 'Expert Support',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

const snapStats = [
  { value: '10K+', label: 'Developers' },
  { value: '$2B+', label: 'TVL Secured' },
  { value: '100+', label: 'Enterprise Clients' },
]

export default function SnapV1() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [currentCard, setCurrentCard] = useState(0)
  const currentCardRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const titleEl = titleRef.current
    const cardsContainer = cardsContainerRef.current

    if (!section || !titleEl || !cardsContainer) return

    const ctx = gsap.context(() => {
      gsap.from(titleEl, {
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

      gsap.from(cardsContainer, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80px',
        end: '+=150%',
        pin: true,
        snap: {
          snapTo: (progress) => {
            const snapPoints = [0, 0.25, 0.5, 0.75, 1]
            const nearestIndex = Math.min(Math.round(progress * 4), 4)
            return snapPoints[nearestIndex]
          },
          duration: { min: 0.35, max: 0.6 },
          ease: 'power2.inOut',
          delay: 0.15,
        },
        onUpdate: (self) => {
          const cardIndex = Math.min(Math.floor(self.progress * 4), 3)
          if (cardIndex !== currentCardRef.current) {
            currentCardRef.current = cardIndex
            setCurrentCard(cardIndex)
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[var(--bg)]"
    >
      <div className="min-h-[80vh] flex items-center px-6 lg:px-24 max-w-[1400px] mx-auto py-12">
        {/* Left Column */}
        <div ref={titleRef} className="w-full lg:w-1/2 pr-0 lg:pr-16 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27279E]/30 bg-[#27279E]/10 text-[#27279E] text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="animate-pulse">✨</span>
            <span>Snap V1 is here</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-[var(--text)] mb-6 leading-[1.1] tracking-tight">
            Everything you need to <span className="text-[#27279E]">build</span>
          </h2>

          <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md leading-relaxed">
            From deployment to scaling, SnapChain provides all the tools you need to launch and manage blockchain infrastructure at any scale.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="btn-primary group">
              Get Started Free
              <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
            </button>
            <button className="btn-secondary">View Documentation</button>
          </div>

          <div className="flex gap-8 lg:gap-12">
            {snapStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-bold text-[var(--text)] tracking-tight">{stat.value}</div>
                <div className="text-[var(--text-muted)] text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — 2×2 bento grid, all 4 always visible */}
        <div ref={cardsContainerRef} className="hidden lg:flex lg:flex-col w-1/2 gap-3">
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => {
              const isActive = index === currentCard
              return (
                <div
                  key={feature.id}
                  className="rounded-xl p-5 flex flex-col justify-between"
                  style={{
                    background: isActive ? 'var(--bg-card)' : 'var(--bg-card)',
                    border: `1px solid ${isActive ? '#27279E' : 'var(--border)'}`,
                    borderTop: `2px solid ${isActive ? '#27279E' : 'var(--border)'}`,
                    opacity: isActive ? 1 : 0.42,
                    boxShadow: isActive
                      ? '0 0 0 1px rgba(39,39,158,0.08), 0 4px 24px rgba(39,39,158,0.14)'
                      : 'none',
                    transition: 'opacity 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                    minHeight: '168px',
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] font-semibold"
                        style={{ color: isActive ? '#27279E' : 'var(--text-muted)' }}
                      >
                        {feature.number}
                      </span>
                      <span
                        className="text-[9px] font-semibold uppercase tracking-[0.1em]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {feature.tag}
                      </span>
                    </div>
                    <div style={{ color: isActive ? '#27279E' : 'var(--text-muted)' }}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Stat */}
                  <div className="mb-3">
                    <div
                      className="font-mono font-bold leading-none mb-1"
                      style={{
                        fontSize: 'clamp(26px, 3vw, 34px)',
                        color: isActive ? '#27279E' : 'var(--text-muted)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {feature.stat}
                    </div>
                    <div
                      className="text-[9px] font-semibold uppercase tracking-[0.1em]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {feature.statLabel}
                    </div>
                  </div>

                  {/* Title + description */}
                  <div>
                    <div
                      className="text-[12px] font-semibold mb-1"
                      style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)' }}
                    >
                      {feature.title}
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 px-0.5">
            {features.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-[2px] rounded-full overflow-hidden"
                style={{ background: 'var(--border)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: index <= currentCard ? '100%' : '0%',
                    background: index === currentCard ? '#27279E' : 'rgba(39,39,158,0.3)',
                    transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
            ))}
            <span className="font-mono text-[11px] flex-shrink-0 ml-1">
              <span className="font-semibold" style={{ color: '#27279E' }}>
                {String(currentCard + 1).padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--text-muted)' }}> / 04</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
