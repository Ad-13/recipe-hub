import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar/NavbarAuth'

import './globals.css'

export const metadata: Metadata = {
  title: 'Recipe Hub',
  description: 'Search, save, and annotate your favourite recipes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="flex flex-col min-h-full">
        <Navbar authSlot={<NavbarAuth />} />
        <main className="flex-1 pt-15">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
