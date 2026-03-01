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
  return (
    <section id="frameworks" className="relative py-16 overflow-hidden bg-[var(--bg)]">
      {/* Top border for curtain separation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27279E]/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text)] tracking-tight mb-4">
            Works with your <span className="text-gradient">favorite tools</span>
          </h2>
          <p className="text-lg text-[var(--text-sub)] max-w-2xl mx-auto">
            Seamlessly integrate with the most popular blockchain development frameworks and libraries.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {frameworks.map(fw => (
            <div key={fw.name} className="framework-card">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: fw.color }} />
              <span className="text-sm font-medium text-[var(--text)]">{fw.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-[var(--text-muted)] mb-4">Don&apos;t see your framework?</p>
          <button className="btn-secondary text-sm">Request Integration</button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />
    </section>
  )
}
