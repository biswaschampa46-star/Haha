import "dotenv/config";
import { eq } from "drizzle-orm";
import { db, pool } from "./index";
import { categories, products, productVariants } from "./schema";

const CATEGORY_LIST = [
  { slug: "fashion", name: "Fashion", sortOrder: 1 },
  { slug: "accessories", name: "Accessories", sortOrder: 2 },
  { slug: "footwear", name: "Footwear", sortOrder: 3 },
  { slug: "home", name: "Home", sortOrder: 4 },
];

type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  category: string;
  priceCents: number;
  compareAtCents?: number;
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  sortOrder: number;
  variants: string[];
};

const SEED_PRODUCTS: SeedProduct[] = [
  {
    slug: "aria-trench-coat",
    name: "Aria Trench Coat",
    description:
      "A tailored trench in brushed cotton twill, cut for a clean silhouette that moves easily from studio to street. Finished with horn-style buttons and a self-belt.",
    category: "fashion",
    priceCents: 1250000,
    compareAtCents: 1550000,
    images: ["https://images.pexels.com/photos/30951487/pexels-photo-30951487.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    isNew: true,
    sortOrder: 1,
    variants: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "nightfall-wool-coat",
    name: "Nightfall Wool Coat",
    description:
      "Heavyweight wool-blend coat in deep midnight tone. Structured shoulders, a full lining and a length designed for layering through colder months.",
    category: "fashion",
    priceCents: 1380000,
    images: ["https://images.pexels.com/photos/39282336/pexels-photo-39282336.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    isFeatured: true,
    sortOrder: 2,
    variants: ["S", "M", "L", "XL"],
  },
  {
    slug: "linen-essential-shirt",
    name: "Linen Essential Shirt",
    description:
      "A breathable linen-blend shirt with a relaxed drape and mother-of-pearl buttons. Designed as an everyday layering essential.",
    category: "fashion",
    priceCents: 320000,
    compareAtCents: 390000,
    images: ["https://images.pexels.com/photos/14793003/pexels-photo-14793003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    sortOrder: 3,
    variants: ["S", "M", "L"],
  },
  {
    slug: "mkr-casual-leather-tote",
    name: "Mkr Casual Leather Tote",
    description:
      "Full-grain leather tote with a structured base and an interior zip pocket. Sized to carry the everyday essentials without excess bulk.",
    category: "accessories",
    priceCents: 640000,
    images: ["https://images.pexels.com/photos/13025817/pexels-photo-13025817.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    isFeatured: true,
    sortOrder: 4,
    variants: ["One Size"],
  },
  {
    slug: "atlas-leather-wallet",
    name: "Atlas Leather Wallet",
    description:
      "A slim bi-fold wallet in vegetable-tanned leather that develops a natural patina with use. Six card slots and a hidden note pocket.",
    category: "accessories",
    priceCents: 210000,
    compareAtCents: 260000,
    images: ["https://images.pexels.com/photos/12495668/pexels-photo-12495668.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    sortOrder: 5,
    variants: ["Black", "Chestnut"],
  },
  {
    slug: "halo-sunglasses",
    name: "Halo Sunglasses",
    description:
      "Acetate frame sunglasses with polarised lenses and a soft-touch finish. Designed with a slightly oversized silhouette.",
    category: "accessories",
    priceCents: 340000,
    images: ["https://images.pexels.com/photos/29301758/pexels-photo-29301758.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    isNew: true,
    sortOrder: 6,
    variants: ["One Size"],
  },
  {
    slug: "horizon-chronograph-watch",
    name: "Horizon Chronograph Watch",
    description:
      "A precision chronograph with a sapphire crystal face and genuine leather strap. Produced in a limited run each season.",
    category: "accessories",
    priceCents: 890000,
    images: ["https://images.pexels.com/photos/13273983/pexels-photo-13273983.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    isLimited: true,
    sortOrder: 7,
    variants: ["Black Strap", "Tan Strap"],
  },
  {
    slug: "signature-pendant-necklace",
    name: "Signature Pendant Necklace",
    description:
      "A delicate gold-plated pendant necklace with a hand-finished chain. Made to layer or wear alone.",
    category: "accessories",
    priceCents: 420000,
    images: ["https://images.pexels.com/photos/28985983/pexels-photo-28985983.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    sortOrder: 8,
    variants: ["One Size"],
  },
  {
    slug: "cloud-step-sneakers",
    name: "Cloud Step Sneakers",
    description:
      "Lightweight leather sneakers with a cushioned sole built for all-day wear. A minimal silhouette with tonal stitching.",
    category: "footwear",
    priceCents: 520000,
    compareAtCents: 650000,
    images: ["https://images.pexels.com/photos/27988921/pexels-photo-27988921.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    isFeatured: true,
    isNew: true,
    sortOrder: 9,
    variants: ["39", "40", "41", "42", "43", "44"],
  },
  {
    slug: "drift-runner-sneakers",
    name: "Drift Runner Sneakers",
    description:
      "A refined running-inspired silhouette in a soft grey palette. Breathable mesh panels with a durable rubber outsole.",
    category: "footwear",
    priceCents: 480000,
    images: ["https://images.pexels.com/photos/27988923/pexels-photo-27988923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    sortOrder: 10,
    variants: ["39", "40", "41", "42", "43"],
  },
  {
    slug: "velvet-musk-candle",
    name: "Velvet Musk Candle",
    description:
      "A hand-poured soy candle in a reusable glass vessel. Warm notes of musk, amber and soft vanilla with an approximate 45-hour burn.",
    category: "home",
    priceCents: 180000,
    images: ["https://images.pexels.com/photos/278664/pexels-photo-278664.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    sortOrder: 11,
    variants: ["One Size"],
  },
  {
    slug: "amber-rose-perfume",
    name: "Amber Rose Perfume",
    description:
      "An eau de parfum blending amber, rose and soft sandalwood. Presented in a weighted glass bottle.",
    category: "home",
    priceCents: 560000,
    compareAtCents: 620000,
    images: ["https://images.pexels.com/photos/30999189/pexels-photo-30999189.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    isNew: true,
    sortOrder: 12,
    variants: ["50ml", "100ml"],
  },
  {
    slug: "ceramic-table-vase",
    name: "Ceramic Table Vase",
    description:
      "A hand-thrown stoneware vase finished with a soft matte glaze. Each piece carries subtle natural variation.",
    category: "home",
    priceCents: 260000,
    images: ["https://images.pexels.com/photos/39340297/pexels-photo-39340297.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    sortOrder: 13,
    variants: ["One Size"],
  },
  {
    slug: "aurora-chronograph-watch",
    name: "Aurora Chronograph Watch",
    description:
      "A refined chronograph pairing a brushed steel case with a deep leather strap. Understated dial with luminous hands.",
    category: "accessories",
    priceCents: 850000,
    images: ["https://images.pexels.com/photos/13273980/pexels-photo-13273980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"],
    sortOrder: 14,
    variants: ["Black Strap"],
  },
];

async function main() {
  console.log("Seeding categories...");
  const categoryIdBySlug = new Map<string, number>();

  for (const category of CATEGORY_LIST) {
    const [row] = await db
      .insert(categories)
      .values(category)
      .onConflictDoUpdate({
        target: categories.slug,
        set: { name: category.name, sortOrder: category.sortOrder },
      })
      .returning();
    categoryIdBySlug.set(category.slug, row.id);
  }

  console.log("Seeding products...");
  for (const item of SEED_PRODUCTS) {
    const categoryId = categoryIdBySlug.get(item.category) ?? null;
    const [row] = await db
      .insert(products)
      .values({
        slug: item.slug,
        name: item.name,
        description: item.description,
        categoryId,
        priceCents: item.priceCents,
        compareAtCents: item.compareAtCents ?? null,
        images: item.images,
        isFeatured: item.isFeatured ?? false,
        isNew: item.isNew ?? false,
        isLimited: item.isLimited ?? false,
        sortOrder: item.sortOrder,
      })
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: item.name,
          description: item.description,
          categoryId,
          priceCents: item.priceCents,
          compareAtCents: item.compareAtCents ?? null,
          images: item.images,
          isFeatured: item.isFeatured ?? false,
          isNew: item.isNew ?? false,
          isLimited: item.isLimited ?? false,
          sortOrder: item.sortOrder,
        },
      })
      .returning();

    await db.delete(productVariants).where(eq(productVariants.productId, row.id));
    if (item.variants.length) {
      await db.insert(productVariants).values(
        item.variants.map((label, index) => ({
          productId: row.id,
          label,
          stock: 50,
          sortOrder: index,
        })),
      );
    }
  }

  console.log(`Seeded ${CATEGORY_LIST.length} categories and ${SEED_PRODUCTS.length} products.`);
}

main()
  .then(() => pool.end())
  .catch((error) => {
    console.error(error);
    return pool.end().finally(() => process.exit(1));
  });
