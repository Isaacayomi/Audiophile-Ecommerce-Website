import Link from "next/link";
import { Product } from "../lib/products";
import ResponsivePicture from "./ResponsivePicture";

const ProductCategorySection = ({
  product,
  reverse = false,
}: {
  product: Product;
  reverse?: boolean;
}) => {
  return (
    <section className="mx-6 md:mx-10 lg:mx-auto lg:grid lg:max-w-277.5 lg:grid-cols-2 lg:items-center lg:gap-31.25">
      <div className={`overflow-hidden rounded-lg ${reverse ? "lg:order-2" : ""}`}>
        <ResponsivePicture
          mobileSrc={product.categoryImage.mobile}
          tabletSrc={product.categoryImage.tablet}
          desktopSrc={product.categoryImage.desktop}
          alt={product.name}
          imageClassName="h-88 object-cover lg:h-140"
        />
      </div>

      <div
        className={`mx-auto max-w-143 py-8 text-center md:py-13 lg:mx-0 lg:max-w-111.25 lg:py-0 lg:text-left ${reverse ? "lg:order-1" : ""}`}
      >
        {product.isNew ? (
          <p className="mb-6 text-overline uppercase tracking-overline text-brand">
            New Product
          </p>
        ) : null}
        <h2 className="mb-6 text-heading-md leading-heading font-bold uppercase tracking-copy text-black md:text-heading-lg md:leading-display md:tracking-title">
          {product.name}
        </h2>
        <p className="mb-6 text-copy leading-copy font-medium text-black/50 md:mb-10">
          {product.description}
        </p>
        <Link
          href={`/${product.category}/${product.slug}`}
          className="inline-flex h-12 items-center justify-center bg-brand px-8 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
        >
          See Product
        </Link>
      </div>
    </section>
  );
};

export default ProductCategorySection;
