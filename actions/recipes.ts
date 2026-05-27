'use server'
import { Recipe } from './../types';

import { sql } from '@/lib/db'

export async function getRecipes() {
  const recipes = await sql`
    SELECT * FROM recipes
    ORDER BY created_at DESC
  `
  return recipes as Recipe[]
}

export async function getRecipeById(id: string) {
  const recipes = await sql`
    SELECT * FROM recipes
    WHERE id = ${id}
  `
  return recipes[0] ?? null
}

export async function searchRecipes(query: string) {
  const recipes = await sql`
    SELECT * FROM recipes
    WHERE
      title ILIKE ${'%' + query + '%'}
    ORDER BY created_at DESC
  `
  return recipes
}
