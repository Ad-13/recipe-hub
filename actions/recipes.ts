'use server'

import { query } from '@/lib/db'
import type { RecipePreview } from '@/types'

export async function getAllRecipes() {
  try {
    const result = await query<RecipePreview[]>`
      SELECT
        id, title, description, image_url,
        prep_time, cook_time, servings,
        difficulty, kitchen, meal_type, tags
      FROM recipes
      ORDER BY created_at DESC
    `
    return result
  } catch (error) {
    console.error('getAllRecipes error:', error)
    return { error: 'Failed to load recipes.' }
  }
}
