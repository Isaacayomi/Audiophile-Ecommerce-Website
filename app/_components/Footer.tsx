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
      <div className="mx-auto max-w-277.5 px-6 md:px-10 lg:px-0">
        <div className="mx-auto h-1 w-25.25 bg-brand md:mx-0" />

        <footer className="pb-9.5 pt-12 text-white md:pb-11.5 md:pt-15 lg:pb-12 lg:pt-18.75">
          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:flex-row lg:items-start lg:justify-between">
            <Link href="/" className="mb-12 md:mb-8 lg:mb-0">
              <Image
                src="/assets/shared/desktop/logo.svg"
                width={143}
                height={25}
                alt="Audiophile"
                className="cursor-pointer"
              />
            </Link>

            {/* The nav centers on mobile, sits under the logo on tablet, and moves back to the top row on desktop. */}
            <ul className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8.5 lg:pt-1">
              {items.map((item) => (
                <li key={item}>
                  <Link
                    className="text-label font-bold uppercase leading-6.25 tracking-banner text-white transition-colors hover:text-brand"
                    href={item === "home" ? "/" : `/${item}`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 max-w-135 text-center text-copy leading-6.25 font-medium text-white/50 md:mt-8 md:text-left lg:mt-9">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>

          {/* Tablet keeps copyright and socials on one row; mobile stacks them with extra breathing room. */}
          <div className="mt-12 flex flex-col items-center gap-12 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-0 lg:mt-14">
            <p className="text-center text-copy leading-6.25 font-bold text-white/50 md:text-left">
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
