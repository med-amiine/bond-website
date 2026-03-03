# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SnapChain (also branded as bond.credit) is a marketing website for a blockchain/DeFi platform. It showcases three products: ACE (Agentic Credit Engine), Bondex (Smart Rebalancing), and Bond App (Yield Optimization). Built with Next.js 15 App Router, GSAP animations, and a dual-theme design system.

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

### App Structure
- `app/layout.tsx` — Root layout; injects inline script to set `data-theme` before paint (prevents flash)
- `app/globals.css` — All CSS variables (colors, glows, borders) and predefined utility classes
- `app/page.tsx` — Homepage, assembles all section components
- `app/products/*/page.tsx` — Product detail pages
- `app/contact/` and `app/reports/` — Newer sections (not yet in Navbar)
- `components/` — All reusable sections; each is a standalone client component

### Theme System
The theme (`light` / `dark`) is stored in `localStorage` and applied as `data-theme` on `<html>`. The inline script in `layout.tsx` reads it synchronously before React hydrates to avoid a flash. `ThemeToggle.tsx` uses a `mounted` state guard to prevent hydration mismatch. `suppressHydrationWarning` is set on the `<html>` element.

Always use CSS variables for colors — never Tailwind color utilities:
```tsx
// ✅
<div className="bg-[var(--bg)] text-[var(--text)]">
// ❌
<div className="bg-gray-200 text-gray-900">
```

### Key CSS Variables
Defined in `globals.css` with `[data-theme="dark"]` overrides:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#C5CCD4` | `#000000` |
| `--bg-card` | `#F5F7FA` | `#0a0a0f` |
| `--bg-card-2` | `#E8EBF0` | `#111118` |
| `--text` | `#1E1B4B` | `#C5CCD4` |
| `--text-sub` | `#4B5563` | `#a1a1aa` |
| `--text-muted` | `#6B7280` | `#71717a` |
| `--border` | `#FFFFFF` | `#27272a` |
| `--border-hover` | `#9CA3AF` | `#3f3f46` |
| `--primary` | `#27279E` | `#27279E` |
| `--glow-primary` | `rgba(39,39,158,0.4)` | `rgba(59,59,220,0.6)` |
| `--glow-subtle` | `rgba(39,39,158,0.15)` | `rgba(59,59,220,0.25)` |
| `--glow-strong` | `rgba(39,39,158,0.25)` | `rgba(59,59,220,0.4)` |

Note: `--border` in light mode is pure white (`#FFFFFF`), not gray. Glow variables use a slightly brighter RGB (`59,59,220`) in dark mode.

Predefined classes in `globals.css`:
- Buttons: `.btn-primary`, `.btn-secondary`
- Cards/text: `.card-dark`, `.text-gradient`, `.text-gradient-hover`
- Backgrounds: `.grid-pattern`, `.radial-glow`, `.radial-glow-strong`
- Marquee: `.marquee-wrapper`, `.marquee-track`, `.animate-marquee`, `.animate-marquee-reverse`
- Component-specific: `.network-tag`, `.navbar-pill`, `.navbar-scrolled`, `.partner-logo`, `.framework-card`, `.footer-link`, `.footer-social-btn`, `.theme-toggle`
- Utilities: `.section-padding` (120px top/bottom), `.hide-scrollbar`, `.animate-float`, `.in-view`

The `[data-theme="dark"]` selector can also be used inside component CSS to override specific classes (e.g. `globals.css` uses `[data-theme="dark"] .navbar-scrolled` to set a dark background).

### Animation Stack
- **GSAP + ScrollTrigger** — scroll-triggered animations and pinned sections. Always use `gsap.context()` and return `ctx.revert()` for cleanup.
- **IntersectionObserver + `.in-view`** — simpler alternative used in several components (`Frameworks.tsx`, `TrustedPartners.tsx`). An IO callback adds the `.in-view` class; the CSS transitions handle the animation. Use this for simple fade/slide-in when GSAP is overkill.
- **Lenis** (`SmoothScroll.tsx`) — wraps the entire app for smooth scrolling; integrates with GSAP's ticker via `requestAnimationFrame`.
- GSAP and Lenis can conflict — Lenis is used only for velocity-based blur effects; ScrollTrigger handles all pinned/scrubbed animations.

