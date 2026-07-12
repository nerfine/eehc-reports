import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SiteNavbar } from '@/components/site-navbar'
import { AdminProvider } from '@/lib/admin-context'
import { ReportsProvider } from '@/lib/reports-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ExecutorHealthCheck — Executor diagnostics. Real results.',
  description:
    'ExecutorHealthCheck scans, tests, and benchmarks executors to deliver real security insights you can trust.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080a09',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.className} antialiased`}>
        <AdminProvider>
          <ReportsProvider>
            <SiteNavbar />
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </ReportsProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
