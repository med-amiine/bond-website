import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata: Metadata = {
  title: 'SnapChain',
  description: 'The all-in-one platform for deploying, scaling, and managing blockchain infrastructure.',
}

// Script to prevent theme flash on load
const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  })()
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
