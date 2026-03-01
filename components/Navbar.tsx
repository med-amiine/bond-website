'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

// Dropdown data from website-1
const products = [
  { href: "/products/ace", label: "ACE", subtitle: "Agentic Credit Engine" },
  { href: "/products/bond-app", label: "Bond App", subtitle: "Agentic Credit" },
  { href: "/products/bondex", label: "Bondex", subtitle: "AI Smart Rebalancing" },
]

const agenticAlphaItems = [
  { href: "/agentic-alpha/agents", label: "Agents Live", tagline: "Real-time performance", live: true },
  { href: "/agentic-alpha/leaderboard", label: "Agentic Board", tagline: "Top strategies", live: false },
]

const resources = [
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "https://github.com/bond-dot-credit", label: "GitHub", external: true },
  { href: "/governance", label: "Governance" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(name)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl">
        <div className={`rounded-full px-4 sm:px-6 py-3 transition-all duration-500 flex items-center justify-between ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#27279E] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-semibold text-[var(--text)] text-lg tracking-tight hidden sm:block">bond.credit</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('products')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-0.5 px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] rounded-lg transition-all hover:bg-[var(--bg-card-2)]">
                Products
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'products' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'products' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-xl border border-[var(--border)] bg-[var(--bg-card)]"
                  onMouseEnter={() => handleDropdownEnter('products')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="p-2 flex flex-col gap-1">
                    {products.map((product, i) => (
                      <Link
                        key={i}
                        href={product.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-card-2)] transition-all group border border-transparent hover:border-[#27279E]/20"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[var(--bg-card-2)] flex items-center justify-center flex-shrink-0 border border-[var(--border)] group-hover:border-[#27279E]/30 transition-colors">
                          <span className="text-[#27279E] font-bold text-xs">{product.label[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-[var(--text)] group-hover:text-[#27279E] transition-colors block">
                            {product.label}
                          </span>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{product.subtitle}</p>
                        </div>
                        <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#27279E] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                  <div className="h-1 bg-gradient-to-r from-[#27279E]/30 via-[#3B3BB8]/20 to-transparent" />
                </div>
              )}
            </div>

            {/* Agentic Alpha Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('agentic')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-0.5 px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] rounded-lg transition-all hover:bg-[var(--bg-card-2)]">
                Agentic Alpha
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'agentic' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'agentic' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-xl border border-[var(--border)] bg-[var(--bg-card)]"
                  onMouseEnter={() => handleDropdownEnter('agentic')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="p-2 flex flex-col gap-1">
                    {agenticAlphaItems.map((item, i) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-card-2)] transition-all group border border-transparent hover:border-[#27279E]/20"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#27279E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#27279E]/20 transition-colors">
                          {i === 0 ? (
                            <svg className="w-5 h-5 text-[#27279E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-[#27279E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[var(--text)] group-hover:text-[#27279E] transition-colors">
                              {item.label}
                            </span>
                            {item.live && (
                              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-[10px] font-medium text-emerald-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.tagline}</p>
                        </div>
                        <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#27279E] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                  <div className="h-1 bg-gradient-to-r from-[#27279E]/30 via-[#3B3BB8]/20 to-transparent" />
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('resources')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-0.5 px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] rounded-lg transition-all hover:bg-[var(--bg-card-2)]">
                Resources
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'resources' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'resources' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-52 bg-[var(--bg-card)] rounded-2xl shadow-xl border border-[var(--border)] overflow-hidden"
                  onMouseEnter={() => handleDropdownEnter('resources')}
                  onMouseLeave={handleDropdownLeave}
                >
                  {resources.map((item, i) =>
                    item.external ? (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-2.5 px-4 hover:bg-[#27279E]/5 transition-colors group text-sm text-[var(--text-sub)] hover:text-[#27279E] border-b border-[var(--border)] last:border-0"
                      >
                        {item.label}
                        <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center gap-2 py-2.5 px-4 hover:bg-[#27279E]/5 transition-colors group text-sm text-[var(--text-sub)] hover:text-[#27279E] border-b border-[var(--border)] last:border-0"
                      >
                        {item.label}
                        <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            <Link href="/docs" className="px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-all">
              Docs
            </Link>
            <Link href="/contact" className="px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-all">
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/portfolio" className="hidden sm:flex items-center gap-2 btn-primary text-sm py-2 px-4">
              Launch app
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
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
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-[var(--bg)]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-20 left-4 right-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
            <nav className="space-y-1">
              <p className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Products
              </p>
              {products.map((product, i) => (
                <Link
                  key={i}
                  href={product.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-[var(--bg-card-2)] flex items-center justify-center overflow-hidden flex-shrink-0 border border-[var(--border)]">
                    <span className="text-[#27279E] font-bold text-xs">{product.label[0]}</span>
                  </span>
                  <div>
                    <span className="font-medium">{product.label}</span>
                    <span className="text-[var(--text-muted)] text-xs ml-2">{product.subtitle}</span>
                  </div>
                </Link>
              ))}
              <div className="border-t border-[var(--border)] my-2" />
              <p className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Agentic Alpha
              </p>
              {agenticAlphaItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#27279E]/10 flex items-center justify-center flex-shrink-0">
                    {item.live ? (
                      <svg className="w-4 h-4 text-[#27279E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-[#27279E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.label}</span>
                    {item.live && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 text-[10px] font-medium text-emerald-600">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                </Link>
              ))}
              <div className="border-t border-[var(--border)] my-2" />
              <p className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Resources
              </p>
              {resources.map((item, i) =>
                item.external ? (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="border-t border-[var(--border)] my-2" />
              <Link
                href="/docs"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-card-2)] rounded-lg transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
