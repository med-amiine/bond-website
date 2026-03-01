# SnapChain - AI Coding Agent Guide

## Project Overview

SnapChain (also branded as bond.credit) is a modern marketing website for a blockchain infrastructure platform. The site showcases products including ACE (Agentic Credit Engine), Bondex (Smart Rebalancing), and Bond App (Smart Vault Management). It features rich animations, dark/light theme support, and a premium visual design targeting developers and enterprise clients in the Web3/DeFi space.

**Live Site Purpose:** Landing page and product showcase for blockchain infrastructure services with a focus on AI-powered DeFi solutions.

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15.0.0 (App Router) |
| Language | TypeScript 5.x |
| UI Library | React 18.2.0 |
| Styling | Tailwind CSS 3.4.0 |
| Animation | GSAP 3.14.2 + ScrollTrigger |
| Smooth Scroll | Lenis 1.3.17 |
| Build Output | Static Export |

## Build Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Project Structure

```
/Users/midmoussi/Downloads/snapchain_4/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles + CSS variables for theming
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   └── products/            # Product pages
│       ├── ace/page.tsx     # ACE (Agentic Credit Engine)
│       ├── bondex/page.tsx  # Bondex (Smart Rebalancing)
│       └── bond-app/page.tsx # Bond App (Yield Optimization)
├── components/              # React components
│   ├── Navbar.tsx          # Floating pill navbar with dropdowns
│   ├── Hero.tsx            # Hero section with GSAP animations
│   ├── Partners.tsx        # Marquee network logos
│   ├── SnapV1.tsx          # Pinned scroll feature cards
│   ├── Frameworks.tsx      # Framework integration grid
│   ├── TrustedPartners.tsx # VC partner logos
│   ├── Testimonials.tsx    # Testimonial carousel
│   ├── FooterCTA.tsx       # Final call-to-action
│   ├── Footer.tsx          # Site footer
│   ├── CustomCursor.tsx    # Custom cursor (desktop only)
│   ├── SmoothScroll.tsx    # Lenis smooth scroll wrapper
│   └── ThemeToggle.tsx     # Light/dark mode toggle
├── public/                  # Static assets
│   └── assets/             # Images (hero-3d.png, blog images, agent images)
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Code Style Guidelines

### Component Patterns

All components use the `'use client'` directive when they need:
- React hooks (useState, useEffect, useRef)
- Browser APIs (window, document)
- GSAP/ScrollTrigger animations
- Event listeners

Example pattern:
```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ComponentName() {
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP animations here
    }, ref)
    
    return () => ctx.revert()
  }, [])
  
  return <section ref={ref}>...</section>
}
```

### File Naming
- Components: PascalCase (e.g., `CustomCursor.tsx`)
- Pages: `page.tsx` in their respective directories
- Utilities: camelCase

### TypeScript Conventions
- Strict mode enabled
- Explicit return types on components not required (inferred)
- Ref types: `useRef<HTMLElement>(null)`
- CSS variable types are handled through globals.css

## Styling Conventions

### CSS Variables (Theme System)

The project uses CSS custom properties for theming. All color values reference these variables:

```css
/* Primary accent - Indigo (consistent across modes) */
--primary: #27279E;
--primary-light: #3B3BB8;
--primary-dark: #1E1B4B;

/* Background & Surface */
--bg: #C5CCD4;          /* Light: blue-gray | Dark: #000000 */
--bg-card: #F5F7FA;     /* Light | Dark: #0a0a0f */
--bg-card-2: #E8EBF0;   /* Light | Dark: #111118 */

/* Text */
--text: #1E1B4B;        /* Light | Dark: #C5CCD4 */
--text-muted: #6B7280;  /* Light | Dark: #71717a */
--text-sub: #4B5563;    /* Light | Dark: #a1a1aa */

/* Border */
--border: #D1D5DB;      /* Light | Dark: #27272a */
--border-hover: #9CA3AF;/* Light | Dark: #3f3f46 */

/* Glow Effects */
--glow-primary: rgba(39, 39, 158, 0.4);
--glow-subtle: rgba(39, 39, 158, 0.15);
--glow-strong: rgba(39, 39, 158, 0.25);
```

### Tailwind Usage
- Colors: Always use CSS variables (e.g., `bg-[var(--bg)]`, `text-[var(--text)]`)
- Primary accent: Direct hex `#27279E` for the brand indigo
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Custom classes defined in `globals.css`:
  - `.btn-primary` - Primary CTA button
  - `.btn-secondary` - Secondary/outline button
  - `.card-dark` - Card container style
  - `.text-gradient` - Gradient text effect

### Predefined Component Classes (globals.css)

