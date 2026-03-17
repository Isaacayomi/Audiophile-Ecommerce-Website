import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";

const Footer = () => {
  const items = ["home", "headphones", "speakers", "earphones"];

  return (
    <div className="pt-0 md:px-[40px] lg:px-[165px]">
      <div className="bg-[#D87D4A] h-[4px] max-w-[101px] mx-auto md:mx-0 mt-0"></div>
      <footer className="flex flex-col items-center md:items-start justify-center pb-[38px] ">
        {/* Logo and nav links for md -> lg layout */}
        <div className="w-full flex flex-col items-center md:items-start lg:flex-row lg:justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Footer Logo"
              className="mt-[52px] mb-[48px] md:mb-0 cursor-pointer"
            />
          </Link>

          <ul className="flex flex-col justify-center pb-[48px] text-center md:flex-row md:gap-[34px] md:items-start md:text-left md:pt-[32px] lg:pb-0">
            {items.map((item) => (
              <li key={item} className="pb-[16px]">
                <Link
                  className="uppercase font-bold text-[13px] tracking-[2px] leading-[25px] text-white cursor-pointer hover:text-[#D87D4A]"
                  href={`/${item}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary + bottom row layout for lg screens */}
        <div className="w-full flex flex-col items-center md:items-start gap-8 lg:flex-row lg:justify-between lg:items-start">
          <div className="flex flex-col items-center md:items-start lg:max-w-[60%]">
            <p className="text-[15px] leading-[25px] font-medium text-center md:text-left text-[rgba(255,255,255,0.5)] lg:pt-[36px] lg:pb-[56px] lg:max-w-[540px]">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we’re open 7 days a week.
            </p>

            <p className="mt-6 text-center md:text-left text-[rgba(255,255,255,0.5)] font-bold text-[15px] leading-[25px] ">
              Copyright 2021. All Rights Reserved
            </p>
          </div>

          {/* On large screens, social icons are on the right, vertically centered */}
          <div className="flex items-center justify-center gap-[16px] lg:pt-[105px]">
            <IoLogoFacebook className="w-[24px] h-[24px] cursor-pointer hover:text-[#D87D4A]" />
            <FaTwitter className="w-[24px] h-[24px] cursor-pointer hover:text-[#D87D4A]" />
            <FaInstagram className="w-[24px] h-[24px] cursor-pointer hover:text-[#D87D4A]" />
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
