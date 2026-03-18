import Link from "next/link";
import { getProductBySlug, Product } from "../lib/products";
import ResponsivePicture from "./ResponsivePicture";

const RelatedProducts = ({ product }: { product: Product }) => {
  return (
    <section className="mx-6 mt-[120px] text-center md:mx-10 lg:mx-auto lg:mt-[160px] lg:max-w-[1110px]">
      <h2 className="mb-10 text-[24px] font-bold uppercase tracking-[0.86px] text-black md:mb-14 md:text-[32px] md:tracking-[1.14px]">
        You may also like
      </h2>
      <div className="grid gap-14 md:grid-cols-3 md:gap-[11px] lg:gap-[30px]">
        {product.others.map((other) => {
          const item = getProductBySlug(other.slug);
          if (!item) return null;

          return (
            <div key={other.slug}>
              <ResponsivePicture
                mobileSrc={other.image.mobile}
                tabletSrc={other.image.tablet}
                desktopSrc={other.image.desktop}
                alt={other.name}
                imageClassName="mb-8 h-[120px] rounded-lg object-cover md:h-[318px]"
              />
              <h3 className="mb-8 text-[24px] font-bold uppercase tracking-[1.71px] text-black">
                {other.name}
              </h3>
              <Link
                href={`/${item.category}/${item.slug}`}
                className="inline-flex h-12 items-center justify-center bg-[#D87D4A] px-[31px] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
              >
                See Product
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;
