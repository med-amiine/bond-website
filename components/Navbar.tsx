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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl">
        <div className={`navbar-pill flex items-center justify-between ${scrolled ? 'navbar-scrolled' : 'bg-[#111111]/80 border border-[#27272a]'}`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div className="w-8 h-8 rounded-lg bg-[#ccff00] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-[#050505] font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-white text-lg tracking-tight hidden sm:block">SnapChain</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5">
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
              onClick={() => setMenuOpen(!menuOpen)}>
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

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className="absolute top-20 left-4 right-4 bg-[#111111] border border-[#27272a] rounded-2xl p-6">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <button key={link.label}
                onClick={() => { scrollToSection(link.href); setMenuOpen(false) }}
                className="px-4 py-3 text-left text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300">
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
