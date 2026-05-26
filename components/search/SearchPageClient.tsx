"use client";

import { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import { searchRecipes } from "@/actions/recipes";
import useDebounce from "@/utils/useDebounce";
import type { RecipePreview } from "@/types";

interface IProps {
  initialRecipes: RecipePreview[];
  initialSavedIds: Map<string, string>;
}

export default function SearchPageClient({
  initialRecipes,
  initialSavedIds,
}: IProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RecipePreview[]>(initialRecipes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedIds] = useState(initialSavedIds);

  async function search(q: string) {
    if (!q.trim()) {
      setResults(initialRecipes);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error } = await searchRecipes(q.trim());

    setIsLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setResults(data ?? []);
  }

  const debouncedSearch = useDebounce(search, 500);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }

  function handleClear() {
    setQuery("");
    setResults(initialRecipes);
    setError(null);
  }

  return (
    <div className="page-container py-10">
      <h1 className="section-title mb-6">Find a Recipe</h1>

      <div className="relative flex items-center mb-10">
        <Search
          size={18}
          className="absolute left-4 text-text-dim pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by name, ingredient, or tag…"
          className="input-field pl-11 pr-10 h-12 text-base"
          autoComplete="off"
          autoFocus
        />
        <div className="absolute right-4">
          {isLoading ? (
            <Loader2 size={16} className="animate-spin text-text-dim" />
          ) : query ? (
            <button
              onClick={handleClear}
              className="text-text-dim hover:text-text transition-colors"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>
      </div>

      {error && <p className="text-center text-text-muted py-8">{error}</p>}

      {!error && (
        <>
          {query && (
            <p className=" text-text-dim mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for
              &ldquo;{query}&rdquo;
            </p>
          )}

          {results.length === 0 ? (
            <p className="text-center text-text-muted py-16">
              No recipes found. Try a different search term.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((recipe, index) => (
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
        </>
      )}
    </div>
  );
}
