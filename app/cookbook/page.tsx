import { BookOpen } from "lucide-react";
import Link from "next/link";
import { getCookbook } from "@/actions/cookbook";
import CookbookItemCard from "@/components/cookbook/CookbookItemCard";

export default async function CookbookPage() {
  const items = await getCookbook();

  return (
    <div className="page-container py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-accent mb-1">
            Personal collection
          </p>
          <h1
            className="font-display font-extrabold text-text"
            style={{ fontSize: "2.25rem", letterSpacing: "-0.015em" }}
          >
            My Cookbook
          </h1>
          {items.length > 0 && (
            <p className="text-text-muted  mt-1">
              {items.length} recipe{items.length !== 1 ? "s" : ""} saved
            </p>
          )}
        </div>
        <Link href="/search" className="btn-secondary gap-1.5 ">
          Find recipes
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-raised border border-border flex items-center justify-center mb-5">
            <BookOpen size={28} className="text-text-dim" strokeWidth={1.5} />
          </div>
          <h3 className="font-display font-semibold text-xl text-text mb-2">
            Your cookbook is empty
          </h3>
          <p className="text-text-muted  max-w-xs leading-relaxed mb-6">
            Browse recipes and save the ones you love.
          </p>
          <Link href="/" className="btn-primary">
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="stagger-item"
              style={{ "--index": index } as React.CSSProperties}
            >
              <CookbookItemCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
