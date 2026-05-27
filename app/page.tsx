import Link from 'next/link'
import { Search, BookOpen, Sparkles } from 'lucide-react'
import { getRecipes } from '@/actions/recipes'
import RecipeCard from '@/components/ui/RecipeCard'

export default async function HomePage() {
  const recipes = await getRecipes()
  const featured = recipes.slice(0, 6)

  return (
    <div className="relative min-h-screen flex flex-col">

      {/* Background gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-sage/8 blur-[100px]" />
      </div>

      {/* Hero section */}
      <section className="flex-1 flex items-center justify-center px-5 py-24">
        <div className="max-w-2xl w-full text-center flex flex-col items-center gap-6">

          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-text-muted text-sm">
            <Sparkles size={14} className="text-accent" />
            Your personal recipe collection
          </div>

          {/* Heading with background image only behind it */}
          <div className="relative rounded-3xl overflow-hidden px-10 py-8 w-full">
            <div className="absolute inset-0 -z-10">
              <img
                src="/images/hero-image.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-bg/80 backdrop-blur-[2px]" />
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-text leading-tight tracking-tight">
              Explore fascinating <br />
              <span className="text-accent">recipes</span> today
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-text-muted text-lg max-w-md leading-relaxed">
            Find something special for yourself, tons of recipes are waiting for you!
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-2">
            <Link href="/search" className="btn-primary">
              <Search size={16} />
              Find Recipes
            </Link>
            <Link href="/cookbook" className="btn-secondary">
              <BookOpen size={16} />
              Favorite
            </Link>
          </div>

        </div>
      </section>

      {/* Featured recipes */}
<section className="px-8 pb-16 pt-4">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.map((recipe: any) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  </div>
</section>

    </div>
  )
}