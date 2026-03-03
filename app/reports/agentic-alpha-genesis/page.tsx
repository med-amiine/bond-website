'use client';

import { useState } from 'react';
import styles from './styles.module.css';

// Agent tab switcher component
function AgentSwitcher({ agent }: { agent: string }) {
  const [activeTab, setActiveTab] = useState('apy');

  const tabData: Record<string, Record<string, { label: string; value: string; sub?: string; color?: string }[]>> = {
    sail: {
      apy: [
        { label: 'Capital APY (Total)', value: '5.96%', sub: '(1 + 34.21/2000)^(365/107) − 1', color: '#205372' },
        { label: 'Capital APY (Native Floor)', value: '5.94%', sub: 'Incentive-stripped sustainable return', color: '#205372' },
        { label: 'Total Yield · Incentive Dep.', value: '$34.21 0.3%', sub: '$34.12 native · $0.09 incentive', color: '#205372' },
      ],
    },
    mamo: {
      apy: [
        { label: 'Capital APY (Total)', value: '4.87%', sub: '(1 + 28.08/2000)^(365/107) − 1', color: '#00d180' },
        { label: 'Capital APY (Native Floor)', value: '4.45%', sub: 'Incentive-stripped sustainable return', color: '#00d180' },
        { label: 'Total Yield · Incentive Dep.', value: '$28.08 8.4%', sub: '$25.71 native · $2.37 incentive', color: '#00d180' },
      ],
    },
    arma: {
      apy: [
        { label: 'Capital APY (Total)', value: '10.57%', sub: '(1 + 59.77/2000)^(365/107) − 1', color: '#bced62' },
        { label: 'Capital APY (Native Floor)', value: '5.04%', sub: 'Incentive-stripped sustainable return', color: '#bced62' },
        { label: 'Total Yield · Incentive Dep.', value: '$59.77 51.4%', sub: '$29.02 native · $30.75 incentive', color: '#bced62' },
      ],
    },
    zyfai: {
      apy: [
        { label: 'Capital APY (Total)', value: '9.68%', sub: '(1 + 54.94/2000)^(365/107) − 1', color: '#a855f7' },
        { label: 'Capital APY (Native Floor)', value: '9.68%', sub: '100% native yield', color: '#a855f7' },
        { label: 'Total Yield · Incentive Dep.', value: '$54.94 0%', sub: '$54.94 native · $0 incentive', color: '#a855f7' },
      ],
    },
    surf: {
      apy: [
        { label: 'Capital APY (Total)', value: '18.17%', sub: '(1 + 100.32/2000)^(365/107) − 1', color: '#f97316' },
        { label: 'Capital APY (Native Floor)', value: '5.52%', sub: 'Incentive-stripped sustainable return', color: '#f97316' },
        { label: 'Total Yield · Incentive Dep.', value: '$100.32 68.3%', sub: '$31.77 native · $68.55 incentive', color: '#f97316' },
      ],
    },
  };

  const stats = tabData[agent]?.apy || [];

  return (
    <div className={styles.swWrap}>
      <div className={styles.swTabs}>
        <button
          className={`${styles.swTab} ${activeTab === 'apy' ? styles.swTabActive : ''}`}
          onClick={() => setActiveTab('apy')}
        >
          Capital APY
        </button>
        <button
          className={`${styles.swTab} ${activeTab === 'vol' ? styles.swTabActive : ''}`}
          onClick={() => setActiveTab('vol')}
        >
          Volume & Yield
        </button>
        <button
          className={`${styles.swTab} ${activeTab === 'dist' ? styles.swTabActive : ''}`}
          onClick={() => setActiveTab('dist')}
        >
          Venue Distribution
        </button>
      </div>

      {activeTab === 'apy' && (
        <div className={`${styles.swPanel} ${styles.swPanelActive}`}>
          <div className={styles.swPanelLabel}>
            {agent.charAt(0).toUpperCase() + agent.slice(1)} — Capital APY: Native vs. Total · Portfolio Benchmarks
          </div>
          <div className={styles.agentApyStats}>
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={styles.agentBigStat}
                style={{
                  borderColor: idx === 0 ? `${stat.color}57` : undefined,
                  background: idx === 0 ? `${stat.color}1F` : undefined,
                  marginTop: idx > 0 ? '1px' : undefined,
                }}
              >
                <div className={styles.absLabel} style={{ color: stat.color }}>
                  {stat.label}
                </div>
                <div className={styles.absVal} style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className={styles.absSub}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'vol' && (
        <div className={`${styles.swPanel} ${styles.swPanelActive}`}>
          <div className={styles.swPanelLabel}>
            {agent.charAt(0).toUpperCase() + agent.slice(1)} — Execution Volume & Yield Breakdown
          </div>
          <div className={styles.twoCol} style={{ gap: '24px' }}>
            <div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '14px',
                }}
              >
                Volume vs. Genesis Season
              </div>
              {/* Volume comparison bars would go here */}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  background: 'var(--bg-card-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '16px 20px',
                }}
              >
                <div className={styles.absLabel}>Total Volume</div>
                <div className={styles.absVal}>${agent === 'sail' ? '389,245' : agent === 'mamo' ? '213,378' : agent === 'arma' ? '88,769' : agent === 'zyfai' ? '16,299' : '8,079'}</div>
                <div className={styles.absSub}>Turnover {agent === 'sail' ? '195×' : agent === 'mamo' ? '107×' : agent === 'arma' ? '44×' : agent === 'zyfai' ? '8×' : '4×'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dist' && (
        <div className={`${styles.swPanel} ${styles.swPanelActive}`}>
          <div className={styles.swPanelLabel}>
            {agent.charAt(0).toUpperCase() + agent.slice(1)} — Execution Venue Distribution
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Venue distribution data visualization would be rendered here.
          </p>
        </div>
      )}
    </div>
  );
}

