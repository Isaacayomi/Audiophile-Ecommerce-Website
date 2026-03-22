import { Product } from "../type";
import ResponsivePicture from "./ResponsivePicture";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const ProductGallery = ({ product }: { product: Product }) => {
  return (
    <RhythmGroup className="mx-6 mt-22 md:mx-10 md:mt-30 lg:mx-auto lg:mt-40 lg:grid lg:max-w-277.5 lg:grid-cols-gallery lg:gap-7.5">
      <div className="grid gap-5 md:gap-6">
        <RhythmItem variant="pop">
          <ResponsivePicture
            mobileSrc={product.gallery.first.mobile}
            tabletSrc={product.gallery.first.tablet}
            desktopSrc={product.gallery.first.desktop}
            alt={`${product.name} gallery image 1`}
            imageClassName="h-43.5 rounded-lg object-cover lg:h-70"
          />
        </RhythmItem>
        <RhythmItem variant="pop">
          <ResponsivePicture
            mobileSrc={product.gallery.second.mobile}
            tabletSrc={product.gallery.second.tablet}
            desktopSrc={product.gallery.second.desktop}
            alt={`${product.name} gallery image 2`}
            imageClassName="h-43.5 rounded-lg object-cover lg:h-70"
          />
        </RhythmItem>
      </div>

      <RhythmItem className="mt-5 lg:mt-0" variant="pop">
        <ResponsivePicture
          mobileSrc={product.gallery.third.mobile}
          tabletSrc={product.gallery.third.tablet}
          desktopSrc={product.gallery.third.desktop}
          alt={`${product.name} gallery image 3`}
          imageClassName="h-92 rounded-lg object-cover lg:h-148"
        />
      </RhythmItem>
    </RhythmGroup>
  );
};

export default ProductGallery;
