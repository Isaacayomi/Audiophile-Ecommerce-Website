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
      className={`${width} ${paddingX} ${classname} cursor-pointer bg-brand py-3.75 text-label font-bold tracking-copy text-white transition-colors hover:bg-brand-hover`}
    >
      {children}
    </button>
  );
};

export default ModalButton;
