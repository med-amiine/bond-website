'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features = [
  {
    id: 'fast',
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Deploy your blockchain in under 60 seconds with our optimized infrastructure.',
    stat: '< 60s',
    statLabel: 'Deployment Time',
  },
  {
    id: 'security',
    icon: '🛡️',
    title: 'Enterprise Security',
    description: 'Bank-grade security with multi-sig wallets, audit trails, and compliance tools.',
    stat: '99.99%',
    statLabel: 'Security Uptime',
  },
  {
    id: 'scale',
    icon: '📈',
    title: 'Scalable Infra',
    description: 'Scale from testnet to mainnet seamlessly with auto-scaling infrastructure.',
    stat: '∞',
    statLabel: 'Scalability',
  },
  {
    id: 'support',
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
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [currentCard, setCurrentCard] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const titleEl = titleRef.current
    const cardsContainer = cardsContainerRef.current
    
    if (!section || !titleEl || !cardsContainer) return

    const ctx = gsap.context(() => {
      // Fade in animation for title
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

      // Fade in animation for cards container
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

      // Main scroll trigger with velocity-aware snap
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: false,
        scrub: 0.3,
        snap: {
          snapTo: (progress) => {
            const snapPoints = [0, 0.25, 0.5, 0.75, 1]
            const nearestIndex = Math.round(progress * 4)
            return snapPoints[nearestIndex] ?? 0
          },
          duration: { min: 0.2, max: 0.4 },
          ease: 'power2.out',
          delay: 0.1,
        },
        onUpdate: (self) => {
          const progress = self.progress
          const cardIndex = Math.min(Math.floor(progress * 4), 3)
          setCurrentCard(cardIndex)
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
      <div className="min-h-screen flex items-center px-6 lg:px-24 max-w-[1400px] mx-auto py-20">
        {/* Left Column - Static Content */}
        <div ref={titleRef} className="w-full lg:w-1/2 pr-0 lg:pr-16 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27279E]/30 bg-[#27279E]/10 text-[#27279E] text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="animate-pulse">✨</span>
            <span>Snap V1 is here</span>
          </div>
          
          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold text-[var(--text)] mb-6 leading-[1.1] tracking-tight">
            Everything you need to <span className="text-[#27279E]">build</span>
          </h2>
          
          {/* Subtext */}
          <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md leading-relaxed">
            From deployment to scaling, SnapChain provides all the tools you need to launch and manage blockchain infrastructure at any scale.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="btn-primary group">
              Get Started Free 
              <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
            </button>
            <button className="btn-secondary">
              View Documentation
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex gap-8 lg:gap-12">
            {snapStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-bold text-[var(--text)] tracking-tight">{stat.value}</div>
                <div className="text-[var(--text-muted)] text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Card Carousel */}
        <div ref={cardsContainerRef} className="hidden lg:block w-1/2 relative">
          {/* Cards Container */}
          <div className="relative h-[400px] overflow-hidden">
            {features.map((feature, index) => {
              const isActive = index === currentCard
              const isPast = index < currentCard
              const isFuture = index > currentCard
              
              return (
                <div
                  key={feature.id}
                  className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-between transition-all duration-700 ease-out"
                  style={{
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border)',
                    opacity: isActive ? 1 : 0,
                    transform: isPast 
                      ? 'translateX(-100%) scale(0.95)' 
                      : isFuture 
                        ? 'translateX(100%) scale(0.95)' 
                        : 'translateX(0) scale(1)',
                    zIndex: isActive ? 10 : 0,
                  }}
                >
                  <div>
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                      style={{ 
                        background: 'var(--bg-card-2)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      {feature.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-[#27279E] font-semibold text-xl mb-1">{feature.title}</h3>
                    
                    {/* Metric */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-[var(--text)] tracking-tight">{feature.stat}</span>
                      <span className="text-[var(--text-muted)] text-sm">{feature.statLabel}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-[var(--text-sub)] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Explore Button */}
                  <button 
                    className="w-fit px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 mt-6"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)'
                      e.currentTarget.style.color = 'var(--primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text)'
                    }}
                  >
                    Explore
                  </button>
                </div>
              )
            })}
          </div>

          {/* Node Network Tracker - Bottom Right */}
          <div className="flex justify-end mt-6">
            <div className="flex flex-col items-center gap-2">
              {/* SVG Node Network */}
              <svg width="120" height="24" viewBox="0 0 120 24" fill="none" aria-label={`Block ${String(currentCard + 1).padStart(2, '0')} of 04`}>
                {/* Connection Lines */}
                <line x1="12" y1="12" x2="36" y2="12" strokeWidth="2" 
                  stroke={currentCard >= 1 ? 'rgba(39, 39, 158, 0.3)' : '#27272a'} 
                  className="transition-all duration-500"/>
                <line x1="44" y1="12" x2="68" y2="12" strokeWidth="2" 
                  stroke={currentCard >= 2 ? 'rgba(39, 39, 158, 0.3)' : '#27272a'} 
                  className="transition-all duration-500"/>
                <line x1="76" y1="12" x2="100" y2="12" strokeWidth="2" 
                  stroke={currentCard >= 3 ? 'rgba(39, 39, 158, 0.3)' : '#27272a'} 
                  className="transition-all duration-500"/>
                
                {/* Node 1 */}
                <circle cx="12" cy="12" r="6" 
                  fill={currentCard >= 0 ? '#27279E' : '#27272a'} 
                  stroke={currentCard >= 0 ? '#27279E' : '#3f3f46'} 
                  strokeWidth="1.5"
                  className="transition-all duration-500"/>
                {currentCard === 0 && (
                  <circle cx="12" cy="12" r="12" fill="none" stroke="rgba(39, 39, 158, 0.4)" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="6;12" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                )}
                
                {/* Node 2 */}
                <circle cx="40" cy="12" r="6" 
                  fill={currentCard >= 1 ? '#27279E' : '#27272a'} 
                  stroke={currentCard >= 1 ? '#27279E' : '#3f3f46'} 
                  strokeWidth="1.5"
                  className="transition-all duration-500"/>
                {currentCard === 1 && (
                  <circle cx="40" cy="12" r="12" fill="none" stroke="rgba(39, 39, 158, 0.4)" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="6;12" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                )}
                
                {/* Node 3 */}
                <circle cx="68" cy="12" r="6" 
                  fill={currentCard >= 2 ? '#27279E' : '#27272a'} 
                  stroke={currentCard >= 2 ? '#27279E' : '#3f3f46'} 
                  strokeWidth="1.5"
                  className="transition-all duration-500"/>
                {currentCard === 2 && (
                  <circle cx="68" cy="12" r="12" fill="none" stroke="rgba(39, 39, 158, 0.4)" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="6;12" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                )}
                
                {/* Node 4 */}
                <circle cx="96" cy="12" r="6" 
                  fill={currentCard >= 3 ? '#27279E' : '#27272a'} 
                  stroke={currentCard >= 3 ? '#27279E' : '#3f3f46'} 
                  strokeWidth="1.5"
                  className="transition-all duration-500"/>
                {currentCard === 3 && (
                  <circle cx="96" cy="12" r="12" fill="none" stroke="rgba(39, 39, 158, 0.4)" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="6;12" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                )}
              </svg>
              
              {/* Counter Text */}
              <div className="text-[11px] tracking-wide font-mono">
                <span className="text-[var(--text-muted)]">Block </span>
                <span className="text-[#27279E] font-semibold">{String(currentCard + 1).padStart(2, '0')}</span>
                <span className="text-[var(--text-muted)]"> of </span>
                <span className="text-[var(--text-muted)]">04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
