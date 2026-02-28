'use client'

import { useEffect, useRef } from 'react'

const networks = [
  { name: 'Ethereum', icon: '⟠' },
  { name: 'Polygon', icon: '⬡' },
  { name: 'Arbitrum', icon: '◯' },
  { name: 'Optimism', icon: '⊙' },
  { name: 'Base', icon: '◐' },
  { name: 'Avalanche', icon: '▲' },
  { name: 'Solana', icon: '◈' },
  { name: 'Cosmos', icon: '✦' },
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...networks, ...networks, ...networks, ...networks]
  return (
    <div className="marquee-wrapper">
      <div className={`marquee-track ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {items.map((net, i) => (
          <div key={i} className="network-tag mx-3 group">
            <span className="text-xl text-[#84CC86] group-hover:scale-110 transition-transform duration-300 select-none">{net.icon}</span>
            <span className="text-white font-medium whitespace-nowrap text-sm">{net.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Partners() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('in-view') }),
      { threshold: 0.2 }
    )
    if (titleRef.current) io.observe(titleRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="partners-marquee" className="relative bg-[#050505] py-20 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #27272a 30%, #27272a 70%, transparent)' }} />

      <div className="relative z-10">
        <div ref={titleRef} className="text-center mb-12 px-4" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <p className="text-[#71717a] text-xs uppercase tracking-[0.2em] mb-3">Trusted by leading chains</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Integrated with the <span className="text-gradient">best ecosystems</span>
          </h2>
        </div>
        <MarqueeRow />
        <div className="mt-3"><MarqueeRow reverse /></div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #27272a 30%, #27272a 70%, transparent)' }} />
    </section>
  )
}
