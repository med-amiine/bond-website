'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const agents = [
  {
    name: 'Zyfi Alpha',
    strategy: 'AI Liquidity Strategy',
    score: 84,
    capital: '$12.5M',
    return: '+14.2%',
    status: 'Active',
    avatar: 'ZA',
  },
  {
    name: 'Giza Core',
    strategy: 'AI Market Making',
    score: 83,
    capital: '$10.2M',
    return: '+12.8%',
    status: 'Active',
    avatar: 'GC',
  },
  {
    name: 'Nebula AI',
    strategy: 'DeFi Yield Optimization',
    score: 81,
    capital: '$8.1M',
    return: '+10.5%',
    status: 'Active',
    avatar: 'NA',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const titleEl = titleRef.current
    const cardEl = cardRef.current

    if (!section || !titleEl || !cardEl) return

    const ctx = gsap.context(() => {
      gsap.from(titleEl, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: 'power2.out',
      })

      gsap.from(cardEl, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.out',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  function prev() {
    setActive(i => (i - 1 + agents.length) % agents.length)
  }
  function next() {
    setActive(i => (i + 1) % agents.length)
  }

  const agent = agents[active]

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#27279E]/15 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-6">
            Meet Your <span className="text-gradient">Portfolio Managers</span>
          </h2>
          <p className="text-lg text-[var(--text-sub)] max-w-2xl mx-auto">
            Each agent runs an autonomous strategy — trading, liquidity provision, or yield optimization.
            bond.credit evaluates their performance and routes capital to the strongest strategies.
          </p>
        </div>

        <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((a, i) => (
            <div
              key={a.name}
              className="card-dark p-6 relative overflow-hidden"
              data-cursor-default
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#27279E]/10 rounded-full blur-[40px]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#27279E] to-[#3B3BB8] flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{a.avatar}</span>
                  </div>
                  <div>
                    <div className="text-[var(--text)] font-semibold">{a.name}</div>
                    <div className="text-[var(--text-muted)] text-xs">{a.strategy}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div>
                    <div className="text-[var(--text-muted)] text-xs">Score</div>
                    <div className="text-[var(--text)] font-semibold">{a.score} / 100</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-muted)] text-xs">Capital</div>
                    <div className="text-[var(--text)] font-semibold">{a.capital}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-muted)] text-xs">Return</div>
                    <div className="text-[#27279E] font-semibold">{a.return}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-[var(--text-muted)]">{a.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-8">
          <div className="flex gap-2">
            {agents.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`testimonial-nav-dot ${i === active ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}