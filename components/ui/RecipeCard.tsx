import Link from "next/link";
import Image from "next/image";
import { ChefHat, Clock, Users } from "lucide-react";
import { RecipePreview } from "@/types";

const difficultyColor: Record<string, string> = {
  easy: "bg-green-500/80",
  medium: "bg-accent/80",
  hard: "bg-red-500/80",
};

interface IProps {
  recipe: RecipePreview;
  index: number;
}

export default function RecipeCard({ recipe, index }: IProps) {
  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block stagger-item"
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="group relative bg-surface rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
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
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium text-white capitalize ${difficultyColor[recipe.difficulty] ?? "bg-surface/80"}`}
          >
            {recipe.difficulty}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <div className="text-xs text-text-dim uppercase tracking-wider">
            {recipe.kitchen} · {recipe.meal_type}
          </div>
          <h3 className="font-display font-bold text-text text-lg leading-tight">
            {recipe.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center gap-4 pt-2 border-t border-border mt-1">
            <div className="flex items-center gap-1.5 text-text-dim text-xs">
              <Clock size={13} />
              {totalTime}m
            </div>
            <div className="flex items-center gap-1.5 text-text-dim text-xs">
              <Users size={13} />
              {recipe.servings} servings
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
