'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── Static data ─────────────────────────────────────────────────────────── */

const SEASON_KPIS = [
  { label: 'Total Volume',  value: '$761,806', sub: '107 days',    color: 'var(--lime)' },
  { label: 'Total Yield',   value: '$295.75',  sub: 'Genesis',     color: 'var(--green)' },
  { label: 'Capital APY',   value: '10.45%',   sub: 'blended',     color: 'var(--lime)' },
  { label: 'Native APY',    value: '6.49%',    sub: 'ex-rewards',  color: 'var(--green)' },
  { label: 'Risk-Adj APY',  value: '8.47%',    sub: '0.5× reward', color: 'var(--amber)' },
];

const GENESIS_APY = [
  { name: 'Sail',       native: 6.39,  total: 6.41,  color: '#3b82f6' },
  { name: 'Mamo',       native: 4.77,  total: 5.21,  color: '#22c55e' },
  { name: 'Giza',       native: 5.27,  total: 14.30, color: '#ccff00' },
  { name: 'ZyFi',       native: 10.17, total: 10.17, color: '#a855f7' },
  { name: 'SurfLiquid', native: 5.91,  total: 16.49, color: '#f97316' },
];

const GENESIS_VOL = [
  { name: 'Sail',       volume: 419059, txns: 399, share: 55.0, color: '#3b82f6' },
  { name: 'Mamo',       volume: 221482, txns: 110, share: 29.1, color: '#22c55e' },
  { name: 'Giza',       volume: 96887,  txns: 48,  share: 12.7, color: '#ccff00' },
  { name: 'ZyFi',       volume: 16299,  txns: 8,   share: 2.1,  color: '#a855f7' },
  { name: 'SurfLiquid', volume: 8079,   txns: 5,   share: 1.1,  color: '#f97316' },
];

const GENESIS_YIELD = [
  { name: 'SurfLiquid', native: 33.94, reward: 57.56, color: '#f97316' },
  { name: 'Giza',       native: 30.36, reward: 49.56, color: '#ccff00' },
  { name: 'ZyFi',       native: 57.58, reward: 0.00,  color: '#a855f7' },
  { name: 'Sail',       native: 36.65, reward: 0.10,  color: '#3b82f6' },
  { name: 'Mamo',       native: 27.49, reward: 2.51,  color: '#22c55e' },
];

const AGENT_META = [
  {
    name: 'Sail.Money', color: '#3b82f6', grade: 'A+', gradeClass: 'grade-ap',
    bondScore: 91, capitalApy: '6.41%', nativeApy: '6.39%', rewardDep: '0.3%',
    sharpe: 2.31, drawdown: 3.1, signal: 'safe',
    perf: 78, risk: 94, stab: 92, prov: 89, sent: 85,
  },
  {
    name: 'ZyFAI', color: '#a855f7', grade: 'A', gradeClass: 'grade-a',
    bondScore: 85, capitalApy: '10.17%', nativeApy: '10.17%', rewardDep: '0.0%',
    sharpe: 1.89, drawdown: 6.4, signal: 'safe',
    perf: 88, risk: 88, stab: 76, prov: 82, sent: 79,
  },
  {
    name: 'Giza', color: '#ccff00', grade: 'A', gradeClass: 'grade-a',
    bondScore: 82, capitalApy: '14.30%', nativeApy: '5.27%', rewardDep: '62.0%',
    sharpe: 1.42, drawdown: 11.2, signal: 'caution',
    perf: 85, risk: 72, stab: 80, prov: 77, sent: 74,
  },
  {
    name: 'Surf', color: '#f97316', grade: 'B+', gradeClass: 'grade-bp',
    bondScore: 72, capitalApy: '16.49%', nativeApy: '5.91%', rewardDep: '62.9%',
    sharpe: 0.98, drawdown: 18.5, signal: 'caution',
    perf: 90, risk: 58, stab: 68, prov: 65, sent: 61,
  },
  {
    name: 'Mamo', color: '#22c55e', grade: 'B', gradeClass: 'grade-b',
    bondScore: 67, capitalApy: '5.21%', nativeApy: '4.77%', rewardDep: '8.4%',
    sharpe: 1.12, drawdown: 9.8, signal: 'caution',
    perf: 62, risk: 70, stab: 64, prov: 60, sent: 58,
  },
];

const ABOUT_BULLETS = [
  'Earn credibility via onchain track record',
  'Unlock higher credit limits',
  'Receive capital routing from allocators',
  'Access the next layer of agentic banking',
];

/* ── SVG Charts ──────────────────────────────────────────────────────────── */

