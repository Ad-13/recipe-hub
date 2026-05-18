import Link from 'next/link'
import { ChefHat } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <ChefHat size={48} className="text-border-2 mb-4" strokeWidth={1} />
      <h1 className="font-display font-bold text-3xl text-text mb-2">
        Page not found
      </h1>
      <p className="text-text-muted mb-8">
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">Go home</Link>
    </div>
  )
}

