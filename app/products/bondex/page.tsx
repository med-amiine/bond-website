'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const features = [
  { title: 'AI-Powered Decisions', description: 'Machine learning algorithms analyze market conditions and automatically decide when to rebalance.' },
  { title: 'Risk Management', description: 'Smart risk assessment ensures your portfolio stays within your preferred risk tolerance.' },
  { title: 'Gas Optimization', description: 'Intelligent batching and timing of rebalancing transactions to minimize gas costs.' },
  { title: 'Yield Tracking', description: 'Monitor how rebalancing improves your returns with detailed performance analytics.' },
  { title: 'Automated Execution', description: 'Set your preferences once and let Bondex handle all rebalancing automatically.' },
  { title: 'Multi-Vault Support', description: 'Rebalance across multiple vault types including stablecoins, ETH, and altcoins.' },
]

const steps = [
  { step: '01', title: 'Monitor', desc: 'AI continuously monitors yield rates across all supported vaults' },
  { step: '02', title: 'Analyze', desc: 'Machine learning models identify optimal rebalancing opportunities' },
  { step: '03', title: 'Execute', desc: 'Smart contracts execute rebalancing at the most gas-efficient times' },
  { step: '04', title: 'Optimize', desc: 'Portfolio is continuously fine-tuned for maximum returns' },
]

const stats = [
  { value: '+23%', label: 'Avg Yield Improvement' },
  { value: '-42%', label: 'Gas Cost Reduction' },
  { value: '<2s', label: 'Rebalance Decision Time' },
  { value: '24/7', label: 'Active Monitoring' },
]

export default function BondexPage() {
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs font-medium text-[#27279E]">AI Rebalancing</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
                  Bondex
                  <span className="block text-xl md:text-2xl font-normal text-[var(--text-muted)] mt-2">Smart Rebalancing Between Vaults</span>
                </h1>
                <p className="text-lg text-[var(--text-sub)] mb-8 leading-relaxed">
                  Advanced AI-driven rebalancing system that seamlessly moves your assets between
                  different yield vaults to maximize returns while minimizing risk and gas costs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/portfolio" className="btn-primary">
                    Start Rebalancing
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link href="/docs" className="btn-secondary">
                    View Docs
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#27279E]/20 to-[#3B3BB8]/20 rounded-3xl flex items-center justify-center border border-[#27279E]/20">
                  <div className="text-center">
                    <svg className="w-24 h-24 text-[#27279E]/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <p className="text-sm text-[var(--text-muted)]">Bondex Rebalancing Flow</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-[var(--bg-card)] rounded-2xl p-4 shadow-xl border border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">Optimized</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[var(--bg-card)] rounded-2xl p-4 shadow-xl border border-[var(--border)]">
                  <div className="text-center">
                    <p className="text-xs text-[var(--text-muted)]">Gas Saved</p>
                    <p className="text-lg font-bold text-[#27279E]">42%</p>
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
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">Intelligent Rebalancing</h2>
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
              <span className="text-xs font-medium text-[#27279E] uppercase tracking-wider mb-4 block">Process</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">How Bondex Works</h2>
            </div>
            
            <div className="relative">
              <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#27279E]/20 via-[#27279E] to-[#27279E]/20 hidden md:block" />
              <div className="grid md:grid-cols-4 gap-8">
                {steps.map((item, i) => (
                  <div key={i} className="text-center relative">
                    <div className="w-16 h-16 rounded-2xl bg-[#27279E] flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Performance Stats */}
        <section className="py-16 bg-[var(--bg-card)] rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">Performance Metrics</h2>
              <p className="text-[var(--text-muted)] mt-2">Real results from Bondex rebalancing</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-[#27279E] mb-2">{stat.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#27279E] to-[#3B3BB8] rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Maximize your yield potential
                </h2>
                <p className="text-white/80 mb-8 max-w-md mx-auto">
                  Let AI optimize your portfolio allocation across vaults automatically.
                </p>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#27279E] rounded-xl font-semibold hover:shadow-xl transition-all">
                  Enable Bondex
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
