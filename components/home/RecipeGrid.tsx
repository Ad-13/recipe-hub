import RecipeCard from "@/components/recipe/RecipeCard";
import type { RecipePreview } from "@/types";

interface RecipeGridProps {
  recipes: RecipePreview[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {

  if (!recipes || recipes.length === 0) {
    return (
      <div className="page-container py-16 px-4 text-center">
        <p className="text-text-muted">No recipes found.</p>
      </div>
    )
  }

  return (
    <section className="page-container py-10 px-4">
      <h2 className="section-title mb-8">All Recipes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} recipe={recipe} index={index} />
        ))}
      </div>
    </section>
  );
}
