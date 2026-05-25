import { RecipePreview } from "@/types";
import RecipeCard from "../recipe/RecipeCard";

interface IProps {
  recipes: RecipePreview[];
  savedIds: Map<string, string>;
}

export default function RecipeGrid({ recipes, savedIds }: IProps) {
  return (
    <section className="page-container pb-16">
      <h2 className="section-title mb-8">All Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id}
            className="stagger-item"
            style={{ "--index": index } as React.CSSProperties}
          >
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              initialSaved={savedIds.has(recipe.id)}
              initialItemId={savedIds.get(recipe.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
