"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs/legacy";
import { FcGoogle } from "react-icons/fc";

type ClerkErrorLike = {
  errors?: Array<{ longMessage?: string; message?: string }>;
  message?: string;
};

const getErrorMessage = (error: unknown) => {
  const clerkError = error as ClerkErrorLike | null;

  const message =
    clerkError?.errors?.[0]?.longMessage ??
    clerkError?.errors?.[0]?.message ??
    clerkError?.message;

  if (message) return message;

  if (error instanceof Error) return error.message;

  return "Something went wrong. Please try again.";
};

export default function AuthScreen() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") ?? "/";

  const signInState = useSignIn();
  const signIn = signInState.isLoaded ? signInState.signIn : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startGoogleAuth = async () => {
    if (!signIn) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: redirectUrl,
      });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-[#F5F5F5] px-4 py-10 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-md items-center">
        <section className="w-full rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-7 md:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D87D4A]">
            Welcome back
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Sign in with Google
          </h2>
          <p className="mt-3 text-sm leading-6 text-black/55">
            Use your Google account to continue into Audiophile.
          </p>

          {errorMessage ? (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="button"
            onClick={startGoogleAuth}
            disabled={!signInState.isLoaded || isSubmitting}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#D87D4A] px-4 text-sm font-bold text-white transition-colors hover:bg-[#FBAF85] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            {isSubmitting ? "Redirecting..." : "Continue with Google"}
          </button>

          <p className="mt-5 text-center text-xs leading-5 text-black/45">
            By continuing, you agree to use Clerk for authentication.
          </p>
        </section>
      </div>
    </div>
  );
}
