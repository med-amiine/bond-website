'use client'

import { useEffect, useRef, useState } from 'react'

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
    icon: '🔧',
    title: '24/7 Support',
    description: 'Round-the-clock expert support from our team of blockchain engineers.',
    stat: '24/7',
    statLabel: 'Expert Support',
  },
  {
    icon: '🔌',
    title: 'No-Code Integration',
    description: 'Integrate with your existing stack using our REST APIs and SDKs.',
    stat: '50+',
    statLabel: 'Integrations',
  },
]

const snapStats = [
  { value: '10K+', label: 'Developers' },
  { value: '$2B+', label: 'TVL Secured' },
  { value: '100+', label: 'Enterprise Clients' },
]

export default function SnapV1() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const scrollProgress = -rect.top / window.innerHeight

      // Card switching: each card takes 25% of scroll
      const cardIndex = Math.min(Math.max(Math.floor(scrollProgress), 0), features.length - 1)
      setActiveCard(cardIndex)
      setIsLocked(rect.top <= 0 && scrollProgress < features.length)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="build-section"
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 10,
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c8f420]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#c8f420]/30 mb-6">
                <span className="text-[#c8f420]">✨</span>
                <span className="text-sm text-[#9ca3af]">Snap V1 is here</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Everything you need to{' '}
                <span className="text-[#c8f420] animate-pulse">build</span>
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

            {/* Right Column - Feature Cards Stack */}
            <div className="relative h-[400px]">
              {features.map((feature, index) => {
                const isActive = index === activeCard
                const isPast = index < activeCard
                const isFuture = index > activeCard

                // Calculate position
                let translateY = 0
                let scale = 1
                let opacity = 1
                let zIndex = features.length - index

                if (isPast) {
                  // Cards slide up and fade when done
                  translateY = -20 * (activeCard - index)
                  scale = 1 - (activeCard - index) * 0.05
                  opacity = Math.max(0.3, 1 - (activeCard - index) * 0.4)
                  zIndex = 10 - (activeCard - index)
                } else if (isFuture) {
                  // Cards wait below
                  translateY = 100 + (index - activeCard) * 50
                  scale = 0.95
                  opacity = index === activeCard + 1 ? 0.5 : 0
                  zIndex = 5 - (index - activeCard)
                } else {
                  // Active card
                  translateY = 0
                  scale = 1
                  opacity = 1
                  zIndex = 50
                }

                return (
                  <div
                    key={index}
                    className="absolute inset-x-0 top-0 rounded-2xl p-6 transition-all duration-500 ease-out"
                    style={{
                      height: '320px',
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      zIndex,
                      background: 'rgba(26, 26, 26, 0.8)',
                      border: `1px solid ${isActive ? 'rgba(200, 244, 32, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: isActive
                        ? '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(200, 244, 32, 0.1)'
                        : '0 15px 40px rgba(0, 0, 0, 0.4)',
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

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-2xl overflow-hidden">
                      {isActive && (
                        <div
                          className="h-full bg-[#c8f420] transition-all duration-300"
                          style={{ width: `${((activeCard + 1) / features.length) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Card Counter */}
              <div className="absolute -bottom-8 left-0 flex items-center gap-3">
                <span className="text-sm text-[#9ca3af]">
                  {activeCard + 1} / {features.length}
                </span>
                <div className="flex gap-1">
                  {features.map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-1 rounded-full transition-all duration-300"
                      style={{
                        background: i <= activeCard ? '#c8f420' : 'rgba(255, 255, 255, 0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
