"use client";

import { useEffect, useMemo, useState } from "react";
import CategoryCards from "./CategoryCards";
import BestGearSection from "./BestGearSection";
import PageBanner from "./PageBanner";
import ProductCategorySection from "./ProductCategorySection";
import ProductDetailLayout from "./ProductDetailLayout";
import { ADMIN_CATALOG_STORAGE_KEY } from "../admin/_lib/catalog";
import type { AdminProduct, Category, Product } from "../type";

const readLocalAdminProducts = (): AdminProduct[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(ADMIN_CATALOG_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as AdminProduct[]) : [];
  } catch {
    return [];
  }
};

const toStorefrontProduct = (product: AdminProduct): Product => ({
  slug: product.slug,
  category: product.category,
  categoryLabel: product.categoryLabel,
  shortName: product.shortName,
  name: product.name,
  isNew: product.isNew,
  price: product.price,
  description: product.description,
  features: product.features,
  includes: product.includes,
  categoryImage: product.categoryImage,
  productImage: product.productImage,
  gallery: product.gallery,
  others: product.others,
  categoryOrder: product.categoryOrder,
});

const mergeProducts = (baseProducts: Product[], localProducts: Product[]) => {
  const merged = new Map<string, Product>();

  baseProducts.forEach((product) => {
    merged.set(product.slug, product);
  });

  localProducts.forEach((product) => {
    merged.set(product.slug, product);
  });

  return Array.from(merged.values());
};

export function StorefrontCategoryView({
  title,
  category,
  products,
}: {
  title: string;
  category: Category;
  products: Product[];
}) {
  const [catalogProducts, setCatalogProducts] = useState(products);

  useEffect(() => {
    const localProducts = readLocalAdminProducts()
      .filter((product) => product.category === category && product.status === "Live")
      .map(toStorefrontProduct);

    setCatalogProducts(mergeProducts(products, localProducts));
  }, [category, products]);

  return (
    <div className="bg-white">
      <PageBanner title={title} />
      <div className="mt-16 grid gap-30 md:mt-30 md:gap-30 lg:mt-40 lg:gap-40">
        {catalogProducts.map((product, index) => (
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
  product,
}: {
  product: Product | null;
}) {
  const [resolvedProduct, setResolvedProduct] = useState<Product | null>(product);
  const [hasCheckedLocalCatalog, setHasCheckedLocalCatalog] = useState(false);

  useEffect(() => {
    setResolvedProduct(product);

    const localMatch = readLocalAdminProducts()
      .filter((entry) => entry.status === "Live")
      .map(toStorefrontProduct)
      .find((entry) => entry.slug === product?.slug);

    if (localMatch) {
      setResolvedProduct(localMatch);
    }

    setHasCheckedLocalCatalog(true);
  }, [product]);

  const content = useMemo(() => {
    if (resolvedProduct) {
      return <ProductDetailLayout product={resolvedProduct} />;
    }

    if (!hasCheckedLocalCatalog) {
      return (
        <div className="bg-white px-6 py-20 text-center md:px-10 lg:px-41.25">
          <p className="text-sm font-bold uppercase tracking-widest text-black/40">
            Loading product...
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white px-6 py-20 text-center md:px-10 lg:px-41.25">
        <p className="text-sm font-bold uppercase tracking-widest text-black">
          Product not found
        </p>
        <p className="mt-2 text-sm text-black/50">
          The item may still be saved only in the admin catalog.
        </p>
      </div>
    );
  }, [hasCheckedLocalCatalog, resolvedProduct]);

  return content;
}
