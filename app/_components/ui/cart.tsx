"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../store/uiState/cartSlice";
import { useRouter } from "next/navigation";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="fixed top-24 md:top-16 md:mt-10 mr-3 inset-x-0 bottom-0 z-50 flex items-start justify-center md:items-start md:justify-end">
      <div className="relative max-w-81.75 w-full bg-white py-8 px-7 rounded-2xl">
        <button
          onClick={() => dispatch(toggleCart())}
          aria-label="Close cart"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black text-lg font-bold cursor-pointer hover:bg-gray-300 transition-colors z-10"
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

        <div className="mb-6 bg-white flex items-center justify-between">
          <div className="bg-[#F1F1F1] w-16 h-16 flex justify-center items-center rounded-lg">
            <Image
              src="/assets/cart/image-xx99-mark-two-headphones.jpg"
              alt="Product image"
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center gap-3.5 ml-4">
            <p className="flex flex-col justify-center">
              <span className="text-black font-bold text-[15px]">
                XX99 MK II
              </span>
              <span className="text-[#00000082] text-[14px]">$ 2,999</span>
            </p>
          </div>

          <div className="w-24 py-1.75 px-[11.5px] flex items-center justify-between gap-3 text-[13px] bg-[#F1F1F1]">
            <button className="cursor-pointer font-bold text-[#00000082]">
              -
            </button>
            <span className="font-bold  text-black">1</span>
            <button className="cursor-pointer font-bold text-[#00000082]">
              +
            </button>
          </div>
        </div>

        <div className="pb-6 flex items-center justify-between pt-8">
          <p className="text-[#00000082] font-medium text-[15px]">TOTAL</p>
          <p className="font-bold text-black text-[18px]">$ 2,999</p>
        </div>
        <button
          type="button"
          onClick={() => {
            dispatch(toggleCart());
            router.push("/checkout");
          }}
          className="inline-flex h-12 w-full items-center justify-center bg-[#D87D4A] text-[13px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#FBAF85]"
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};
export default Cart;
