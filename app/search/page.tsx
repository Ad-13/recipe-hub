'use client'

import { useState, useEffect } from 'react'
import { searchRecipes } from '@/actions/recipes'
import { Recipe } from '@/types'
import RecipeCard from '@/components/ui/RecipeCard'
import SearchBar from '@/components/ui/SearchBar'
import Loader from '@/components/ui/Loader'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      const results = await searchRecipes(query)
      setRecipes(results as Recipe[])
      setLoading(false)
    }
    fetchResults()
  }, [query])

  return (
    <div className="min-h-screen px-8 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-text-dim uppercase tracking-widest mb-1">Discover</div>
          <h1 className="font-display font-bold text-4xl text-text mb-6">Find a Recipe</h1>
          <SearchBar onSearch={setQuery} />
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-text-muted text-sm mb-6">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        )}

        {/* Loading */}
        {loading && <Loader />}

        {/* Results */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">🍽️</div>
            <p className="text-text-muted text-lg">
              No recipes found for "{query}"
            </p>
            <p className="text-text-dim text-sm mt-2">
              Try a different search term
            </p>
          </div>
        )}

      </div>
    </div>
  )
}