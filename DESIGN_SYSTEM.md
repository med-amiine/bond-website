---
title: Bond.Credit Design System
description: A comprehensive design system for blockchain/DeFi marketing websites with premium dark/light mode theming
type: design-system
version: 1.0.0
target_audience: [developers, designers, ai-agents]
frameworks: [react, nextjs, tailwindcss, gsap]
---

# Bond.Credit Design System

> **Purpose**: Create premium blockchain/DeFi marketing websites with consistent dark/light theming
> **Tech Stack**: React, Next.js, Tailwind CSS, GSAP
> **Key Features**: Automatic theme switching, scroll animations, premium UI components

## Table of Contents

1. [Quick Start](#quick-start) - 30 second setup
2. [Color System](#color-system) - CSS variables for theming
3. [Typography](#typography) - Font stack and scales
4. [Components](#components) - Buttons, cards, badges
5. [Animations](#animations) - GSAP ScrollTrigger patterns
6. [Layout Patterns](#layout-patterns) - Common section layouts
7. [Theme System](#theme-system) - Dark/light mode implementation
8. [Copy-Paste Templates](#copy-paste-templates) - Ready-to-use code

---

## Quick Start

### Step 1: Copy Base CSS (REQUIRED)

```css
/* FILE: globals.css */

/* Google Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* DESIGN TOKENS - Light Mode (Default) */
:root {
  --primary: #27279E;
  --primary-light: #3B3BB8;
  --primary-dark: #1E1B4B;
  --bg: #C5CCD4;
  --bg-card: #F5F7FA;
  --bg-card-2: #E8EBF0;
  --text: #1E1B4B;
  --text-muted: #6B7280;
  --text-sub: #4B5563;
  --border: #D1D5DB;
  --border-hover: #9CA3AF;
  --glow-primary: rgba(39, 39, 158, 0.4);
  --glow-subtle: rgba(39, 39, 158, 0.15);
  --glow-strong: rgba(39, 39, 158, 0.25);
}

/* DESIGN TOKENS - Dark Mode */
[data-theme="dark"] {
  --bg: #000000;
  --bg-card: #0a0a0f;
  --bg-card-2: #111118;
  --text: #C5CCD4;
  --text-muted: #71717a;
  --text-sub: #a1a1aa;
  --border: #27272a;
  --border-hover: #3f3f46;
  --glow-primary: rgba(59, 59, 220, 0.6);
  --glow-subtle: rgba(59, 59, 220, 0.25);
  --glow-strong: rgba(59, 59, 220, 0.4);
}

/* BASE STYLES */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
```

### Step 2: Copy Component Classes (REQUIRED)

```css
/* FILE: components.css */

/* BUTTON: Primary CTA */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #27279E;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 14px 28px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  text-decoration: none;
}
.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px var(--glow-primary);
}

/* BUTTON: Secondary */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--text);
  font-weight: 500;
  font-size: 14px;
  padding: 14px 28px;
  border-radius: 100px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;
}
.btn-secondary:hover {
  background: var(--bg-card-2);
  border-color: var(--border-hover);
}

/* CARD: Standard */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
}

/* TEXT: Gradient */
.text-gradient {
  background: linear-gradient(135deg, #27279E 0%, #3B3BB8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* BACKGROUND: Grid Pattern */
.grid-pattern {
  background-image:
    linear-gradient(rgba(39, 39, 158, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(39, 39, 158, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* BACKGROUND: Radial Glow */
.radial-glow {
  background: radial-gradient(ellipse at center, var(--glow-subtle) 0%, transparent 70%);
}
```

---

## Color System

### Semantic Color Variables

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--bg` | #C5CCD4 | #000000 | Page background |
| `--bg-card` | #F5F7FA | #0a0a0f | Card backgrounds |
| `--bg-card-2` | #E8EBF0 | #111118 | Secondary surfaces |
| `--text` | #1E1B4B | #C5CCD4 | Primary text |
| `--text-sub` | #4B5563 | #a1a1aa | Secondary text |
| `--text-muted` | #6B7280 | #71717a | Muted/caption text |
| `--border` | #D1D5DB | #27272a | Default borders |
| `--primary` | #27279E | #27279E | Brand accent (indigo) |

### CSS Variable Usage Rules

```css
/* ✅ CORRECT - Use CSS variables */
.element {
  background: var(--bg-card);
  color: var(--text);
  border-color: var(--border);
}

/* ❌ INCORRECT - Hardcoded colors */
.element {
  background: #ffffff;
  color: #000000;
}
```

---

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale (Tailwind Classes)

| Level | Class | Size | Weight | Usage |
|-------|-------|------|--------|-------|
| Hero | `text-5xl md:text-7xl` | 48-72px | 700 | Main headlines |
| Section | `text-4xl md:text-5xl` | 36-48px | 700 | Section titles |
| Card Title | `text-xl` | 20px | 600 | Card headings |
| Body Large | `text-lg` | 18px | 400 | Hero descriptions |
| Body | `text-base` | 16px | 400 | Default text |
| Small | `text-sm` | 14px | 400 | Labels, metadata |
| XSmall | `text-xs` | 12px | 500 | Tags, badges |

### Typography Patterns

```html
<!-- Hero Headline -->
<h1 class="text-5xl md:text-7xl font-bold text-[var(--text)] tracking-tight leading-[1.1]">
  Build on <span class="text-gradient">Blockchain</span>
</h1>

<!-- Section Title -->
<h2 class="text-4xl md:text-5xl font-bold text-[var(--text)]">
  Our <span class="text-gradient">Features</span>
</h2>

<!-- Body Text -->
<p class="text-lg text-[var(--text-sub)] leading-relaxed">
  Description text goes here
</p>
```

---

## Components

### Button Variants

```html
<!-- Primary Button -->
<button class="btn-primary">
  Get Started
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
  </svg>
</button>

<!-- Secondary Button -->
<button class="btn-secondary">Learn More</button>
```

### Card Variants

```html
<!-- Standard Card -->
<div class="card">
  <h3 class="text-xl font-semibold text-[var(--text)]">Title</h3>
  <p class="text-sm text-[var(--text-muted)] mt-2">Description</p>
</div>

<!-- Feature Card with Icon -->
<div class="card group">
  <div class="w-12 h-12 rounded-xl bg-[#27279E]/10 flex items-center justify-center mb-4 group-hover:bg-[#27279E]/20 transition-colors">
    <span class="text-[#27279E] font-bold">1</span>
  </div>
  <h3 class="text-base font-semibold text-[var(--text)]">Feature Title</h3>
  <p class="text-sm text-[var(--text-muted)] mt-2">Feature description</p>
</div>
```

### Badge Variants

```html
<!-- Primary Badge -->
<span class="inline-flex items-center gap-2 px-3 py-1 bg-[#27279E]/10 rounded-full text-xs font-medium text-[#27279E]">
  <span class="w-1.5 h-1.5 rounded-full bg-[#27279E] animate-pulse"></span>
  Live
</span>

<!-- Live Indicator -->
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-[10px] font-medium text-emerald-600">
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
  Live
</span>
```

---

## Data Visualization & Report Components

> **Source**: Adapted from Agentic Alpha Genesis Report for data-heavy dashboards and reports

### Stat Cards with Colored Accents

```html
<!-- Stat Grid Container -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-1 bg-[var(--border)] rounded-lg overflow-hidden border border-[var(--border)]">
  
  <!-- Stat Card with Accent Top Border -->
  <div class="bg-[var(--bg-card)] p-6 hover:bg-[var(--bg-card-2)] transition-colors border-t-2 border-[#27279E]">
    <div class="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">
      Season Volume
    </div>
    <div class="text-2xl font-semibold text-[#27279E] mb-1">$549,466</div>
    <div class="text-xs text-[var(--text-muted)]">5 agents · 107-day window</div>
    <div class="text-[10px] text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border)] font-mono">
      Source: Dune @abdelhaks
    </div>
  </div>
  
  <!-- Stat Card: Green -->
  <div class="bg-[var(--bg-card)] p-6 border-t-2 border-emerald-500">
    <div class="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">
      Total Yield
    </div>
    <div class="text-2xl font-semibold text-emerald-500 mb-1">$277.32</div>
    <div class="text-xs text-[var(--text-muted)]">$175.56 native · $101.76 incentive</div>
  </div>
  
  <!-- Stat Card: No accent -->
  <div class="bg-[var(--bg-card)] p-6">
    <div class="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">
      Transactions
    </div>
    <div class="text-2xl font-semibold text-[var(--text)] mb-1">432</div>
    <div class="text-xs text-[var(--text-muted)]">Verified onchain</div>
  </div>
  
</div>
```

### Data Table

```html
<!-- Table Container -->
<div class="overflow-x-auto border border-[var(--border)] rounded-lg mb-5">
  <table class="w-full min-w-[750px] border-collapse">
    <thead class="bg-[var(--bg-card)]">
      <tr>
        <th class="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)]">
          Protocol
        </th>
        <th class="text-right py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)]">
          Volume
        </th>
        <th class="text-right py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)]">
          APY
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-white/[0.02] transition-colors">
        <td class="py-4 px-4 border-b border-[var(--border)]/50">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#27279E]"></span>
            <span class="text-sm font-medium text-[var(--text)]">Aave</span>
          </div>
        </td>
        <td class="py-4 px-4 border-b border-[var(--border)]/50 text-right font-mono text-xs text-[var(--text-sub)]">
          $124,532
        </td>
        <td class="py-4 px-4 border-b border-[var(--border)]/50 text-right font-mono text-xs text-emerald-500">
          +12.4%
        </td>
      </tr>
    </tbody>
    <tfoot class="border-t border-[var(--border)] bg-[var(--bg-card)]">
      <tr>
        <td class="py-4 px-4 font-mono text-[11px] font-semibold text-[var(--text)]">
          Total
        </td>
        <td class="py-4 px-4 text-right font-mono text-[11px] font-semibold text-[var(--text)]">
          $549,466
        </td>
        <td class="py-4 px-4 text-right font-mono text-[11px] text-[var(--text-muted)]">
          —
        </td>
      </tr>
    </tfoot>
  </table>
</div>
```

### Horizontal Bar Chart

```html
<!-- Horizontal Bar Chart -->
<div class="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-6">
  <div class="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-5">
    Yield by Protocol
  </div>
  
  <!-- Bar Row -->
  <div class="flex items-center gap-3 mb-3">
    <div class="text-[11px] font-medium w-20 flex-shrink-0">Aave</div>
    <div class="flex-1 h-1 bg-[var(--border)] rounded-full overflow-hidden">
      <div class="h-full bg-[#27279E] rounded-full" style="width: 85%"></div>
    </div>
    <div class="font-mono text-[10px] text-[var(--text-muted)] w-16 text-right">
      $45,230
    </div>
  </div>
  
  <div class="flex items-center gap-3 mb-3">
    <div class="text-[11px] font-medium w-20 flex-shrink-0">Compound</div>
    <div class="flex-1 h-1 bg-[var(--border)] rounded-full overflow-hidden">
      <div class="h-full bg-[#3B3BB8] rounded-full" style="width: 65%"></div>
    </div>
    <div class="font-mono text-[10px] text-[var(--text-muted)] w-16 text-right">
      $32,110
    </div>
  </div>
  
  <div class="flex items-center gap-3">
    <div class="text-[11px] font-medium w-20 flex-shrink-0">Morpho</div>
    <div class="flex-1 h-1 bg-[var(--border)] rounded-full overflow-hidden">
      <div class="h-full bg-emerald-500 rounded-full" style="width: 40%"></div>
    </div>
    <div class="font-mono text-[10px] text-[var(--text-muted)] w-16 text-right">
      $18,450
    </div>
  </div>
</div>
```

### Stacked Bar Chart

```html
<!-- Stacked Bar Chart -->
<div class="space-y-4">
  
  <div>
    <div class="flex justify-between text-[10px] text-[var(--text-muted)] mb-1 font-mono">
      <span>Aave Allocation</span>
      <span>45%</span>
    </div>
    <div class="flex h-1.5 rounded-full overflow-hidden">
      <div class="bg-[#27279E]" style="width: 45%"></div>
      <div class="bg-[var(--border)]" style="width: 55%"></div>
    </div>
  </div>
  
  <div>
    <div class="flex justify-between text-[10px] text-[var(--text-muted)] mb-1 font-mono">
      <span>Compound Allocation</span>
      <span>30%</span>
    </div>
    <div class="flex h-1.5 rounded-full overflow-hidden">
      <div class="bg-[#3B3BB8]" style="width: 30%"></div>
      <div class="bg-[var(--border)]" style="width: 70%"></div>
    </div>
  </div>
  
</div>
```

### Info Boxes (Method, Warning, Insight)

```html
<!-- Method Box - Formula/Technical Info -->
<div class="bg-[var(--bg-card)] border border-[var(--border)] border-l-2 border-l-[#27279E] rounded-lg p-5 my-6 text-xs text-[var(--text-muted)] leading-relaxed">
  <strong class="text-[#27279E] font-mono text-[10px] uppercase tracking-wider">Formula</strong> — 
  <code class="font-mono text-[var(--text-sub)] bg-white/5 px-1 py-0.5 rounded text-[11px]">
    APY = (1 + Yield / Capital)^(365/Days) − 1
  </code>
  <br>
  Verification: $2,000 deposit · $34 yield · 100 days → 6.36% APY
</div>

<!-- Warning Box -->
<div class="bg-[#27279E]/5 border border-[#27279E]/20 rounded-lg p-4 my-5 text-xs text-[var(--text-muted)] leading-relaxed">
  <strong class="text-[#27279E]">Note:</strong> All figures are based on on-chain data. Past performance does not guarantee future results.
</div>

<!-- Insight Box (Green accent) -->
<div class="bg-[var(--bg-card)] border border-[var(--border)] border-l-2 border-l-emerald-500 rounded-lg p-4 my-5 text-xs text-[var(--text-muted)] leading-relaxed">
  <strong class="text-emerald-500">Insight:</strong> Native yield represents 63.3% of total returns, indicating strong protocol sustainability.
</div>

<!-- Risk Box (Amber accent) -->
<div class="bg-[var(--bg-card)] border border-[var(--border)] border-l-2 border-l-amber-500 rounded-lg p-4 my-5 text-xs text-[var(--text-muted)] leading-relaxed">
  <strong class="text-amber-500">Risk Alert:</strong> Incentive yield comprises 36.7% of returns — monitor emission schedules.
</div>
```

### Protocol Badges

```html
<!-- Protocol Badge -->
<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-semibold tracking-wide font-mono border bg-purple-500/10 text-purple-400 border-purple-500/25">
  Morpho
</span>

<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-semibold tracking-wide font-mono border bg-blue-500/10 text-blue-400 border-blue-500/25">
  Aave
</span>

<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-semibold tracking-wide font-mono border bg-cyan-500/10 text-cyan-400 border-cyan-500/25">
  Euler
</span>

<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-semibold tracking-wide font-mono border bg-emerald-500/10 text-emerald-400 border-emerald-500/25">
  Fluid
</span>

<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-semibold tracking-wide font-mono border bg-amber-500/10 text-amber-400 border-amber-500/25">
  Moonwell
</span>
```

### Timeline

```html
<!-- Timeline Container -->
<div class="relative pl-7">
  <!-- Timeline Line -->
  <div class="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]"></div>
  
  <!-- Milestone -->
  <div class="relative mb-8">
    <!-- Dot -->
    <div class="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[#27279E] border-2 border-[var(--bg)] shadow-[0_0_8px_rgba(39,39,158,0.4)]"></div>
    <div class="font-mono text-[10px] text-[#27279E] tracking-wider mb-1">Nov 5, 2024</div>
    <div class="text-sm font-semibold text-[var(--text)] mb-1">Genesis Launch</div>
    <div class="text-xs text-[var(--text-muted)] leading-relaxed">
      Initial $10,000 deployment across 5 autonomous agents
    </div>
  </div>
  
  <!-- Milestone (Green) -->
  <div class="relative mb-8">
    <div class="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[var(--bg)] shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
    <div class="font-mono text-[10px] text-emerald-500 tracking-wider mb-1">Dec 15, 2024</div>
    <div class="text-sm font-semibold text-[var(--text)] mb-1">First Milestone</div>
    <div class="text-xs text-[var(--text-muted)] leading-relaxed">
      Achieved $100K cumulative volume
    </div>
  </div>
  
</div>
```

### Hero Card with Terminal Header

```html
<!-- Hero Card -->
<div class="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg overflow-hidden">
  <!-- Terminal Header -->
  <div class="flex items-center gap-2 px-5 py-4 border-b border-[var(--border)]">
    <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
    <div class="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
  </div>
  
  <!-- Card Body -->
  <div class="p-6">
    <p class="text-[15px] text-[var(--text-sub)] leading-relaxed italic mb-5 border-l-2 border-[#27279E] pl-4">
      "$10,000. 107 days. Five agents. 17 DeFi venues. Every transaction onchain."
    </p>
    <div class="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
      <span>bond.credit</span>
      <span>·</span>
      <span>Agentic Alpha Genesis</span>
    </div>
  </div>
  
  <!-- Stats Grid -->
  <div class="grid grid-cols-2 gap-px bg-[var(--border)] border-t border-[var(--border)]">
    <div class="bg-[var(--bg-card)] p-4">
      <div class="font-mono text-xl font-semibold text-[#27279E] mb-1">9.78%</div>
      <div class="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Portfolio APY</div>
    </div>
    <div class="bg-[var(--bg-card)] p-4">
      <div class="font-mono text-xl font-semibold text-[var(--text)] mb-1">$277.32</div>
      <div class="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Total Yield</div>
    </div>
  </div>
</div>
```

### Priority Cards

```html
<!-- Priority Cards Grid -->
<div class="grid md:grid-cols-3 gap-4">
  
  <div class="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-7 hover:border-[#27279E]/30 transition-colors">
    <div class="font-mono text-4xl font-bold text-[var(--text)]/5 mb-4">01</div>
    <div class="text-sm font-semibold text-[var(--text)] mb-2">Risk Assessment</div>
    <div class="text-xs text-[var(--text-muted)] leading-relaxed">
      Multi-dimensional risk scoring using machine learning models
    </div>
  </div>
  
  <div class="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-7 hover:border-[#27279E]/30 transition-colors">
    <div class="font-mono text-4xl font-bold text-[var(--text)]/5 mb-4">02</div>
    <div class="text-sm font-semibold text-[var(--text)] mb-2">Execution Quality</div>
    <div class="text-xs text-[var(--text-muted)] leading-relaxed">
      Smart transaction batching to minimize gas costs
    </div>
  </div>
  
  <div class="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-7 hover:border-[#27279E]/30 transition-colors">
    <div class="font-mono text-4xl font-bold text-[var(--text)]/5 mb-4">03</div>
    <div class="text-sm font-semibold text-[var(--text)] mb-2">Yield Optimization</div>
    <div class="text-xs text-[var(--text-muted)] leading-relaxed">
      AI-driven allocation across multiple vaults
    </div>
  </div>
  
</div>
```

### Brand Strip

```html
<!-- Brand Strip -->
<div class="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5 flex items-center justify-between gap-6 overflow-hidden">
  <!-- Glow Effect -->
  <div class="absolute -right-10 -top-8 w-32 h-32 bg-[#27279E]/10 rounded-full blur-2xl"></div>
  
  <div class="relative flex items-center gap-4">
    <div class="w-8 h-8 rounded-lg bg-[#27279E] flex items-center justify-center">
      <span class="text-white font-bold text-sm">B</span>
    </div>
    <div class="text-xs text-[var(--text-muted)] leading-relaxed max-w-md">
      Building the credit history of the agentic economy through verified onchain transactions
    </div>
  </div>
  
  <div class="relative text-right">
    <div class="text-[10px] font-mono text-[var(--text-muted)] leading-relaxed">
      <div>Genesis Report</div>
      <div>Nov 2024 – Feb 2025</div>
    </div>
  </div>
</div>
```

### CSS for Data Viz Components

```css
/* FILE: data-viz.css - Add to your globals.css */

/* Mono font stack */
.font-mono {
  font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
}

/* Rank number badge */
.rank-badge {
  @apply font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg-card-2)] px-1.5 py-0.5 rounded;
}

/* Protocol dot */
.proto-dot {
  @apply w-2 h-2 rounded-full flex-shrink-0;
}

/* Positive/negative indicators */
.positive { @apply text-emerald-500; }
.negative { @apply text-red-500; }
.neutral { @apply text-[var(--text-muted)]; }

/* Pulse animation for live indicators */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px currentColor; }
  50% { opacity: 0.6; box-shadow: 0 0 16px currentColor; }
}
.animate-pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}
```

---

## Animations

### GSAP ScrollTrigger Setup

```typescript
// FILE: animations.ts or component file

'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ANIMATION: Fade Up
export function useFadeUp() {
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, el)
    
    return () => ctx.revert()
  }, [])
  
  return ref
}

