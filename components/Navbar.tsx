'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Frameworks', href: '#frameworks' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
]

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      
      // Add background after scrolling 20px
      setScrolled(currentScrollY > 20)
      
      // Hide navbar after scrolling down past 300px
      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        setHidden(true)
      } else {
        // Show navbar when scrolling up or near top
        setHidden(false)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Fixed navbar at top - detaches/hides after scrolling down */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className={`w-full transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#27272a]' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a 
                href="#" 
                className="flex items-center gap-2 group" 
                onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#ccff00] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <span className="text-[#050505] font-bold text-sm">S</span>
                </div>
                <span className="font-semibold text-white text-lg tracking-tight hidden sm:block">SnapChain</span>
              </a>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(link => (
                  <button 
                    key={link.label} 
                    onClick={() => scrollToSection(link.href)}
                    className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2">
                <button className="hidden sm:block px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors duration-300">
                  Sign In
                </button>
                <button className="btn-primary text-sm py-2 px-4">Get Started</button>
                <button
                  className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[99] md:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className="absolute top-20 left-4 right-4 bg-[#111111] border border-[#27272a] rounded-2xl p-6">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <button 
                key={link.label}
                onClick={() => { scrollToSection(link.href); setMenuOpen(false) }}
                className="px-4 py-3 text-left text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            <hr className="border-[#27272a] my-2" />
            <button className="px-4 py-3 text-left text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
