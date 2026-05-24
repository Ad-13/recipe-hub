import Link from 'next/link'
import { Search, BookOpen } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-4 border-b border-border">
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute top-0 right-[10%] w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(232,168,58,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[5%] w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(91,168,138,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-6 bg-accent-soft text-accent border border-accent/20">
          Your personal recipe collection
        </div>

        <h1
          className="font-display font-extrabold text-text leading-tight mb-5"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
        >
          Cook something{' '}
          <em className="not-italic text-accent">wonderful</em>{' '}
          today.
        </h1>

        <p className="text-text-muted text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          Discover recipes from around the world, save your favourites,
          and add personal notes as you cook.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/search" className="btn-primary text-base px-7 py-3">
            <Search size={17} />
            Explore Recipes
          </Link>
          <Link href="/cookbook" className="btn-secondary text-base px-7 py-3">
            <BookOpen size={17} />
            My Cookbook
          </Link>
        </div>
      </div>
    </section>
  )
}
