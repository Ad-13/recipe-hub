import Link from "next/link";
import Image from "next/image";
import { ChefHat, Clock, Users } from "lucide-react";
import SaveButton from "./SaveButton";
import { formatTime, capitalize, difficultyStyle } from "@/utils";
import type { RecipePreview } from "@/types";

interface IProps {
  recipe: RecipePreview;
  index: number;
  initialSaved?: boolean;
  initialItemId?: string;
}

export default function RecipeCard({
  recipe,
  index,
  initialSaved = false,
  initialItemId,
}: IProps) {
  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block stagger-item"
      style={{ "--index": index } as React.CSSProperties}
    >
      <article className="card overflow-hidden h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-raised">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-border-2">
              <ChefHat
                size={48}
                className="text-[--color-border-2]"
                strokeWidth={1}
              />
            </div>
          )}

          {/* Difficulty badge */}
          <div className="absolute top-3 left-3">
            <span className={`badge ${difficultyStyle(recipe.difficulty)}`}>
              {capitalize(recipe.difficulty)}
            </span>
          </div>
          <SaveButton
            recipeId={recipe.id}
            initialSaved={initialSaved}
            initialItemId={initialItemId}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-accent mb-1.5">
            {capitalize(recipe.kitchen)} · {capitalize(recipe.meal_type)}
          </p>

          <h3 className="font-display font-semibold text-lg text-text leading-snug mb-2 line-clamp-2 group-hover:text-accent-2 transition-colors duration-150">
            {recipe.title}
          </h3>

          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 flex-1 mb-3">
            {recipe.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-text-dim pt-3 border-t border-border">
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {formatTime(totalTime)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={12} />
              {recipe.servings} servings
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
