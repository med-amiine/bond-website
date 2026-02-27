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
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate progress through the section (0 to 1)
      const scrolled = -rect.top
      const totalScrollable = section.offsetHeight - windowHeight
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable))
      
      setProgress(rawProgress)

      // Determine active card based on progress
      // 0-0.25 = card 0, 0.25-0.5 = card 1, etc.
      const cardIndex = Math.min(Math.floor(rawProgress * features.length), features.length - 1)
      setActiveIndex(cardIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: '400vh' }} // Exactly 400vh as requested
    >
      {/* Sticky container - this is what stays pinned */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c8f420]/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
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
            <div className="hidden lg:block relative" style={{ height: '360px' }}>
              {/* Cards stacked with absolute positioning */}
              {features.map((feature, index) => {
                const isActive = index === activeIndex
                const isPast = index < activeIndex
                const isFuture = index > activeIndex

                // Calculate card position based on scroll progress
                let translateY = 0
                let scale = 1
                let opacity = 1
                let zIndex = features.length - index // Lightning Fast = 4, Security = 3, etc.

                if (isPast) {
                  // Cards that have been shown - exit upward
                  const depth = activeIndex - index
                  translateY = -80 - depth * 20
                  scale = 1 - depth * 0.05
                  opacity = Math.max(0, 1 - depth * 0.5)
                  zIndex = 10 - depth
                } else if (isFuture) {
                  // Cards coming up - enter from below
                  const depth = index - activeIndex
                  translateY = 100 + depth * 30
                  scale = 0.9 - depth * 0.02
                  opacity = depth === 1 ? 0.3 : 0
                  zIndex = 5 - depth
                } else {
                  // Active card - centered
                  translateY = 0
                  scale = 1
                  opacity = 1
                  zIndex = 50
                }

                return (
                  <div
                    key={index}
                    className="absolute inset-0 rounded-2xl p-6 transition-all duration-300"
                    style={{
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

                    {/* Progress bar on active card */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-2xl overflow-hidden">
                        <div
                          className="h-full bg-[#c8f420] transition-all duration-300"
                          style={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Progress Indicator */}
              <div className="absolute -bottom-12 left-0 flex items-center gap-2 text-sm">
                <span className="text-white font-medium">{activeIndex + 1}</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-500">{features.length}</span>
                <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden ml-2">
                  <div
                    className="h-full bg-[#c8f420] transition-all duration-300"
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
