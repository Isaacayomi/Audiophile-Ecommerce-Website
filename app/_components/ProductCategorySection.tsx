"use client";

import Link from "next/link";
import ResponsivePicture from "./ResponsivePicture";
import { ProductCategorySectionProps } from "../type";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const ProductCategorySection = ({
  product,
  reverse = false,
}: ProductCategorySectionProps) => {
  return (
    <section className="mx-6 md:mx-10 lg:mx-auto lg:grid lg:max-w-277.5 lg:grid-cols-2 lg:items-center lg:gap-31.25">
      <RhythmItem
        className={`overflow-hidden rounded-lg ${reverse ? "lg:order-2" : ""}`}
        variant="pop"
      >
        {/* On category pages we show the preview image returned by the
            category endpoint, not the larger product-detail image. */}
        <ResponsivePicture
          mobileSrc={product.categoryImage.mobile}
          tabletSrc={product.categoryImage.tablet}
          desktopSrc={product.categoryImage.desktop}
          alt={product.name}
          imageClassName="h-88 object-cover lg:h-140"
          imageOverride={product.image}
        />
      </RhythmItem>

      <RhythmGroup
        className={`mx-auto max-w-143 py-8 text-center md:py-13 lg:mx-0 lg:max-w-111.25 lg:py-0 lg:text-left ${reverse ? "lg:order-1" : ""}`}
      >
        {/* The "New Product" label only appears when the backend marks
            this product with `isNew: true`. */}
        {product.isNew ? (
          <RhythmItem variant="soft">
            <p className="mb-6 text-overline uppercase tracking-overline text-brand">
              New Product
            </p>
          </RhythmItem>
        ) : null}
        <RhythmItem>
          <h2 className="mb-6 text-heading-md leading-heading font-bold uppercase tracking-copy text-black md:text-heading-lg md:leading-display md:tracking-title">
            {product.name}
          </h2>
        </RhythmItem>
        <RhythmItem>
          <p className="mb-6 text-copy leading-copy font-medium text-black/50 md:mb-10">
            {product.description}
          </p>
        </RhythmItem>
        <RhythmItem variant="pop">
          <Link
            // Product detail pages live under their category, so a headphones
            // product becomes `/headphones/<slug>`.
            href={`/${product.category}/${product.slug}`}
            className="inline-flex h-12 items-center justify-center bg-brand px-8 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
          >
            See Product
          </Link>
        </RhythmItem>
      </RhythmGroup>
    </section>
  );
};

export default ProductCategorySection;
