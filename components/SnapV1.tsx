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

      // Main scroll trigger
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.3,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1],
          duration: { min: 0.1, max: 0.2 },
          ease: 'power2.out',
          delay: 0,
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
      className="relative z-20 bg-[#050505]"
    >
      <div className="sticky top-0 h-screen flex items-center px-6 lg:px-24 max-w-[1400px] mx-auto">
        {/* Left Column - Static Content */}
        <div ref={titleRef} className="w-full lg:w-1/2 pr-0 lg:pr-16 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00] text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="animate-pulse">✨</span>
            <span>Snap V1 is here</span>
          </div>
          
          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Everything you need to <span className="text-[#ccff00]">build</span>
          </h2>
          
          {/* Subtext */}
          <p className="text-[#71717a] text-lg mb-8 max-w-md leading-relaxed">
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
                <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-[#71717a] text-sm mt-1">{stat.label}</div>
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
                    background: 'rgba(20, 20, 20, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
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
                        background: 'rgba(39, 39, 42, 0.5)',
                        border: '1px solid rgba(63, 63, 70, 1)'
                      }}
                    >
                      {feature.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-[#c8ff00] font-semibold text-xl mb-1">{feature.title}</h3>
                    
                    {/* Metric */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-white tracking-tight">{feature.stat}</span>
                      <span className="text-zinc-500 text-sm">{feature.statLabel}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Explore Button */}
                  <button 
                    className="w-fit px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 mt-6"
                    style={{
                      border: '1px solid rgba(63, 63, 70, 1)',
                      color: 'white',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(204, 255, 0, 0.5)'
                      e.currentTarget.style.color = '#ccff00'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 1)'
                      e.currentTarget.style.color = 'white'
                    }}
                  >
                    Explore
                  </button>
                </div>
              )
            })}
          </div>

          {/* Dual Tracker - Bottom Right */}
          <div className="flex justify-end mt-6">
            <div 
              className="flex items-center gap-3 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(24, 24, 27, 0.5)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(39, 39, 42, 1)',
              }}
            >
              {/* Fraction Counter */}
              <div className="flex items-center gap-1 text-sm font-medium tabular-nums">
                <span className="text-[#c8ff00] w-5 text-right">
                  {String(currentCard + 1).padStart(2, '0')}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-500 w-5">04</span>
              </div>
              
              {/* Divider */}
              <div className="w-px h-4 bg-zinc-700"></div>
              
              {/* Segmented Progress */}
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((segment) => (
                  <div
                    key={segment}
                    className="h-1 w-6 rounded-full transition-all duration-500"
                    style={{
                      background: segment <= currentCard ? '#c8ff00' : 'rgba(39, 39, 42, 1)',
                      opacity: segment < currentCard ? 0.3 : 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
