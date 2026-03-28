"use client";

import { NavMenuProps } from "@/app/type";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { closeNav } from "@/app/store/uiState/uiSlice";
import { RhythmGroup, RhythmItem } from "./Rhythm";

const NavMenu = ({ absolute = true }: NavMenuProps) => {
  const dispatch = useDispatch();

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
      <RhythmGroup className="grid gap-17.5 md:grid-cols-3 md:gap-2.5" inView={false}>
        {products.map((product) => (
          <RhythmItem
            key={product.name}
            className="relative mx-auto w-full rounded-lg bg-surface px-6 pb-5.5 pt-22 text-center"
            variant="pop"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              className="absolute left-1/2 -top-13 w-36.75 -translate-x-1/2"
            />

            <p className="pb-4.25 text-copy font-bold tracking-copy text-black">
              {product.name}
            </p>

            <Link
              href={product.link}
              onClick={() => dispatch(closeNav())}
              className="inline-flex items-center justify-center gap-3.25 text-label font-bold uppercase tracking-copy text-black/50"
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
    </div>
  );
};

export default NavMenu;
