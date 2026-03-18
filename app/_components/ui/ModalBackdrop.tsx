"use client";

import { motion } from "framer-motion";
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
    <motion.div
      className={`fixed inset-0 z-50 flex overflow-y-auto bg-black/50 ${wrapperClassName ?? "items-center justify-center p-6"}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={panelClassName}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ModalBackdrop;
