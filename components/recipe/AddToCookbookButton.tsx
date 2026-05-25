"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { addToCookbook, removeFromCookbook } from "@/actions/cookbook";

interface AddToCookbookButtonProps {
  recipeId: string;
  initialSaved: boolean;
  cookbookItemId?: string;
}

export default function AddToCookbookButton({
  recipeId,
  initialSaved,
  cookbookItemId: initialItemId,
}: AddToCookbookButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [itemId, setItemId] = useState(initialItemId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    setError(null);

    if (saved && itemId) {
      const result = await removeFromCookbook(itemId);
      if (result.error) {
        setError(result.error);
      } else {
        setSaved(false);
        setItemId(undefined);
      }
    } else {
      const result = await addToCookbook(recipeId);
      if (result.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setItemId(result.data?.id);
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
          saved
            ? "bg-accent-soft text-accent-2 border border-accent/30 hover:border-accent/60"
            : "btn-primary"
        }`}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : saved ? (
          <BookmarkCheck size={16} />
        ) : (
          <Bookmark size={16} />
        )}
        {saved ? "Saved" : "Save to Cookbook"}
      </button>

      {error && <p className="text-xs text-amber">{error}</p>}
    </div>
  );
}
