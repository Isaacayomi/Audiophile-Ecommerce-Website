import Image from "next/image";
import Link from "next/link";
import { categories } from "../lib/products";

const thumbnails = {
  headphones: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
  speakers: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
  earphones: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
};

const CategoryCards = ({ className = "" }: { className?: string }) => {
  return (
    <section className={`mx-6 md:mx-10 lg:mx-auto lg:max-w-[1110px] ${className}`}>
      <div className="grid gap-17.5 md:grid-cols-3 md:gap-2.5 lg:gap-[30px]">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="relative rounded-lg bg-[#F1F1F1] px-6 pb-[22px] pt-[88px] text-center"
          >
            <Image
              src={thumbnails[category.slug]}
              alt={category.label}
              width={180}
              height={180}
              className="absolute left-1/2 top-[-52px] w-[147px] -translate-x-1/2 md:w-[170px] lg:w-[180px]"
            />
            <h2 className="mb-[17px] text-[15px] font-bold uppercase tracking-[1.07px] text-black lg:text-[18px] lg:tracking-[1.29px]">
              {category.label}
            </h2>
            <Link
              href={`/${category.slug}`}
              className="inline-flex items-center gap-[13px] text-[13px] font-bold uppercase tracking-[1px] text-black/50 transition-colors hover:text-[#D87D4A]"
            >
              Shop
              <Image
                src="/assets/shared/desktop/icon-arrow-right.svg"
                alt=""
                width={8}
                height={12}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
