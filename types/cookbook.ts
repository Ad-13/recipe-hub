import type { RecipePreview } from './recipe'

export interface CookbookItem extends RecipePreview {
  id:        string
  recipe_id: string
  notes:     string
  added_at:  string
}
