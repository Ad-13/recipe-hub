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
