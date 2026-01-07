import { ReactNode } from "react";

interface ModalButtonProps {
  children: ReactNode;
}

function ModalButton({ children }: ModalButtonProps) {
  return (
    <button className="w-full bg-[#D87D4A] max-w-[271px] w-full mx-auto text-white font-bold py-[15px] px-[56px] text-[13px] tracking-[1px] hover:bg-[#FBAF85] transition-colors cursor-pointer">
      {children}
    </button>
  );
}

export default ModalButton;
