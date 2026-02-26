'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with heavy/smooth damping
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Add lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    // Velocity-based blur and opacity effect
    const contentElements = document.querySelectorAll('h1, h2, h3, p, .text-gradient')
    
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      // Calculate blur and opacity based on scroll velocity
      const absVelocity = Math.abs(velocity)
      const blur = Math.min(absVelocity * 0.02, 2)
      const opacity = 1 - Math.min(absVelocity * 0.002, 0.05)

      // Apply to text elements for "fade" sensation during fast scroll
      contentElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        if (absVelocity > 0.5) {
          htmlEl.style.filter = `blur(${blur}px)`
          htmlEl.style.opacity = `${opacity}`
          htmlEl.style.transition = 'filter 0.1s ease, opacity 0.1s ease'
        } else {
          htmlEl.style.filter = 'blur(0px)'
          htmlEl.style.opacity = '1'
          htmlEl.style.transition = 'filter 0.3s ease, opacity 0.3s ease'
        }
      })
    })

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  return <>{children}</>
}
