// ModalButton is a reusable button used in both checkout and order-complete modals.
// It accepts children for text, onClick handler, optional width, and custom classname.
import { ModalButtonProps } from "@/app/type";

const ModalButton = ({
  children,
  onClick,
  classname,
  width = "w-full",
  paddingX = "px-14",
}: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${width} ${paddingX} ${classname} bg-[#D87D4A] text-white font-bold py-3.75 text-[13px] tracking-[1px] hover:bg-[#FBAF85] transition-colors cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default ModalButton;
