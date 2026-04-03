"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "../lib/products";
import { BestGearSectionProps } from "../type";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";

const thumbnails = {
  headphones: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
  speakers: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
  earphones: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
};

const CategoryCards = ({ className = "" }: BestGearSectionProps) => {
  return (
    <section className={`mx-6 md:mx-10 lg:mx-auto lg:max-w-277.5 ${className}`}>
      <RhythmGroup className="grid gap-17.5 md:grid-cols-3 md:gap-2.5 lg:gap-7.5">
        {categories.map((category) => (
          <RhythmItem
            key={category.slug}
            className="relative rounded-lg bg-surface px-6 pb-5.5 pt-22 text-center"
            variant="pop"
          >
            <Image
              src={thumbnails[category.slug]}
              alt={category.label}
              width={180}
              height={180}
              className="absolute left-1/2 -top-13 w-36.75 -translate-x-1/2 md:w-42.5 lg:w-45"
            />
            <h2 className="mb-4.25 text-copy font-bold uppercase tracking-copy text-black lg:text-title lg:tracking-heading">
              {category.label}
            </h2>
            <Link
              href={`/${category.slug}`}
              className="inline-flex items-center gap-3.25 text-label font-bold uppercase tracking-copy text-black/50 transition-colors hover:text-brand"
            >
              Shop
              <Image
                src="/assets/shared/desktop/icon-arrow-right.svg"
                alt=""
                width={8}
                height={12}
              />
            </Link>
          </RhythmItem>
        ))}
      </RhythmGroup>
    </section>
  );
};

export default CategoryCards;
