import Image from "next/image";
import OrderedItem from "./orderedItem";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { closeOrderCompletion } from "../../store/uiState/orderCompletionSlice";

const OrderCompletionModal = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeOrderCompletion());
  };

  return (
    <div className="fixed top-16  mr-3 inset-x-0 bottom-0 z-50 flex items-center justify-center ">
      <div className="relative max-w-81.75 w-full bg-white py-8 px-7 rounded-2xl md:max-w-[540px] w-full mx-auto">
        <Image
          src="/assets/check-icon.png"
          width={64}
          height={64}
          alt="Checkout icon"
          className="pb-5.75 md:pb-[33px]"
        />
        <FaTimes
          size={16}
          onClick={handleClose}
          className="absolute my-8 cursor-pointer text-[#00000082] hover:text-black transition-colors"
        />
        <p className="pb-4 max-w-65.75 w-full font-bold text-[24px] leading-7 tracking-[0.86px] text-black md:text-[32px] md:tracking-[1.14px] md:leading-[36px] ">
          THANK YOU FOR YOUR ORDER
        </p>
        <p className="font-medium text-[15px] text-[#00000082] pb-6 md:pb-[33px] leading-[25px]">
          You will receive an email confirmation shortly.
        </p>

        <OrderedItem />
      </div>
    </div>
  );
};

export default OrderCompletionModal;