// ANIMATION: Slide From Right
export function useSlideFromRight() {
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 100,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, el)
    
    return () => ctx.revert()
  }, [])
  
  return ref
}

// ANIMATION: Staggered Children
export function useStagger() {
  const containerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const children = container.querySelectorAll('.stagger-child')
    
    const ctx = gsap.context(() => {
      gsap.from(children, {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }, container)
    
    return () => ctx.revert()
  }, [])
  
  return containerRef
}
```

### Hover Transitions

```css
/* Lift on hover */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
}

/* Scale on hover */
.hover-scale {
  transition: transform 0.25s ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}

/* Border color transition */
.hover-border {
  transition: border-color 0.3s ease;
}
.hover-border:hover {
  border-color: var(--primary);
}
```

---

## Layout Patterns

### Hero Section Template

```tsx
// FILE: Hero.tsx

'use client'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg)]">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-glow opacity-50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text)] tracking-tight leading-[1.1] mb-6">
          Build on <span class="text-gradient">Blockchain</span>
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-sub)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Your hero description goes here
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  )
}
```

### Two-Column Section Template

```tsx
// FILE: FeatureSection.tsx

<section className="relative py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Left: Visual */}
      <div>
        {/* Grid, image, or code block */}
      </div>
      
      {/* Right: Content */}
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-6">
          Section <span className="text-gradient">Title</span>
        </h2>
        <p className="text-lg text-[var(--text-sub)] mb-8 leading-relaxed">
          Description text
        </p>
        <button className="btn-primary">CTA Button</button>
      </div>
    </div>
  </div>