// Main page component
export default function AgenticAlphaGenesis() {
  return (
    <div className={styles.reportContainer}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navLogo}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              bond<span style={{ color: 'var(--accent)' }}>.</span>credit
            </span>
            <div className={styles.navDivider} />
            <span className={styles.navLabel}>Agentic Alpha · Genesis · Agent Credit Report</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div className={styles.navLinks}>
              <a href="#glance">Overview</a>
              <a href="#deployment">Deployment</a>
              <a href="#bond-vol">Protocol Volume</a>
              <a href="#tyr">TYR</a>
              <a href="#risk">Risk</a>
              <a href="#sail">Sail</a>
              <a href="#mamo">Mamo</a>
              <a href="#arma">Arma</a>
              <a href="#zyfai">ZyFAI</a>
              <a href="#surf">SurfLiquid</a>
            </div>
            <span className={styles.navBadge}>Genesis</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGlow} />
          <div className={styles.heroGlow2} />
          <div className={styles.heroGrid}>
            <div>
              <div className={`${styles.heroTag} ${styles.fadeUp}`}>
                <div className={styles.heroTagDot} />
                Agent Credit Report · Nov 2024 – Feb 2025
              </div>
              <h1 className={`${styles.heroTitle} ${styles.fadeUp}`}>
                Agentic Alpha<br />
                <span className={styles.lime}>Genesis</span>
              </h1>
              <p className={`${styles.heroSubtitle} ${styles.fadeUp} ${styles.fadeUpDelay1}`}>
                Inaugural Capital Deployment Report
              </p>
              <p className={`${styles.heroDesc} ${styles.fadeUp} ${styles.fadeUpDelay2}`}>
                $10,000 deployed across five autonomous onchain agents over 107 days. Blended portfolio APY of{' '}
                <strong style={{ color: 'var(--accent)' }}>9.78%</strong> total,{' '}
                <strong style={{ color: '#22c55e' }}>6.12%</strong> native-only. $549,466 in season volume across 17 DeFi
                venues. Every execution onchain — building the credit history of the agentic economy.
              </p>
              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <div className={styles.hmiLabel}>Period</div>
                  <div className={styles.hmiVal}>Nov 5, 2024 – Feb 19, 2025</div>
                </div>
                <div className={styles.heroMetaItem}>
                  <div className={styles.hmiLabel}>Duration</div>
                  <div className={styles.hmiVal}>107 days</div>
                </div>
                <div className={styles.heroMetaItem}>
                  <div className={styles.hmiLabel}>Capital</div>
                  <div className={styles.hmiVal}>$10,000 ($2K × 5 agents)</div>
                </div>
                <div className={styles.heroMetaItem}>
                  <div className={styles.hmiLabel}>Venues</div>
                  <div className={styles.hmiVal}>17 DeFi protocols</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.heroCard}>
                <div className={styles.heroCardHeader}>
                  <div className={styles.terminalDot} style={{ background: '#ff5f56' }} />
                  <div className={styles.terminalDot} style={{ background: '#ffbd2e' }} />
                  <div className={styles.terminalDot} style={{ background: '#27c93f' }} />
                </div>
                <div className={styles.heroCardBody}>
                  <p className={styles.heroCardQuote}>
                    &ldquo;$10,000. 107 days. Five agents. 17 DeFi venues. $277.32 verified yield. Every transaction
                    onchain — building the credit history of the agentic economy.&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={styles.heroCardAttr}>bond.credit · Agentic Alpha Genesis</span>
                  </div>
                </div>
                <div className={styles.heroCardStats}>
                  <div className={styles.hcs}>
                    <div className={styles.hcsVal}>9.78%</div>
                    <div className={styles.hcsLabel}>Portfolio APY</div>
                  </div>
                  <div className={styles.hcs}>
                    <div className={`${styles.hcsVal} ${styles.hcsValWhite}`}>6.12%</div>
                    <div className={styles.hcsLabel}>Native APY</div>
                  </div>
                  <div className={styles.hcs}>
                    <div className={`${styles.hcsVal} ${styles.hcsValWhite}`}>$549,466</div>
                    <div className={styles.hcsLabel}>Season Volume</div>
                  </div>
                  <div className={styles.hcs}>
                    <div className={`${styles.hcsVal} ${styles.hcsValWhite}`}>$277.32</div>
                    <div className={styles.hcsLabel}>Total Yield</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section 01: Genesis at a Glance */}
      <section className={styles.section} id="glance">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>01 · Genesis at a Glance</div>
            <h2 className={styles.sectionTitle}>Executive Summary & Capital Performance</h2>
            <p className={styles.sectionDesc}>
              Across 107 days of live deployment, five autonomous agents executed across 17 DeFi venues, generating
              $549,466 in aggregate volume and $277.32 in total yield. Using confirmed initial capital of $2,000 per
              agent, the portfolio delivered{' '}
              <strong style={{ color: 'var(--accent)' }}>9.78% blended Capital APY</strong> on a compound annualized
              basis.
            </p>
          </div>

          {/* Stat Grid Row 1 */}
          <div className={`${styles.statGrid} ${styles.statGrid4}`}>
            <div className={`${styles.statCard} ${styles.accentTop}`}>
              <div className={styles.statLabel}>Season Volume</div>
              <div className={`${styles.statVal} ${styles.statValLime}`}>$549,466</div>
              <div className={styles.statSub}>5 agents · 107-day window</div>
              <div className={styles.statNote}>Source: Dune @abdelhaks · Reported season total</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Total Yield Generated</div>
              <div className={`${styles.statVal} ${styles.statValGreen}`}>$277.32</div>
              <div className={styles.statSub}>$175.56 native · $101.76 incentive</div>
              <div className={styles.statNote}>Source: Dune @gbond_team</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Season Transactions</div>
              <div className={`${styles.statVal} ${styles.statValBlue}`}>432</div>
              <div className={styles.statSub}>Verified onchain · Season-level count</div>
              <div className={styles.statNote}>Protocol sum 521; delta = multi-venue agent overlap</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Realised USDC ROI</div>
              <div className={`${styles.statVal} ${styles.statValPurple}`}>$274.43</div>
              <div className={styles.statSub}>As reported @gbond_team</div>
              <div className={styles.statNote}>Variance vs $277.32 — rounding basis</div>
            </div>
          </div>

          {/* Stat Grid Row 2 - WITH mtop spacing */}
          <div className={`${styles.statGrid} ${styles.statGrid4} ${styles.mtop}`}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Avg Daily Volume</div>
              <div className={`${styles.statVal} ${styles.statValLime}`}>$5,135</div>
              <div className={styles.statSub}>$549,466 ÷ 107 days</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Avg Daily Yield</div>
              <div className={`${styles.statVal} ${styles.statValGreen}`}>$2.59</div>
              <div className={styles.statSub}>$277.32 ÷ 107 days</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Avg Transactions / Day</div>
              <div className={`${styles.statVal} ${styles.statValBlue}`}>4.04</div>
              <div className={styles.statSub}>432 txns ÷ 107 days</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Avg Yield / Transaction</div>
              <div className={styles.statVal}>$0.64</div>
              <div className={styles.statSub}>$277.32 ÷ 432 txns</div>
            </div>
          </div>

          {/* Stat Grid Row 3 - WITH mtop spacing */}
          <div className={`${styles.statGrid} ${styles.statGrid3} ${styles.mtop}`}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Native Yield (Earned)</div>
              <div className={`${styles.statVal} ${styles.statValGreen}`}>$175.56</div>
              <div className={styles.statSub}>63.3% of total · Protocol-level return</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Incentive Yield (Emissions)</div>
              <div className={`${styles.statVal} ${styles.statValLime}`}>$101.76</div>
              <div className={styles.statSub}>36.7% of total · Sustainability-discounted</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Active Agents</div>
              <div className={styles.statVal}>5</div>
              <div className={styles.statSub}>
                Sail · Mamo · Arma · ZyFAI · SurfLiquid
                <br />
                All deployed Nov 5, 2024
              </div>
            </div>
          </div>

          <div className={styles.rule} />

          {/* Capital APY Section */}
          <div className={styles.sectionHeader} style={{ marginBottom: '24px' }}>
            <div className={styles.sectionTag}>Capital APY — Primary Performance Metric</div>
            <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}>
              True Capital Return · Compound Annualised
            </h2>
          </div>

          <div className={styles.methodBox}>
            <strong>Formula</strong> — <code>Capital APY = (1 + Yield / Capital)^(365/107) − 1</code> · Capital =
            $2,000/agent (confirmed) · Exponent = 3.411×
            <br />
            Verification: $2,000 deposit · $34 yield · 100 days →{' '}
            <code>(1 + 34/2000)^(365/100) − 1 = 6.36%</code> ✓ · Volume-based yield ={' '}
            <strong style={{ color: 'var(--text-primary)' }}>Turnover Yield Rate (TYR)</strong> — never APY
          </div>

          {/* Capital APY Stat Grid - WITH mtop spacing */}
          <div className={`${styles.statGrid} ${styles.statGrid4} ${styles.mtop}`}>
            <div className={`${styles.statCard} ${styles.accentTop}`}>
              <div className={styles.statLabel}>Portfolio Capital APY (Total)</div>
              <div className={`${styles.statVal} ${styles.statValLime}`}>9.78%</div>
              <div className={styles.statSub}>$277.32 yield on $10,000 capital</div>
              <div className={styles.statNote}>(1 + 277.32/10000)^3.411 − 1</div>
            </div>
            <div className={`${styles.statCard} ${styles.accentTop}`}>
              <div className={styles.statLabel}>Portfolio Capital APY (Native)</div>
              <div className={`${styles.statVal} ${styles.statValGreen}`}>6.12%</div>
              <div className={styles.statSub}>Incentive-stripped sustainable floor</div>
              <div className={styles.statNote}>(1 + 175.56/10000)^3.411 − 1</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Risk-Adjusted APY (0.5× incentive disc.)</div>
              <div className={`${styles.statVal} ${styles.statValAmber}`}>7.95%</div>
              <div className={styles.statSub}>Credit engine conservative input</div>
              <div className={styles.statNote}>6.12% + (9.78%−6.12%) × 0.5</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Deployed Capital</div>
              <div className={styles.statVal}>$10,000</div>
              <div className={styles.statSub}>5 agents × $2,000 · 107 days</div>
            </div>
          </div>

          {/* Data Table */}
          <div className={styles.tableWrap} style={{ marginTop: '16px' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Capital</th>
                  <th>Volume</th>
                  <th>Total Yield</th>
                  <th>Native Yield</th>
                  <th>Capital APY Total</th>
                  <th>Capital APY Native</th>
                  <th>Incentive Dep.</th>
                  <th>Yield / $1K</th>
                  <th>Turnover</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--sail)' }} />
                      <span className={styles.rankNum}>01</span>Sail
                    </div>
                  </td>
                  <td>$2,000</td>
                  <td style={{ color: 'var(--sail)' }}>$389,245</td>
                  <td className={styles.pos}>$34.21</td>
                  <td>$34.12</td>
                  <td style={{ color: 'var(--sail)' }}>
                    <strong>5.96%</strong>
                  </td>
                  <td style={{ color: 'var(--sail)' }}>
                    <strong>5.94%</strong>
                  </td>
                  <td style={{ color: '#22c55e' }}>0.3%</td>
                  <td>$17.11</td>
                  <td>195×</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--mamo)' }} />
                      <span className={styles.rankNum}>02</span>Mamo
                    </div>
                  </td>
                  <td>$2,000</td>
                  <td>$213,378</td>
                  <td className={styles.pos}>$28.08</td>
                  <td>$25.71</td>
                  <td style={{ color: 'var(--mamo)' }}>
                    <strong>4.87%</strong>
                  </td>
                  <td style={{ color: 'var(--mamo)' }}>
                    <strong>4.45%</strong>
                  </td>
                  <td style={{ color: '#22c55e' }}>8.4%</td>
                  <td>$14.04</td>
                  <td>107×</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--arma)' }} />
                      <span className={styles.rankNum}>03</span>Arma GIZA
                    </div>
                  </td>
                  <td>$2,000</td>
                  <td>$88,769</td>
                  <td className={styles.pos}>$59.77</td>
                  <td>$29.02</td>
                  <td style={{ color: 'var(--arma)' }}>
                    <strong>10.57%</strong>
                  </td>
                  <td style={{ color: 'var(--arma)' }}>
                    <strong>5.04%</strong>
                  </td>
                  <td style={{ color: 'var(--amber)' }}>51.4%</td>
                  <td>$29.89</td>
                  <td>44×</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--zyfai)' }} />
                      <span className={styles.rankNum}>04</span>ZyFAI
                    </div>
                  </td>
                  <td>$2,000</td>
                  <td>$16,299</td>
                  <td className={styles.pos}>$54.94</td>
                  <td>$54.94</td>
                  <td style={{ color: 'var(--zyfai)' }}>
                    <strong>9.68%</strong>
                  </td>
                  <td style={{ color: 'var(--zyfai)' }}>
                    <strong>9.68%</strong>
                  </td>
                  <td style={{ color: '#22c55e' }}>0.0%</td>
                  <td>$27.47</td>
                  <td>8×</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--surf)' }} />
                      <span className={styles.rankNum}>05</span>SurfLiquid
                    </div>
                  </td>
                  <td>$2,000</td>
                  <td>$8,079</td>
                  <td className={styles.pos}>$100.32</td>
                  <td>$31.77</td>
                  <td style={{ color: 'var(--surf)' }}>
                    <strong>18.17%</strong>
                  </td>
                  <td style={{ color: 'var(--surf)' }}>
                    <strong>5.52%</strong>
                  </td>
                  <td style={{ color: '#ef4444' }}>68.3%</td>
                  <td>$50.16</td>
                  <td>4×</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Portfolio</td>
                  <td>$10,000</td>
                  <td>$715,770*</td>
                  <td>$277.32</td>
                  <td>$175.56</td>
                  <td>9.78%</td>
                  <td>6.12%</td>
                  <td>36.7%</td>
                  <td>$27.73</td>
                  <td>72×</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Insight Box */}
          <div className={styles.insightBox}>
            <strong>Portfolio finding:</strong> $10,000 deployed →{' '}
            <strong style={{ color: 'var(--accent)' }}>9.78% blended Capital APY</strong> and{' '}
            <strong style={{ color: '#22c55e' }}>6.12% native APY</strong> — both exceeding the 4–5% stablecoin benchmark.
            ZyFAI delivers the strongest risk-adjusted return (9.68% native, 0% incentive dep.). Portfolio executed across
            17 DeFi venues with Morpho vaults as the dominant layer.
          </div>
        </div>
      </section>

      {/* Section 02: Deployment Matrix */}
      <section className={styles.section} id="deployment">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>02 · Agent Deployment Matrix</div>
            <h2 className={styles.sectionTitle}>Execution Volume, Cadence & Yield Attribution</h2>
            <p className={styles.sectionDesc}>
              Each agent operated under a distinct execution profile — volume, cadence, and yield composition diverge
              materially across the cohort, validating the multi-agent diversification thesis underpinning
              bond.credit&apos;s credit engine.
            </p>
          </div>

          <div className={styles.warnBox}>
            <strong>⚑ Volume Reconciliation:</strong> Individual agent volumes sum to $715,770 vs. reported season total
            of $549,466 — a $166,304 difference reflecting simultaneous multi-venue agent deployment. Volume shares are
            calculated against $715,770 for additive consistency.
          </div>

          {/* Deployment Table */}
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Volume</th>
                  <th>Vol. Share¹</th>
                  <th>Txns</th>
                  <th>Tx Share²</th>
                  <th>Total Yield</th>
                  <th>Native Yield</th>
                  <th>Incentives</th>
                  <th>Yield / Tx</th>
                  <th>Avg Tx Size</th>
                  <th>Venues</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--sail)' }} />
                      <span className={styles.rankNum}>01</span>Sail
                    </div>
                  </td>
                  <td style={{ color: 'var(--sail)' }}>$389,245</td>
                  <td>54.4%</td>
                  <td>358</td>
                  <td>68.7%</td>
                  <td className={styles.pos}>$34.21</td>
                  <td>$34.12</td>
                  <td>$0.09</td>
                  <td>$0.096</td>
                  <td>$1,087</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--mamo)' }} />
                      <span className={styles.rankNum}>02</span>Mamo
                    </div>
                  </td>
                  <td>$213,378</td>
                  <td>29.8%</td>
                  <td>106</td>
                  <td>20.3%</td>
                  <td className={styles.pos}>$28.08</td>
                  <td>$25.71</td>
                  <td>$2.37</td>
                  <td>$0.265</td>
                  <td>$2,013</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--arma)' }} />
                      <span className={styles.rankNum}>03</span>Arma GIZA
                    </div>
                  </td>
                  <td>$88,769</td>
                  <td>12.4%</td>
                  <td>44</td>
                  <td>8.4%</td>
                  <td className={styles.pos}>$59.77</td>
                  <td>$29.02</td>
                  <td>$30.75</td>
                  <td>$1.358</td>
                  <td>$2,017</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--zyfai)' }} />
                      <span className={styles.rankNum}>04</span>ZyFAI
                    </div>
                  </td>
                  <td>$16,299</td>
                  <td>2.3%</td>
                  <td>8</td>
                  <td>1.5%</td>
                  <td className={styles.pos}>$54.94</td>
                  <td>$54.94</td>
                  <td>$0.00</td>
                  <td>$6.867</td>
                  <td>$2,037</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.protoName}>
                      <span className={styles.protoDot} style={{ background: 'var(--surf)' }} />
                      <span className={styles.rankNum}>05</span>SurfLiquid
                    </div>
                  </td>
                  <td>$8,079</td>
                  <td>1.1%</td>
                  <td>5</td>
                  <td>1.0%</td>
                  <td className={styles.pos}>$100.32</td>
                  <td>$31.77</td>
                  <td>$68.55</td>
                  <td>$20.064</td>
                  <td>$1,616</td>
                  <td>2</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Portfolio</td>
                  <td>$715,770*</td>
                  <td>100%</td>
                  <td>521*</td>
                  <td>100%</td>
                  <td>$277.32</td>
                  <td>$175.56</td>
                  <td>$101.76</td>
                  <td>$0.532</td>
                  <td>$1,374</td>
                  <td>16</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className={styles.methodBox}>
            ¹ Vol. Share — vs. protocol-level sum ($715,770). ² Tx Share — vs. protocol-level sum (521). Season
            dashboard: 432 verified.
          </div>
        </div>
      </section>

      {/* Continue with remaining sections... */}
      {/* Agent Sections */}
      <section className={styles.agentSection} id="sail">
        <div className={styles.container}>
          <div className={styles.agentHeader} style={{ marginBottom: '24px' }}>
            <div>
              <div
                className={styles.agentPill}
                style={{
                  background: 'rgba(32,83,114,0.12)',
                  color: '#205372',
                  border: '1px solid rgba(32,83,114,0.35)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#205372',
                    marginRight: '2px',
                  }}
                />
                Agent 01 · Genesis
              </div>
              <h2 className={styles.agentName} style={{ color: '#205372' }}>
                Sail
              </h2>
              <p className={styles.agentDesc}>
                The high-frequency liquidity router. Sail cycles $2,000 of capital 195× over Genesis — executing every
                0.30 days across 11 DeFi venues, the broadest multi-venue routing operation in the cohort. Its
                micro-margin HFT strategy delivers 5.96% Capital APY on 99.7% native yield, the purest earned-only
                credit signal and most reliable basis for forward underwriting.
              </p>
            </div>
          </div>
          <AgentSwitcher agent="sail" />
        </div>
      </section>

      <section className={styles.agentSection} id="mamo">
        <div className={styles.container}>
          <div className={styles.agentHeader} style={{ marginBottom: '24px' }}>
            <div>
              <div
                className={styles.agentPill}
                style={{
                  background: 'rgba(0,209,128,0.12)',
                  color: '#00d180',
                  border: '1px solid rgba(0,209,128,0.35)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#00d180',
                    marginRight: '2px',
                  }}
                />
                Agent 02 · Genesis
              </div>
              <h2 className={styles.agentName} style={{ color: '#00d180' }}>
                Mamo
              </h2>
              <p className={styles.agentDesc}>
                The near-daily executor. Mamo operated at a cadence of 1.01 days between transactions — the closest to
                daily activity in the cohort — and established the second-largest volume position at $213,378. Its peak
                day of 9 transactions anchors its most active execution window.
              </p>
            </div>
          </div>
          <AgentSwitcher agent="mamo" />
        </div>
      </section>

      <section className={styles.agentSection} id="arma">
        <div className={styles.container}>
          <div className={styles.agentHeader} style={{ marginBottom: '24px' }}>
            <div>
              <div
                className={styles.agentPill}
                style={{
                  background: 'rgba(188,237,98,0.12)',
                  color: '#bced62',
                  border: '1px solid rgba(188,237,98,0.35)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#bced62',
                    marginRight: '2px',
                  }}
                />
                Agent 03 · Genesis
              </div>
              <h2 className={styles.agentName} style={{ color: '#bced62' }}>
                Arma GIZA
              </h2>
              <p className={styles.agentDesc}>
                The balanced yield optimizer. Arma delivered strong total returns with 51.4% incentive dependency,
                requiring careful sustainability assessment for credit engine inputs.
              </p>
            </div>
          </div>
          <AgentSwitcher agent="arma" />
        </div>
      </section>

      <section className={styles.agentSection} id="zyfai">
        <div className={styles.container}>
          <div className={styles.agentHeader} style={{ marginBottom: '24px' }}>
            <div>
              <div
                className={styles.agentPill}
                style={{
                  background: 'rgba(168,85,247,0.12)',
                  color: '#a855f7',
                  border: '1px solid rgba(168,85,247,0.35)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#a855f7',
                    marginRight: '2px',
                  }}
                />
                Agent 04 · Genesis
              </div>
              <h2 className={styles.agentName} style={{ color: '#a855f7' }}>
                ZyFAI
              </h2>
              <p className={styles.agentDesc}>
                The pure native yield specialist. ZyFAI achieved 9.68% Capital APY with 0% incentive dependency — the
                cleanest credit signal in the Genesis cohort and the strongest risk-adjusted return.
              </p>
            </div>
          </div>
          <AgentSwitcher agent="zyfai" />
        </div>
      </section>

      <section className={styles.agentSection} id="surf">
        <div className={styles.container}>
          <div className={styles.agentHeader} style={{ marginBottom: '24px' }}>
            <div>
              <div
                className={styles.agentPill}
                style={{
                  background: 'rgba(249,115,22,0.12)',
                  color: '#f97316',
                  border: '1px solid rgba(249,115,22,0.35)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#f97316',
                    marginRight: '2px',
                  }}
                />
                Agent 05 · Genesis
              </div>
              <h2 className={styles.agentName} style={{ color: '#f97316' }}>
                SurfLiquid
              </h2>
              <p className={styles.agentDesc}>
                The concentrated yield farmer. SurfLiquid delivered the highest total Capital APY at 18.17%, though with
                68.3% incentive dependency — requiring continuity modeling for forward credit assessment.
              </p>
            </div>
          </div>
          <AgentSwitcher agent="surf" />
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div>
              <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                bond<span style={{ color: 'var(--accent)' }}>.</span>credit
              </span>
            </div>
            <div className={styles.footerMeta}>
              Agentic Alpha Genesis Report
              <br />
              Generated: February 2025
              <br />
              Data: Dune Analytics · @abdelhaks · @gbond_team
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
