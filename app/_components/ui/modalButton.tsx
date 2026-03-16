import { ModalButtonProps } from "@/app/type";

const ModalButton = ({ children }: ModalButtonProps) => {
  return (
    <button className="bg-[#D87D4A] max-w-67.75 w-full mx-auto text-white font-bold py-3.75 px-14 text-[13px] tracking-[1px] hover:bg-[#FBAF85] transition-colors cursor-pointer">
      {children}
    </button>
  );
};

export default ModalButton;
