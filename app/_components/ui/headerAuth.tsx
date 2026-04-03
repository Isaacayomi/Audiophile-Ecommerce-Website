"use client";

import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import ModalBackdrop from "./ModalBackdrop";

export default function HeaderAuth() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!isSignedIn) {
    return null;
  }

  const avatarUrl =
    user?.imageUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.fullName || user?.firstName || "User",
    )}&background=D87D4A&color=fff`;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut({ redirectUrl: "/?auth=signed_out" });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 transition-transform hover:scale-105 hover:border-white/25 cursor-pointer"
        aria-label="Open sign out confirmation"
      >
        <img
          src={avatarUrl}
          alt={user?.fullName ? `${user.fullName} avatar` : "User avatar"}
          className="h-full w-full object-cover cursor-pointer"
        />
      </button>

      {isOpen ? (
        <ModalBackdrop
          onClose={() => {
            if (!isSigningOut) setIsOpen(false);
          }}
          wrapperClassName="items-center justify-center px-4 py-6"
          panelClassName="w-full max-w-sm rounded-[1.5rem] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.2)]"
        >
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#D87D4A]">
                Session
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-black">
                Log out?
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/55">
                Do you want to sign out of your account now?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isSigningOut}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-black transition-colors hover:border-black/20 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#D87D4A] px-4 text-sm font-bold text-white transition-colors hover:bg-[#FBAF85] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isSigningOut ? "Signing out..." : "Yes"}
              </button>
            </div>
          </div>
        </ModalBackdrop>
      ) : null}
    </>
  );
}
