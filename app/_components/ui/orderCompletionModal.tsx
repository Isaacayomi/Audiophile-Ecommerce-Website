// OrderCompletionModal: final success overlay after payment completion.
// Shows order summary and allows user to close confirmation.
import Image from "next/image";
import OrderedItem from "./orderedItem";
import { useDispatch } from "react-redux";
import { closeOrderCompletion } from "../../store/uiState/orderCompletionSlice";
import ModalBackdrop from "./ModalBackdrop";

const OrderCompletionModal = () => {
  const dispatch = useDispatch();

  // Close order completion modal and return to main app view.
  const handleClose = () => {
    dispatch(closeOrderCompletion());
  };

  return (
    <ModalBackdrop
      onClose={handleClose}
      wrapperClassName="items-center justify-center p-6"
      panelClassName="relative mx-auto w-full max-w-[540px] rounded-lg bg-white px-7 py-8 shadow-[0_24px_48px_rgba(0,0,0,0.28)] md:px-12 md:py-12"
    >
      <Image
        src="/assets/check-icon.png"
        width={64}
        height={64}
        alt="Checkout icon"
        className="pb-5.75 md:pb-8.25"
      />

      <p className="max-w-65.75 w-full pb-4 text-[24px] font-bold leading-7 tracking-[0.86px] text-black md:text-[32px] md:leading-9 md:tracking-[1.14px]">
        THANK YOU FOR YOUR ORDER
      </p>
      <p className="pb-6 text-[15px] leading-6.25 font-medium text-[#00000082] md:pb-8.25">
        You will receive an email confirmation shortly.
      </p>

      <OrderedItem />
    </ModalBackdrop>
  );
};

export default OrderCompletionModal;
