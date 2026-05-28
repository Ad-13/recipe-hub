"use client";

import { useState } from "react";
import { searchRecipes } from "@/actions/recipes";
import { RecipePreview } from "@/types";
import RecipeCard from "@/components/recipe/RecipeCard";
import SearchBar from "@/components/ui/SearchBar";
import Loader from "@/components/ui/Loader";

interface IProps {
  initialRecipes: RecipePreview[];
  initialSavedIds: Map<string, string>;
}

export default function SearchPage({
  initialRecipes,
  initialSavedIds,
}: IProps) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(false);
  const [savedIds] = useState(initialSavedIds);

  const fetchResults = async (searhQuery: string) => {
    setLoading(true);
    setQuery(searhQuery);
    const results = await searchRecipes(searhQuery);
    setRecipes(results.data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-text-dim uppercase tracking-widest mb-1">
            Discover
          </div>
          <h1 className="font-display font-bold text-4xl text-text mb-6">
            Find a Recipe
          </h1>
          <SearchBar onSearch={fetchResults} />
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-text-muted text-sm mb-6">
            {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} found
          </p>
        )}

        {/* Loading */}
        {loading && <Loader />}

        {/* Results */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                initialSaved={savedIds.has(recipe.id)}
                initialItemId={savedIds.get(recipe.id)}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">🍽️</div>
            <p className="text-text-muted text-lg">
              No recipes found for &quot;{query}&quot;
            </p>
            <p className="text-text-dim text-sm mt-2">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
