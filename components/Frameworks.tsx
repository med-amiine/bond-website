'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frameworks = [
  { name: 'Hardhat', color: '#fff100' },
  { name: 'Foundry', color: '#00b4d8' },
  { name: 'Truffle', color: '#c09a7a' },
  { name: 'Ethers.js', color: '#6270c9' },
  { name: 'Web3.js', color: '#f16822' },
  { name: 'Viem', color: '#ffffff' },
  { name: 'Wagmi', color: '#a1a1aa' },
  { name: 'RainbowKit', color: '#c084fc' },
  { name: 'ThirdWeb', color: '#f213a4' },
  { name: 'OpenZeppelin', color: '#4e5ee4' },
  { name: 'Chainlink', color: '#375bd2' },
  { name: 'The Graph', color: '#6747ed' },
]

export default function Frameworks() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const titleEl = titleRef.current
    const gridEl = gridRef.current

    if (!section || !titleEl || !gridEl) return

    const ctx = gsap.context(() => {
      // Fade in title
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

      // Fade in grid items with stagger
      const items = gsap.utils.toArray<HTMLElement>('.framework-item')
      gsap.from(items, {
        scrollTrigger: {
          trigger: gridEl,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="tools-section" 
      className="relative min-h-screen py-32 overflow-hidden bg-[#050505]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with fade-in */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Works with your <span className="text-gradient">favorite tools</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            Seamlessly integrate with the most popular blockchain development frameworks and libraries.
          </p>
        </div>

        {/* Grid with staggered fade-in */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {frameworks.map((fw) => (
            <div 
              key={fw.name} 
              className="framework-item framework-card"
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: fw.color }} />
              <span className="text-sm font-medium text-white">{fw.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-[#71717a] mb-4">Don&apos;t see your framework?</p>
          <button className="btn-secondary text-sm">Request Integration</button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />
    </section>
  )
}
