'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const posts = [
  {
    category: 'Strategy',
    title: 'How AI is Revolutionizing Yield Farming',
    excerpt:
      'Discover how machine learning algorithms are finding the best yields across DeFi protocols in real-time.',
    readTime: '5 min read',
    date: 'Jan 15, 2024',
    cover: '/assets/blog-ai.jpg',
  },
  {
    category: 'Security',
    title: 'Understanding Non-Custodial Vault Security',
    excerpt:
      'Why keeping control of your keys while earning yield is the future of decentralized finance.',
    readTime: '4 min read',
    date: 'Jan 12, 2024',
    cover: '/assets/blog-security.jpg',
  },
  {
    category: 'Tutorial',
    title: 'Getting Started with SnapChain',
    excerpt:
      'A step-by-step guide to deploying your first blockchain and earning optimized yield automatically.',
    readTime: '3 min read',
    date: 'Jan 10, 2024',
    cover: '/assets/blog-tutorial.jpg',
  },
]

function BlogCard({ post, index }: { post: typeof posts[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={cardRef}>
      <article className="group cursor-pointer h-full">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#27279E]/30 hover:shadow-lg h-full flex flex-col">
          <div className="aspect-video relative overflow-hidden bg-[var(--bg-card-2)]">
            {/* Placeholder gradient since we don't have actual images */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#27279E]/20 to-[#3B3BB8]/10 group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#27279E]/10 flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#27279E"
                  strokeWidth={1.5}
                >
                  {index === 0 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  )}
                  {index === 1 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  )}
                  {index === 2 && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  )}
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-[#27279E]/0 group-hover:bg-[#27279E]/5 transition-colors pointer-events-none" />
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <span className="inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-[#27279E]/10 text-[#27279E] rounded mb-3 w-fit">
              {post.category}
            </span>

            <h3 className="text-base font-semibold text-[var(--text)] mb-2 group-hover:text-[#27279E] transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 flex-1">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[var(--text-sub)] mt-auto">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readTime}
              <span>•</span>
              {post.date}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 relative">
      {/* Subtle separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[var(--bg)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#27279E]/10 rounded-full mb-4">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#27279E"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-xs font-medium text-[#27279E]">Latest Insights</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] tracking-tight">
              From the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-[#27279E] hover:text-[#3B3BB8] font-medium transition-colors group"
          >
            View all articles
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#27279E] font-medium"
          >
            View all articles
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
