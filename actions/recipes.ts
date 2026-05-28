'use server'

import { notFound } from "next/navigation";
import { query } from '@/lib/db'
import type { Recipe, RecipePreview, ActionResult } from '@/types'


export async function getRecipes() {
  return query<RecipePreview>`
    SELECT id, title, description, image_url,
           prep_time, cook_time, servings,
           difficulty, kitchen, meal_type, tags
    FROM recipes
    ORDER BY created_at DESC
  `
}

export async function getRecipeById(id: string) {
  const rows = await query<Recipe>`
    SELECT * FROM recipes WHERE id = ${id} LIMIT 1
  `
  if (rows.length === 0) notFound()
  return rows[0]
}


export async function searchRecipes(searchQuery: string): Promise<ActionResult<RecipePreview[]>> {
  try {
    const data = await query<RecipePreview>(
      `SELECT id, title, description, image_url,
              prep_time, cook_time, servings,
              difficulty, kitchen, meal_type, tags
       FROM recipes
       WHERE title ILIKE $1
          OR description ILIKE $2
          OR $3 = ANY(tags)
       ORDER BY created_at DESC
       LIMIT 50`,
      [`%${searchQuery}%`, `%${searchQuery}%`, searchQuery]
    )
    return { data }
  } catch {
    return { error: 'Failed to search recipes.' }
  }
}
