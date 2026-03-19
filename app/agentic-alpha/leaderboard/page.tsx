'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AGENT_DATA = [
  {
    rank: 1, agent: 'Sail.Money', color: '#3b82f6', grade: 'A+', gradeClass: 'grade-ap',
    bondScore: 91, aua: 2018.94, aum: 2018.94, nativeYield: 36.65, rewards: 0.10,
    capitalApy: '6.41%', sharpe: 2.31, signal: 'safe',
    perf: 78, risk: 94, stab: 92, prov: 89, sent: 85,
  },
  {
    rank: 2, agent: 'ZyFAI', color: '#a855f7', grade: 'A', gradeClass: 'grade-a',
    bondScore: 85, aua: 2057.58, aum: 2057.58, nativeYield: 57.58, rewards: 0,
    capitalApy: '10.17%', sharpe: 1.89, signal: 'safe',
    perf: 88, risk: 88, stab: 76, prov: 82, sent: 79,
  },
  {
    rank: 3, agent: 'Giza', color: '#ccff00', grade: 'A', gradeClass: 'grade-a',
    bondScore: 82, aua: 2079.92, aum: 2030.36, nativeYield: 30.36, rewards: 49.56,
    capitalApy: '14.30%', sharpe: 1.42, signal: 'caution',
    perf: 85, risk: 72, stab: 80, prov: 77, sent: 74,
  },
  {
    rank: 4, agent: 'Surf', color: '#f97316', grade: 'B+', gradeClass: 'grade-bp',
    bondScore: 72, aua: 2091.50, aum: 2033.94, nativeYield: 33.94, rewards: 57.56,
    capitalApy: '16.49%', sharpe: 0.98, signal: 'caution',
    perf: 90, risk: 58, stab: 68, prov: 65, sent: 61,
  },
  {
    rank: 5, agent: 'Mamo', color: '#22c55e', grade: 'B', gradeClass: 'grade-b',
    bondScore: 67, aua: 2030.00, aum: 2027.49, nativeYield: 27.49, rewards: 2.51,
    capitalApy: '5.21%', sharpe: 1.12, signal: 'caution',
    perf: 62, risk: 70, stab: 64, prov: 60, sent: 58,
  },
];

const SEASON_KPIS = [
  { label: 'Total Volume',  value: '$761,806', sub: '107 days',    color: 'var(--lime)' },
  { label: 'Total Yield',   value: '$295.75',  sub: 'Genesis',     color: 'var(--green)' },
  { label: 'Capital APY',   value: '10.45%',   sub: 'blended',     color: 'var(--lime)' },
  { label: 'Native APY',    value: '6.49%',    sub: 'ex-rewards',  color: 'var(--green)' },
  { label: 'Risk-Adj APY',  value: '8.47%',    sub: '0.5× reward', color: 'var(--amber)' },
];

type Agent = typeof AGENT_DATA[0];

function DimMiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ flex: 1, height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: '2px' }} />
    </div>
  );
}

