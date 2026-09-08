import Link from "next/link";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function CategoryNav({ active = "all" }: { active?: string }) {
  let rows: (typeof categories.$inferSelect)[] = [];
  try {
    rows = await db.select().from(categories).orderBy(asc(categories.sortOrder));
  } catch (error) {
    console.error("CategoryNav: failed to load categories:", error);
  }

  const items = [
    { slug: "all", name: "All" },
    ...rows.map((row) => ({ slug: row.slug, name: row.name })),
    { slug: "new", name: "New Arrivals" },
  ];

  return (
    <nav aria-label="Shop by category" className="no-scrollbar flex gap-8 overflow-x-auto border-y border-[rgba(140,203,255,0.14)] px-5 py-5 sm:px-8 lg:justify-center lg:px-12">
      {items.map((item) => {
        const isActive = active === item.slug;
        return (
          <Link
            key={item.slug}
            href={item.slug === "all" ? "/shop" : `/shop?category=${item.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`focus-ring shrink-0 border-b pb-1 text-[0.68rem] uppercase tracking-[0.22em] transition-colors ${
              isActive
                ? "border-[#4da8ff] text-[#f4faff]"
                : "border-transparent text-[#8ea5ba] hover:text-[#dceeff]"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
