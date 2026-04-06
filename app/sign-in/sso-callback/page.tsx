"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { FiLoader } from "react-icons/fi";

export default function SignInCallbackPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center justify-center px-6 py-16">
      <div className="w-full rounded-3xl border border-black/5 bg-white px-8 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand">
          Completing sign-in
        </p>
        <div className="mt-6 flex items-center justify-center">
          <FiLoader className="animate-spin text-2xl text-brand" />
        </div>
        <p className="mt-4 text-sm leading-6 text-black/60">
          Finishing your Google authentication...
        </p>
        <div className="sr-only">
          <AuthenticateWithRedirectCallback
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            signInFallbackRedirectUrl="/?auth=sign_in_success"
            signUpFallbackRedirectUrl="/checkout?auth=sign_in_success"
          />
        </div>
      </div>
    </div>
  );
}
