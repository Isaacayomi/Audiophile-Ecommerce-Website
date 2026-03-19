import ResponsivePicture from "./ResponsivePicture";
import Link from "next/link";
import CategoryCards from "./CategoryCards";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const HeroSection = () => {
  return (
    <>
      <section
        className="
          relative
          overflow-hidden
          bg-panel
          min-h-150
          md:min-h-182.25
          lg:min-h-150
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-panel" />
          <ResponsivePicture
            mobileSrc="/assets/home/mobile/image-header.jpg"
            tabletSrc="/assets/home/tablet/image-header.jpg"
            desktopSrc="/assets/home/desktop/image-hero.jpg"
            alt="XX99 Mark II headphones"
            className="absolute inset-0"
            imageClassName="h-full w-full object-cover object-center md:object-center lg:object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute right-12 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-white/5 blur-3xl lg:block" />
        </div>

        <div className="mx-auto w-82 pt-27 pb-28 text-center md:w-94.75 md:pt-31.5 md:pb-41.75 lg:w-full lg:max-w-277.5 lg:py-0 lg:text-left">
          <div className="relative z-10 lg:flex lg:min-h-158 lg:items-center">
            <RhythmGroup className="lg:w-99.5 lg:pt-0.5" inView={false}>
              <RhythmItem variant="soft">
                <p className="pb-4 text-overline tracking-overline text-white/50 md:pb-6">
                  NEW PRODUCT
                </p>
              </RhythmItem>

              <RhythmItem>
                <h1 className="pb-6 text-display font-bold uppercase tracking-heading text-white md:text-hero md:leading-hero md:tracking-banner">
                  XX99 Mark II Headphones
                </h1>
              </RhythmItem>

              <RhythmItem>
                <p className="pb-7 text-copy leading-copy font-medium text-white/75 md:pb-10 lg:w-87.25">
                  Experience natural, lifelike audio and exceptional build
                  quality made for the passionate music enthusiast.
                </p>
              </RhythmItem>

              <RhythmItem variant="pop">
                <Link
                  href="/headphones/xx99-mark-two-headphones"
                  className="inline-flex h-12 w-40 items-center justify-center bg-brand text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
                >
                  See Product
                </Link>
              </RhythmItem>
            </RhythmGroup>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <CategoryCards className="pb-30 pt-23 md:pb-24 md:pt-37 lg:pb-42 lg:pt-30" />
      </section>
    </>
  );
};

export default HeroSection;
