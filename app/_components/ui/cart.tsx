"use client";

import Image from "next/image";
import ModalButton from "./modalButton";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../store/uiState/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  return (
    <div className="fixed top-[96px] md:top-[64px] md:mt-[40px] mr-3 inset-x-0 bottom-0 z-50 flex items-start justify-center md:items-start md:justify-end">
      <div className="relative max-w-[327px] w-full bg-white py-[32px] px-[28px] rounded-2xl">
        <button
          onClick={() => dispatch(toggleCart())}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black text-lg font-bold cursor-pointer hover:bg-gray-300 transition-colors"
        >
          ×
        </button>
        <p className="flex items-center justify-between pb-[31px] pt-3">
          <span className="font-bold text-[18px] tracking-[1.29px] text-black">
            CART (3)
          </span>
          <span className="cursor-pointer underline text-[#00000082]">
            Remove all
          </span>
        </p>

        <div className="mb-[24px] bg-white flex items-center justify-between">
          <div className="bg-[#F1F1F1] w-[64px] h-[64px] flex justify-center items-center rounded-lg">
            <Image
              src="/assets/headphone-removed.png"
              alt="Product image"
              width={36.19}
              height={40}
              quality={100}
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

          <div className="w-[96px] py-[7px] px-[11.5px] flex items-center justify-between gap-[12px] text-[13px] bg-[#F1F1F1]">
            <button className="cursor-pointer font-bold text-[#00000082]">
              -
            </button>
            <span className="font-bold  text-black">1</span>
            <button className="cursor-pointer font-bold text-[#00000082]">
              +
            </button>
          </div>
        </div>

        <div className="pb-[24px] flex items-center justify-between pt-[32px]">
          <p className="text-[#00000082] font-medium text-[15px]">TOTAL</p>
          <p className="font-bold text-black text-[18px]">$ 5,396</p>
        </div>
        <ModalButton>CHECKOUT</ModalButton>
      </div>
    </div>
  );
}
export default Cart;
