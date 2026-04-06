"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

type SignOutConfirmDialogProps = {
  open: boolean;
  isSigningOut: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function SignOutConfirmDialog({
  open,
  isSigningOut,
  onClose,
  onConfirm,
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
            className="w-full max-w-md overflow-hidden rounded-[28px] border border-black/10 bg-white text-black shadow-[0_28px_80px_rgba(15,23,42,0.18)]"
            style={{ fontFamily: "Manrope, sans-serif" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sign-out-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#D87D4A] via-[#FBAF85] to-[#F97316]" />

            <div className="p-6 sm:p-7">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D87D4A]/10 text-[#D87D4A] ring-1 ring-[#D87D4A]/15">
                  <FiLogOut className="text-xl" />
                </div>

                <div className="mt-5 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D87D4A]">
                    Confirm sign out
                  </p>
                  <h2
                    id="sign-out-title"
                    className="text-2xl font-bold tracking-tight"
                  >
                    Sign out of Audiophile?
                  </h2>
                  <p className="text-sm leading-6 text-black/60">
                    You&apos;ll need to sign in again to return to the admin
                    dashboard.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSigningOut}
                  className="inline-flex min-w-24 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Stay signed in
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isSigningOut}
                  className="inline-flex min-w-24 cursor-pointer items-center justify-center rounded-xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
