// ModalButton is a reusable button used in both checkout and order-complete modals.
// It accepts children for text and onClick handler from parent component.
import { ModalButtonProps } from "@/app/type";

const ModalButton = ({ children, onClick }: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#D87D4A] w-full text-white font-bold py-3.75 px-14 text-[13px] tracking-[1px] hover:bg-[#FBAF85] transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
};

export default ModalButton;
