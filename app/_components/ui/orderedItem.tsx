import { toggleCart } from "@/app/store/uiState/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ModalButton from "./modalButton";
import { closeCheckout } from "@/app/store/uiState/checkoutSlice";

const OrderedItem = () => {
  const dispatch = useDispatch();
  return (
    <>
      {/* Parent Container */}
      <div className="bg-[#F1F1F1] flex flex-col rounded-lg ">
        <div className="md:flex md:flex-row">
          <div className="md:w-1/2">
            <div className="flex items-center justify-between p-[35px] ">
              {/* Product Image */}
              <div>
                <Image
                  src="/assets/headphone-removed.png"
                  width={28}
                  height={32}
                  quality={100}
                  alt="Item Ordered"
                  className="h-[32px] w-[28px]"
                />
              </div>

              <div className="flex flex-col justify-center gap-2">
                {/* Product Name */}
                <p className="font-bold text-[15px] text-black">XX99 MK II</p>
                {/* Product Price */}
                <p className="font-bold text-[14px] text-[#00000082]">
                  $ 2,999
                </p>
              </div>
              {/* Product Quantity */}
              <p className="self-start text-[#00000082] font-bold text-[15px]">
                X1
              </p>
            </div>
            <p className="text-[rgba(0,0,0,0.45)] font-bold text-[12px] pt-[12px] border-t-2 border-[#d8d8d8] w-[215px] mx-auto text-center pb-[25px] tracking-[-0.21px] md:border-t-1">
              and two other item(s)
            </p>
          </div>

          {/* Grand Total */}
          <div className="md:w-1/2 bg-black py-[15px] px-[24px] rounded-b-lg flex flex-col justify-center">
            <p className="font-medium text-[15px] leading-[25px] pb-[8px] text-[rgba(255,255,255,0.5)]">
              GRAND TOTAL
            </p>
            <p className="font-bold text-white text-[18px]">$ 5,446</p>
          </div>
        </div>
      </div>
      <div className="mt-[23px] md:mt-[46px] w-full mx-auto md:cursor-pointer ">
        <ModalButton onClick={() => dispatch(closeCheckout())}>
          <Link href="/">BACK TO HOME</Link>
        </ModalButton>
      </div>
    </>
  );
};

export default OrderedItem;
