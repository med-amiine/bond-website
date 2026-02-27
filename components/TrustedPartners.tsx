const partners = [
  { name: 'a16z', abbr: 'a16z' },
  { name: 'Coinbase Ventures', abbr: 'CB' },
  { name: 'Polychain', abbr: 'PC' },
  { name: 'Paradigm', abbr: 'PD' },
  { name: 'Sequoia', abbr: 'SQ' },
  { name: 'Binance Labs', abbr: 'BL' },
]

const bullets = [
  'Strategic investment from top VCs',
  'Technical partnerships with leading protocols',
  'Enterprise clients across industries',
]

export default function TrustedPartners() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Partner logos grid */}
          <div className="grid grid-cols-3 gap-4">
            {partners.map((p, i) => (
              <div key={i} className="partner-logo group">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#1a1a1a] flex items-center justify-center mb-2 group-hover:bg-[#ccff00]/10 transition-colors duration-300">
                    <span className="text-lg font-bold text-[#71717a] group-hover:text-[#ccff00] transition-colors duration-300">{p.abbr}</span>
                  </div>
                  <span className="text-xs text-[#71717a] group-hover:text-[#a1a1aa] transition-colors duration-300">{p.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right text */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
              Our Trusted <span className="text-gradient">Partners</span>
            </h2>
            <p className="text-lg text-[#a1a1aa] mb-8 leading-relaxed">
              We proudly collaborate with industry leaders to bring you the best in innovation,
              reliability, and success. Our partners share our vision of making blockchain
              infrastructure accessible to everyone.
            </p>
            <div className="space-y-4 mb-8">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ccff00]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#ccff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#a1a1aa]">{b}</span>
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
