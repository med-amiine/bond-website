'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const agents = [
  {
    name: 'Zyfai Alpha',
    type: 'High Frequency',
    strategy: 'DEX Trading & Arbitrage',
    apy: '14.2%',
    tvl: '$12.5M',
    score: 84,
  },
  {
    name: 'Giza Core',
    type: 'Lending Optimizer',
    strategy: 'Lending Rate Optimization',
    apy: '12.8%',
    tvl: '$10.2M',
    score: 83,
  },
  {
    name: 'Nebula AI',
    type: 'Rebalancer',
    strategy: 'Dynamic Rebalancing',
    apy: '10.5%',
    tvl: '$8.1M',
    score: 81,
  },
]

function AgentCard({ agent, index }: { agent: typeof agents[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        rotateX: 10,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power2.out',
      })

      // Animate progress bar
      const progressBar = cardRef.current?.querySelector('.progress-fill')
      if (progressBar) {
        gsap.from(progressBar, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          width: '0%',
          duration: 0.8,
          delay: index * 0.15 + 0.5,
          ease: 'power2.out',
        })
      }
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-[380px] mx-auto group"
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Card with theme-aware styling */}
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500 border border-[var(--border)] hover:border-[#27279E]/30"
        style={{
          aspectRatio: '1.586',
          background: 'var(--bg-card)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(39,39,158,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59,59,184,0.08) 0%, transparent 40%)',
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-[35%] h-16 opacity-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(39,39,158,0.3), transparent)',
            filter: 'blur(20px)',
          }}
        />

        {/* Content */}
        <div className="relative p-6 h-full flex flex-col">
          {/* Top row: icon + name | gold chip */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ background: 'var(--bg-card-2)', borderColor: 'var(--border)' }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text)] tracking-tight">{agent.name}</h3>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">AI Strategy</p>
              </div>
            </div>
            {/* Gold chip */}
            <div
              className="relative w-8 h-6 rounded-md overflow-hidden flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #8b6914 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute inset-0.5 border border-amber-900/30 rounded-sm" />
            </div>
          </div>

          {/* Performance Score */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-[var(--text-sub)]">Performance Score</span>
              <span className="text-sm font-bold text-[var(--text)]">{agent.score}/100</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-card-2)' }}>
              <div
                className="progress-fill h-full rounded-full"
                style={{
                  width: `${agent.score}%`,
                  background: 'linear-gradient(90deg, #27279E, #3B3BB8)',
                  boxShadow: '0 0 12px rgba(39,39,158,0.3)',
                }}
              />
            </div>
          </div>

          {/* Allocated */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-[var(--text-sub)]">Allocated</span>
            <span className="text-sm text-[var(--text)]">{agent.tvl}</span>
          </div>

          {/* Return */}
          <div className="mt-auto pt-2">
            <span className="text-xl font-bold text-[#27279E]">+{agent.apy}</span>
          </div>

          {/* Active badge */}
          <div className="absolute right-4 bottom-4">
            <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Frameworks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Fade in header
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }

      // Fade in link
      if (linkRef.current) {
        gsap.from(linkRef.current, {
          scrollTrigger: {
            trigger: linkRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="frameworks" className="relative py-16 min-h-screen overflow-hidden bg-[var(--bg)]">
      {/* Top border for separation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-3">
            Meet Your Portfolio Managers
          </h2>
          <p className="text-lg text-[var(--text-sub)] max-w-md mx-auto">
            Each agent specializes in different strategies, working together to optimize your returns.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-8">
          {agents.map((agent, i) => (
            <AgentCard key={i} agent={agent} index={i} />
          ))}
        </div>

        <div ref={linkRef} className="text-center">
          <Link href="/agents" className="btn-secondary">
            View All Agents
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  )
}
