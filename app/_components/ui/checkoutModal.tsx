// CheckoutModal component: displayed after CART -> CHECKOUT.

import { useDispatch } from "react-redux";
import ModalButton from "./modalButton";
import { toggleCheckout } from "@/app/store/uiState/checkoutSlice";
import { toggleOrderCompletion } from "@/app/store/uiState/orderCompletionSlice";

const CheckoutModal = () => {
  const dispatch = useDispatch();

  // Close checkout modal and open order completion modal.
  const handleContinueAndPay = () => {
    dispatch(toggleCheckout());
    dispatch(toggleOrderCompletion());
  };

  return (
    <div>
      <ModalButton onClick={handleContinueAndPay}>CONTINUE & PAY</ModalButton>
    </div>
  );
};

export default CheckoutModal;
