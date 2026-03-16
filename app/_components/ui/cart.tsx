"use client";

// Cart component displays current cart items and the checkout action.
// Clicking the cart close button hides cart overlay via Redux toggle.
import Image from "next/image";
import ModalButton from "./modalButton";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../store/uiState/cartSlice";
import { toggleCheckout } from "../../store/uiState/checkoutSlice";

const Cart = () => {
  const dispatch = useDispatch();
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
        {/* Close button toggles cart overlay state to hidden */}
        <p className="flex items-center justify-between pb-7.75 pt-3">
          <span className="font-bold text-[18px] tracking-[1.29px] text-black">
            CART (3)
          </span>
          <span className="cursor-pointer underline text-[#00000082]">
            Remove all
          </span>
        </p>

        <div className="mb-6 bg-white flex items-center justify-between">
          <div className="bg-[#F1F1F1] w-16 h-16 flex justify-center items-center rounded-lg">
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
          <p className="font-bold text-black text-[18px]">$ 5,396</p>
        </div>
        {/* Checkout button closes cart, opens checkout modal */}
        <ModalButton
          onClick={() => {
            dispatch(toggleCheckout());
            dispatch(toggleCart());
          }}
        >
          CHECKOUT
        </ModalButton>
      </div>
    </div>
  );
};
export default Cart;
