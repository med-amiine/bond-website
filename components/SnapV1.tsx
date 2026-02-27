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
  const sectionRef = useRef<HTMLElement>(null)
  const [currentCard, setCurrentCard] = useState(1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cardElements = gsap.utils.toArray<HTMLElement>('.feature-card')
      
      // Set initial states - first card visible, others hidden below
      gsap.set(cardElements[0], { y: 0, opacity: 1, scale: 1 })
      cardElements.slice(1).forEach(card => {
        gsap.set(card, { y: 100, opacity: 0, scale: 0.95 })
      })

      // Main scroll trigger - FAST duration (150% instead of 300-400%)
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150%', // REDUCED: Faster scroll distance
        pin: true,
        scrub: 0.3, // REDUCED: Snappier response
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1], // Snap to exact card positions
          duration: { min: 0.1, max: 0.2 },
          ease: 'power2.out',
          delay: 0
        },
        onUpdate: (self) => {
          const progress = self.progress
          const rawIndex = progress * 4
          const currentIndex = Math.min(Math.floor(rawIndex), 3)
          const localProgress = rawIndex - currentIndex // 0-1 within current card transition
          
          setCurrentCard(currentIndex + 1)
          
          cardElements.forEach((card, i) => {
            if (i < currentIndex) {
              // Cards above - exited up
              gsap.set(card, { 
                y: -80, 
                opacity: 0, 
                scale: 0.92,
                zIndex: 10 - i 
              })
            } else if (i === currentIndex) {
              // Current card - entering/settling
              const yOffset = (1 - localProgress) * 60 // Start 60px down, settle to 0
              const scale = 0.95 + (0.05 * localProgress) // 0.95 to 1.0
              const opacity = Math.min(localProgress * 1.5, 1) // Faster fade in
              
              gsap.set(card, { 
                y: currentIndex === 0 ? 0 : yOffset, 
                opacity: currentIndex === 0 ? 1 : opacity, 
                scale: currentIndex === 0 ? 1 : scale,
                zIndex: 20 
              })
            } else {
              // Cards below - waiting to enter
              gsap.set(card, { 
                y: 80, 
                opacity: 0, 
                scale: 0.95,
                zIndex: 10 - i 
              })
            }
          })
        }
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
        <div className="w-full lg:w-1/2 pr-0 lg:pr-16 z-10">
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

        {/* Right Column - Stacked Cards */}
        <div className="hidden lg:block w-1/2 relative h-[420px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card absolute inset-0 bg-[#111111] border border-[#27272a] rounded-2xl p-8 flex flex-col justify-between backdrop-blur-sm"
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                zIndex: 4 - index // Lightning Fast (index 0) = z-4, etc.
              }}
            >
              <div>
                {/* Icon */}
                <div className="w-12 h-12 bg-[#ccff00]/10 rounded-xl flex items-center justify-center text-[#ccff00] text-2xl mb-6">
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-[#ccff00] font-semibold text-lg mb-1">{feature.title}</h3>
                
                {/* Metric */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-white tracking-tight">{feature.stat}</span>
                  <span className="text-[#71717a] text-sm">{feature.statLabel}</span>
                </div>
                
                {/* Description */}
                <p className="text-[#a1a1aa] leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
              
              {/* Explore Button */}
              <button className="w-fit px-6 py-2.5 border border-[#27272a] text-white rounded-full text-sm font-medium hover:border-[#ccff00]/50 hover:text-[#ccff00] transition-all duration-300 mt-6">
                Explore
              </button>
            </div>
          ))}

          {/* Progress Indicator - Lines Above AND Below */}
          <div className="absolute -bottom-20 left-0 right-0 flex flex-col items-center">
            {/* TOP LINE - New addition */}
            <div className="w-28 h-[3px] bg-[#27272a] rounded-full mb-3 overflow-hidden">
              <div 
                className="h-full bg-[#ccff00] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentCard / 4) * 100}%` }}
              />
            </div>
            
            {/* Counter */}
            <div className="flex items-center gap-3 font-mono text-sm tabular-nums">
              <span className="text-[#ccff00] font-bold text-base min-w-[20px] text-center">
                {currentCard}
              </span>
              <span className="text-[#71717a]">/</span>
              <span className="text-[#71717a] min-w-[20px] text-center">4</span>
            </div>
            
            {/* BOTTOM LINE */}
            <div className="w-28 h-[3px] bg-[#27272a] rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-[#ccff00] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentCard / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
