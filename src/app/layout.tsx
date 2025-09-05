import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zauren - AI Customer Service Agents',
  description: 'Replace customer service representatives with AI agents that understand and respond to customer inquiries on WhatsApp, Facebook, Instagram and other messaging platforms.',
  keywords: ['AI', 'customer service', 'chatbot', 'automation', 'ecommerce', 'WhatsApp', 'Instagram', 'Facebook'],
  authors: [{ name: 'Zauren Team' }],
  creator: 'Zauren',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zauren.dev',
    title: 'Zauren - AI Customer Service Agents',
    description: 'Replace customer service representatives with AI agents that understand and respond to customer inquiries.',
    siteName: 'Zauren',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zauren - AI Customer Service Agents',
    description: 'Replace customer service representatives with AI agents that understand and respond to customer inquiries.',
    creator: '@zauren',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
