import { Product } from "../lib/products";
import ResponsivePicture from "./ResponsivePicture";

const ProductGallery = ({ product }: { product: Product }) => {
  return (
    <section className="mx-6 mt-[88px] md:mx-10 md:mt-[120px] lg:mx-auto lg:mt-[160px] lg:grid lg:max-w-[1110px] lg:grid-cols-[445px_1fr] lg:gap-[30px]">
      <div className="grid gap-5 md:gap-6">
        <ResponsivePicture
          mobileSrc={product.gallery.first.mobile}
          tabletSrc={product.gallery.first.tablet}
          desktopSrc={product.gallery.first.desktop}
          alt={`${product.name} gallery image 1`}
          imageClassName="h-[174px] rounded-lg object-cover md:h-[174px] lg:h-[280px]"
        />
        <ResponsivePicture
          mobileSrc={product.gallery.second.mobile}
          tabletSrc={product.gallery.second.tablet}
          desktopSrc={product.gallery.second.desktop}
          alt={`${product.name} gallery image 2`}
          imageClassName="h-[174px] rounded-lg object-cover md:h-[174px] lg:h-[280px]"
        />
      </div>

      <div className="mt-5 lg:mt-0">
        <ResponsivePicture
          mobileSrc={product.gallery.third.mobile}
          tabletSrc={product.gallery.third.tablet}
          desktopSrc={product.gallery.third.desktop}
          alt={`${product.name} gallery image 3`}
          imageClassName="h-[368px] rounded-lg object-cover md:h-[368px] lg:h-[592px]"
        />
      </div>
    </section>
  );
};

export default ProductGallery;
