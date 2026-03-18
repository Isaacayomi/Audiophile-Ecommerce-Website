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
    <div className="bg-white pt-4 md:pt-[33px] lg:pt-[79px]">
      <div className="mx-6 md:mx-10 lg:mx-auto lg:max-w-[1110px]">
        <Link
          href={`/${product.category}`}
          className="text-[15px] leading-[25px] font-medium text-black/50 transition-colors hover:text-[#D87D4A]"
        >
          Go Back
        </Link>
      </div>

      <section className="mx-6 mt-6 md:mx-10 md:mt-6 lg:mx-auto lg:mt-[56px] lg:grid lg:max-w-[1110px] lg:grid-cols-[540px_445px] lg:items-center lg:gap-[125px]">
        <div className="overflow-hidden rounded-lg">
          <ResponsivePicture
            mobileSrc={product.productImage.mobile}
            tabletSrc={product.productImage.tablet}
            desktopSrc={product.productImage.desktop}
            alt={product.name}
            imageClassName="h-[327px] object-cover md:h-[480px] lg:h-[560px]"
          />
        </div>

        <ProductPurchaseCard product={product} />
      </section>

      <section className="mx-6 mt-[88px] md:mx-10 md:mt-[120px] lg:mx-auto lg:mt-[160px] lg:grid lg:max-w-[1110px] lg:grid-cols-[635px_350px] lg:gap-[125px]">
        <div>
          <h2 className="mb-6 text-[24px] font-bold uppercase tracking-[0.86px] text-black md:text-[32px] md:tracking-[1.14px]">
            Features
          </h2>
          <div className="grid gap-6 text-[15px] leading-[25px] font-medium text-black/50">
            {product.features.map((feature) => (
              <p key={feature}>{feature}</p>
            ))}
          </div>
        </div>

        <div className="mt-[88px] md:mt-[120px] md:flex md:items-start md:justify-between lg:mt-0 lg:block">
          <h2 className="mb-6 text-[24px] font-bold uppercase tracking-[0.86px] text-black md:mb-0 md:text-[32px] md:tracking-[1.14px]">
            In the box
          </h2>
          <div className="grid gap-2 text-[15px] leading-[25px] font-medium text-black/50">
            {product.includes.map((item) => (
              <p key={item.item}>
                <span className="mr-6 font-bold text-[#D87D4A]">
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
      <CategoryCards className="mt-[120px] lg:mt-[160px]" />
      <BestGearSection className="mt-[120px] lg:mt-[168px]" />
    </div>
  );
};

export default ProductDetailLayout;
