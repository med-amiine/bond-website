# Bond.Credit Design System

A comprehensive design system for blockchain/DeFi marketing websites with premium dark/light mode theming.

---

## 1. Color System

### CSS Variables (globals.css)

```css
:root {
  /* Primary Accent - Indigo (consistent across modes) */
  --primary: #27279E;
  --primary-light: #3B3BB8;
  --primary-dark: #1E1B4B;
  
  /* Light Mode */
  --bg: #C5CCD4;              /* Warm beige/blue-gray */
  --bg-card: #F5F7FA;         /* Off-white */
  --bg-card-2: #E8EBF0;       /* Slightly darker off-white */
  --text: #1E1B4B;            /* Dark indigo */
  --text-muted: #6B7280;      /* Gray */
  --text-sub: #4B5563;        /* Medium gray */
  --border: #D1D5DB;          /* Light gray */
  --border-hover: #9CA3AF;    /* Medium gray */
  
  /* Glow Effects */
  --glow-primary: rgba(39, 39, 158, 0.4);
  --glow-subtle: rgba(39, 39, 158, 0.15);
  --glow-strong: rgba(39, 39, 158, 0.25);
}

/* Dark Mode Override */
[data-theme="dark"] {
  --bg: #000000;              /* Pure black */
  --bg-card: #0a0a0f;         /* Midnight */
  --bg-card-2: #111118;       /* Dark charcoal */
  --text: #C5CCD4;            /* Beige */
  --text-muted: #71717a;      /* Muted gray */
  --text-sub: #a1a1aa;        /* Light gray */
  --border: #27272a;          /* Dark border */
  --border-hover: #3f3f46;    /* Lighter dark border */
  
  /* Stronger glows in dark */
  --glow-primary: rgba(59, 59, 220, 0.6);
  --glow-subtle: rgba(59, 59, 220, 0.25);
  --glow-strong: rgba(59, 59, 220, 0.4);
}
```

### Color Usage Rules

| Element | Variable | Notes |
|---------|----------|-------|
| Page Background | `--bg` | Full bleed |
| Cards/Surfaces | `--bg-card` | Elevated surfaces |
| Secondary surfaces | `--bg-card-2` | Icons, inner elements |
| Primary text | `--text` | Headlines, body |
| Secondary text | `--text-sub` | Descriptions |
| Muted text | `--text-muted` | Captions, labels |
| Borders | `--border` | Default borders |
| Hover borders | `--border-hover` | Interactive states |
| Primary accent | `#27279E` | CTAs, highlights, links |

---

## 2. Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Hero H1 | 5xl-8xl (48-96px) | 700 (bold) | Hero headlines |
| Section H2 | 4xl-5xl (36-48px) | 700 | Section titles |
| H3 | xl-2xl (20-24px) | 600 | Card titles |
| Body Large | lg (18px) | 400 | Hero descriptions |
| Body | base (16px) | 400 | Default text |
| Small | sm (14px) | 400 | Labels, metadata |
| XSmall | xs (12px) | 400-500 | Tags, badges |

### Typography Patterns

```css
/* Hero Headline */
.text-hero {
  @apply text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1];
  color: var(--text);
}

/* Section Headline */
.text-section {
  @apply text-4xl sm:text-5xl font-bold tracking-tight;
  color: var(--text);
}

/* Gradient Text (for highlights) */
.text-gradient {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Body Text */
.text-body {
  @apply text-lg leading-relaxed;
  color: var(--text-sub);
}
```

---

## 3. Spacing System

### Section Spacing
```css
/* Compact sections (reduced from py-32) */
.section-compact {
  @apply py-16;
}

/* Medium padding */
.section-medium {
  @apply py-20;
}

/* Component internal spacing */
.card-padding {
  @apply p-6;
}

/* Grid gaps */
.grid-gap {
  @apply gap-6;
}
```

### Container
```css
.container-main {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

---

## 4. Components

### Buttons

```css
/* Primary Button */
.btn-primary {
  @apply inline-flex items-center gap-2 bg-[#27279E] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all;
}
.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px var(--glow-primary);
}

/* Secondary Button */
.btn-secondary {
  @apply inline-flex items-center gap-2 bg-transparent font-medium text-sm px-7 py-3.5 rounded-full border transition-all;
  color: var(--text);
  border-color: var(--border);
}
.btn-secondary:hover {
  background: var(--bg-card-2);
  border-color: var(--border-hover);
}
```

### Cards

```css
/* Standard Card */
.card {
  @apply rounded-2xl p-6 border transition-all;
  background: var(--bg-card);
  border-color: var(--border);
}
.card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
}

/* Feature Card with Icon */
.feature-card {
  @apply rounded-2xl p-6 border transition-all group;
  background: var(--bg-card);
  border-color: var(--border);
}
.feature-card:hover {
  border-color: rgba(39, 39, 158, 0.3);
  box-shadow: 0 4px 20px rgba(39, 39, 158, 0.1);
}

/* Icon container */
.icon-box {
  @apply w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors;
  background: rgba(39, 39, 158, 0.1);
}
.group:hover .icon-box {
  background: rgba(39, 39, 158, 0.2);
}
```

### Badges/Tags

```css
/* Primary Badge */
.badge {
  @apply inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium;
  background: rgba(39, 39, 158, 0.1);
  color: var(--primary);
}

