import type { Metadata } from 'next'
import { Cinzel, Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Menu from '@/components/menu/menu'
import { Toaster } from '@/components/ui/sonner'

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Fable',
  description: 'Fable is a platform for creating and sharing AI-powered stories.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${atkinsonHyperlegible.className} ${cinzel.variable} antialiased font-sans`}>
        <Providers>
          {children}
          <Menu />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
