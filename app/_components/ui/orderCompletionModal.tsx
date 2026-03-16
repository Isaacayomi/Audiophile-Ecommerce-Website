// OrderCompletionModal: final success overlay after payment completion.
// Shows order summary and allows user to close confirmation.
import Image from "next/image";
import OrderedItem from "./orderedItem";
import { useDispatch } from "react-redux";
import { closeOrderCompletion } from "../../store/uiState/orderCompletionSlice";

const OrderCompletionModal = () => {
  const dispatch = useDispatch();

  // Close order completion modal and return to main app view.
  const handleClose = () => {
    dispatch(closeOrderCompletion());
  };

  return (
    <div className="fixed top-16  mr-3 inset-x-0 bottom-0 z-50 flex items-center justify-center ">
      <div className="relative max-w-81.75 bg-white py-8 px-7 rounded-2xl md:max-w-135 w-full mx-auto">
        <Image
          src="/assets/check-icon.png"
          width={64}
          height={64}
          alt="Checkout icon"
          className="pb-5.75 md:pb-8.25"
        />

        <p className="pb-4 max-w-65.75 w-full font-bold text-[24px] leading-7 tracking-[0.86px] text-black md:text-[32px] md:tracking-[1.14px] md:leading-9 ">
          THANK YOU FOR YOUR ORDER
        </p>
        <p className="font-medium text-[15px] text-[#00000082] pb-6 md:pb-8.25 leading-6.25">
          You will receive an email confirmation shortly.
        </p>

        <OrderedItem />
      </div>
    </div>
  );
};

export default OrderCompletionModal;
