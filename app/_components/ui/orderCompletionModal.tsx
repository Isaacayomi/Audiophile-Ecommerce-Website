// OrderCompletionModal: final success overlay after payment completion.
// Shows order summary and allows user to close confirmation.
import Image from "next/image";
import OrderedItem from "./orderedItem";
import { useDispatch } from "react-redux";
import { closeOrderCompletion } from "../../store/uiState/orderCompletionSlice";
import ModalBackdrop from "./ModalBackdrop";
import { RhythmGroup, RhythmItem } from "./Rhythm";

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
      panelClassName="relative mx-auto w-full max-w-135 rounded-lg bg-white px-7 py-8 shadow-modal md:px-12 md:py-12"
    >
      <RhythmGroup inView={false}>
        <RhythmItem variant="pop">
          <Image
            src="/assets/check-icon.png"
            width={64}
            height={64}
            alt="Checkout icon"
            className="pb-5.75 md:pb-8.25"
          />
        </RhythmItem>

        <RhythmItem>
          <p className="max-w-65.75 w-full pb-4 text-heading-sm font-bold leading-7 tracking-heading text-black md:text-4xl md:leading-9 md:tracking-title">
            THANK YOU FOR YOUR ORDER
          </p>
        </RhythmItem>
        <RhythmItem variant="soft">
          <p className="pb-6 text-copy leading-6.25 font-medium text-black/50 md:pb-8.25">
            You will receive an email confirmation shortly.
          </p>
        </RhythmItem>

        <RhythmItem variant="pop">
          <OrderedItem />
        </RhythmItem>
      </RhythmGroup>
    </ModalBackdrop>
  );
};

export default OrderCompletionModal;
