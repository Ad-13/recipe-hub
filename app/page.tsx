import { getAllRecipes } from '@/actions/recipes'
import HeroSection from '@/components/home/HeroSection'
import RecipeGrid from '@/components/home/RecipeGrid'

export default async function HomePage() {
  const { data: recipes, error } = await getAllRecipes()

  if (error) {
    return (
      <div className="page-container py-16 text-center">
        <p className="text-text-muted">{error}</p>
      </div>
    )
  }

  return (
    <>
      <HeroSection />
      <RecipeGrid recipes={recipes ?? []} />
    </>
  )
}
