'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Deploy your blockchain in under 60 seconds with our optimized infrastructure.',
    stat: '< 60s',
    statLabel: 'Deployment Time',
  },
  {
    icon: '🛡️',
    title: 'Enterprise Security',
    description: 'Bank-grade security with multi-sig wallets, audit trails, and compliance tools.',
    stat: '99.99%',
    statLabel: 'Security Uptime',
  },
  {
    icon: '📈',
    title: 'Scalable Infra',
    description: 'Scale from testnet to mainnet seamlessly with auto-scaling infrastructure.',
    stat: '∞',
    statLabel: 'Scalability',
  },
  {
    icon: '🔧',
    title: '24/7 Support',
    description: 'Round-the-clock expert support from our team of blockchain engineers.',
    stat: '24/7',
    statLabel: 'Expert Support',
  },
]

const snapStats = [
  { value: '10K+', label: 'Developers' },
  { value: '$2B+', label: 'TVL Secured' },
  { value: '100+', label: 'Enterprise Clients' },
]

export default function SnapV1() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = cardsRef.current.filter(Boolean)
    if (cards.length === 0) return

    // Clear any existing triggers
    triggersRef.current.forEach(t => t.kill())
    triggersRef.current = []

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%', // Creates 300vh of scroll while pinned
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        snap: {
          snapTo: 1 / (features.length - 1),
          duration: { min: 0.2, max: 0.3 },
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const progress = self.progress
          const cardIndex = Math.min(Math.floor(progress * features.length), features.length - 1)
          setActiveIndex(cardIndex)
        },
      },
    })

    // Store trigger for cleanup
    if (tl.scrollTrigger) {
      triggersRef.current.push(tl.scrollTrigger)
    }

    // Animate each card transition
    // Card 0 starts visible, others start below
    gsap.set(cards[0], { y: 0, opacity: 1, scale: 1 })
    cards.slice(1).forEach((card) => {
      gsap.set(card, { y: 100, opacity: 0, scale: 0.9 })
    })

    // Card 0 exits, Card 1 enters
    tl.to(cards[0], { y: -100, opacity: 0, scale: 0.9, duration: 0.25 }, 0)
      .to(cards[1], { y: 0, opacity: 1, scale: 1, duration: 0.25 }, 0)

    // Card 1 exits, Card 2 enters
    tl.to(cards[1], { y: -100, opacity: 0, scale: 0.9, duration: 0.25 }, 0.33)
      .to(cards[2], { y: 0, opacity: 1, scale: 1, duration: 0.25 }, 0.33)

    // Card 2 exits, Card 3 enters
    tl.to(cards[2], { y: -100, opacity: 0, scale: 0.9, duration: 0.25 }, 0.66)
      .to(cards[3], { y: 0, opacity: 1, scale: 1, duration: 0.25 }, 0.66)

    return () => {
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []
    }
  }, [])

  return (
    <section
      id="build-section"
      ref={sectionRef}
      className="sticky top-0 h-screen w-full bg-[#050505] z-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c8f420]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 h-full w-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Static content */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#c8f420]/30 mb-6">
                <span className="text-[#c8f420]">✨</span>
                <span className="text-sm text-[#9ca3af]">Snap V1 is here</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Everything you need to{' '}
                <span className="text-[#c8f420]">build</span>
              </h2>

              {/* Subtext */}
              <p className="text-lg text-[#9ca3af] mb-8 max-w-[480px]">
                From deployment to scaling, SnapChain provides all the tools you need to launch and manage blockchain infrastructure at any scale.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c8f420] text-black font-semibold text-sm hover:scale-105 transition-transform">
                  Get Started Free
                  <span>→</span>
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-white font-medium text-sm border border-white/20 hover:bg-white/5 transition-colors">
                  View Documentation
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {snapStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-[#9ca3af]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Stacked Cards Container */}
            <div className="hidden lg:block relative" style={{ height: '320px' }}>
              {/* Cards stacked with absolute positioning */}
              {features.map((feature, index) => {
                const isActive = index === activeIndex

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el
                    }}
                    className="feature-card absolute inset-0 rounded-2xl p-6"
                    style={{
                      zIndex: features.length - index,
                      background: 'rgba(26, 26, 26, 0.9)',
                      border: `1px solid ${isActive ? 'rgba(200, 244, 32, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                      backdropFilter: 'blur(10px)',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{
                          background: isActive ? 'rgba(200, 244, 32, 0.2)' : 'rgba(200, 244, 32, 0.1)',
                        }}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-lg font-semibold mb-1"
                          style={{ color: isActive ? '#c8f420' : '#ffffff' }}
                        >
                          {feature.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-[#c8f420]">{feature.stat}</span>
                          <span className="text-sm text-white/60">{feature.statLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#9ca3af] text-sm mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Explore Button */}
                    <button
                      className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: isActive ? 'rgba(200, 244, 32, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: isActive ? '#c8f420' : '#9ca3af',
                        border: `1px solid ${isActive ? 'rgba(200, 244, 32, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                      }}
                    >
                      Explore
                    </button>
                  </div>
                )
              })}

              {/* Progress Indicator */}
              <div className="absolute -bottom-12 left-0 flex items-center gap-2 text-sm text-gray-400">
                <span className="current-card text-white font-medium">{activeIndex + 1}</span>
                <span>/</span>
                <span>{features.length}</span>
                <div className="ml-2 h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full bg-[#c8f420] transition-all duration-100"
                    style={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
