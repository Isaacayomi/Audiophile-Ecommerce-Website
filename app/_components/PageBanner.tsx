"use client";

import { BestGearSectionProps } from "../type";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const PageBanner = ({ title }: BestGearSectionProps) => {
  return (
    <section className="bg-black px-6 py-8 md:px-10 md:py-26.25 lg:px-41.25 lg:py-24.5">
      <RhythmGroup className="mx-auto max-w-277.5" inView={false}>
        <RhythmItem variant="soft">
          <h1 className="text-center text-heading-md font-bold uppercase tracking-banner text-white md:text-heading-lg md:tracking-title">
            {title}
          </h1>
        </RhythmItem>
      </RhythmGroup>
    </section>
  );
};

export default PageBanner;
