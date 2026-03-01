'use client'

import Link from 'next/link'

const features = [
  { title: 'Real-Time Analytics', description: 'Continuous monitoring of on-chain activity, transaction history, and wallet behavior to assess creditworthiness.' },
  { title: 'Risk Assessment', description: 'Multi-dimensional risk scoring using machine learning models trained on millions of DeFi interactions.' },
  { title: 'Instant Decisions', description: 'Sub-second credit evaluations enabling immediate lending decisions without traditional delays.' },
  { title: 'Privacy Preserving', description: 'Zero-knowledge proofs ensure user privacy while maintaining transparent credit scoring.' },
  { title: 'Adaptive Learning', description: 'AI models continuously improve based on repayment patterns and market conditions.' },
  { title: 'Cross-Chain Data', description: 'Aggregates credit data from multiple blockchains for comprehensive risk profiles.' },
]

const stats = [
  { value: '99.7%', label: 'Accuracy Rate' },
  { value: '<1s', label: 'Decision Time' },
  { value: '2M+', label: 'Wallets Analyzed' },
  { value: '$500M', label: 'Credit Extended' },
]

export default function ACEPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-medium text-[#27279E]">AI-Powered</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
                  ACE
                  <span className="block text-xl md:text-2xl font-normal text-[var(--text-muted)] mt-2">Agentic Credit Engine</span>
                </h1>
                <p className="text-lg text-[var(--text-sub)] mb-8 leading-relaxed">
                  Revolutionary AI-powered credit scoring system that evaluates borrower risk 
                  in real-time using on-chain data, behavioral analytics, and machine learning.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/portfolio" className="btn-primary">
                    Try ACE
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link href="/docs" className="btn-secondary">
                    Documentation
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#27279E]/20 to-[#3B3BB8]/20 rounded-3xl flex items-center justify-center border border-[#27279E]/20">
                  <div className="text-center">
                    <svg className="w-24 h-24 text-[#27279E]/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-[var(--text-muted)]">ACE Dashboard Preview</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[var(--bg-card)] rounded-2xl p-4 shadow-xl border border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Risk Score</p>
                      <p className="text-lg font-bold text-[var(--text)]">94.2</p>
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
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">How ACE Works</h2>
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
        
        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[var(--bg-card)] rounded-3xl p-8 md:p-12 border border-[var(--border)]">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl md:text-4xl font-bold text-[#27279E] mb-2">{stat.value}</div>
                    <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
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
                  Ready to transform your lending?
                </h2>
                <p className="text-white/80 mb-8 max-w-md mx-auto">
                  Join leading DeFi protocols using ACE for intelligent credit scoring.
                </p>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#27279E] rounded-xl font-semibold hover:shadow-xl transition-all">
                  Get Started
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
