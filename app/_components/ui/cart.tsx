"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { closeCart } from "../../store/uiState/cartSlice";
import { useRouter } from "next/navigation";
import ModalBackdrop from "./ModalBackdrop";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <ModalBackdrop
      onClose={() => dispatch(closeCart())}
      wrapperClassName="items-start justify-center px-6 pt-28 md:justify-end md:px-10 md:pt-28 lg:px-41.25 lg:pt-32"
      panelClassName="relative w-full max-w-94.25 rounded-lg bg-white px-7 py-8 shadow-panel"
    >
      <button
        onClick={() => dispatch(closeCart())}
        aria-label="Close cart"
        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-black transition-colors hover:bg-gray-300"
      >
        <span className="leading-none">&times;</span>
      </button>
      <p className="flex items-center justify-between pb-7.75 pt-3">
        <span className="text-title font-bold tracking-heading text-black">
          CART (1)
        </span>
        <span className="cursor-pointer underline text-black/50">
          Remove all
        </span>
      </p>

      <div className="mb-6 flex items-center justify-between bg-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-surface">
          <Image
            src="/assets/cart/image-xx99-mark-two-headphones.jpg"
            alt="Product image"
            width={64}
            height={64}
            className="rounded-lg"
          />
        </div>
        <div className="ml-4 flex flex-col justify-center gap-3.5">
          <p className="flex flex-col justify-center">
            <span className="text-copy font-bold text-black">XX99 MK II</span>
            <span className="text-overline text-black/50">$ 2,999</span>
          </p>
        </div>

        <div className="flex w-24 items-center justify-between gap-3 bg-surface px-3 py-1.75 text-label">
          <button className="cursor-pointer font-bold text-black/50">-</button>
          <span className="font-bold text-black">1</span>
          <button className="cursor-pointer font-bold text-black/50">+</button>
        </div>
      </div>

      <div className="flex items-center justify-between pb-6 pt-8">
        <p className="text-copy font-medium text-black/50">TOTAL</p>
        <p className="text-title font-bold text-black">$ 2,999</p>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(closeCart());
          router.push("/checkout");
        }}
        className="inline-flex h-12 w-full items-center justify-center bg-brand text-label font-bold uppercase tracking-copy text-white transition-colors hover:bg-brand-hover"
      >
        CHECKOUT
      </button>
    </ModalBackdrop>
  );
};
export default Cart;
