import Link from 'next/link'
import { ChefHat } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <ChefHat size={48} className="text-[--color-border-2] mb-4" strokeWidth={1} />
      <h1 className="font-display font-bold text-3xl text-[--color-text] mb-2">
        Recipe not found
      </h1>
      <p className="text-[--color-text-muted] mb-8">
        This recipe seems to have disappeared from our kitchen.
      </p>
      <Link href="/search" className="btn-primary">
        Browse recipes
      </Link>
    </div>
  )
}
