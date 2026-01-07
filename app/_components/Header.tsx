"use client";

import Image from "next/image";
import Link from "next/link";
import NavMenu from "./ui/navMenu";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleNav } from "../store/uiState/uiSlice";
import cart from "./ui/cart";
import Cart from "./ui/cart";
import { toggleCart } from "../store/uiState/cartSlice";
import CheckoutModal from "./ui/checkoutModal";
function Header() {
  const items = ["home", "headphones", "speakers", "earphones"];
  const isOpen = useSelector((state: RootState) => state.ui.value);
  const isCartOpen = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();
  return (
    <nav>
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between py-8 mx-6 border-b border-[#979797] md:hidden">
        <div
          onClick={() => dispatch(toggleNav())}
          className="w-4 h-4 flex items-center justify-center"
        >
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
        <div onClick={() => dispatch(toggleCart())}>
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
          <div
            onClick={() => dispatch(toggleNav())}
            className="w-4 h-4 flex items-center justify-center"
          >
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
          <div onClick={() => dispatch(toggleCart())}>
            <Image src="/logo.png" alt="Logo" height={25} width={143} />
          </div>
        </div>
        <div onClick={() => dispatch(toggleCart())}>
          <Image
            src="/assets/cart-icon.svg"
            alt="cart-icon"
            height={20}
            width={23}
          />
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between py-8.75 mx-41.25 border-b border-[#979797] ">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            height={25}
            width={143}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center text-[13px] gap-8.5 font-bold leading-6.25 tracking-[2px] text-white">
          {items.map((item, i) => {
            return (
              <Link key={i} className="hover:text-[#D87D4A]" href={`/${item}`}>
                {item.toUpperCase()}
              </Link>
            );
          })}
        </div>

        <div onClick={() => dispatch(toggleCart())}>
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

      {/* Cart menu */}
      {/* {isCartOpen && <Cart />} */}

      {/* Cart checkout */}

      {isCartOpen && <CheckoutModal />}
    </nav>
  );
}
export default Header;
