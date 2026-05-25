import HeroSection from '@/components/home/HeroSection'
import RecipeGrid from '@/components/home/RecipeGrid'
import { getAllRecipes } from '@/actions/recipes'

export default async function HomePage() {
  const recipes = await getAllRecipes()

  return (
    <>
      <HeroSection />
      <RecipeGrid recipes={recipes} />
    </>
  )
}
