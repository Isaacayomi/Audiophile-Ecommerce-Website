"use client";

import Image from "next/image";
import Link from "next/link";
import NavMenu from "./ui/navMenu";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleNav } from "../store/uiState/uiSlice";
import { toggleCart } from "../store/uiState/cartSlice";
import OrderCompletionModal from "./ui/orderCompletionModal";
import Cart from "./ui/cart";
import CheckoutModal from "./ui/checkoutModal";
import { RhythmGroup, RhythmItem } from "./ui/Rhythm";
import HeaderAuth from "./ui/headerAuth";
import CartQuantityBadge from "./ui/CartQuantityBadge";

import { usePathname } from "next/navigation";

const Header = () => {
  const items = ["home", "headphones", "speakers", "earphones"];
  const pathname = usePathname();

  // UI flags for menus/modals rendered from global state.
  const isOpen = useSelector((state: RootState) => state.ui.value);
  const isCartOpen = useSelector((state: RootState) => state.cart.value);
  const isCheckoutOpen = useSelector(
    (state: RootState) => state.checkout.value,
  );
  // Badge count shown on the cart icon across all breakpoints.
  const cartQuantity = useSelector((state: RootState) => state.cartValue.value);
  const isOrderComplete = useSelector(
    (state: RootState) => state.orderCompletion.value,
  );

  const dispatch = useDispatch();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="relative z-50 bg-black">
      <RhythmGroup
        className="mx-6 flex items-center justify-between border-b border-white/10 py-8 md:hidden"
        inView={false}
      >
        <button
          onClick={() => dispatch(toggleNav())}
          className="flex h-4 w-4 items-center justify-center"
          aria-label="Toggle navigation"
        >
          {!isOpen ? (
            <Image
              src="/assets/shared/tablet/icon-hamburger.svg"
              alt=""
              height={16}
              width={16}
            />
          ) : (
            <FaTimes size={16} className="text-white" />
          )}
        </button>

        <Link href="/">
          <Image
            src="/assets/shared/desktop/logo.svg"
            alt="Audiophile"
            height={25}
            width={143}
          />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleCart())}
            aria-label="Open cart"
            className="relative inline-flex"
          >
            <CartQuantityBadge count={cartQuantity} />
            <Image
              src="/assets/shared/desktop/icon-cart.svg"
              alt=""
              height={20}
              width={23}
            />
          </button>
          <HeaderAuth />
        </div>
      </RhythmGroup>

      <RhythmGroup
        className="mx-10 hidden items-center justify-between border-b border-white/15 py-8 md:flex lg:hidden"
        inView={false}
      >
        <div className="flex items-center gap-10.5">
          <button
            onClick={() => dispatch(toggleNav())}
            className="flex h-4 w-4 items-center justify-center"
            aria-label="Toggle navigation"
          >
            {!isOpen ? (
              <Image
                src="/assets/shared/tablet/icon-hamburger.svg"
                alt=""
                height={16}
                width={16}
              />
            ) : (
              <FaTimes size={16} className="text-white" />
            )}
          </button>

          <Link href="/">
            <Image
              src="/assets/shared/desktop/logo.svg"
              alt="Audiophile"
              height={25}
              width={143}
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleCart())}
            aria-label="Open cart"
            className="relative inline-flex"
          >
            <CartQuantityBadge count={cartQuantity} />
            <Image
              src="/assets/shared/desktop/icon-cart.svg"
              alt=""
              height={20}
              width={23}
            />
          </button>
          <HeaderAuth />
        </div>
      </RhythmGroup>

      <RhythmGroup
        className="mx-41.25 hidden items-center justify-between border-b border-white/15 py-9 lg:flex"
        inView={false}
      >
        <RhythmItem variant="soft">
          <Link href="/">
            <Image
              src="/assets/shared/desktop/logo.svg"
              alt="Audiophile"
              height={25}
              width={143}
            />
          </Link>
        </RhythmItem>

        <div className="flex items-center justify-center gap-8.5 text-label font-bold leading-copy tracking-banner text-white">
          {items.map((item) => (
            <Link
              key={item}
              className="uppercase transition-colors hover:text-brand"
              href={item === "home" ? "/" : `/${item}`}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => dispatch(toggleCart())}
            aria-label="Open cart"
            className="relative inline-flex"
          >
            <CartQuantityBadge count={cartQuantity} />
            <Image
              src="/assets/shared/desktop/icon-cart.svg"
              alt=""
              height={20}
              width={23}
              className="cursor-pointer"
            />
          </button>
          <HeaderAuth />
        </div>
      </RhythmGroup>

      {isOpen && <NavMenu />}
      {isCartOpen && <Cart />}
      {isCheckoutOpen && <CheckoutModal />}
      {isOrderComplete && <OrderCompletionModal />}
    </nav>
  );
};

export default Header;
