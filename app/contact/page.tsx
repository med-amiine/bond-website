'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// CONTACT METHOD CARD
// ============================================

function ContactMethodCard({
  icon,
  title,
  value,
  href,
  delay = 0,
  animate = true,
}: {
  icon: React.ReactNode
  title: string
  value: string
  href: string
  delay?: number
  animate?: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!cardRef.current || !animate) return
    
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay,
        ease: 'power2.out',
      })
    })
    
    return () => ctx.revert()
  }, [delay, animate])

  const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')

  return (
    <a
      ref={cardRef}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 overflow-hidden hover:border-[#27279E]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#27279E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#27279E]/10 flex items-center justify-center mb-4 group-hover:bg-[#27279E]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {icon}
        </div>

        <h3 className="text-sm font-semibold text-[var(--text)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--text-muted)] group-hover:text-[#27279E] transition-colors">
          {value}
        </p>

        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </a>
  )
}

// ============================================
// SOCIAL LINK
// ============================================

function SocialLink({
  icon,
  label,
  href,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  href: string
  delay?: number
}) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!linkRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.from(linkRef.current, {
        scrollTrigger: {
          trigger: linkRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        delay,
        ease: 'back.out(1.7)',
      })
    })
    
    return () => ctx.revert()
  }, [delay])

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#27279E]/30 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-full bg-[var(--bg-card-2)] flex items-center justify-center group-hover:bg-[#27279E]/10 group-hover:rotate-[360deg] transition-all duration-500">
        {icon}
      </div>
      <span className="text-xs text-[var(--text-muted)] group-hover:text-[#27279E] transition-colors">
        {label}
      </span>
    </a>
  )
}

// ============================================
// ANIMATED INPUT
// ============================================

function AnimatedInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  textarea = false,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  textarea?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const isActive = isFocused || value

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          isActive
            ? 'top-[-10px] text-[11px] text-[#27279E] bg-[var(--bg-card)] px-2'
            : textarea
            ? 'top-[20px] text-sm text-[var(--text-muted)]'
            : 'top-[14px] text-sm text-[var(--text-muted)]'
        }`}
      >
        {label} {required && <span className="text-[#27279E]">*</span>}
      </label>

      {textarea ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={5}
          className="w-full px-4 pt-6 pb-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-transparent focus:outline-none focus:border-[#27279E] transition-all duration-300 resize-none"
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-4 py-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder-transparent focus:outline-none focus:border-[#27279E] transition-all duration-300"
        />
      )}

      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-[#27279E] rounded-full transition-all duration-300 ${
          isFocused ? 'w-full' : 'w-0'
        }`}
      />
    </div>
  )
}

