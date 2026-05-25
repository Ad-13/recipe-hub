"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { addToCookbook, removeFromCookbook } from "@/actions/cookbook";

interface IProps {
  recipeId: string;
  initialSaved: boolean;
  initialItemId?: string;
}

export default function SaveButton({
  recipeId,
  initialSaved,
  initialItemId,
}: IProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [itemId, setItemId] = useState(initialItemId);
  const [loading, setLoading] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);

    if (saved && itemId) {
      const result = await removeFromCookbook(itemId);
      if (!result.error) {
        setSaved(false);
        setItemId(undefined);
      }
    } else {
      const result = await addToCookbook(recipeId);
      if (!result.error && result.data) {
        setSaved(true);
        setItemId(result.data.id);
      }
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      className={`absolute top-3 right-3 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
        saved
          ? "bg-accent text-bg"
          : "bg-surface/90 text-text-muted hover:bg-accent hover:text-bg hover:scale-110"
      }`}
      aria-label={saved ? "Remove from cookbook" : "Save to cookbook"}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : saved ? (
        <BookmarkCheck size={20} />
      ) : (
        <Bookmark size={20} />
      )}
    </button>
  );
}
