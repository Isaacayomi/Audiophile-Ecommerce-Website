"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClerk, useUser } from "@clerk/nextjs";
import { FiChevronDown, FiLogOut } from "react-icons/fi";

const buildInitials = (name: string | null | undefined) => {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const first = parts[0]?.[0] ?? "U";
  const second = parts[1]?.[0] ?? parts[0]?.[1] ?? "A";
  return `${first}${second}`.toUpperCase();
};

export default function HeaderAuth() {
  const clerk = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      setIsDialogOpen(false);
      setIsSigningOut(false);
    }
  }, [isSignedIn]);

  const displayName = useMemo(
    () =>
      user?.fullName ||
      user?.firstName ||
      user?.username ||
      user?.primaryEmailAddress?.emailAddress ||
      "Account",
    [user],
  );

  const initials = useMemo(() => buildInitials(displayName), [displayName]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    if (isSigningOut) return;
    setIsDialogOpen(false);
  };

  const confirmSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await clerk.signOut({ redirectUrl: "/?auth=signed_out" });
    } catch {
      setIsSigningOut(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="group flex items-center gap-2 rounded-2xl pl-1 text-left"
        aria-haspopup="dialog"
        aria-expanded={isDialogOpen}
        aria-label="Open sign out confirmation"
        title="Sign out"
      >
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 text-[11px] font-bold text-white">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <FiChevronDown className="text-white/35 transition-colors group-hover:text-white" />
      </button>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
            onClick={!isSigningOut ? closeDialog : undefined}
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
              aria-labelledby="header-sign-out-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black/5 text-[11px] font-bold text-black">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <FiLogOut className="text-sm text-black/45" />
                </div>

                <div className="mt-4 space-y-2">
                  <h2 id="header-sign-out-title" className="text-xl font-bold">
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
                  onClick={closeDialog}
                  disabled={isSigningOut}
                  className="inline-flex min-w-24 items-center justify-center rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-black/70 transition hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={confirmSignOut}
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
    </>
  );
}
