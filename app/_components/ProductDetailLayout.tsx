"use client";

import Link from "next/link";
import ResponsivePicture from "./ResponsivePicture";
import ProductPurchaseCard from "./ProductPurchaseCard";
import ProductGallery from "./ProductGallery";
import RelatedProducts from "./RelatedProducts";
import CategoryCards from "./CategoryCards";
import BestGearSection from "./BestGearSection";

import { RhythmGroup, RhythmItem } from "./ui/Rhythm";
import { Product } from "../type";

const ProductDetailLayout = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white pt-4 md:pt-8.25 lg:pt-19.75">
      <RhythmGroup
        className="mx-6 md:mx-10 lg:mx-auto lg:max-w-277.5"
        inView={false}
      >
        <RhythmItem variant="soft">
          <Link
            // "Go Back" takes the user to the matching category page,
            // such as `/headphones` or `/speakers`.
            href={`/${product.category}`}
            className="text-copy leading-copy font-medium text-black/50 transition-colors hover:text-brand"
          >
            Go Back
          </Link>
        </RhythmItem>
      </RhythmGroup>

      <RhythmGroup className="mx-6 mt-6 md:mx-10 lg:mx-auto lg:mt-14 lg:grid lg:max-w-277.5 lg:grid-cols-product-detail lg:items-center lg:gap-31.25">
        <RhythmItem className="overflow-hidden rounded-lg" variant="pop">
          {/* Detail pages use the main product image from the product endpoint.
              This is separate from the smaller category preview image. */}
          <ResponsivePicture
            mobileSrc={product.productImage.mobile}
            tabletSrc={product.productImage.tablet}
            desktopSrc={product.productImage.desktop}
            alt={product.name}
            imageClassName="h-81.75 object-cover md:h-120 lg:h-140"
          />
        </RhythmItem>

        <ProductPurchaseCard product={product} />
      </RhythmGroup>

      <section className="mx-6 mt-22 md:mx-10 md:mt-30 lg:mx-auto lg:mt-40 lg:grid lg:max-w-277.5 lg:grid-cols-product-meta lg:gap-31.25">
        <RhythmGroup>
          {/* The detail endpoints include long-form product information like
              features and box contents, which is why these sections are rendered here
              instead of on the category listing pages. */}
          <RhythmItem>
            <h2 className="mb-6 text-heading-sm font-bold uppercase tracking-heading text-black md:text-4xl md:tracking-title">
              Features
            </h2>
          </RhythmItem>
          <div className="grid gap-6 text-copy leading-copy font-medium text-black/50">
            {product.features.map((feature) => (
              <RhythmItem key={feature} variant="soft">
                <p>{feature}</p>
              </RhythmItem>
            ))}
          </div>
        </RhythmGroup>

        <RhythmGroup className="mt-22 md:mt-30 md:flex md:items-start md:justify-between lg:mt-0 lg:block">
          <RhythmItem>
            <h2 className="mb-6 text-heading-sm font-bold uppercase tracking-heading text-black md:mb-0 md:text-4xl md:tracking-title">
              In the box
            </h2>
          </RhythmItem>
          <div className="grid gap-2 text-copy leading-copy font-medium text-black/50">
            {product.includes.map((item) => (
              <RhythmItem key={item.item} variant="soft">
                <p>
                  <span className="mr-6 font-bold text-brand">
                    {item.quantity}x
                  </span>
                  {item.item}
                </p>
              </RhythmItem>
            ))}
          </div>
        </RhythmGroup>
      </section>

      <ProductGallery product={product} />
      <RelatedProducts product={product} />
      <CategoryCards className="mt-30 lg:mt-40" />
      <BestGearSection className="mt-30 lg:mt-42" />
    </div>
  );
};

export default ProductDetailLayout;