function AgentRow({ agent, isExpanded, onToggle }: { agent: Agent; isExpanded: boolean; onToggle: () => void }) {
  const rankColor = agent.rank === 1 ? 'var(--lime)' : agent.rank === 2 ? 'var(--s1)' : agent.rank === 3 ? 'var(--amber)' : 'var(--s2)';
  const fmt = (v: number) => `$${v.toFixed(2)}`;

  return (
    <>
      <tr
        style={{ cursor: 'pointer', borderBottom: '1px solid var(--border)', transition: 'background 0.12s', background: isExpanded ? 'var(--card2)' : 'transparent' }}
        onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLElement).style.background = 'var(--card2)'; }}
        onMouseLeave={e => { if (!isExpanded) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        onClick={onToggle}
      >
        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${rankColor}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: rankColor }}>
            {agent.rank}
          </span>
        </td>
        <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: agent.color, flexShrink: 0 }} />
            <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.875rem' }}>{agent.agent}</span>
            <span className={`grade ${agent.gradeClass}`}>{agent.grade}</span>
          </div>
        </td>
        <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontWeight: 600, color: agent.color }}>{fmt(agent.aua)}</td>
        <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', color: 'var(--text-sub)' }}>{fmt(agent.aum)}</td>
        <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', color: '#22c55e' }}>{fmt(agent.nativeYield)}</td>
        <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', color: 'var(--text-sub)' }}>{fmt(agent.rewards)}</td>
        <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--lime)' }}>{agent.capitalApy}</td>
        <td style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: '1rem', color: agent.color, lineHeight: 1 }}>{agent.bondScore}</span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>/100</span>
          </div>
        </td>
        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-muted)', transform: isExpanded ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▾</span>
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={9} style={{ padding: 0, background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ padding: '16px 24px', borderLeft: `3px solid ${agent.color}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Bond score breakdown */}
                <div style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                    Bond Score Breakdown
                  </div>
                  {[
                    { l: 'PERF', v: agent.perf },
                    { l: 'RISK', v: agent.risk },
                    { l: 'STAB', v: agent.stab },
                    { l: 'PROV', v: agent.prov },
                    { l: 'SENT', v: agent.sent },
                  ].map(d => (
                    <div key={d.l} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ width: '28px', fontSize: '0.5625rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{d.l}</span>
                      <DimMiniBar value={d.v} color={agent.color} />
                      <span style={{ width: '20px', textAlign: 'right', fontSize: '0.6875rem', fontFamily: 'var(--mono)', color: 'var(--text-sub)' }}>{d.v}</span>
                    </div>
                  ))}
                </div>

                {/* Season stats */}
                <div style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                    Season Stats
                  </div>
                  {[
                    { l: 'Capital APY',  v: agent.capitalApy,           color: 'var(--lime)' },
                    { l: 'Sharpe Ratio', v: agent.sharpe.toFixed(2),     color: 'var(--text)' },
                    { l: 'Bond Score',   v: `${agent.bondScore}/100`,    color: agent.color },
                    { l: 'Signal',       v: agent.signal === 'safe' ? '✓ Safe' : '⚠ Caution', color: agent.signal === 'safe' ? '#22c55e' : '#f59e0b' },
                  ].map(m => (
                    <div key={m.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{m.l}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8125rem', fontWeight: 700, color: m.color }}>{m.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function LeaderboardPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Ticker bar */}
      <div className="relative overflow-hidden hidden lg:block" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', height: '36px' }}>
        <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-card), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-card), transparent)' }} />
        <div style={{ overflow: 'hidden', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', whiteSpace: 'nowrap' }} className="animate-scroll-ticker">
            {[...Array(3)].flatMap((_, gi) =>
              [
                { symbol: 'BTC',  price: '$68,003', change: '-0.27%', up: false },
                { symbol: 'ETH',  price: '$1,972',  change: '-0.05%', up: false },
                { symbol: 'MAMO', price: '$0.0100', change: '-0.03%', up: false },
                { symbol: 'GIZA', price: '$0.0200', change: '+7.82%', up: true  },
              ].map((t, i) => (
                <div key={`${gi}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 24px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.05em' }}>${t.symbol}</span>
                  <span style={{ color: 'var(--text)', fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 600 }}>{t.price}</span>
                  <span style={{ color: t.up ? '#22c55e' : '#ef4444', fontSize: '0.6875rem', fontFamily: 'var(--mono)' }}>{t.change}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <div className="wt-container" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span className="stag">Agentic Alpha</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Nov 5, 2024 – Feb 19, 2025</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.1, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Agent <span style={{ color: 'var(--primary)' }}>Leaderboard</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Final performance rankings of autonomous yield agents — Genesis Season · $10,000 deployed across 5 agents
          </p>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
        <div className="wt-container">
          <div className="kpi-grid">
            {SEASON_KPIS.map(k => (
              <div key={k.label} style={{ background: 'var(--bg-card)', padding: '22px 24px', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
              >
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '6px' }}>{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '40px 48px 32px' }}>

          {/* Desktop table */}
          <div className="hidden md:block" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="wt-table" style={{ minWidth: '740px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Rank', 'Agent', 'AUA', 'AUM', 'Native Yield', 'Rewards', 'Capital APY', 'Bond Score', ''].map((h, i) => (
                      <th key={i} style={{ padding: '12px 16px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AGENT_DATA.map(agent => (
                    <AgentRow
                      key={agent.agent}
                      agent={agent}
                      isExpanded={expandedId === agent.agent}
                      onToggle={() => setExpandedId(prev => prev === agent.agent ? null : agent.agent)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-2 md:hidden">
            {AGENT_DATA.map(agent => {
              const isExp = expandedId === agent.agent;
              return (
                <div key={`m-${agent.agent}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', borderLeft: `3px solid ${agent.color}` }}>
                  <button
                    onClick={() => setExpandedId(prev => prev === agent.agent ? null : agent.agent)}
                    style={{ width: '100%', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', width: '16px' }}>{agent.rank}</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.875rem' }}>{agent.agent}</span>
                      <span className={`grade ${agent.gradeClass}`}>{agent.grade}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1rem', fontFamily: 'var(--mono)', fontWeight: 700, color: agent.color }}>{agent.bondScore}</div>
                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>BOND SCORE</div>
                      </div>
                      <span style={{ color: 'var(--text-muted)', transform: isExp ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▾</span>
                    </div>
                  </button>
                  {isExp && (
                    <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', paddingTop: '12px' }}>
                        {[
                          { l: 'AUA',        v: `$${agent.aua.toFixed(2)}`,   color: agent.color },
                          { l: 'Capital APY', v: agent.capitalApy,             color: 'var(--primary)' },
                          { l: 'Sharpe',      v: agent.sharpe.toFixed(2),      color: 'var(--text)' },
                          { l: 'Bond Score',  v: `${agent.bondScore}/100`,     color: agent.color },
                        ].map(m => (
                          <div key={m.l} style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '7px 9px' }}>
                            <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.l}</div>
                            <div style={{ fontSize: '0.875rem', fontFamily: 'var(--mono)', fontWeight: 700, color: m.color, marginTop: '2px' }}>{m.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom metrics strip */}
          <div className="bottom-strip">
            {[
              { label: 'Avg Daily Volume',       value: '$7,120' },
              { label: 'Avg Daily Yield',         value: '$2.76' },
              { label: 'Avg Transactions / Day',  value: '5.33' },
              { label: 'Avg Yield / Transaction', value: '$0.519' },
            ].map(m => (
              <div key={m.label} style={{ background: 'var(--bg-card)', padding: '14px 18px' }}>
                <div className="kpi-label">{m.label}</div>
                <div style={{ fontSize: '1.125rem', fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginTop: '4px' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
