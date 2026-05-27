import type { RecipePreview } from './recipe'

export interface CookbookItem {
  id:        string
  recipe_id: string
  recipe:    RecipePreview
  notes:     string
  added_at:  string
}
