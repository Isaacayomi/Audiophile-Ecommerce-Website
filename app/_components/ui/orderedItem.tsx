// OrderedItem: order detail card shown in checkout and order completion modals.
// Includes product row, grand total, and home navigation action.
import { toggleCart } from "@/app/store/uiState/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ModalButton from "./modalButton";
import { closeOrderCompletion } from "@/app/store/uiState/orderCompletionSlice";

const OrderedItem = () => {
  const dispatch = useDispatch();
  return (
    <>
      {/* Parent Container */}
      <div className="bg-[#F1F1F1] flex flex-col rounded-lg ">
        <div className="md:flex md:flex-row">
          <div className="md:w-1/2">
            <div className="flex items-center justify-between p-8.75 ">
              {/* Product Image */}
              <div>
                <Image
                  src="/assets/cart/image-xx99-mark-two-headphones.jpg"
                  width={28}
                  height={32}
                  alt="Item Ordered"
                  className="h-8 w-7"
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
            <p className="text-[rgba(0,0,0,0.45)] font-bold text-[12px] pt-3 border-t-2 border-[#d8d8d8] w-53.75 mx-auto text-center pb-6 tracking-[-0.21px] md:border-t">
              and two other item(s)
            </p>
          </div>

          {/* Grand Total */}
          <div className="md:w-1/2 bg-black py-3.75 px-6 rounded-b-lg flex flex-col justify-center">
            <p className="font-medium text-[15px] leading-6.25 pb-2 text-[rgba(255,255,255,0.5)]">
              GRAND TOTAL
            </p>
            <p className="font-bold text-white text-[18px]">$ 5,446</p>
          </div>
        </div>
      </div>
      <div className="mt-5.75 md:mt-11.5 w-full mx-auto md:cursor-pointer ">
        {/* Close checkout modal before navigating to Home */}
        <ModalButton
          onClick={() => {
            dispatch(closeOrderCompletion());
          }}
        >
          <Link href="/">BACK TO HOME</Link>
        </ModalButton>
      </div>
    </>
  );
};

export default OrderedItem;
