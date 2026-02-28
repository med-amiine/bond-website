'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '10K+', label: 'Developers' },
  { value: '50M+', label: 'Transactions' },
  { value: '99.9%', label: 'Uptime' },
]

const codeLines = [
  { num: '1', tokens: [{ color: '#ccff00', text: 'import' }, { color: '#fff', text: ' { SnapChain } ' }, { color: '#ccff00', text: 'from' }, { color: '#a3e635', text: " 'snapchain'" }, { color: '#fff', text: ';' }] },
  { num: '2', tokens: [] },
  { num: '3', tokens: [{ color: '#ccff00', text: 'const' }, { color: '#fff', text: ' chain = ' }, { color: '#ccff00', text: 'new' }, { color: '#fff', text: ' SnapChain(' }] },
  { num: '4', tokens: [{ color: '#fff', text: '  network: ' }, { color: '#a3e635', text: "'mainnet'" }, { color: '#fff', text: ',' }] },
  { num: '5', tokens: [{ color: '#fff', text: '  consensus: ' }, { color: '#a3e635', text: "'poa'" }, { color: '#fff', text: ',' }] },
  { num: '6', tokens: [{ color: '#fff', text: '});' }] },
  { num: '7', tokens: [] },
  { num: '8', tokens: [{ color: '#71717a', text: '// Deploy in seconds' }] },
  { num: '9', tokens: [{ color: '#ccff00', text: 'await' }, { color: '#fff', text: ' chain.' }, { color: '#ccff00', text: 'deploy' }, { color: '#fff', text: '(); ' }, { color: '#71717a', text: '// Done! 🚀' }] },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const subtext = subtextRef.current
    const buttons = buttonsRef.current
    const stats = statsRef.current
    const code = codeRef.current

    if (!section || !headline || !subtext || !buttons || !stats || !code) return

    const ctx = gsap.context(() => {
      // Set initial hidden state (inline styles handle SSR, this ensures JS state)
      gsap.set([headline, subtext, buttons, stats, code], { opacity: 0, visibility: 'hidden', y: 30 })

      // Create timeline for sequential fade in
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      })

      // Headline first
      tl.to(headline, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
      // Subtext second
      .to(subtext, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')
      // Buttons third
      .to(buttons, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      // Stats fourth
      .to(stats, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      // Code block last
      .to(code, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.3')
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative bg-[#050505] min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-glow opacity-50" />
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0" />
              <stop offset="50%" stopColor="#ccff00" stopOpacity="1" />
              <stop offset="100%" stopColor="#ccff00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#lineGrad)" strokeWidth="1" className="animate-pulse" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="url(#lineGrad)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#27272a] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="text-sm text-[#a1a1aa]">Now in Public Beta</span>
          </div>

          {/* Headline - starts hidden, fades in */}
          <h1 ref={headlineRef} style={{ opacity: 0, visibility: 'hidden' }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Build on <span className="text-gradient">Blockchain</span>
            <br />at Lightning Speed
          </h1>

          {/* Subtext - starts hidden, fades in */}
          <p ref={subtextRef} style={{ opacity: 0, visibility: 'hidden' }} className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform for deploying, scaling, and managing blockchain infrastructure.
            From testnet to mainnet in minutes, not months.
          </p>

          {/* Buttons - starts hidden, fades in */}
          <div ref={buttonsRef} style={{ opacity: 0, visibility: 'hidden' }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary group text-base px-8 py-4">
              Start Building Free
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="btn-secondary group text-base px-8 py-4">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-[#ccff00]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Stats - starts hidden, fades in */}
          <div ref={statsRef} style={{ opacity: 0, visibility: 'hidden' }} className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-[#27272a]">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-sm text-[#71717a]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code block - starts hidden, fades in last */}
        <div ref={codeRef} style={{ opacity: 0, visibility: 'hidden' }} className="relative mt-20 mx-auto max-w-5xl">
          <div className="relative rounded-2xl overflow-hidden border border-[#27272a] bg-[#111111]">
            {/* Green glow inside code block */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#ccff00]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-[#27272a]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-[#71717a]">deploy.js</span>
              </div>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="flex gap-4">
                <div className="text-[#71717a] select-none leading-6">
                  {codeLines.map(l => <div key={l.num}>{l.num}</div>)}
                </div>
                <div className="flex-1 leading-6">
                  {codeLines.map((line, i) => (
                    <div key={i}>
                      {line.tokens.map((tok, j) => (
                        <span key={j} style={{ color: tok.color }}>{tok.text}</span>
                      ))}
                    </div>
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
