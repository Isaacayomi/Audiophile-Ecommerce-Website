"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import NavMenu from "./ui/navMenu";
import { FaTimes } from "react-icons/fa";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between py-8 mx-6 border-b border-[#979797] md:hidden">
        <div onClick={() => setIsOpen(!isOpen)} className="w-4 h-4 flex items-center justify-center">
          {!isOpen ? (
            <Image
              src="/hamburger.svg"
              alt="Hamburger"
              height={16}
              width={16}
            />
          ) : (
            <FaTimes size={16} />
          )}
        </div>
        <div>
          <Image src="/logo.png" alt="Logo" height={25} width={143} />
        </div>
        <div>
          <Image
            src="/assets/cart-icon.svg"
            alt="cart-icon"
            height={20}
            width={23}
          />
        </div>
      </div>

      {/* Tablet Navbar */}
      <div className="hidden lg:hidden md:flex items-center gap-116.25 justify-between py-8 mx-9.75 border-b border-[#979797] ">
        <div className="flex items-center gap-10.5">
          <div onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? (
              <Image
                src="/hamburger.svg"
                alt="Hamburger"
                height={15}
                width={16}
              />
            ) : (
              <FaTimes size={20} />
            )}
          </div>
          <div>
            <Image src="/logo.png" alt="Logo" height={25} width={143} />
          </div>
        </div>
        <div>
          <Image
            src="/assets/cart-icon.svg"
            alt="cart-icon"
            height={20}
            width={23}
          />
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between py-[35px] mx-[165px] border-b border-[#979797] ">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            height={25}
            width={143}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center text-[13px] gap-[34px] font-bold leading-[25px] tracking-[2px] text-white">
          {["home", "headphones", "speakers", "earphones"].map((item, i) => {
            return (
              <Link key={i} className="hover:text-[#D87D4A]" href={`/${item}`}>
                {item.toUpperCase()}
              </Link>
            );
          })}
        </div>

        <div>
          <Image
            src="/assets/cart-icon.svg"
            alt="cart icon"
            height={20}
            width={23}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && <NavMenu />}
    </nav>
  );
}
export default Header;
