import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";

const Footer = () => {
  const items = ["home", "headphones", "speakers", "earphones"];

  return (
    <>
      <div className="bg-[#D87D4A] h-[4px] max-w-[101px] mx-auto"></div>
      <footer className="flex flex-col items-center justify-center pb-[38px]">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Footer Logo"
          className="mt-[52px] mb-[48px]"
        />

        <ul className="flex flex-col justify-center pb-[48px] text-center">
          {items.map((item) => (
            <li key={item} className="pb-[16px]">
              <Link
                className="uppercase font-bold text-[13px] tracking-[2px] leading-[25px] text-white"
                href={`/${item}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-[15px] leading-[25px] font-medium mb-[48px] text-center text-[rgba(255,255,255,0.5)]">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>

        <p className="text-center text-[rgba(255,255,255,0.5)] font-bold text-[15px] leading-[25px] ">
          Copyright 2021. All Rights Reserved
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-[16px] mt-[48px]">
          <IoLogoFacebook className="w-[24px] h-[24px]" />
          <FaTwitter className="w-[24px] h-[24px]" />
          <FaInstagram className="w-[24px] h-[24px]" />
        </div>
      </footer>
    </>
  );
};
export default Footer;
