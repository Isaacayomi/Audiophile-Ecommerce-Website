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
      wrapperClassName="items-start justify-center px-6 pt-28 md:justify-end md:px-10 md:pt-28 lg:px-[165px] lg:pt-[128px]"
      panelClassName="relative w-full max-w-[377px] rounded-lg bg-white px-7 py-8 shadow-[0_18px_38px_rgba(0,0,0,0.24)]"
    >
      <button
        onClick={() => dispatch(closeCart())}
        aria-label="Close cart"
        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-black transition-colors hover:bg-gray-300"
      >
        <span className="leading-none">&times;</span>
      </button>
      <p className="flex items-center justify-between pb-7.75 pt-3">
        <span className="font-bold text-[18px] tracking-[1.29px] text-black">
          CART (1)
        </span>
        <span className="cursor-pointer underline text-[#00000082]">
          Remove all
        </span>
      </p>

      <div className="mb-6 flex items-center justify-between bg-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#F1F1F1]">
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
            <span className="text-[15px] font-bold text-black">XX99 MK II</span>
            <span className="text-[14px] text-[#00000082]">$ 2,999</span>
          </p>
        </div>

        <div className="flex w-24 items-center justify-between gap-3 bg-[#F1F1F1] px-[11.5px] py-1.75 text-[13px]">
          <button className="cursor-pointer font-bold text-[#00000082]">-</button>
          <span className="font-bold text-black">1</span>
          <button className="cursor-pointer font-bold text-[#00000082]">+</button>
        </div>
      </div>

      <div className="flex items-center justify-between pb-6 pt-8">
        <p className="text-[15px] font-medium text-[#00000082]">TOTAL</p>
        <p className="text-[18px] font-bold text-black">$ 2,999</p>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(closeCart());
          router.push("/checkout");
        }}
        className="inline-flex h-12 w-full items-center justify-center bg-[#D87D4A] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
      >
        CHECKOUT
      </button>
    </ModalBackdrop>
  );
};
export default Cart;
