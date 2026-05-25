import { sql } from './db'
import { Difficulty, Kitchen, MealType } from '@/types'

export async function initializeDatabase(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      email         TEXT        NOT NULL UNIQUE,
      password_hash TEXT        NOT NULL,
      name          TEXT        NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS recipes (
      id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      title        TEXT        NOT NULL,
      description  TEXT        NOT NULL,
      image_url    TEXT        NOT NULL DEFAULT '',
      prep_time    INTEGER     NOT NULL DEFAULT 0,
      cook_time    INTEGER     NOT NULL DEFAULT 0,
      servings     INTEGER     NOT NULL DEFAULT 4,
      difficulty   TEXT        NOT NULL DEFAULT 'medium',
      kitchen      TEXT        NOT NULL DEFAULT 'other',
      meal_type    TEXT        NOT NULL DEFAULT 'dinner',
      tags         TEXT[]      NOT NULL DEFAULT '{}',
      ingredients  JSONB       NOT NULL DEFAULT '[]',
      instructions TEXT[]      NOT NULL DEFAULT '{}',
      nutrition    JSONB       NOT NULL DEFAULT '{}',
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS cookbook_items (
      id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      recipe_id  UUID        NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      notes      TEXT        NOT NULL DEFAULT '',
      added_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(user_id, recipe_id)
    )
  `

  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM recipes` as { count: number }[]
  if (count > 0) return

  await seedRecipes()
}

async function seedRecipes(): Promise<void> {
  const recipes = getSeedRecipes()

  for (const r of recipes) {
    await sql`
      INSERT INTO recipes (
        title, description, image_url, prep_time, cook_time, servings,
        difficulty, kitchen, meal_type, tags, ingredients, instructions, nutrition
      ) VALUES (
        ${r.title}, ${r.description}, ${r.image_url},
        ${r.prep_time}, ${r.cook_time}, ${r.servings},
        ${r.difficulty}, ${r.kitchen}, ${r.meal_type},
        ${r.tags}, ${JSON.stringify(r.ingredients)},
        ${r.instructions}, ${JSON.stringify(r.nutrition)}
      )
    `
  }

  console.log(`✅ Seeded ${recipes.length} recipes`)
}

function getSeedRecipes() {
  return [
    {
      title: 'Classic Neapolitan Margherita Pizza',
      description: 'The original pizza from Naples — thin crust, San Marzano tomatoes, fresh mozzarella, and basil. Simple, perfect, iconic.',
      image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
      prep_time: 30, cook_time: 12, servings: 4,
      difficulty: Difficulty.Medium, kitchen: Kitchen.Italian, meal_type: MealType.Dinner,
      tags: ['pizza', 'vegetarian', 'italian', 'classic'],
      ingredients: [
        { amount: '500', unit: 'g', name: 'Tipo 00 flour' },
        { amount: '325', unit: 'ml', name: 'warm water' },
        { amount: '7', unit: 'g', name: 'active dry yeast' },
        { amount: '10', unit: 'g', name: 'fine sea salt' },
        { amount: '400', unit: 'g', name: 'San Marzano tomatoes, crushed' },
        { amount: '250', unit: 'g', name: 'fresh mozzarella di bufala' },
        { amount: '15', unit: 'leaves', name: 'fresh basil' },
        { amount: '3', unit: 'tbsp', name: 'extra virgin olive oil' },
      ],
      instructions: [
        'Mix flour, yeast, and salt. Gradually add water and knead for 10 minutes until smooth and elastic.',
        'Cover and let rise at room temperature for 2 hours, or overnight in the fridge.',
        'Preheat oven to its maximum temperature (ideally 280°C+) with a baking stone or steel.',
        'Stretch dough by hand into a 30cm round — never use a rolling pin.',
        'Spread crushed tomatoes, leaving a 2cm border. Season with salt and a drizzle of olive oil.',
        'Bake for 6-7 minutes. Remove, add torn mozzarella, and bake 4-5 more minutes until charred and bubbly.',
        'Finish with fresh basil leaves and a final drizzle of olive oil. Serve immediately.',
      ],
      nutrition: { calories: 520, protein: 22, carbs: 68, fat: 18 },
    },
    {
      title: 'Tacos al Pastor',
      description: 'Marinated pork with achiote and pineapple, cooked on a vertical spit. Mexico City street food at its best.',
      image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
      prep_time: 40, cook_time: 25, servings: 6,
      difficulty: Difficulty.Hard, kitchen: Kitchen.Mexican, meal_type: MealType.Dinner,
      tags: ['tacos', 'pork', 'mexican', 'street food', 'spicy'],
      ingredients: [
        { amount: '1', unit: 'kg', name: 'pork shoulder, thinly sliced' },
        { amount: '3', unit: 'tbsp', name: 'achiote paste' },
        { amount: '200', unit: 'ml', name: 'pineapple juice' },
        { amount: '4', unit: 'cloves', name: 'garlic' },
        { amount: '3', unit: '', name: 'guajillo chiles, toasted' },
        { amount: '1', unit: 'tsp', name: 'ground cumin' },
        { amount: '2', unit: 'tbsp', name: 'white vinegar' },
        { amount: '12', unit: '', name: 'small corn tortillas' },
        { amount: '1/2', unit: '', name: 'white onion, finely chopped' },
        { amount: '100', unit: 'g', name: 'fresh cilantro' },
        { amount: '2', unit: '', name: 'limes, cut into wedges' },
        { amount: '150', unit: 'g', name: 'fresh pineapple, diced' },
      ],
      instructions: [
        'Blend achiote, pineapple juice, garlic, rehydrated guajillos, cumin, and vinegar into a smooth marinade.',
        'Toss sliced pork thoroughly in marinade. Cover and refrigerate at least 4 hours, ideally overnight.',
        'Heat a cast iron skillet or griddle over high heat until smoking.',
        `Cook pork in batches (don't overcrowd) for 3-4 minutes per side until charred edges appear.`,
        'In the last minute, add pineapple chunks to caramelize.',
        'Warm tortillas directly over a gas flame or dry skillet. Stack in twos.',
        'Load up with pork, pineapple, raw onion, and cilantro. Squeeze lime over everything.',
      ],
      nutrition: { calories: 680, protein: 38, carbs: 54, fat: 28 },
    },
    {
      title: 'Chicken Tikka Masala',
      description: 'Tender charred chicken in a rich, aromatic tomato-cream sauce with warming spices. A British-Indian classic.',
      image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
      prep_time: 30, cook_time: 35, servings: 4,
      difficulty: Difficulty.Medium, kitchen: Kitchen.Indian, meal_type: MealType.Dinner,
      tags: ['chicken', 'curry', 'indian', 'creamy', 'spiced'],
      ingredients: [
        { amount: '800', unit: 'g', name: 'chicken thighs, boneless' },
        { amount: '200', unit: 'g', name: 'full-fat yogurt' },
        { amount: '2', unit: 'tsp', name: 'garam masala' },
        { amount: '1', unit: 'tsp', name: 'ground turmeric' },
        { amount: '1', unit: 'tsp', name: 'kashmiri chili powder' },
        { amount: '400', unit: 'g', name: 'canned tomatoes' },
        { amount: '150', unit: 'ml', name: 'heavy cream' },
        { amount: '2', unit: '', name: 'large onions, finely sliced' },
        { amount: '4', unit: 'cloves', name: 'garlic, minced' },
        { amount: '30', unit: 'g', name: 'fresh ginger, grated' },
        { amount: '3', unit: 'tbsp', name: 'ghee or neutral oil' },
        { amount: '1', unit: 'tsp', name: 'fenugreek leaves (kasuri methi)' },
      ],
      instructions: [
        'Marinate chicken in yogurt, half the spices, salt, and lemon juice for at least 1 hour.',
        'Grill or broil chicken at high heat until charred in spots, about 12 minutes. Set aside.',
        'In a heavy pan, cook sliced onions in ghee over medium heat until deeply golden, 20-25 minutes.',
        'Add garlic and ginger, cook 2 minutes. Add remaining spices and cook 30 seconds until fragrant.',
        'Add canned tomatoes, simmer 15 minutes until sauce thickens and oil separates.',
        'Add cream and crushed fenugreek leaves. Simmer 5 minutes.',
        'Add charred chicken pieces, simmer 10 minutes to meld flavors. Serve with basmati rice and naan.',
      ],
      nutrition: { calories: 590, protein: 48, carbs: 18, fat: 36 },
    },
    {
      title: 'Ramen Tonkotsu',
      description: 'Creamy, milky pork-bone broth simmered for 12 hours with chashu pork, soft-boiled eggs, and all the toppings.',
      image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      prep_time: 60, cook_time: 720, servings: 4,
      difficulty: Difficulty.Hard, kitchen: Kitchen.Japanese, meal_type: MealType.Dinner,
      tags: ['ramen', 'pork', 'japanese', 'soup', 'umami'],
      ingredients: [
        { amount: '2', unit: 'kg', name: 'pork trotters and neck bones' },
        { amount: '500', unit: 'g', name: 'pork belly (for chashu)' },
        { amount: '4', unit: '', name: 'eggs' },
        { amount: '400', unit: 'g', name: 'fresh ramen noodles' },
        { amount: '100', unit: 'ml', name: 'soy sauce' },
        { amount: '50', unit: 'ml', name: 'mirin' },
        { amount: '30', unit: 'ml', name: 'sake' },
        { amount: '4', unit: 'sheets', name: 'nori (dried seaweed)' },
        { amount: '200', unit: 'g', name: 'bean sprouts' },
        { amount: '4', unit: '', name: 'spring onions, sliced' },
        { amount: '2', unit: 'tbsp', name: 'sesame seeds' },
        { amount: '1', unit: 'tbsp', name: 'toasted sesame oil' },
      ],
      instructions: [
        'Blanch bones in boiling water 10 minutes, rinse thoroughly to remove impurities.',
        'Cover bones with fresh cold water and simmer vigorously for 12 hours, adding water as needed.',
        'Roll pork belly tightly, tie with twine. Braise in soy, mirin, and sake for 2 hours.',
        'Soft-boil eggs 6 minutes, shock in ice water, peel and marinate in diluted chashu braising liquid for 4+ hours.',
        'Strain broth, season with salt and tare (seasoning sauce). It should be creamy white and rich.',
        'Cook noodles per package instructions. Warm broth separately.',
        'Assemble: noodles, ladle hot broth, sliced chashu, halved marinated egg, nori, bean sprouts, spring onions, sesame.',
      ],
      nutrition: { calories: 820, protein: 52, carbs: 70, fat: 34 },
    },
    {
      title: 'French Crêpes Suzette',
      description: 'Delicate crêpes flambéed in orange-butter caramel with Grand Marnier. Parisian elegance in every bite.',
      image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
      prep_time: 20, cook_time: 30, servings: 4,
      difficulty: Difficulty.Medium, kitchen: Kitchen.French, meal_type: MealType.Dessert,
      tags: ['dessert', 'french', 'crepes', 'orange', 'elegant'],
      ingredients: [
        { amount: '200', unit: 'g', name: 'plain flour' },
        { amount: '3', unit: '', name: 'large eggs' },
        { amount: '500', unit: 'ml', name: 'whole milk' },
        { amount: '30', unit: 'g', name: 'unsalted butter, melted' },
        { amount: '1', unit: 'pinch', name: 'salt' },
        { amount: '100', unit: 'g', name: 'unsalted butter (for sauce)' },
        { amount: '80', unit: 'g', name: 'caster sugar' },
        { amount: '2', unit: '', name: 'large oranges, zested and juiced' },
        { amount: '60', unit: 'ml', name: 'Grand Marnier or Cointreau' },
        { amount: '1', unit: '', name: 'lemon, juiced' },
      ],
      instructions: [
        'Whisk flour, eggs, pinch of salt. Gradually add milk to avoid lumps. Stir in melted butter. Rest 30 minutes.',
        'Cook thin crêpes in a buttered non-stick pan over medium-high heat, about 1 minute each side.',
        'Make sauce: melt butter and sugar in a wide pan until golden. Add orange zest, juice, and lemon juice.',
        'Fold each crêpe into quarters and arrange in the warm sauce, basting well.',
        'Add Grand Marnier. Tip the pan slightly and ignite with a long match, or carefully with a lighter.',
        'Let flames die naturally while basting crêpes. The alcohol burns off, leaving intense flavor.',
        'Serve immediately with a scoop of vanilla ice cream and remaining sauce spooned over.',
      ],
      nutrition: { calories: 480, protein: 12, carbs: 58, fat: 22 },
    },
    {
      title: 'Greek Mezze Platter',
      description: 'A celebration of Mediterranean flavours — hummus, tzatziki, stuffed grape leaves, grilled halloumi, and warm pita.',
      image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
      prep_time: 45, cook_time: 15, servings: 6,
      difficulty: Difficulty.Easy, kitchen: Kitchen.Mediterranean, meal_type: MealType.Appetizer,
      tags: ['vegetarian', 'greek', 'mezze', 'sharing', 'mediterranean'],
      ingredients: [
        { amount: '400', unit: 'g', name: 'canned chickpeas' },
        { amount: '3', unit: 'tbsp', name: 'tahini' },
        { amount: '2', unit: 'cloves', name: 'garlic' },
        { amount: '2', unit: '', name: 'lemons, juiced' },
        { amount: '300', unit: 'g', name: 'Greek yogurt' },
        { amount: '1', unit: '', name: 'cucumber, grated and drained' },
        { amount: '250', unit: 'g', name: 'halloumi cheese, sliced' },
        { amount: '12', unit: '', name: 'stuffed grape leaves (dolmades)' },
        { amount: '200', unit: 'g', name: 'Kalamata olives' },
        { amount: '200', unit: 'g', name: 'cherry tomatoes' },
        { amount: '4', unit: '', name: 'pita breads' },
        { amount: '1', unit: 'tsp', name: 'smoked paprika' },
      ],
      instructions: [
        'Hummus: blend chickpeas, tahini, garlic, lemon juice, and 3 tbsp olive oil until silky smooth.',
        'Tzatziki: mix drained cucumber, yogurt, garlic, dill, lemon juice, and salt. Refrigerate 30 minutes.',
        'Grill halloumi slices in a dry pan over high heat, 2 minutes per side until golden.',
        'Warm pita in oven or directly on gas flame until puffed and lightly charred.',
        'Arrange everything on a large wooden board or platter.',
        'Drizzle hummus with olive oil and sprinkle paprika. Add a few olives on top of tzatziki.',
        'Serve with warm pita wedges and let everyone dive in.',
      ],
      nutrition: { calories: 380, protein: 18, carbs: 42, fat: 16 },
    },
    {
      title: 'Pad Thai with Shrimp',
      description: 'Perfectly balanced sweet-sour-salty noodles with plump shrimp, crunchy peanuts, and the essential hit of lime.',
      image_url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
      prep_time: 20, cook_time: 15, servings: 2,
      difficulty: Difficulty.Medium, kitchen: Kitchen.Thai, meal_type: MealType.Dinner,
      tags: ['noodles', 'shrimp', 'thai', 'stir-fry', 'quick'],
      ingredients: [
        { amount: '200', unit: 'g', name: 'flat rice noodles (sen lek)' },
        { amount: '300', unit: 'g', name: 'large shrimp, peeled' },
        { amount: '3', unit: 'tbsp', name: 'tamarind paste' },
        { amount: '2', unit: 'tbsp', name: 'fish sauce' },
        { amount: '1', unit: 'tbsp', name: 'palm sugar or brown sugar' },
        { amount: '3', unit: 'tbsp', name: 'neutral oil' },
        { amount: '3', unit: 'cloves', name: 'garlic, minced' },
        { amount: '2', unit: '', name: 'eggs' },
        { amount: '100', unit: 'g', name: 'bean sprouts' },
        { amount: '4', unit: '', name: 'spring onions, cut into 3cm pieces' },
        { amount: '50', unit: 'g', name: 'roasted peanuts, crushed' },
        { amount: '2', unit: '', name: 'limes' },
      ],
      instructions: [
        'Soak rice noodles in room temperature water for 30 minutes until pliable but not fully soft.',
        'Mix tamarind, fish sauce, and sugar to create the sauce. Adjust to your preference of sweet/sour/salty.',
        'Heat wok over the highest possible flame until it begins to smoke.',
        'Add oil and garlic, stir-fry 10 seconds. Add shrimp, cook 2 minutes until just pink.',
        'Add drained noodles and sauce. Toss constantly for 2 minutes until noodles absorb the sauce.',
        'Push noodles to one side, add eggs to the empty space and scramble quickly, then mix through.',
        'Add bean sprouts and spring onions, toss 30 seconds. Serve topped with peanuts, fresh lime.',
      ],
      nutrition: { calories: 580, protein: 32, carbs: 72, fat: 18 },
    },
  ]
}
