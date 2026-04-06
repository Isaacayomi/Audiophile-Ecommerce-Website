"use client";

import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";

type GoogleAuthPanelProps = {
  title: string;
  description: string;
  buttonLabel: string;
  isReady: boolean;
  isSubmitting: boolean;
  onContinue: () => void | Promise<void>;
};

export function GoogleAuthPanel({
  title,
  description,
  buttonLabel,
  isReady,
  isSubmitting,
  onContinue,
}: GoogleAuthPanelProps) {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-neutral-100 px-6 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-black/10 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
        <div className="space-y-2 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-black/40">
            Audiophile
          </p>
          <h1 className="text-2xl font-bold text-black">{title}</h1>
          <p className="text-sm leading-6 text-black/60">{description}</p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          disabled={!isReady || isSubmitting}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-black/10 px-4 py-3.5 text-sm font-semibold text-black transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <FiLoader className="animate-spin text-base text-black/60" />
          ) : (
            <FcGoogle className="text-2xl" />
          )}
          <span>{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
}
