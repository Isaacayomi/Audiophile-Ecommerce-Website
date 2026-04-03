"use client";

import { BestGearSectionProps } from "../type";
import ResponsivePicture from "./ResponsivePicture";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const BestGearSection = ({ className = "" }: BestGearSectionProps) => {
  return (
    <section
      className={`mx-6 mb-30 md:mx-10 md:mb-24 lg:mx-auto lg:mb-50 lg:grid lg:max-w-277.5 lg:grid-cols-best-gear lg:items-center lg:gap-31.25 ${className}`}
    >
      <RhythmItem
        className="mb-10 overflow-hidden rounded-lg md:mb-15.75 lg:order-2 lg:mb-0"
        variant="pop"
      >
        <ResponsivePicture
          mobileSrc="/assets/shared/mobile/image-best-gear.jpg"
          tabletSrc="/assets/shared/tablet/image-best-gear.jpg"
          desktopSrc="/assets/shared/desktop/image-best-gear.jpg"
          alt="Man listening to music"
          imageClassName="h-75 object-cover lg:h-147"
        />
      </RhythmItem>

      <RhythmGroup className="text-center lg:order-1 lg:text-left">
        <RhythmItem>
          <h2 className="mb-8 text-heading-md leading-heading font-bold uppercase tracking-copy text-black md:mx-auto md:max-w-143.25 md:text-heading-lg md:leading-11 md:tracking-title lg:mx-0 lg:max-w-111.25">
            Bringing you the <span className="text-brand">best</span> audio gear
          </h2>
        </RhythmItem>

        <RhythmItem>
          <p className="text-copy leading-copy font-medium text-black/50 md:mx-auto md:max-w-143.25 lg:mx-0 lg:max-w-111.25">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </RhythmItem>
      </RhythmGroup>
    </section>
  );
};

export default BestGearSection;
