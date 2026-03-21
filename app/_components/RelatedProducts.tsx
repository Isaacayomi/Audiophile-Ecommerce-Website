import Link from "next/link";
import { Product } from "../lib/products";
import ResponsivePicture from "./ResponsivePicture";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const RelatedProducts = ({ product }: { product: Product }) => {
  return (
    <section className="mx-6 mt-30 text-center md:mx-10 lg:mx-auto lg:mt-40 lg:max-w-277.5">
      <RhythmGroup>
        <RhythmItem variant="soft">
          <h2 className="mb-10 text-heading-sm font-bold uppercase tracking-heading text-black md:mb-14 md:text-4xl md:tracking-title">
            You may also like
          </h2>
        </RhythmItem>
      </RhythmGroup>

      <RhythmGroup className="grid gap-14 md:grid-cols-3 md:gap-2.75 lg:gap-7.5">
        {product.others.map((other) => {
          return (
            <RhythmItem key={other.slug} variant="pop">
              {/* The backend already sends the related product cards in `others`,
                  so this section can render directly without making extra requests. */}
              <ResponsivePicture
                mobileSrc={other.image.mobile}
                tabletSrc={other.image.tablet}
                desktopSrc={other.image.desktop}
                alt={other.name}
                imageClassName="mb-8 h-30 rounded-lg object-cover md:h-79.5"
              />

              <h3 className="mb-8 text-heading-sm font-bold uppercase tracking-title text-black">
                {other.name}
              </h3>

              <Link
                href={`/${other.category}/${other.slug}`}
                className="inline-flex h-12 items-center justify-center bg-brand px-8 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
              >
                See Product
              </Link>
            </RhythmItem>
          );
        })}
      </RhythmGroup>
    </section>
  );
};

export default RelatedProducts;
