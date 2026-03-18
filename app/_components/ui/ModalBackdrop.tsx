"use client";

import { ReactNode } from "react";

interface ModalBackdropProps {
  children: ReactNode;
  onClose: () => void;
  wrapperClassName?: string;
  panelClassName?: string;
}

const ModalBackdrop = ({
  children,
  onClose,
  wrapperClassName,
  panelClassName,
}: ModalBackdropProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex overflow-y-auto bg-black/50 ${wrapperClassName ?? "items-center justify-center p-6"}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className={panelClassName} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalBackdrop;
