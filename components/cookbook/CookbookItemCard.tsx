"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Trash2, StickyNote, Check, X } from "lucide-react";
import { removeFromCookbook, updateNote } from "@/actions/cookbook";
import { useRouter } from "next/navigation";
import { formatTime, capitalize, difficultyStyle } from "@/utils";
import type { CookbookItem } from "@/types";

interface CookbookItemCardProps {
  item: CookbookItem;
}

export default function CookbookItemCard({ item }: CookbookItemCardProps) {
  const router = useRouter();
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteValue, setNoteValue] = useState(item.notes);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);

  const totalTime = item.prep_time + item.cook_time;

  async function handleRemove() {
    setIsRemoving(true);
    await removeFromCookbook(item.id);
    router.refresh();
  }

  async function handleSaveNote() {
    setIsSavingNote(true);
    await updateNote(item.id, noteValue);
    setIsSavingNote(false);
    setIsEditingNote(false);
    router.refresh();
  }

  return (
    <article
      className={`card overflow-hidden transition-all duration-300 ${isRemoving ? "opacity-0 scale-95" : ""}`}
    >
      <div className="flex">
        {/* Thumbnail */}
        <Link href={`/recipes/${item.recipe_id}`} className="shrink-0">
          <div className="relative w-36 h-full min-h-37 bg-raised overflow-hidden">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="144px"
              />
            ) : null}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col min-w-0 min-h-37 relative">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-0.5">
                {capitalize(item.kitchen)} · {capitalize(item.meal_type)}
              </p>
              <Link href={`/recipes/${item.recipe_id}`}>
                <h3 className="font-display font-semibold text-base text-text hover:text-accent-2 transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </Link>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setIsEditingNote(true)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  item.notes
                    ? "bg-accent-soft text-accent-2 hover:bg-accent/20"
                    : "text-text-dim hover:bg-raised hover:text-text-muted"
                }`}
                aria-label="Edit note"
              >
                <StickyNote size={15} />
              </button>
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-text-muted hover:bg-raised hover:text-accent transition-all"
                aria-label="Remove"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-text-muted text-xs mb-3">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {formatTime(totalTime)}
            </span>
            <span className="flex items-center gap-1">
              <Users size={11} />
              {item.servings}
            </span>
            <span
              className={`badge text-[10px] ${difficultyStyle(item.difficulty)}`}
            >
              {capitalize(item.difficulty)}
            </span>
          </div>

          {/* Note */}
          <div className="mt-auto relative">
            <div
              className={`transition-opacity duration-200 ${isEditingNote ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              {noteValue ? (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="w-full text-left p-2.5 bg-accent-soft rounded-lg border border-accent/20 hover:border-accent/40 transition-colors"
                >
                  <p className="text-xs text-accent-2 line-clamp-2 leading-relaxed">
                    📝 {noteValue}
                  </p>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-left  text-text-muted hover:text-accent transition-colors italic"
                >
                  + Add a note…
                </button>
              )}
            </div>

            {/* textarea */}
            <div
              className={`absolute inset-x-0 bottom-0 bg-surface transition-all duration-300 ${
                isEditingNote
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <textarea
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                placeholder="Add your notes, substitutions, tips…"
                rows={3}
                className="input-field text-xs resize-none mb-2"
                autoFocus={isEditingNote}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNote}
                  disabled={isSavingNote}
                  className="btn-primary py-1 px-3 text-xs gap-1"
                >
                  <Check size={12} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setNoteValue(item.notes);
                    setIsEditingNote(false);
                  }}
                  className="btn-ghost py-1 px-3 text-xs gap-1"
                >
                  <X size={12} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
