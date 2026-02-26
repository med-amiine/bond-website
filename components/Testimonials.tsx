'use client'

import { useState } from 'react'

const testimonials = [
  {
    quote: 'SnapChain reduced our deployment time from weeks to hours. The infrastructure is rock-solid and the team is incredibly responsive.',
    author: 'Sarah Chen',
    role: 'CTO at BlockFi',
    avatar: 'SC',
  },
  {
    quote: "The no-code integration saved us months of development. We were able to focus on our product instead of infrastructure.",
    author: 'Michael Roberts',
    role: 'Founder at DeFi Protocol',
    avatar: 'MR',
  },
  {
    quote: "Best blockchain infrastructure platform we've used. The multi-chain support and enterprise security are game-changers.",
    author: 'Emily Watson',
    role: 'Engineering Lead at Web3 Studio',
    avatar: 'EW',
  },
  {
    quote: 'From testnet to mainnet in under an hour. SnapChain made our launch seamless and stress-free.',
    author: 'David Kim',
    role: 'CEO at NFT Marketplace',
    avatar: 'DK',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  function prev() {
    setActive(i => (i - 1 + testimonials.length) % testimonials.length)
  }
  function next() {
    setActive(i => (i + 1) % testimonials.length)
  }

  const t = testimonials[active]

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            Loved by <span className="text-gradient">developers</span>
          </h2>
          <p className="text-lg text-[#a1a1aa]">See what our customers have to say about SnapChain.</p>
        </div>

        <div className="relative">
          <div className="card-dark p-8 sm:p-12 relative overflow-hidden">
            {/* Big quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24" className="text-[#ccff00]">
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.76-3 .66-1.06 1.514-1.88 2.562-2.465l-1.21-1.577c-1.48.966-2.64 2.19-3.47 3.67-.83 1.48-1.25 2.98-1.25 4.5 0 1.29.35 2.33 1.05 3.12.7.79 1.63 1.19 2.79 1.19.98 0 1.81-.33 2.49-1 .68-.66 1.02-1.51 1.02-2.55l-.18-.33zM19.5 15.757c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.695-1.327-.823-.56-.127-1.077-.136-1.547-.028-.16-.95.1-1.95.76-3 .66-1.06 1.514-1.88 2.562-2.465L17.94 5.647c-1.48.966-2.64 2.19-3.47 3.67-.83 1.48-1.25 2.98-1.25 4.5 0 1.29.35 2.33 1.05 3.12.7.79 1.63 1.19 2.79 1.19.98 0 1.81-.33 2.49-1 .68-.66 1.02-1.51 1.02-2.55l-.18-.33z"/>
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-xl sm:text-2xl text-white leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ccff00] to-[#a3e635] flex items-center justify-center">
                  <span className="text-[#050505] font-bold text-sm">{t.avatar}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{t.author}</div>
                  <div className="text-[#71717a] text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`testimonial-nav-dot ${i === active ? 'active' : ''}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button className="testimonial-nav-btn" onClick={prev}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="testimonial-nav-btn" onClick={next}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
