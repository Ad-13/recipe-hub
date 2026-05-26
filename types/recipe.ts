export const Difficulty = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

export type Difficulty = typeof Difficulty[keyof typeof Difficulty];

export const Kitchen = {
  Italian: 'italian',
  Mexican: 'mexican',
  Japanese: 'japanese',
  Indian: 'indian',
  French: 'french',
  Mediterranean: 'mediterranean',
  American: 'american',
  Thai: 'thai',
  Chinese: 'chinese',
  Other: 'other',
} as const;

export type Kitchen = typeof Kitchen[keyof typeof Kitchen];

export const MealType = {
  Breakfast: 'breakfast',
  Lunch: 'lunch',
  Dinner: 'dinner',
  Dessert: 'dessert',
  Snack: 'snack',
  Appetizer: 'appetizer',
} as const;

export type MealType = typeof MealType[keyof typeof MealType];

export interface Ingredient {
  amount: string
  unit: string
  name: string
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Recipe {
  id: string
  title: string
  description: string
  image_url: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: Difficulty
  kitchen: Kitchen
  meal_type: MealType
  tags: string[]
  ingredients: Ingredient[]
  instructions: string[]
  nutrition: NutritionInfo
  created_at: string
}

export type RecipePreview = Pick<
  Recipe,
  | 'id'
  | 'title'
  | 'description'
  | 'image_url'
  | 'prep_time'
  | 'cook_time'
  | 'servings'
  | 'difficulty'
  | 'kitchen'
  | 'meal_type'
  | 'tags'
>
