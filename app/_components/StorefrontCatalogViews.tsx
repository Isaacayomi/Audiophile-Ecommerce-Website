"use client";

import CategoryCards from "./CategoryCards";
import BestGearSection from "./BestGearSection";
import PageBanner from "./PageBanner";
import ProductCategorySection from "./ProductCategorySection";
import ProductDetailLayout from "./ProductDetailLayout";
import type { Category, Product } from "../type";

export function StorefrontCategoryView({
  title,
  category,
  products,
}: {
  title: string;
  category: Category;
  products: Product[];
}) {
  return (
    <div className="bg-white">
      <PageBanner title={title} />
      <div className="mt-16 grid gap-30 md:mt-30 md:gap-30 lg:mt-40 lg:gap-40">
        {products.map((product, index) => (
          <ProductCategorySection
            key={product.slug}
            product={product}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
      <CategoryCards className="mt-30 lg:mt-40" />
      <BestGearSection className="mt-30 lg:mt-42" />
    </div>
  );
}

export function StorefrontProductView({
  slug,
  product,
}: {
  slug: string;
  product: Product | null;
}) {
  if (!product) {
    return (
      <div className="bg-white px-6 py-20 text-center md:px-10 lg:px-41.25">
        <p className="text-sm font-bold uppercase tracking-widest text-black">
          Product not found
        </p>
        <p className="mt-2 text-sm text-black/50">
          The backend did not return a product for this route.
        </p>
      </div>
    );
  }

  return <ProductDetailLayout product={product} />;
}