</section>
```

### Feature Grid Template

```tsx
// FILE: Features.tsx

<section className="relative py-16">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <span className="text-xs font-medium text-[#27279E] uppercase tracking-wider mb-4 block">
        Features
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">
        What We Offer
      </h2>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <div key={i} className="card group">
          <div className="w-12 h-12 rounded-xl bg-[#27279E]/10 flex items-center justify-center mb-4 group-hover:bg-[#27279E]/20 transition-colors">
            <span className="text-[#27279E] font-bold">{i + 1}</span>
          </div>
          <h3 className="text-base font-semibold text-[var(--text)] mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Theme System

### Theme Toggle Implementation

```tsx
// FILE: ThemeToggle.tsx

'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = saved === 'dark' || (!saved && prefersDark)
    setIsDark(initialDark)
    document.documentElement.setAttribute('data-theme', initialDark ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const newDark = !isDark
    setIsDark(newDark)
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light')
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  if (!mounted) return <div className="w-10 h-10" />

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:border-[#27279E] transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        // Sun icon
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
```

### Theme Script (Prevent Flash)

```tsx
// FILE: layout.tsx

const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  })()
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Copy-Paste Templates

### Complete Page Template

```tsx
// FILE: app/page.tsx

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[var(--bg)]">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}
```

### Navbar Template

```tsx
// FILE: components/Navbar.tsx

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className={`rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-[var(--bg-card)]/90 backdrop-blur-xl border border-[var(--border)]' : 'bg-transparent'}`}>
        <Link href="/" className="font-semibold text-[var(--text)] text-lg">
          Brand
        </Link>
        <div className="hidden md:flex items-center gap-1">
          <Link href="#features" className="px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] rounded-lg transition-colors">
            Features
          </Link>
          <Link href="#about" className="px-4 py-2 text-sm text-[var(--text-sub)] hover:text-[var(--text)] rounded-lg transition-colors">
            About
          </Link>
        </div>
        <button className="btn-primary text-sm py-2 px-4">
          Get Started
        </button>
      </div>
    </div>
  )
}
```

### Stats Section Template

```tsx
// FILE: components/Stats.tsx

