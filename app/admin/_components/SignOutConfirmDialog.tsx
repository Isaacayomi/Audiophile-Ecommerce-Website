"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

type SignOutConfirmDialogProps = {
  open: boolean;
  isSigningOut: boolean;
  onClose: () => void;
  onConfirm: () => void;
  avatarText: string;
};

export function SignOutConfirmDialog({
  open,
  isSigningOut,
  onClose,
  onConfirm,
  avatarText,
}: SignOutConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSigningOut) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSigningOut, onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          onClick={!isSigningOut ? onClose : undefined}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm rounded-3xl border border-black/10 bg-white p-6 text-black shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
            style={{ fontFamily: "Manrope, sans-serif" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sign-out-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[11px] font-bold text-black">
                  {avatarText}
                </div>
                <FiLogOut className="text-sm text-black/45" />
              </div>

              <div className="mt-4 space-y-2">
                <h2 id="sign-out-title" className="text-xl font-bold">
                  Sign out?
                </h2>
                <p className="text-sm leading-6 text-black/60">
                  Are you sure you want to sign out?
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                disabled={isSigningOut}
                className="inline-flex min-w-24 items-center justify-center rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-black/70 transition hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                No
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isSigningOut}
                className="inline-flex min-w-24 items-center justify-center rounded-xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "Signing out..." : "Yes"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
