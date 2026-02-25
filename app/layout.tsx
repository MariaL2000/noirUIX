import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'NOIR Studio | Premium UI/UX Design Agency',
  description: 'We craft immersive digital experiences through strategic design, research, and innovation. Premium UI/UX agency for forward-thinking brands.',
  icons: {
    icon: [
      {
        url: '/apple-icon.png', 
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png', 
        sizes: '180x180',      
        type: 'image/png',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased grain-overlay">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
