import Hero from "@/components/home/Hero";
import IntroStatement from "@/components/home/IntroStatement";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryNav from "@/components/home/CategoryNav";
import NewArrivals from "@/components/home/NewArrivals";
import PromoSection from "@/components/home/PromoSection";
import WhyUs from "@/components/home/WhyUs";
import Newsletter from "@/components/home/Newsletter";
import { queryProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, newArrivals] = await Promise.all([
    queryProducts({ featured: true, limit: 4 }),
    queryProducts({ isNew: true, sort: "newest", limit: 4 }),
  ]);

  const featuredList = featured.length ? featured : await queryProducts({ limit: 4 });
  const newArrivalsList = newArrivals.length ? newArrivals : await queryProducts({ sort: "newest", limit: 4 });

  return (
    <>
      <Hero />
      <IntroStatement />
      <FeaturedProducts products={featuredList} />
      <CategoryNav />
      <NewArrivals products={newArrivalsList} />
      <PromoSection />
      <WhyUs />
      <Newsletter />
    </>
  );
}