Standard GSAP pattern used throughout:
```typescript
const ctx = gsap.context(() => {
  gsap.from(el, {
    scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
    opacity: 0, y: 40, duration: 0.6, ease: 'power2.out',
  })
}, sectionRef)
return () => ctx.revert()
```

### Custom Cursor
`CustomCursor.tsx` activates only on `pointer: fine` devices. It sets `* { cursor: none !important }` globally. Add `data-cursor-default` attribute to elements that should suppress the hover-expand behavior.

### Images
Next.js Image optimization is disabled (`unoptimized: true` in `next.config.js`). Use standard `<img>` tags. Assets live in `/public/assets/`.

### Path Alias
`@/` maps to the project root (`tsconfig.json` paths).

## Data Visualization Components

`app/reports/` uses a dedicated CSS class system (added to `globals.css`) that adapts the report design (`agentic_alpha_genesis_latest.html`) to the website's variable tokens. These are **not** separate component files — they are CSS classes applied directly in JSX/HTML.

**Token mapping** — the report uses its own var names; always translate to website tokens:

| Report token | Website token |
|---|---|
| `--bg-primary` / `--bg-secondary` | `var(--bg)` |
| `--bg-card` | `var(--bg-card)` |
| `--bg-card-2` / `--bg-card-3` | `var(--bg-card-2)` |
| `--text-primary` | `var(--text)` |
| `--text-secondary` | `var(--text-sub)` |
| `--text-muted` | `var(--text-muted)` |
| `--border` | `var(--border)` |
| `--border-2` | `var(--border-hover)` |
| `--accent` (#1172e1 blue) | `var(--primary)` (#27279E indigo) |

**Semantic accent colors** (consistent across report and website):
- Primary metric / accent: `var(--primary)` indigo
- Positive / yield: `#22c55e` emerald
- Warning / risk: `#f59e0b` amber
- Negative: `#ef4444` red

---

### Stat Grid

The signature 1px-gap grid — `background:var(--border)` on the container creates the hairline dividers:

```html
<!-- 4-column stat grid (also 2, 3, 5 col variants) -->
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:8px;overflow:hidden">

  <!-- Stat card with indigo top accent -->
  <div style="background:var(--bg-card);padding:24px;border-top:2px solid var(--primary)">
    <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:10px">Season Volume</div>
    <div style="font-family:var(--mono);font-size:clamp(20px,2.5vw,26px);font-weight:600;color:var(--primary);line-height:1;margin-bottom:8px">$549,466</div>
    <div style="font-size:11px;color:var(--text-muted);line-height:1.5">5 agents · 107-day window</div>
    <!-- Optional source note -->
    <div style="font-size:10px;color:var(--text-muted);opacity:.7;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-family:var(--mono)">Source: Dune @abdelhaks</div>
  </div>

  <!-- Stat card with emerald top accent -->
  <div style="background:var(--bg-card);padding:24px;border-top:2px solid #22c55e">
    <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:10px">Total Yield</div>
    <div style="font-family:var(--mono);font-size:clamp(20px,2.5vw,26px);font-weight:600;color:#22c55e;line-height:1;margin-bottom:8px">$277.32</div>
    <div style="font-size:11px;color:var(--text-muted)">$175.56 native · $101.76 incentive</div>
  </div>

  <!-- Stat card with agent-specific color (e.g. Sail #205372) -->
  <div style="background:var(--bg-card);padding:24px;border-top:2px solid #205372">
    <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:10px">Sail Volume</div>
    <div style="font-family:var(--mono);font-size:clamp(20px,2.5vw,26px);font-weight:600;color:#205372;line-height:1;margin-bottom:8px">$389,245</div>
  </div>

</div>
```

Agent accent colors used for top borders and data: Sail `#205372`, Mamo `#00d180`, Arma `#bced62`, ZyFAI `#a855f7`, SurfLiquid `#f97316`.

---

### Chart Cards (2-column grid)

```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">

  <!-- Horizontal bar chart card -->
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:24px">
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:20px">Volume by Agent</div>

    <!-- hbar row: name (82px fixed) + track + value (80px fixed) -->
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:11px;font-weight:500;width:82px;flex-shrink:0;color:#205372">Sail</span>
      <div style="flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden">
        <div style="width:100%;height:100%;background:#205372;border-radius:2px"></div>
      </div>
      <span style="font-family:var(--mono);font-size:10px;color:var(--text-muted);width:80px;text-align:right;flex-shrink:0">$389,245</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <span style="font-size:11px;font-weight:500;width:82px;flex-shrink:0;color:#00d180">Mamo</span>
      <div style="flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden">
        <div style="width:54.8%;height:100%;background:#00d180;border-radius:2px"></div>
      </div>
      <span style="font-family:var(--mono);font-size:10px;color:var(--text-muted);width:80px;text-align:right;flex-shrink:0">$213,378</span>
    </div>
  </div>

  <!-- Stacked bar chart card -->
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:24px">
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:20px">Native vs Incentive Yield</div>

    <!-- stack item: header row + bar -->
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:5px;font-family:var(--mono)">
        <span style="color:#205372">Sail</span>
        <span>$34.12 native (99.7%) · $0.09 incentive (0.3%)</span>
      </div>
      <div style="display:flex;height:6px;border-radius:3px;overflow:hidden">
        <div style="width:99.7%;background:#205372"></div>
        <div style="width:0.3%;background:rgba(32,83,114,0.3)"></div>
      </div>
    </div>
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:5px;font-family:var(--mono)">
        <span style="color:#bced62">Arma</span>
        <span>$29.02 native (48.6%) · $30.75 incentive (51.4%)</span>
      </div>
      <div style="display:flex;height:6px;border-radius:3px;overflow:hidden">
        <div style="width:48.6%;background:#bced62"></div>
        <div style="width:51.4%;background:rgba(188,237,98,0.2)"></div>
      </div>
    </div>
  </div>

</div>
```

Bar heights: **4px** for horizontal bars, **6px** for stacked bars.

---

### APY Grid (per-agent breakdown)

5 equal columns, same 1px-gap technique. Each card shows protocol dot + label, big APY value, then key/value rows:

```html
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:8px;overflow:hidden">

  <div style="background:var(--bg-card);padding:20px 18px;border-top:1px solid #205372">
    <!-- Protocol label with dot -->
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:12px;display:flex;align-items:center;gap:6px">
      <span style="width:6px;height:6px;border-radius:50%;background:#205372;display:inline-block"></span>
      Sail
    </div>
    <!-- Main APY value -->
    <div style="font-family:var(--mono);font-size:22px;font-weight:700;line-height:1;margin-bottom:3px;color:#205372">3.84%</div>
    <div style="font-size:9px;color:var(--text-muted);margin-bottom:14px">107-day realized</div>
    <div style="height:1px;background:var(--border);margin:10px 0"></div>
    <!-- Key/value rows -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
      <span style="font-size:9px;color:var(--text-muted)">Volume</span>
      <span style="font-family:var(--mono);font-size:10px;color:var(--text-sub)">$389,245</span>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
      <span style="font-size:9px;color:var(--text-muted)">Yield</span>
      <span style="font-family:var(--mono);font-size:10px;color:#22c55e">$34.21</span>
    </div>
  </div>

  <!-- Repeat for Mamo, Arma, ZyFAI, SurfLiquid with their accent colors -->

</div>
```

---

### Tab Switcher (Agent Sections)

Each agent section has tabs for Overview / APY Analysis / Venue Breakdown. Requires a small JavaScript handler:

```html
<!-- Tab container -->
<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-top:16px">
  <div style="display:flex;background:var(--bg);border-bottom:1px solid var(--border)">
    <button class="sw-tab active" data-panel="overview">Overview</button>
    <button class="sw-tab" data-panel="apy">APY Analysis</button>
    <button class="sw-tab" data-panel="venues">Venues</button>
  </div>
  <div class="sw-panel active" data-panel="overview" style="padding:24px">
    <!-- content -->
  </div>
  <div class="sw-panel" data-panel="apy" style="padding:24px">
    <!-- content -->
  </div>
</div>
```

CSS for tabs (add to `globals.css`):
```css
.sw-tab {
  padding: 10px 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all .15s;
  font-family: inherit;
}
.sw-tab:hover { color: var(--text-sub); }
.sw-tab.active { color: var(--text); border-bottom-color: var(--primary); }
.sw-panel { display: none; }
.sw-panel.active { display: block; }
```

JavaScript handler:
```javascript
document.querySelectorAll('.sw-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.sw-wrap') // or parent container
    const panelId = btn.dataset.panel
    wrap.querySelectorAll('.sw-tab').forEach(t => t.classList.toggle('active', t === btn))
    wrap.querySelectorAll('.sw-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === panelId))
  })
})
```

---

### Data Table

```html
<div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;margin-bottom:20px">
  <table style="width:100%;border-collapse:collapse;min-width:750px">
    <thead style="background:var(--bg-card)">
      <tr>
        <th style="padding:12px 18px;text-align:left;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);border-bottom:1px solid var(--border)">Protocol</th>
        <th style="padding:12px 18px;text-align:right;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);border-bottom:1px solid var(--border)">Volume</th>
        <th style="padding:12px 18px;text-align:right;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);border-bottom:1px solid var(--border)">APY</th>
      </tr>
    </thead>
    <tbody>
      <tr style="transition:background .1s" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background=''">
        <td style="padding:14px 18px;border-bottom:1px solid rgba(39,39,42,0.5)">
          <!-- Protocol name cell: rank badge + colored dot + name -->
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-family:var(--mono);font-size:10px;color:var(--text-muted);background:var(--bg-card-2);padding:2px 6px;border-radius:3px">01</span>
            <span style="width:8px;height:8px;border-radius:50%;background:#a78bfa;flex-shrink:0"></span>
            <span style="font-weight:500;color:var(--text)">Morpho: Gauntlet USDC Prime</span>
          </div>
        </td>
        <td style="padding:14px 18px;text-align:right;font-family:var(--mono);font-size:12px;color:var(--text-sub);border-bottom:1px solid rgba(39,39,42,0.5)">~$85k</td>
        <td style="padding:14px 18px;text-align:right;font-family:var(--mono);font-size:12px;color:#22c55e;border-bottom:1px solid rgba(39,39,42,0.5)">+12.4%</td>
      </tr>
    </tbody>
    <tfoot style="border-top:1px solid var(--border);background:var(--bg-card)">
      <tr>
        <td style="padding:14px 18px;font-family:var(--mono);font-size:11px;font-weight:600;color:var(--text)">Total</td>
        <td style="padding:14px 18px;text-align:right;font-family:var(--mono);font-size:11px;font-weight:600;color:var(--text)">$549,466</td>
        <td style="padding:14px 18px;text-align:right;font-family:var(--mono);font-size:11px;color:var(--text-muted)">—</td>
      </tr>
    </tfoot>
  </table>
</div>
```

---

### Callout Boxes

Four variants using left-border accents:

```html
<!-- Method / Formula (indigo) -->
<div style="background:var(--bg-card);border:1px solid var(--border);border-left:2px solid var(--primary);border-radius:8px;padding:20px 24px;font-size:12px;color:var(--text-muted);line-height:1.8;margin:24px 0">
  <strong style="color:var(--primary);font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em">Formula</strong> —
  <code style="font-family:var(--mono);color:var(--text-sub);background:rgba(255,255,255,0.05);padding:1px 5px;border-radius:3px;font-size:11px">APY = (1 + Yield/Capital)^(365/Days) − 1</code>
</div>

<!-- Warning (indigo tint bg) -->
<div style="background:rgba(39,39,158,0.04);border:1px solid rgba(39,39,158,0.2);border-radius:8px;padding:16px 20px;font-size:12px;color:var(--text-muted);line-height:1.75;margin:20px 0">
  <strong style="color:var(--primary)">Note:</strong> All figures are based on on-chain data. Past performance does not guarantee future results.
</div>

<!-- Insight (emerald) -->
<div style="background:var(--bg-card-2);border:1px solid var(--border);border-left:2px solid #22c55e;border-radius:8px;padding:16px 20px;font-size:12px;color:var(--text-muted);line-height:1.8;margin:20px 0">
  <strong style="color:#22c55e">Insight:</strong> Native yield represents 63.3% of total returns.
</div>

<!-- Risk Alert (amber) -->
<div style="background:var(--bg-card-2);border:1px solid var(--border);border-left:2px solid #f59e0b;border-radius:8px;padding:16px 20px;font-size:12px;color:var(--text-muted);line-height:1.8;margin:20px 0">
  <strong style="color:#f59e0b">Risk Alert:</strong> Incentive yield comprises 36.7% of returns — monitor emission schedules.
</div>
```

---

### Section Header

Every report section opens with a tagged header. The `::before` line accent is added via a `.section-tag` CSS class:

```html
<div style="margin-bottom:40px">
  <!-- Tag with line before it (needs .section-tag class in globals.css) -->
  <div class="section-tag">Performance</div>
  <h2 style="font-size:clamp(24px,3vw,36px);font-weight:700;letter-spacing:-.02em;color:var(--text);margin-bottom:12px;line-height:1.15">
    Season Results
  </h2>
  <p style="font-size:14px;color:var(--text-muted);line-height:1.75;max-width:680px">
    107-day window across five autonomous agents, 17 DeFi venues.
  </p>
</div>
```

Add to `globals.css`:
```css
.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 14px;
}
.section-tag::before {
  content: '';
  display: block;
  width: 16px;
  height: 1px;
  background: var(--primary);
}
```

---

### Timeline

```html
<div style="position:relative;padding-left:28px">
  <!-- Vertical line -->
  <div style="position:absolute;left:7px;top:8px;bottom:8px;width:1px;background:var(--border)"></div>

  <!-- Milestone: indigo dot -->
  <div style="position:relative;margin-bottom:32px">
    <div style="position:absolute;left:-24px;top:6px;width:8px;height:8px;border-radius:50%;background:var(--primary);border:2px solid var(--bg);box-shadow:0 0 8px rgba(39,39,158,0.4)"></div>
    <div style="font-family:var(--mono);font-size:10px;color:var(--primary);letter-spacing:.06em;margin-bottom:4px">Nov 5, 2024</div>
    <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:4px">Genesis Launch</div>
    <div style="font-size:12px;color:var(--text-muted);line-height:1.65">Initial $10,000 deployment across 5 autonomous agents</div>
  </div>

  <!-- Milestone: emerald dot -->
  <div style="position:relative;margin-bottom:32px">
    <div style="position:absolute;left:-24px;top:6px;width:8px;height:8px;border-radius:50%;background:#22c55e;border:2px solid var(--bg);box-shadow:0 0 8px rgba(34,197,94,0.4)"></div>
    <div style="font-family:var(--mono);font-size:10px;color:#22c55e;letter-spacing:.06em;margin-bottom:4px">Dec 15, 2024</div>
    <div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:4px">First Milestone</div>
    <div style="font-size:12px;color:var(--text-muted);line-height:1.65">Achieved $100K cumulative volume</div>
  </div>
</div>
```

---

### Priority Cards

```html
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:28px;transition:border-color .15s"
       onmouseover="this.style.borderColor='rgba(39,39,158,0.3)'" onmouseout="this.style.borderColor='var(--border)'">
    <!-- Ghost number -->
    <div style="font-family:var(--mono);font-size:42px;font-weight:700;color:rgba(255,255,255,0.06);line-height:1;margin-bottom:16px">01</div>
    <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:8px">Risk Assessment</div>
    <div style="font-size:12px;color:var(--text-muted);line-height:1.75">Multi-dimensional risk scoring using machine learning models</div>
  </div>
</div>
```

---

### Hero Card (Terminal Style)

```html
<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow:hidden">
  <!-- Terminal header dots -->
  <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:6px">
    <div style="width:10px;height:10px;border-radius:50%;background:#ef4444"></div>
    <div style="width:10px;height:10px;border-radius:50%;background:#f59e0b"></div>
    <div style="width:10px;height:10px;border-radius:50%;background:#22c55e"></div>
  </div>
  <!-- Quote body -->
  <div style="padding:24px">
    <p style="font-size:15px;color:var(--text-sub);line-height:1.7;font-style:italic;margin-bottom:20px;border-left:2px solid var(--primary);padding-left:16px">
      "$10,000. 107 days. Five agents. 17 DeFi venues."
    </p>
    <div style="font-size:11px;font-family:var(--mono);color:var(--text-muted)">bond.credit · Agentic Alpha Genesis</div>
  </div>
  <!-- Stats strip (same 1px-gap technique) -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border-top:1px solid var(--border)">
    <div style="background:var(--bg-card);padding:18px 20px">
      <div style="font-family:var(--mono);font-size:20px;font-weight:600;color:var(--primary);line-height:1;margin-bottom:4px">9.78%</div>
      <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)">Portfolio APY</div>
    </div>
    <div style="background:var(--bg-card);padding:18px 20px">
      <div style="font-family:var(--mono);font-size:20px;font-weight:600;color:var(--text);line-height:1;margin-bottom:4px">$277.32</div>
      <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)">Total Yield</div>
    </div>
  </div>
</div>
```

---

### Protocol Badges

```html
<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:10px">
  <span style="font-size:9px;font-weight:600;padding:3px 9px;border-radius:3px;letter-spacing:.03em;font-family:var(--mono);border:1px solid;color:#a78bfa;background:rgba(139,92,246,.08);border-color:rgba(139,92,246,.25)">Morpho</span>
  <span style="font-size:9px;font-weight:600;padding:3px 9px;border-radius:3px;letter-spacing:.03em;font-family:var(--mono);border:1px solid;color:#60a5fa;background:rgba(96,165,250,.08);border-color:rgba(96,165,250,.25)">Aave</span>
  <span style="font-size:9px;font-weight:600;padding:3px 9px;border-radius:3px;letter-spacing:.03em;font-family:var(--mono);border:1px solid;color:#22d3ee;background:rgba(34,211,238,.08);border-color:rgba(34,211,238,.25)">Euler</span>
  <span style="font-size:9px;font-weight:600;padding:3px 9px;border-radius:3px;letter-spacing:.03em;font-family:var(--mono);border:1px solid;color:#34d399;background:rgba(52,211,153,.08);border-color:rgba(52,211,153,.25)">Fluid</span>
  <span style="font-size:9px;font-weight:600;padding:3px 9px;border-radius:3px;letter-spacing:.03em;font-family:var(--mono);border:1px solid;color:#fbbf24;background:rgba(251,191,36,.08);border-color:rgba(251,191,36,.25)">Moonwell</span>
  <span style="font-size:9px;font-weight:600;padding:3px 9px;border-radius:3px;letter-spacing:.03em;font-family:var(--mono);border:1px solid;color:#f87171;background:rgba(248,113,113,.08);border-color:rgba(248,113,113,.25)">Wasabi</span>
  <span style="font-size:9px;font-weight:600;padding:3px 9px;border-radius:3px;letter-spacing:.03em;font-family:var(--mono);border:1px solid;color:#4ade80;background:rgba(74,222,128,.08);border-color:rgba(74,222,128,.25)">Harvest</span>
</div>
```

---

### Brand Strip (Report Footer)

```html
<div style="background:var(--bg-card-2);border:1px solid var(--border);border-radius:8px;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;gap:24px;overflow:hidden;position:relative;margin-bottom:24px">
  <!-- Glow accent -->
  <div style="position:absolute;right:-40px;top:-30px;width:120px;height:120px;background:radial-gradient(ellipse,rgba(39,39,158,0.12) 0%,transparent 70%);pointer-events:none"></div>
  <div style="display:flex;align-items:center;gap:16px;position:relative">
    <div style="width:32px;height:32px;border-radius:8px;background:var(--primary);display:flex;align-items:center;justify-content:center">
      <span style="color:white;font-weight:700;font-size:14px">B</span>
    </div>
    <div style="font-size:11px;color:var(--text-muted);line-height:1.6;max-width:420px">
      Building the credit history of the agentic economy through verified onchain transactions
    </div>
  </div>
  <div style="font-size:10px;font-family:var(--mono);color:var(--text-muted);text-align:right;line-height:1.8;position:relative">
    <div>Genesis Report</div>
    <div>Nov 2024 – Feb 2025</div>
  </div>
</div>
```

---

### Footnote Strip

```html
<div style="background:var(--bg-card);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:16px 0;margin:48px 0">
  <div style="max-width:1200px;margin:0 auto;padding:0 40px;display:flex;gap:40px;flex-wrap:wrap">
    <div style="font-family:var(--mono);font-size:10px;color:var(--text-muted);line-height:1.6">
      <span style="color:var(--text-sub)">¹</span> All volume figures sourced from Dune Analytics (@abdelhaks). Verified onchain.
    </div>
    <div style="font-family:var(--mono);font-size:10px;color:var(--text-muted);line-height:1.6">
      <span style="color:var(--text-sub)">²</span> APY calculated as annualized rate from realized yield over observation window.
    </div>
  </div>
</div>
```

## Design System Reference

Full component patterns, color tokens, typography scale, and copy-paste templates are in `DESIGN_SYSTEM.md`. Technical implementation details (animation recipes, theme system internals) are in `AGENTS.md`.

> Note: `DESIGN_SYSTEM.md` uses `.card` in its examples but the actual class in `globals.css` is `.card-dark`. Always check `globals.css` for the authoritative class names.