function ChartAPY() {
  return (
    <svg viewBox="0 0 960 330" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {[0, 5, 10, 15, 20].map((pct) => {
        const y = 240 - pct * 10;
        return (
          <g key={pct}>
            <line x1={60} y1={y} x2={920} y2={y} stroke="var(--border)" strokeWidth={1} />
            <text x={52} y={y + 4} textAnchor="end" fill="var(--s2)" fontSize={10} fontFamily="var(--mono)">{pct}%</text>
          </g>
        );
      })}
      <line x1={60} y1={240 - 10.45 * 10} x2={920} y2={240 - 10.45 * 10} stroke="var(--lime)" strokeWidth={1} strokeDasharray="6 4" />
      <line x1={60} y1={240 - 6.49 * 10}  x2={920} y2={240 - 6.49 * 10}  stroke="#22c55e" strokeWidth={1} strokeDasharray="6 4" />
      {GENESIS_APY.map((a, i) => {
        const gx = 100 + i * 170;
        const bw = 50;
        const nH = a.native * 10;
        const tH = a.total * 10;
        return (
          <g key={a.name}>
            <rect x={gx}          y={240 - tH} width={bw} height={tH} fill={a.color} opacity={0.32} rx={2} />
            <rect x={gx + bw + 6} y={240 - nH} width={bw} height={nH} fill={a.color} opacity={0.9}  rx={2} />
            <text x={gx + bw + 3}          y={262} textAnchor="middle" fill="var(--s2)" fontSize={11} fontFamily="var(--mono)">{a.name}</text>
            <text x={gx + bw + 6 + bw / 2} y={240 - nH - 5} textAnchor="middle" fill={a.color} fontSize={9} fontFamily="var(--mono)">{a.native.toFixed(2)}%</text>
            <text x={gx + bw / 2}           y={240 - tH - 5} textAnchor="middle" fill={a.color} fontSize={9} fontFamily="var(--mono)" opacity={0.7}>{a.total.toFixed(2)}%</text>
          </g>
        );
      })}
      <g transform="translate(100,295)">
        <rect x={0}   y={0} width={14} height={10} fill="#888" opacity={0.9}  rx={1} />
        <text x={20}  y={9} fill="var(--s2)" fontSize={10}>Native APY</text>
        <rect x={130} y={0} width={14} height={10} fill="#888" opacity={0.32} rx={1} />
        <text x={150} y={9} fill="var(--s2)" fontSize={10}>Total APY</text>
        <line x1={280} y1={5} x2={300} y2={5} stroke="var(--lime)" strokeWidth={1} strokeDasharray="6 4" />
        <text x={306} y={9} fill="var(--s2)" fontSize={10}>Blended 10.45%</text>
        <line x1={440} y1={5} x2={460} y2={5} stroke="#22c55e" strokeWidth={1} strokeDasharray="6 4" />
        <text x={466} y={9} fill="var(--s2)" fontSize={10}>Native Floor 6.49%</text>
      </g>
    </svg>
  );
}

