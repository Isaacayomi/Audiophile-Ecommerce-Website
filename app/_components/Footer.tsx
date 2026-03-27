"use client";

import Image from "next/image";
import Link from "next/link";
import { RhythmGroup, RhythmItem, RhythmListItem } from "./ui/Rhythm";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const items = ["home", "headphones", "speakers", "earphones"];
  const socialLinks = [
    { icon: "icon-facebook.svg", label: "Facebook" },
    { icon: "icon-twitter.svg", label: "Twitter" },
    { icon: "icon-instagram.svg", label: "Instagram" },
  ];

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-277.5 px-6 md:px-10 lg:px-0">
        <div className="mx-auto h-1 w-25.25 bg-brand md:mx-0" />

        <RhythmGroup
          className="pb-9.5 pt-12 text-white md:pb-11.5 md:pt-15 lg:pb-12 lg:pt-18.75"
          inView={false}
        >
          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:flex-row lg:items-start lg:justify-between">
            <RhythmItem variant="soft">
              <Link href="/" className="mb-14 inline-block md:mb-10 lg:mb-0">
                <Image
                  src="/assets/shared/desktop/logo.svg"
                  width={143}
                  height={25}
                  alt="Audiophile"
                  className="cursor-pointer"
                />
              </Link>
            </RhythmItem>

            {/* The nav centers on mobile, sits under the logo on tablet, and moves back to the top row on desktop. */}
            <ul className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8.5 lg:pt-1">
              {items.map((item) => (
                <RhythmListItem key={item} variant="soft">
                  <Link
                    className="text-label font-bold uppercase leading-copy tracking-banner text-white transition-colors hover:text-brand"
                    href={item === "home" ? "/" : `/${item}`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </RhythmListItem>
              ))}
            </ul>
          </div>

          <RhythmItem>
            <p className="mt-12 max-w-135 text-center text-copy leading-copy font-medium text-white/50 md:mt-8 md:text-left lg:mt-9">
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
          </RhythmItem>

          {/* Tablet keeps copyright and socials on one row; mobile stacks them with extra breathing room. */}
          <div className="mt-12 flex flex-col items-center gap-12 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-0 lg:mt-14">
            <RhythmItem variant="soft">
              <p className="text-center text-copy leading-copy font-bold text-white/50 md:text-left">
                Copyright 2021. All Rights Reserved
              </p>
            </RhythmItem>

            <div className="flex items-center justify-center gap-4">
              {socialLinks.map(({ icon, label }) => (
                <RhythmItem key={icon} variant="soft">
                  <Image
                    src={`/assets/shared/desktop/${icon}`}
                    alt={label}
                    width={24}
                    height={24}
                  />
                </RhythmItem>
              ))}
            </div>
          </div>
        </RhythmGroup>
      </div>
    </div>
  );
};

export default Footer;
