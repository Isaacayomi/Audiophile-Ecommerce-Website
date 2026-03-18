import Link from "next/link";
import { Product } from "../lib/products";
import ResponsivePicture from "./ResponsivePicture";
import ProductPurchaseCard from "./ProductPurchaseCard";
import ProductGallery from "./ProductGallery";
import RelatedProducts from "./RelatedProducts";
import CategoryCards from "./CategoryCards";
import BestGearSection from "./BestGearSection";

const ProductDetailLayout = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white pt-4 md:pt-8.25 lg:pt-19.75">
      <div className="mx-6 md:mx-10 lg:mx-auto lg:max-w-277.5">
        <Link
          href={`/${product.category}`}
          className="text-copy leading-copy font-medium text-black/50 transition-colors hover:text-brand"
        >
          Go Back
        </Link>
      </div>

      <section className="mx-6 mt-6 md:mx-10 lg:mx-auto lg:mt-14 lg:grid lg:max-w-277.5 lg:grid-cols-product-detail lg:items-center lg:gap-31.25">
        <div className="overflow-hidden rounded-lg">
          <ResponsivePicture
            mobileSrc={product.productImage.mobile}
            tabletSrc={product.productImage.tablet}
            desktopSrc={product.productImage.desktop}
            alt={product.name}
            imageClassName="h-81.75 object-cover md:h-120 lg:h-140"
          />
        </div>

        <ProductPurchaseCard product={product} />
      </section>

      <section className="mx-6 mt-22 md:mx-10 md:mt-30 lg:mx-auto lg:mt-40 lg:grid lg:max-w-277.5 lg:grid-cols-product-meta lg:gap-31.25">
        <div>
          <h2 className="mb-6 text-heading-sm font-bold uppercase tracking-heading text-black md:text-4xl md:tracking-title">
            Features
          </h2>
          <div className="grid gap-6 text-copy leading-copy font-medium text-black/50">
            {product.features.map((feature) => (
              <p key={feature}>{feature}</p>
            ))}
          </div>
        </div>

        <div className="mt-22 md:mt-30 md:flex md:items-start md:justify-between lg:mt-0 lg:block">
          <h2 className="mb-6 text-heading-sm font-bold uppercase tracking-heading text-black md:mb-0 md:text-4xl md:tracking-title">
            In the box
          </h2>
          <div className="grid gap-2 text-copy leading-copy font-medium text-black/50">
            {product.includes.map((item) => (
              <p key={item.item}>
                <span className="mr-6 font-bold text-brand">
                  {item.quantity}x
                </span>
                {item.item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ProductGallery product={product} />
      <RelatedProducts product={product} />
      <CategoryCards className="mt-30 lg:mt-40" />
      <BestGearSection className="mt-30 lg:mt-42" />
    </div>
  );
};

export default ProductDetailLayout;
