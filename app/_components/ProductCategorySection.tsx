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
    <section
      className={`mx-6 md:mx-10 lg:mx-auto lg:max-w-[1110px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-[125px] ${
        reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      <div className="overflow-hidden rounded-lg">
        <ResponsivePicture
          mobileSrc={product.categoryImage.mobile}
          tabletSrc={product.categoryImage.tablet}
          desktopSrc={product.categoryImage.desktop}
          alt={product.name}
          imageClassName="h-[352px] object-cover md:h-[352px] lg:h-[560px]"
        />
      </div>

      <div className="mx-auto max-w-[572px] py-8 text-center md:py-[52px] lg:mx-0 lg:max-w-[445px] lg:py-0 lg:text-left">
        {product.isNew ? (
          <p className="mb-6 text-[14px] uppercase tracking-[10px] text-[#D87D4A]">
            New Product
          </p>
        ) : null}
        <h2 className="mb-6 text-[28px] leading-[38px] font-bold uppercase tracking-[1px] text-black md:text-[40px] md:leading-[44px] md:tracking-[1.43px]">
          {product.name}
        </h2>
        <p className="mb-6 text-[15px] leading-[25px] font-medium text-black/50 md:mb-10">
          {product.description}
        </p>
        <Link
          href={`/${product.category}/${product.slug}`}
          className="inline-flex h-12 items-center justify-center bg-[#D87D4A] px-[31px] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
        >
          See Product
        </Link>
      </div>
    </section>
  );
};

export default ProductCategorySection;
