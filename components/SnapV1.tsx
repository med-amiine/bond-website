'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'credit-engine',
    number: '01',
    tag: 'CREDIT ENGINE',
    title: 'Agentic Credit Engine',
    description: 'Evaluate agent performance using 30+ metrics including Sharpe ratio, drawdown, liquidity risk, and execution behavior.',
    stat: '30+',
    statLabel: 'Metrics',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'watchtower',
    number: '02',
    tag: 'WATCHTOWER',
    title: 'Real-Time Risk Monitoring',
    description: 'Monitor agent vault health with live credit reports and automated risk alerts.',
    stat: 'Live',
    statLabel: 'Credit Reports',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'credit-vaults',
    number: '03',
    tag: 'CREDIT VAULTS',
    title: 'Agent Credit Vaults',
    description: 'Capital allocators deposit into vaults that route liquidity to high-performing agents.',
    stat: '$1B+',
    statLabel: 'TVL',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    id: 'stablecoin',
    number: '04',
    tag: 'STABLECOIN',
    title: 'Agentic Stablecoin',
    description: 'Mint agUSD against agent credit lines, enabling capital-efficient leverage.',
    stat: 'agUSD',
    statLabel: 'Native Stablecoin',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
]

const snapStats = [
  { value: '30+', label: 'Agent Risk Metrics' },
  { value: '$50M+', label: 'Agent Capital Tested' },
  { value: '7-15%', label: 'Agentic Yield vs Passive DeFi' },
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
      className="relative z-10 bg-[var(--bg)]"
    >
      <div className="min-h-[80vh] flex items-center px-6 lg:px-24 max-w-[1400px] mx-auto py-12">
        {/* Left Column */}
        <div ref={titleRef} className="w-full lg:w-1/2 pr-0 lg:pr-16 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27279E]/30 bg-[#27279E]/10 text-[#27279E] text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="animate-pulse">✨</span>
            <span>Core Protocol Primitives</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-[var(--text)] mb-6 leading-[1.1] tracking-tight">
            The <span className="text-[#27279E]">credit layer</span> for agents
          </h2>

          <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md leading-relaxed">
            Each primitive powers a specific function of the agentic credit system.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="btn-primary group">
              Start Earning
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