/* Live Indicator */
.badge-live {
  @apply inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium;
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}
.badge-live::before {
  content: '';
  @apply w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse;
}
```

---

## 5. Background Effects

### Grid Pattern
```css
.grid-pattern {
  background-image:
    linear-gradient(rgba(39, 39, 158, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(39, 39, 158, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### Radial Glow
```css
/* Subtle glow */
.radial-glow {
  background: radial-gradient(ellipse at center, var(--glow-subtle) 0%, transparent 70%);
}

/* Strong glow for hero */
.radial-glow-strong {
  background: radial-gradient(ellipse at center, var(--glow-strong) 0%, transparent 65%);
}
```

### Gradient Overlays
```css
/* Fade masks for grids */
.fade-mask-top {
  background: linear-gradient(to bottom, var(--bg), transparent);
}
.fade-mask-bottom {
  background: linear-gradient(to top, var(--bg), transparent);
}
```

---

## 6. Animations

### GSAP ScrollTrigger Patterns

```typescript
// Standard fade up
const ctx = gsap.context(() => {
  gsap.from(elementRef.current, {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    ease: 'power2.out',
  })
}, sectionRef)

// Slide from right (fast)
gsap.from(elementRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  x: 100,
  duration: 0.6,
  ease: 'power2.out',
})

// Staggered children
gsap.from('.child-elements', {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 80%',
  },
  opacity: 0,
  y: 30,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out',
})

// Always cleanup
return () => ctx.revert()
```

### Hover Transitions
```css
/* Standard hover */
.hover-lift {
  @apply transition-all duration-300;
}
.hover-lift:hover {
  transform: translateY(-4px);
}

/* Border color transition */
.hover-border {
  @apply transition-colors duration-300;
}
.hover-border:hover {
  border-color: var(--primary);
}

/* Group hover (for parent-child effects) */
.group:hover .group-hover-scale {
  transform: scale(1.1);
}
```

### Page Load Animation
```typescript
// Navbar slide down
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.5, delay: 0.2 }}
```

---

## 7. Layout Patterns

### Hero Section
```
Structure:
- Full viewport height (min-h-screen or min-h-[80vh])
- Centered content with max-width container
- Background: Grid pattern + radial glow
- Floating gradient orbs (optional)
```

### Two-Column Layout
```
Structure:
- Grid: lg:grid-cols-2
- Gap: gap-12 lg:gap-20
- Left: Visual (grid, image, code block)
- Right: Text content (headline, description, CTAs)
```

### Feature Grid
```
Structure:
- Grid: md:grid-cols-2 lg:grid-cols-3
- Gap: gap-6
- Cards with icon, title, description
```

### Floating Pill Navbar
```
Structure:
- Fixed position, top-4
- Centered with max-width
- Rounded-full corners
- Glassmorphism when scrolled
```

---

## 8. Theme Toggle Implementation

### CSS Setup
```css
/* Default (light) */
:root {
  --bg: #C5CCD4;
  /* ... other vars */
}

/* Dark mode */
[data-theme="dark"] {
  --bg: #000000;
  /* ... other vars */
}
```

### Theme Script (prevent flash)
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

### Toggle Component Logic
```typescript
const [isDark, setIsDark] = useState(false)

useEffect(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  setIsDark(saved === 'dark' || (!saved && prefersDark))
}, [])

const toggle = () => {
  const newDark = !isDark
  setIsDark(newDark)
  document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light')
  localStorage.setItem('theme', newDark ? 'dark' : 'light')
}
```

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

### Responsive Patterns
```css
/* Text scaling */
.text-responsive {
  @apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl;
}

/* Grid collapsing */
.grid-responsive {
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}

/* Container padding */
.container-responsive {
  @apply px-4 sm:px-6 lg:px-8;
}
```

---

## 10. Quick Start Template

### HTML Structure
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #27279E;
      --primary-light: #3B3BB8;
      --bg: #C5CCD4;
      --bg-card: #F5F7FA;
      --bg-card-2: #E8EBF0;
      --text: #1E1B4B;
      --text-muted: #6B7280;
      --text-sub: #4B5563;
      --border: #D1D5DB;
      --border-hover: #9CA3AF;
      --glow-primary: rgba(39, 39, 158, 0.4);
    }
    
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
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  </style>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

---

## 11. Design Principles

1. **Consistency**: Always use CSS variables, never hardcode colors
2. **Hierarchy**: Clear distinction between text, subtext, and muted text
3. **Spacing**: Generous whitespace with consistent rhythm
4. **Glow Effects**: Subtle indigo glows for premium feel
5. **Transitions**: Smooth 300ms transitions for all interactive elements
6. **Depth**: Use cards, shadows, and layering to create depth
7. **Accessibility**: High contrast ratios, focus states on interactive elements

---

## 12. File Structure for New Projects

```
project/
├── styles/
│   ├── globals.css       # CSS variables + base styles
│   ├── components.css    # Button, card, badge styles
│   └── animations.css    # Keyframes + GSAP utilities
├── components/
│   ├── Navbar.tsx
│   ├── ThemeToggle.tsx
│   └── ...
├── hooks/
│   └── useTheme.ts
└── lib/
    └── utils.ts
```

---

## 13. Installation for Existing Projects

### Step 1: Add CSS Variables
Copy the `:root` and `[data-theme="dark"]` blocks to your global CSS.

### Step 2: Add Font
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Step 3: Copy Component Classes
Add `.btn-primary`, `.btn-secondary`, `.card`, `.text-gradient` to your CSS.

### Step 4: Add Theme Toggle
Copy the ThemeToggle component and theme script.

### Step 5: Apply Classes
Replace hardcoded colors with `var(--*)` references.
