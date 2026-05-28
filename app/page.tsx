import Link from "next/link";
import { Search, BookOpen, Sparkles } from "lucide-react";
import { getRecipes } from "@/actions/recipes";
import RecipeCard from "@/components/ui/RecipeCard";
import Image from "next/image";

export default async function HomePage() {
  const recipes = await getRecipes();
  const featured = recipes.slice(0, 6);

  return (
    <>
      {/* Hero section */}
      <section className="flex-1 flex items-center justify-center px-5 py-8 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-2xl w-full text-center flex flex-col items-center gap-6">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-text-muted text-sm">
            <Sparkles size={14} className="text-accent" />
            Your personal recipe collection
          </div>

          {/* Heading with background image only behind it */}
          <div className="relative rounded-3xl overflow-hidden px-10 py-8 w-full">
            <div className="absolute inset-0 -z-10">
              {/* <img
                src="/images/hero-image.jpg"
                alt=""
                className="w-full h-full object-cover"
              /> */}
              <Image
                src="/images/hero-image.jpg"
                alt=""
                className="w-full h-full object-cover"
                width={670}
                height={214}
                loading="eager"
              />
              <div className="absolute inset-0 bg-bg/70" />
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-text leading-tight tracking-tight">
              Explore fascinating <br />
              <span className="text-accent">recipes</span> today
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-text-muted text-lg max-w-md leading-relaxed">
            Find something special for yourself, tons of recipes are waiting for
            you!
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
      <section className="px-8 pt-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
