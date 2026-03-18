import { NavMenuProps } from "@/app/type";
import Image from "next/image";
import Link from "next/link";

const NavMenu = ({ absolute = true }: NavMenuProps) => {
  const products = [
    {
      image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
      name: "HEADPHONES",
      link: "/headphones",
    },
    {
      image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
      name: "SPEAKERS",
      link: "/speakers",
    },
    {
      image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
      name: "EARPHONES",
      link: "/earphones",
    },
  ];

  return (
    <div
      className={`${absolute ? "absolute left-0 right-0 z-40" : ""} mx-auto w-full bg-white px-6 py-8 md:px-10 md:py-14 lg:hidden`}
    >
      <div className="grid gap-17.5 md:grid-cols-3 md:gap-2.5">
        {products.map((product) => (
          <div
            key={product.name}
            className="relative mx-auto w-full rounded-lg bg-[#F1F1F1] px-6 pb-[22px] pt-[88px] text-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              className="absolute left-1/2 top-[-52px] w-[147px] -translate-x-1/2"
            />

            <p className="pb-[17px] text-[15px] font-bold tracking-[1.07px] text-black">
              {product.name}
            </p>

            <Link
              href={product.link}
              className="inline-flex items-center justify-center gap-[13px] text-[13px] font-bold uppercase tracking-[1px] text-black/50"
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
    </div>
  );
};

export default NavMenu;
