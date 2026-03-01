'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const features = [
  { title: 'One-Click Deposit', description: 'Simple and intuitive interface. Deposit USDC in seconds and start earning immediately.' },
  { title: 'Auto-Rebalancing', description: 'AI agents continuously monitor and rebalance your portfolio for optimal returns.' },
  { title: 'Non-Custodial', description: 'You always maintain control of your assets. We never hold your private keys.' },
  { title: 'Real-Time Analytics', description: 'Track your portfolio performance, yield accumulation, and historical returns.' },
  { title: 'Instant Withdrawals', description: 'Access your funds anytime with our liquidity buffer system. No lock-up periods.' },
  { title: 'Gas Optimization', description: 'Smart transaction batching reduces gas fees and maximizes your returns.' },
]

const protocols = ['Aave', 'Compound', 'Morpho', 'Euler', 'Moonwell', 'Spark', 'Seamless']

export default function BondAppPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      <Navbar />
      <main className="pt-32 pb-12 relative z-10">
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[#27279E] mb-8 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#27279E]/10 rounded-full mb-6">
                  <svg className="w-4 h-4 text-[#27279E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-xs font-medium text-[#27279E]">Yield Optimization</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
                  Bond App
                  <span className="block text-xl md:text-2xl font-normal text-[var(--text-muted)] mt-2">Smart Vault Management</span>
                </h1>
                <p className="text-lg text-[var(--text-sub)] mb-8 leading-relaxed">
                  The easiest way to earn optimized yield on your crypto assets. 
                  Deposit once, and our AI agents handle the rest—automatically 
                  allocating across the best DeFi protocols.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/portfolio" className="btn-primary">
                    Launch App
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link href="/docs" className="btn-secondary">
                    Learn More
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#27279E]/20 to-[#3B3BB8]/20 rounded-3xl flex items-center justify-center border border-[#27279E]/20">
                  <div className="text-center">
                    <svg className="w-24 h-24 text-[#27279E]/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <p className="text-sm text-[var(--text-muted)]">Bond App Interface</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[var(--bg-card)] rounded-2xl p-4 shadow-xl border border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#27279E]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#27279E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Current APY</p>
                      <p className="text-lg font-bold text-[#27279E]">11.3%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-16 bg-gradient-to-b from-transparent to-[#27279E]/[0.02]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-[#27279E] uppercase tracking-wider mb-4 block">Features</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">Why Choose Bond App</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[#27279E]/30 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#27279E]/10 flex items-center justify-center mb-4 group-hover:bg-[#27279E]/20 transition-colors">
                    <span className="text-lg font-bold text-[#27279E]">{i + 1}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-[#27279E] uppercase tracking-wider mb-4 block">Simple Process</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">How It Works</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Connect Wallet', desc: 'Link your wallet securely with one click. No registration required.' },
                { step: '02', title: 'Deposit USDC', desc: 'Add funds to your vault. Minimum deposit is just $10.' },
                { step: '03', title: 'Earn Yield', desc: 'AI agents optimize your returns automatically. Watch your balance grow.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#27279E]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#27279E]">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Supported Protocols */}
        <section className="py-16 bg-gradient-to-b from-[#27279E]/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-[#27279E] uppercase tracking-wider mb-4 block">Integrations</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">Supported Protocols</h2>
            </div>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {protocols.map((protocol, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-card-2)] flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-[#27279E]">{protocol.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">{protocol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#27279E] to-[#3B3BB8] rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Start earning today
                </h2>
                <p className="text-white/80 mb-8 max-w-md mx-auto">
                  Join thousands of users already earning optimized yield with Bond App.
                </p>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#27279E] rounded-xl font-semibold hover:shadow-xl transition-all">
                  Launch App
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