<section className="py-16">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-[var(--bg-card)] rounded-3xl p-8 md:p-12 border border-[var(--border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: '99.7%', label: 'Accuracy' },
          { value: '<1s', label: 'Speed' },
          { value: '2M+', label: 'Users' },
          { value: '$500M', label: 'Volume' },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-3xl md:text-4xl font-bold text-[#27279E] mb-2">{stat.value}</div>
            <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

### CTA Section Template

```tsx
// FILE: components/CTA.tsx

<section className="py-16">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-gradient-to-r from-[#27279E] to-[#3B3BB8] rounded-3xl p-10 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Ready to get started?
      </h2>
      <p className="text-white/80 mb-8 max-w-md mx-auto">
        Join thousands of users already using our platform.
      </p>
      <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#27279E] rounded-xl font-semibold hover:shadow-xl transition-all">
        Get Started
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  </div>
</section>
```

---

## Design Principles Summary

1. **Always use CSS variables** - Never hardcode colors
2. **Consistent spacing** - Use py-16 for sections, gap-6 for grids
3. **Primary accent is #27279E** (indigo) - Use for CTAs, highlights, links
4. **Smooth transitions** - 300ms for hovers, 0.6s for scroll animations
5. **Generous whitespace** - Let content breathe
6. **Clear hierarchy** - Hero → Section title → Card title → Body
7. **Accessible contrast** - Ensure text is readable on all backgrounds

---

## Installation Checklist

- [ ] Add Google Fonts (Inter)
- [ ] Copy CSS variables to globals.css
- [ ] Copy component classes (btn-primary, btn-secondary, card)
- [ ] Add grid-pattern and radial-glow backgrounds
- [ ] Install GSAP + ScrollTrigger for animations
- [ ] Add ThemeToggle component
- [ ] Add theme script to layout
- [ ] Replace all hardcoded colors with var(--*) references
- [ ] Test both light and dark modes