```css
.btn-primary    /* Indigo pill button with glow hover */
.btn-secondary  /* Outlined pill button */
.card-dark      /* Card with border, hover lift effect */
.text-gradient  /* Indigo gradient text */
.grid-pattern   /* Subtle grid background */
.radial-glow    /* Soft radial gradient */
```

## Animation Patterns

### GSAP ScrollTrigger Usage

Most sections use GSAP for scroll-triggered animations:

```typescript
// Standard fade-in pattern
const ctx = gsap.context(() => {
  gsap.from(elementRef.current, {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 80%',      // When top of section hits 80% viewport
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    ease: 'power2.out',
  })
}, sectionRef)

// Cleanup is critical
return () => ctx.revert()
```

### Pinned Sections (SnapV1)

The SnapV1 component demonstrates pinned scroll with snapping:

```typescript
ScrollTrigger.create({
  trigger: section,
  start: 'top top',
  end: '+=150%',
  pin: true,
  scrub: 0.3,
  snap: {
    snapTo: [0, 0.25, 0.5, 0.75, 1],
    duration: { min: 0.2, max: 0.4 },
    ease: 'power2.out',
  },
})
```

### Smooth Scroll (Lenis)

The `SmoothScroll` component wraps the entire app and provides:
- Velocity-based text blur during fast scrolling
- Custom easing: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- Duration: 1.2s

## Theme System

### How it Works

1. **Script injection in layout.tsx** prevents flash on load:
```typescript
const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  })()
`
```

2. **ThemeToggle component** handles switching and persists to localStorage

3. **CSS selectors** apply dark mode:
```css
[data-theme="dark"] {
  --bg: #000000;
  --text: #C5CCD4;
  /* ... other dark values */
}
```

### Adding Theme-Aware Styles

Always use CSS variables, never hardcode colors that should adapt:
```tsx
// ✅ Good
<div className="bg-[var(--bg)] text-[var(--text)]">

// ❌ Bad (won't adapt to theme)
<div className="bg-gray-200 text-gray-900">
```

## Custom Cursor

The `CustomCursor` component:
- Only activates on devices with `pointer: fine` (mouse users)
- Hides default cursor via CSS: `* { cursor: none !important; }`
- Three layers: main dot, trail aura, glow aura
- Expands on hover over interactive elements
- Uses `data-cursor-default` attribute to disable hover expansion on specific elements

## Important Implementation Notes

### Image Handling
- Next.js Image component is NOT used (configured with `unoptimized: true`)
- Use standard `<img>` tags or inline SVGs
- Images stored in `/public/assets/`

### Path Aliases
- `@/` maps to project root
- Example: `import Navbar from '@/components/Navbar'`

### Hydration Considerations
- ThemeToggle uses `mounted` state to prevent hydration mismatch
- Custom cursor only renders client-side
- `suppressHydrationWarning` on html element in layout

### Scroll Behavior
- GSAP ScrollTrigger and Lenis can conflict if not managed
- Lenis scroll events are used for velocity-based blur only
- ScrollTrigger handles all pinned/scrubbed animations

### Performance
- `will-change` not explicitly used (rely on browser optimization)
- `backface-visibility: hidden` on animated cards
- IntersectionObserver used for simple fade-ins where GSAP not needed
- All GSAP contexts are properly cleaned up

## Adding New Pages

1. Create directory: `app/new-page/page.tsx`
2. Use existing product pages as templates
3. Include back link: `<Link href="/">Back to home</Link>`
4. Use CSS variables for all colors
5. Add to Navbar dropdowns if it's a product/resource

## Common Tasks

### Adding a New Section
1. Create component in `/components/`
2. Import in `app/page.tsx`
3. Add GSAP animations following existing patterns
4. Use CSS variables for colors

### Adding a Button
```tsx
<button className="btn-primary group">
  Button Text
  <svg className="transition-transform group-hover:translate-x-1">...</svg>
</button>
```

### Adding a Card
```tsx
<div className="card-dark p-6">
  {/* Content */}
</div>
```

## Testing Considerations

- No test framework is currently configured
- Manual testing checklist:
  - [ ] Theme toggle works and persists
  - [ ] Custom cursor appears on desktop
  - [ ] Smooth scroll functions correctly
  - [ ] GSAP animations trigger on scroll
  - [ ] Mobile menu opens/closes
  - [ ] All dropdowns work on hover (desktop) and click (mobile)

## Deployment

The project builds to static files:
```javascript
// next.config.js
module.exports = {
  images: {
    unoptimized: true,
  },
}
```

Deploy the `.next` folder or use `next export` if static HTML is needed.
