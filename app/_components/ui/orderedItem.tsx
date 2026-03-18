// OrderedItem: order detail card shown in checkout and order completion modals.
// Includes product row, grand total, and home navigation action.
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ModalButton from "./modalButton";
import { closeOrderCompletion } from "@/app/store/uiState/orderCompletionSlice";

const OrderedItem = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col rounded-lg bg-surface">
        <div className="md:flex md:flex-row">
          <div className="md:w-1/2">
            <div className="flex items-center justify-between p-8.75">
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
                <p className="text-copy font-bold text-black">XX99 MK II</p>
                <p className="text-overline font-bold text-black/50">$ 2,999</p>
              </div>
              <p className="self-start text-copy font-bold text-black/50">X1</p>
            </div>
            <p className="mx-auto w-53.75 border-t-2 border-line-strong pb-6 pt-3 text-center text-xs font-bold tracking-tight text-black/50 md:border-t">
              and two other item(s)
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-b-lg bg-black px-6 py-3.75 md:w-1/2">
            <p className="pb-2 text-copy leading-6.25 font-medium text-white/50">
              GRAND TOTAL
            </p>
            <p className="text-title font-bold text-white">$ 5,446</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5.75 w-full md:mt-11.5 md:cursor-pointer">
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
