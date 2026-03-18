import Link from "next/link";
import ResponsivePicture from "./ResponsivePicture";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const secondaryButtonClass =
  "inline-flex h-12 items-center justify-center border border-black px-7.5 text-label font-bold uppercase tracking-copy text-black transition-colors hover:bg-black hover:text-white";

const HomeFeaturedSections = () => {
  return (
    <section className="mx-6 mb-30 md:mx-10 lg:mx-auto lg:mb-50 lg:max-w-277.5">
      <RhythmGroup className="relative overflow-hidden rounded-lg bg-brand px-6 py-13.75 text-center md:px-14.5 md:pb-16 md:pt-13 lg:min-h-140 lg:px-23.75 lg:pt-0 lg:text-left">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/assets/home/desktop/pattern-circles.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 -top-30 w-139.5 max-w-none -translate-x-1/2 md:-top-72.5 md:w-236 lg:-left-37.25 lg:-top-36 lg:translate-x-0"
          />
        </div>

        <RhythmItem className="relative z-10 mx-auto mb-8 w-43 md:mb-16 md:w-49.25 lg:absolute lg:bottom-0 lg:left-23.75 lg:mb-0 lg:w-102.5" variant="pop">
          <ResponsivePicture
            mobileSrc="/assets/home/mobile/image-speaker-zx9.png"
            tabletSrc="/assets/home/tablet/image-speaker-zx9.png"
            desktopSrc="/assets/home/desktop/image-speaker-zx9.png"
            alt="ZX9 speaker"
          />
        </RhythmItem>

        <RhythmGroup className="relative z-10 lg:ml-auto lg:flex lg:min-h-140 lg:w-87.25 lg:items-center" inView={false}>
          <div>
            <RhythmItem>
              <h2 className="mx-auto mb-6 max-w-70 text-display leading-10 font-bold uppercase tracking-heading text-white md:max-w-none md:text-hero md:leading-hero md:tracking-banner lg:mx-0">
              ZX9
              <br />
              Speaker
              </h2>
            </RhythmItem>

            <RhythmItem>
              <p className="mx-auto mb-6 max-w-70 text-copy leading-copy font-medium text-white/75 md:mb-10 lg:mx-0 lg:max-w-87.25">
                Upgrade to premium speakers that are phenomenally built to deliver
                truly remarkable sound.
              </p>
            </RhythmItem>

            <RhythmItem variant="pop">
              <Link
                href="/speakers/zx9-speaker"
                className="inline-flex h-12 items-center justify-center bg-black px-8 text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-dark"
              >
                See Product
              </Link>
            </RhythmItem>
          </div>
        </RhythmGroup>
      </RhythmGroup>

      <RhythmItem className="relative mt-6 overflow-hidden rounded-lg bg-surface px-6 py-25.25 md:mt-8 md:px-15.5 lg:mt-12 lg:px-23.75" variant="soft">
        <ResponsivePicture
          mobileSrc="/assets/home/mobile/image-speaker-zx7.jpg"
          tabletSrc="/assets/home/tablet/image-speaker-zx7.jpg"
          desktopSrc="/assets/home/desktop/image-speaker-zx7.jpg"
          alt="ZX7 speaker"
          className="absolute inset-0"
          imageClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative z-10">
          <h2 className="mb-8 text-heading-md leading-heading font-bold uppercase tracking-banner text-black">
            ZX7 Speaker
          </h2>

          <Link href="/speakers/zx7-speaker" className={secondaryButtonClass}>
            See Product
          </Link>
        </div>
      </RhythmItem>

      <RhythmGroup className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-2.75 lg:mt-12 lg:gap-7.5">
        <RhythmItem className="overflow-hidden rounded-lg" variant="pop">
          <ResponsivePicture
            mobileSrc="/assets/home/mobile/image-earphones-yx1.jpg"
            tabletSrc="/assets/home/tablet/image-earphones-yx1.jpg"
            desktopSrc="/assets/home/desktop/image-earphones-yx1.jpg"
            alt="YX1 earphones"
            imageClassName="h-50 object-cover md:h-full"
          />
        </RhythmItem>

        <RhythmItem className="rounded-lg bg-surface px-6 py-10.25 md:px-10.25 md:py-25.25 lg:px-23.75">
          <h2 className="mb-8 text-heading-md leading-heading font-bold uppercase tracking-banner text-black">
            YX1 Earphones
          </h2>

          <Link
            href="/earphones/yx1-earphones"
            className={secondaryButtonClass}
          >
            See Product
          </Link>
        </RhythmItem>
      </RhythmGroup>
    </section>
  );
};

export default HomeFeaturedSections;
