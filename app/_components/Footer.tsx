import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const items = ["home", "headphones", "speakers", "earphones"];

  return (
    <div className="bg-black pt-0 md:px-[40px] lg:px-[165px]">
      <div className="mt-0 h-[4px] max-w-[101px] bg-[#D87D4A] mx-auto md:mx-0"></div>
      <footer className="flex flex-col items-center justify-center pb-[38px] md:items-start">
        <div className="w-full flex-col items-center md:items-start lg:flex lg:flex-row lg:justify-between">
          <Link href="/">
            <Image
              src="/assets/shared/desktop/logo.svg"
              width={143}
              height={25}
              alt="Footer Logo"
              className="mb-[48px] mt-[52px] cursor-pointer md:mb-0"
            />
          </Link>

          <ul className="flex flex-col justify-center pb-[48px] text-center md:flex-row md:items-start md:gap-[34px] md:pb-0 md:pt-[32px] md:text-left">
            {items.map((item) => (
              <li key={item} className="pb-[16px]">
                <Link
                  className="uppercase font-bold leading-[25px] tracking-[2px] text-white transition-colors hover:text-[#D87D4A]"
                  href={item === "home" ? "/" : `/${item}`}
                >
                  {item.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex-col items-center gap-8 md:items-start lg:flex lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-center md:items-start lg:max-w-[540px]">
            <p className="text-center text-[15px] leading-[25px] font-medium text-white/50 md:text-left lg:pb-[56px] lg:pt-[36px]">
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>

            <p className="mt-6 text-center text-[15px] leading-[25px] font-bold text-white/50 md:text-left">
              Copyright 2021. All Rights Reserved
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 lg:pt-[105px]">
            {[
              "icon-facebook.svg",
              "icon-twitter.svg",
              "icon-instagram.svg",
            ].map((icon) => (
              <Image
                key={icon}
                src={`/assets/shared/desktop/${icon}`}
                alt=""
                width={24}
                height={24}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
