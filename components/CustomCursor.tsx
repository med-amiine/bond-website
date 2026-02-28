'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const mousePos = useRef({ x: -100, y: -100 })
  const cursorPos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>()
  const isFirstVisible = useRef(true)

  useEffect(() => {
    // Check if device has fine pointer (mouse) - don't show on touch devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // If this is the first time becoming visible, snap to position immediately
      if (isFirstVisible.current && !isVisible) {
        isFirstVisible.current = false
        cursorPos.current = { x: e.clientX, y: e.clientY }
        trailPos.current = { x: e.clientX, y: e.clientY }
      }
      
      setIsVisible(true)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }
    
    const handleMouseLeave = () => {
      setIsVisible(false)
      isFirstVisible.current = true
    }

    // Track hoverable elements (exclude elements with data-cursor-default)
    const setupHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover], .btn-primary, .btn-secondary, .card-dark:not([data-cursor-default]), .partner-logo, .network-tag, .fw-tag, .testimonial-nav-btn, .testimonial-nav-dot, .footer-social-btn, .footer-link')
      
      const enterHandler = () => setIsHovering(true)
      const leaveHandler = () => setIsHovering(false)

      hoverables.forEach(el => {
        el.addEventListener('mouseenter', enterHandler)
        el.addEventListener('mouseleave', leaveHandler)
      })

      return { hoverables, enterHandler, leaveHandler }
    }

    let hoverListeners = setupHoverListeners()

    // Animation loop with lerp for smooth following
    const animate = () => {
      // Cursor follows mouse almost instantly (very high speed)
      const cursorSpeed = 0.8
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * cursorSpeed
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * cursorSpeed

      // Trail follows cursor with slight delay for visual effect
      const trailSpeed = 0.15
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * trailSpeed
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * trailSpeed

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    
    rafId.current = requestAnimationFrame(animate)

    // Re-scan for hoverable elements when DOM changes
    const observer = new MutationObserver(() => {
      // Cleanup old listeners
      hoverListeners.hoverables.forEach(el => {
        el.removeEventListener('mouseenter', hoverListeners.enterHandler)
        el.removeEventListener('mouseleave', hoverListeners.leaveHandler)
      })
      // Setup new listeners
      hoverListeners = setupHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      observer.disconnect()
      hoverListeners.hoverables.forEach(el => {
        el.removeEventListener('mouseenter', hoverListeners.enterHandler)
        el.removeEventListener('mouseleave', hoverListeners.leaveHandler)
      })
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-200 ease-out ${
          isHovering ? 'w-10 h-10' : 'w-4 h-4'
        }`}
        style={{
          backgroundColor: isHovering ? 'transparent' : '#22D3EE',
          border: isHovering ? '2px solid #050505' : 'none',
          boxShadow: isHovering 
            ? '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.2)'
            : '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)',
          mixBlendMode: isHovering ? 'normal' : 'difference',
          opacity: isHovering ? 1 : 1,
        }}
      />
      
      {/* Trail effect */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: isHovering ? 50 : 40,
          height: isHovering ? 50 : 40,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
          filter: 'blur(4px)',
          opacity: isHovering ? 0.3 : 0.5,
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
        }}
      />

      {/* Cursor glow aura */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
        style={{
          width: 100,
          height: 100,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 60%)',
          filter: 'blur(8px)',
        }}
      />
    </>
  )
}
