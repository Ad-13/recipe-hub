'use server'

import { query } from '@/lib/db'
import { getSession } from '@/actions/auth'
import { redirect } from 'next/navigation'
import type { ActionResult, CookbookItem } from '@/types'

async function requireSession() {
  const session = await getSession()
  if (!session) redirect('/login')
  return session
}

export async function getCookbook(): Promise<CookbookItem[]> {
  const session = await requireSession()

  return query<CookbookItem>`
    SELECT
      ci.id,
      ci.recipe_id,
      ci.notes,
      ci.added_at,
      r.title,
      r.description,
      r.image_url,
      r.prep_time,
      r.cook_time,
      r.servings,
      r.difficulty,
      r.kitchen,
      r.meal_type,
      r.tags
    FROM cookbook_items ci
    JOIN recipes r ON ci.recipe_id = r.id
    WHERE ci.user_id = ${session.id}
    ORDER BY ci.added_at DESC
  `
}

export async function addToCookbook(
  recipeId: string
): Promise<ActionResult<{ id: string }>> {
  const session = await requireSession()

  try {
    const rows = await query<{ id: string }>`
      INSERT INTO cookbook_items (user_id, recipe_id)
      VALUES (${session.id}, ${recipeId})
      ON CONFLICT (user_id, recipe_id) DO UPDATE SET recipe_id = EXCLUDED.recipe_id
      RETURNING id
    `
    return { data: { id: rows[0].id } }
  } catch {
    return { error: 'Failed to save recipe.' }
  }
}

export async function removeFromCookbook(
  cookbookItemId: string
): Promise<ActionResult> {
  const session = await requireSession()

  try {
    await query`
      DELETE FROM cookbook_items
      WHERE id = ${cookbookItemId}
      AND user_id = ${session.id}
    `
    return {}
  } catch {
    return { error: 'Failed to remove recipe.' }
  }
}

export async function updateNote(
  cookbookItemId: string,
  notes: string
): Promise<ActionResult> {
  const session = await requireSession()

  try {
    await query`
      UPDATE cookbook_items
      SET notes = ${notes}
      WHERE id = ${cookbookItemId}
      AND user_id = ${session.id}
    `
    return {}
  } catch {
    return { error: 'Failed to update note.' }
  }
}

export async function isInCookbook(
  recipeId: string
): Promise<{ saved: boolean; id?: string }> {
  const session = await getSession()
  if (!session) return { saved: false }

  const rows = await query<{ id: string }>`
    SELECT id FROM cookbook_items
    WHERE user_id = ${session.id}
    AND recipe_id = ${recipeId}
    LIMIT 1
  `
  return rows.length > 0
    ? { saved: true, id: rows[0].id }
    : { saved: false }
}

export async function getCookbookIds(): Promise<Map<string, string>> {
  const session = await getSession()
  if (!session) return new Map()

  const rows = await query<{ recipe_id: string; id: string }>`
    SELECT recipe_id, id FROM cookbook_items
    WHERE user_id = ${session.id}
  `
  return new Map(rows.map((r) => [r.recipe_id, r.id]))
}
