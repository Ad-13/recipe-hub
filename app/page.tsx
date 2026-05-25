import HeroSection from "@/components/home/HeroSection";
import RecipeGrid from "@/components/home/RecipeGrid";
import { getAllRecipes } from "@/actions/recipes";
import { getSession } from "@/actions/auth";
import { getCookbookIds } from "@/actions/cookbook";

export default async function HomePage() {
  const [recipes, session] = await Promise.all([
    getAllRecipes(),
    getSession(),
  ])

  const savedIds = session ? await getCookbookIds() : new Map<string, string>()

  return (
    <>
      <HeroSection />
      <RecipeGrid recipes={recipes} savedIds={savedIds} />
    </>
  );
}
