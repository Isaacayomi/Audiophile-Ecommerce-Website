import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const items = ["home", "headphones", "speakers", "earphones"];
  const socialLinks = [
    { icon: "icon-facebook.svg", label: "Facebook" },
    { icon: "icon-twitter.svg", label: "Twitter" },
    { icon: "icon-instagram.svg", label: "Instagram" },
  ];

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-[1110px] px-6 md:px-10 lg:px-0">
        <div className="mx-auto h-1 w-[101px] bg-[#D87D4A] md:mx-0" />

        <footer className="pb-[38px] pt-[48px] text-white md:pb-[46px] md:pt-[60px] lg:pb-[48px] lg:pt-[75px]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:flex-row lg:items-start lg:justify-between">
            <Link href="/" className="mb-[48px] md:mb-[32px] lg:mb-0">
              <Image
                src="/assets/shared/desktop/logo.svg"
                width={143}
                height={25}
                alt="Audiophile"
                className="cursor-pointer"
              />
            </Link>

            {/* The nav centers on mobile, sits under the logo on tablet, and moves back to the top row on desktop. */}
            <ul className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-[34px] lg:pt-[4px]">
              {items.map((item) => (
                <li key={item}>
                  <Link
                    className="text-[13px] font-bold uppercase leading-[25px] tracking-[2px] text-white transition-colors hover:text-[#D87D4A]"
                    href={item === "home" ? "/" : `/${item}`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-[48px] max-w-[540px] text-center text-[15px] leading-[25px] font-medium text-white/50 md:mt-[32px] md:text-left lg:mt-[36px]">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>

          {/* Tablet keeps copyright and socials on one row; mobile stacks them with extra breathing room. */}
          <div className="mt-[48px] flex flex-col items-center gap-[48px] md:mt-[80px] md:flex-row md:items-center md:justify-between md:gap-0 lg:mt-[56px]">
            <p className="text-center text-[15px] leading-[25px] font-bold text-white/50 md:text-left">
              Copyright 2021. All Rights Reserved
            </p>

            <div className="flex items-center justify-center gap-4">
              {socialLinks.map(({ icon, label }) => (
                <span key={icon}>
                  <Image
                    src={`/assets/shared/desktop/${icon}`}
                    alt={label}
                    width={24}
                    height={24}
                  />
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
