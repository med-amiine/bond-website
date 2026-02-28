'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

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
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Floating pill navbar - blends in when at top, detaches when scrolled */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl">
        <div className={`rounded-full px-4 sm:px-6 py-3 transition-all duration-500 flex items-center justify-between ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div className="w-8 h-8 rounded-lg bg-[#27279E] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-[var(--text)] text-lg tracking-tight hidden sm:block">SnapChain</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] transition-colors duration-300 rounded-full hover:bg-[var(--bg-card-2)]">
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="hidden sm:block px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] transition-colors duration-300">
              Sign In
            </button>
            <button className="btn-primary text-sm py-2 px-4">Get Started</button>
            <button
              className="md:hidden p-2 text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-full transition-colors"
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
        <div className="absolute inset-0 bg-[var(--bg)]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className="absolute top-20 left-4 right-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <button key={link.label}
                onClick={() => { scrollToSection(link.href); setMenuOpen(false) }}
                className="px-4 py-3 text-left text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-xl transition-all duration-300">
                {link.label}
              </button>
            ))}
            <hr className="border-[var(--border)] my-2" />
            <button className="px-4 py-3 text-left text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-xl transition-all duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
