import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Recipe Hub',
  description: 'Search, save, and annotate your favourite recipes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full">
        <Navbar />
        <main className="flex-1 pt-15">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