function ChartVolume() {
  const labelX = 120, barEnd = 860, barMaxW = barEnd - labelX, maxVol = 420000, totalVol = 761806;
  const rowH = 44, svgH = GENESIS_VOL.length * rowH + 60;
  const avgVol = totalVol / GENESIS_VOL.length;
  return (
    <svg viewBox={`0 0 960 ${svgH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {(() => {
        const refX = labelX + (avgVol / maxVol) * barMaxW;
        return (
          <g>
            <line x1={refX} y1={0} x2={refX} y2={svgH - 28} stroke="var(--border)" strokeWidth={1} strokeDasharray="4 3" />
            <text x={refX + 4} y={12} fill="var(--s2)" fontSize={9} fontFamily="var(--mono)">avg $152K</text>
          </g>
        );
      })()}
      {GENESIS_VOL.map((a, i) => {
        const y = i * rowH + 20, bw = (a.volume / maxVol) * barMaxW;
        const fmtVol = a.volume >= 100000 ? `$${(a.volume / 1000).toFixed(0)}K` : `$${(a.volume / 1000).toFixed(1)}K`;
        return (
          <g key={a.name}>
            <rect x={labelX} y={y + 6} width={barMaxW} height={22} rx={3} fill="var(--border)" opacity={0.4} />
            <rect x={labelX} y={y + 6} width={bw}      height={22} rx={3} fill={a.color} opacity={0.75} />
            <text x={labelX - 8} y={y + 21} textAnchor="end" fill="var(--s1)" fontSize={11} fontFamily="var(--mono)" fontWeight={600}>{a.name}</text>
            <text x={labelX + bw + 10} y={y + 21} fill={a.color} fontSize={11} fontFamily="var(--mono)" fontWeight={700}>{fmtVol}</text>
            <text x={labelX + bw + 10} y={y + 33} fill="var(--s2)" fontSize={9} fontFamily="var(--mono)">{a.share.toFixed(1)}% · {a.txns} txns</text>
          </g>
        );
      })}
      {[0, 100000, 200000, 300000, 400000].map(v => (
        <text key={v} x={labelX + (v / maxVol) * barMaxW} y={svgH - 8} textAnchor="middle" fill="var(--s2)" fontSize={9} fontFamily="var(--mono)">
          {v === 0 ? '$0' : `$${v / 1000}K`}
        </text>
      ))}
    </svg>
  );
}

function ChartYield() {
  const labelX = 120, barEnd = 780, barMaxW = barEnd - labelX, maxYield = 95;
  const rowH = 44, svgH = GENESIS_YIELD.length * rowH + 60;
  return (
    <svg viewBox={`0 0 960 ${svgH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {GENESIS_YIELD.map((a, i) => {
        const y = i * rowH + 20, total = a.native + a.reward;
        const nativeW = (a.native / maxYield) * barMaxW;
        const rewardW = (a.reward / maxYield) * barMaxW;
        const rewardPct = total > 0 ? ((a.reward / total) * 100).toFixed(0) : '0';
        return (
          <g key={a.name}>
            <rect x={labelX} y={y + 6} width={barMaxW} height={22} rx={3} fill="var(--border)" opacity={0.4} />
            <rect x={labelX} y={y + 6} width={nativeW} height={22} rx={3} fill={a.color} opacity={0.9} />
            {a.reward > 0 && <rect x={labelX + nativeW} y={y + 6} width={rewardW} height={22} rx={3} fill={a.color} opacity={0.3} />}
            <text x={labelX - 8} y={y + 21} textAnchor="end" fill="var(--s1)" fontSize={11} fontFamily="var(--mono)" fontWeight={600}>{a.name}</text>
            <text x={labelX + nativeW + rewardW + 10} y={y + 21} fill={a.color} fontSize={11} fontFamily="var(--mono)" fontWeight={700}>${total.toFixed(2)}</text>
            {a.reward > 0
              ? <text x={labelX + nativeW + rewardW + 10} y={y + 33} fill="#f59e0b" fontSize={9} fontFamily="var(--mono)">{rewardPct}% reward dep.</text>
              : <text x={labelX + nativeW + rewardW + 10} y={y + 33} fill="#22c55e" fontSize={9} fontFamily="var(--mono)">0% — native only</text>
            }
          </g>
        );
      })}
      <g transform={`translate(${labelX}, ${svgH - 22})`}>
        <rect x={0} y={0} width={12} height={10} fill="#888" opacity={0.9} rx={1} />
        <text x={18} y={9} fill="var(--s2)" fontSize={10}>Native yield</text>
        <rect x={130} y={0} width={12} height={10} fill="#888" opacity={0.3} rx={1} />
        <text x={148} y={9} fill="var(--s2)" fontSize={10}>Reward emissions</text>
      </g>
    </svg>
  );
}

const CHART_TABS = [
  { label: 'Capital APY',       sub: 'Yield efficiency' },
  { label: 'Volume',            sub: 'Portfolio scale' },
  { label: 'Yield Composition', sub: 'Native vs. rewards' },
];

/* ── Sidebar tabs ────────────────────────────────────────────────────────── */

function Sidebar() {
  const [tab, setTab] = useState<'about' | 'genesis'>('about');

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '12px 28px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.06em', cursor: 'pointer',
    borderBottom: active ? '2px solid var(--lime)' : '2px solid transparent',
    color: active ? 'var(--text)' : 'var(--text-muted)',
    background: 'transparent', transition: 'color 0.15s, border-color 0.15s',
    whiteSpace: 'nowrap', border: 'none',
  });

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        <button style={tabStyle(tab === 'about')}   onClick={() => setTab('about')}>About</button>
        <button style={tabStyle(tab === 'genesis')} onClick={() => setTab('genesis')}>Genesis</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 16px' }}>
        {tab === 'about' && (
          <div style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: 'var(--text-sub)' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>
              The Credit Layer for the Agentic Economy
            </h2>
            <div style={{ width: '32px', height: '2px', background: 'var(--primary)', marginBottom: '16px', borderRadius: '1px' }} />
            <p style={{ marginBottom: '12px' }}>
              Agents outperform static vaults. In Genesis of Agentic Alpha, we put that to the test — deploying real capital to onchain autonomous agents competing for the highest risk-adjusted yield.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Every trade, vault update, and rebalance is recorded onchain and fed into our credit engine, laying the foundation for programmable credit and the{' '}
              <strong style={{ color: 'var(--primary)' }}>Bond Score</strong>.
            </p>
            <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '12px', marginBottom: '16px', background: 'var(--lime-03)', padding: '10px 12px', borderRadius: '0 4px 4px 0' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Bond Score Formula</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                0.30×Perf + 0.25×Risk + 0.20×Stab + 0.15×Sent + 0.10×Prov
              </div>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Why It Matters</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '16px' }}>
              {ABOUT_BULLETS.map(item => (
                <li key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginBottom: '8px' }}>Which agents can be trusted with credit?</p>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.875rem', marginBottom: '12px' }}>
              bond.credit is building that answer. And it starts here.
            </p>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Powered by <span style={{ color: 'var(--text)', fontWeight: 600 }}>bond.credit</span> × <span style={{ color: 'var(--text)', fontWeight: 600 }}>iExec</span>
            </div>
          </div>
        )}

        {tab === 'genesis' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div className="stag" style={{ marginBottom: '8px' }}>Genesis Final Report</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Nov 5, 2024 – Feb 19, 2025 · 107 days · $10,000 deployed
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              {[
                { label: 'Capital Deployed', value: '$10,000',  sub: '$2,000 per agent',         color: 'var(--lime)' },
                { label: 'Daily Avg Volume', value: '$7,120',   sub: '~5.3 transactions/day',    color: 'var(--green)' },
                { label: 'Native Yield',     value: '62.9%',    sub: '$186.02 of $295.75 total', color: 'var(--lime)' },
                { label: 'Reward Dep.',      value: '37.1%',    sub: '$109.73 in emissions',     color: 'var(--amber)' },
              ].map(k => (
                <div key={k.label} style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px' }}>
                  <div className="kpi-label" style={{ fontSize: '0.625rem', marginBottom: '4px' }}>{k.label}</div>
                  <div className="kpi-value" style={{ color: k.color, fontSize: '1.125rem' }}>{k.value}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>{k.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Agent Rankings
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
              {AGENT_META.map((a, idx) => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderBottom: idx < AGENT_META.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', width: '16px', flexShrink: 0 }}>{idx + 1}</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {a.name}
                      <span className={`grade ${a.gradeClass}`}>{a.grade}</span>
                    </div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                      APY {a.capitalApy} · Sharpe {a.sharpe.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.875rem', fontFamily: 'var(--mono)', fontWeight: 700, color: a.color }}>{a.bondScore}</div>
                    <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)' }}>SCORE</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page component ──────────────────────────────────────────────────────── */

export default function AgentsPage() {
  const [chartTab, setChartTab] = useState(0);

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

      {/* Status bar */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <div className="wt-container" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="chip">
                <span className="chip-dot" />
                Genesis Complete
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Nov 5, 2024 – Feb 19, 2025
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {[
                { label: 'AGENTS',      value: '5' },
                { label: 'CAPITAL',     value: '$10,000' },
                { label: 'NEXT SEASON', value: 'TBA', accent: true },
              ].map(s => (
                <span key={s.label} style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {s.label}: <span style={{ color: s.accent ? 'var(--primary)' : 'var(--text)', fontFamily: 'var(--mono)' }}>{s.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI grid */}
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
      <div className="wt-container" style={{ paddingTop: '24px', paddingBottom: '40px', marginTop: '8px' }}>
        <div className="page-grid">

          {/* Chart panel */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Genesis Performance Overview
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>AUA · Genesis</span>
            </div>

            {/* Chart switcher tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-card-2)' }}>
              {CHART_TABS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setChartTab(i)}
                  style={{
                    padding: '10px 20px', fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: chartTab === i ? 'var(--text)' : 'var(--text-muted)',
                    background: 'transparent', border: 'none',
                    borderBottom: chartTab === i ? '2px solid var(--primary)' : '2px solid transparent',
                    marginBottom: '-1px', cursor: 'pointer', transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                >
                  {t.label}
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: 400, letterSpacing: 0 }}>
                    {t.sub}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ padding: '20px' }}>
              {chartTab === 0 && <ChartAPY />}
              {chartTab === 1 && <ChartVolume />}
              {chartTab === 2 && <ChartYield />}
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
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

      <Footer />
    </div>
  );
}
