import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Users, ChefHat, Flame } from "lucide-react";
import { getRecipeById } from "@/actions/recipes";
import { getSession } from "@/actions/auth";
import { formatTime, capitalize, difficultyStyle } from "@/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params;
  const [recipe, session] = await Promise.all([
    getRecipeById(id),
    getSession(),
  ]);

  if (!recipe) notFound();

  const metaCards = [
    { icon: Clock, label: "Prep", value: formatTime(recipe.prep_time) },
    { icon: Flame, label: "Cook", value: formatTime(recipe.cook_time) },
    { icon: Users, label: "Serves", value: String(recipe.servings) },
    {
      icon: ChefHat,
      label: "Total",
      value: formatTime(recipe.prep_time + recipe.cook_time),
    },
  ];

  const nutrition = [
    {
      label: "Calories",
      value: recipe.nutrition.calories,
      unit: "kcal",
    },
    {
      label: "Protein",
      value: recipe.nutrition.protein,
      unit: "g",
    },
    { label: "Carbs", value: recipe.nutrition.carbs, unit: "g" },
    { label: "Fat", value: recipe.nutrition.fat, unit: "g" },
  ];

  return (
    <div className="page-container py-10">
      {/* Back */}
      <Link href="/" className="btn-ghost mb-6 inline-flex gap-1.5 ">
        <ArrowLeft size={16} />
        Back to recipes
      </Link>

      {/* Hero image */}
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-8 bg-raised">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ChefHat size={64} className="text-border-2" strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className={`badge ${difficultyStyle(recipe.difficulty)}`}>
            {capitalize(recipe.difficulty)}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div className="flex-1">
          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-accent mb-2">
            {capitalize(recipe.kitchen)} · {capitalize(recipe.meal_type)}
          </p>
          <h1
            className="font-display font-extrabold text-text leading-tight mb-3"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {recipe.title}
          </h1>
          <p className="text-text-muted leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {session && (
          <div className="shrink-0">{/* TODO: AddToCookbookButton */}</div>
        )}
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {metaCards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="card p-4 text-center">
            <Icon size={18} className="text-accent mx-auto mb-1.5" />
            <p className="text-text-muted text-[11px] uppercase tracking-widest mb-0.5">
              {label}
            </p>
            <p className="font-display font-bold text-text text-lg">{value}</p>
          </div>
        ))}
      </div>

      {/* Tags */}
      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="badge bg-raised text-text-muted border-border"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Ingredients + Instructions */}
      <div className="grid sm:grid-cols-[1fr_1.5fr] gap-10">
        {/* Ingredients */}
        <section>
          <h2 className="font-display font-bold text-2xl text-text mb-5">
            Ingredients
          </h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline gap-3 ">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.25 bg-accent" />
                <span className="text-accent-2 font-semibold min-w-18 tabular-nums">
                  {ing.amount} {ing.unit}
                </span>
                <span className="text-text">{ing.name}</span>
              </li>
            ))}
          </ul>

          {/* Nutrition */}
          <div className="mt-8 p-4 rounded-xl border border-border bg-raised">
            <p className="text-text-dim text-[10px] font-bold uppercase tracking-widest mb-3">
              Per serving
            </p>
            <div className="grid grid-cols-2 gap-3">
              {nutrition.map(({ label, value, unit }) => (
                <div key={label}>
                  <p className="text-text-muted text-[10px] uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  <p className="text-text font-bold ">
                    {value}
                    <span className="text-text-muted font-normal text-xs ml-1">
                      {unit}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section>
          <h2 className="font-display font-bold text-2xl text-text mb-5">
            Instructions
          </h2>
          <ol className="space-y-5">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center  font-bold font-display mt-0.5 bg-accent text-bg">
                  {i + 1}
                </span>
                <p className="text-text-muted leading-relaxed pt-1 ">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