// ============================================
// CONTACT FORM
// ============================================

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inputsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!formRef.current) return
    
    const ctx = gsap.context(() => {
      // Animate header separately
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }
      
      // Animate inputs separately
      if (inputsRef.current) {
        gsap.from(inputsRef.current.children, {
          scrollTrigger: {
            trigger: inputsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        })
      }
      
      // Animate button separately
      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    })
    
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div
      ref={formRef}
      className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#27279E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3B3BB8]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div ref={headerRef}>
          <h2 className="text-xl font-semibold text-[var(--text)] mb-2">Send us a message</h2>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            We&apos;d love to hear from you. Fill out the form below.
          </p>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Message Sent!</h3>
            <p className="text-sm text-[var(--text-muted)] text-center">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div ref={inputsRef}>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <AnimatedInput
                  label="Your Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(value) => setFormData({ ...formData, name: value })}
                  required
                />
                <AnimatedInput
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  required
                />
              </div>

              <div className="mb-5">
                <AnimatedInput
                  label="Subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(value) => setFormData({ ...formData, subject: value })}
                  required
                />
              </div>

              <div className="mb-5">
                <AnimatedInput
                  label="Message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(value) => setFormData({ ...formData, message: value })}
                  textarea
                  required
                />
              </div>
            </div>

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#27279E] text-white rounded-xl text-sm font-medium transition-all hover:bg-[#3B3BB8] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ============================================
// FAQ ITEM
// ============================================

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  delay = 0,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  delay?: number
}) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.from(itemRef.current, {
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay,
        ease: 'power2.out',
      })
    })
    
    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={itemRef}
      className={`border-b border-[var(--border)] last:border-0 transition-colors ${isOpen ? 'bg-[#27279E]/5' : ''}`}
    >
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 px-4 text-left">
        <span className="text-sm font-medium text-[var(--text)] pr-4">{question}</span>
        <div
          className={`w-6 h-6 rounded-full bg-[var(--bg-card-2)] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          <span className="text-[var(--text-muted)] text-lg leading-none">+</span>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-4 pb-5 text-sm text-[var(--text-sub)] leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-content', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }, heroRef)
    
    return () => ctx.revert()
  }, [])

  const contactMethods = [
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: 'hello@bond.credit',
      href: 'mailto:hello@bond.credit',
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Discord',
      value: 'Join our community',
      href: '#',
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      ),
      title: 'Twitter',
      value: '@bondcredit',
      href: '#',
    },
  ]

  const socialLinks = [
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-[var(--text-muted)] group-hover:text-[#27279E] transition-colors">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: 'Twitter',
      href: '#',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-[var(--text-muted)] group-hover:text-[#27279E] transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: 'Discord',
      href: '#',
    },
    {
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-[var(--text-muted)] group-hover:text-[#27279E] transition-colors">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      href: '#',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-[var(--text-muted)] group-hover:text-[#27279E] transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'LinkedIn',
      href: '#',
    },
  ]

  const faqs = [
    {
      question: 'How quickly do you respond to inquiries?',
      answer:
        'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please reach out via Discord for faster response.',
    },
    {
      question: 'Do you offer custom enterprise solutions?',
      answer:
        'Yes! We work with institutions and high-net-worth individuals to create custom yield strategies. Contact our team to discuss your specific needs.',
    },
    {
      question: 'How can I report a security issue?',
      answer:
        'Security is our top priority. Please email security@bond.credit with details. We have a bug bounty program and respond to security reports immediately.',
    },
    {
      question: 'Where is your team located?',
      answer:
        'We are a fully remote team distributed across North America, Europe, and Asia. This allows us to provide 24/7 support and monitoring.',
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      <Navbar />

      <main className="pt-24 pb-12 relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="contact-hero-content text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#27279E]/10 rounded-full mb-4">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs font-medium text-[#27279E]">Get in Touch</span>
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">Let&apos;s Start a Conversation</h1>
              <p className="text-lg text-[var(--text-sub)] max-w-lg mx-auto">
                Have questions about our platform? We&apos;re here to help you optimize your DeFi yield strategy.
              </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {contactMethods.map((method, i) => (
                <ContactMethodCard 
                  key={i} 
                  {...method} 
                  delay={i * 0.1} 
                  animate={method.title === 'Email'}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Contact Form - Takes 3 columns */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              {/* Sidebar - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Office Hours */}
                <div className="contact-sidebar-item bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#27279E]/10 flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">Office Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[var(--text-sub)]">
                      <span>Monday - Friday</span>
                      <span className="text-[var(--text)]">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between text-[var(--text-sub)]">
                      <span>Saturday</span>
                      <span className="text-[var(--text)]">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between text-[var(--text-sub)]">
                      <span>Sunday</span>
                      <span className="text-[var(--text-muted)]">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-sidebar-item bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#27279E]/10 flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">Location</h3>
                  </div>
                  <p className="text-sm text-[var(--text-sub)]">
                    We&apos;re a fully remote team
                    <br />
                    Distributed globally
                    <br />
                    HQ: San Francisco, CA
                  </p>
                </div>


              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#27279E]/10 rounded-full mb-4">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#27279E" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-[#27279E]">FAQ</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">Frequently Asked Questions</h2>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === i}
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer hideNewsletter />
    </div>
  )
}
