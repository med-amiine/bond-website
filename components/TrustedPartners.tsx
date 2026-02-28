const partners = [
  { name: 'a16z', abbr: 'a16z' },
  { name: 'Coinbase Ventures', abbr: 'CB' },
  { name: 'Polychain', abbr: 'PC' },
  { name: 'Paradigm', abbr: 'PD' },
  { name: 'Sequoia', abbr: 'SQ' },
  { name: 'Binance Labs', abbr: 'BL' },
  { name: 'Multicoin', abbr: 'MC' },
  { name: 'Pantera', abbr: 'PT' },
  { name: 'Dragonfly', abbr: 'DF' },
  { name: 'Framework', abbr: 'FW' },
  { name: 'Electric', abbr: 'EC' },
  { name: 'Galaxy', abbr: 'GX' },
]

const bullets = [
  'Strategic investment from top VCs',
  'Technical partnerships with leading protocols',
  'Enterprise clients across industries',
]

export default function TrustedPartners() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Partner logos grid with fade mask */}
          <div className="relative overflow-visible">
            {/* Grid with padding for glow */}
            <div className="grid grid-cols-4 gap-4 px-4 py-4">
              {partners.map((p, i) => (
                <div key={i} className="partner-logo group">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-[#1a1a1a] flex items-center justify-center mb-2 group-hover:bg-[#27279E]/10 group-hover:shadow-[0_0_20px_rgba(132,204,134,0.4)] group-hover:ring-1 group-hover:ring-[#27279E]/30 transition-all duration-300">
                      <span className="text-lg font-bold text-[var(--text-muted)] group-hover:text-[#27279E] transition-colors duration-300">{p.abbr}</span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-sub)] transition-colors duration-300">{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fade masks - positioned absolutely over the grid */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-20" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
          </div>

          {/* Right text */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-6">
              Our Trusted <span className="text-gradient">Partners</span>
            </h2>
            <p className="text-lg text-[var(--text-sub)] mb-8 leading-relaxed">
              We proudly collaborate with industry leaders to bring you the best in innovation,
              reliability, and success. Our partners share our vision of making blockchain
              infrastructure accessible to everyone.
            </p>
            <div className="space-y-4 mb-8">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#27279E]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#27279E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[var(--text-sub)]">{b}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary">Become a Partner</button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />
    </section>
  )
}
