"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { GoogleAuthPanel } from "../../_components/auth/GoogleAuthPanel";

const CALLBACK_URL = "/sign-in/sso-callback";

const normalizeRedirectTarget = (value: string | null, fallback: string) => {
  if (!value) return fallback;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return value.startsWith("/") ? value : `/${value}`;
};

export default function SignInPage() {
  const searchParams = useSearchParams();
  const { fetchStatus, signIn } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectUrlComplete = useMemo(
    () =>
      normalizeRedirectTarget(
        searchParams.get("redirect_url"),
        "/?auth=sign_in_success",
      ),
    [searchParams],
  );

  const handleContinue = async () => {
    if (fetchStatus !== "idle" || !signIn || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn.sso({
        strategy: "oauth_google",
        redirectUrl: redirectUrlComplete,
        redirectCallbackUrl: CALLBACK_URL,
      });
    } catch {
      setIsSubmitting(false);
      toast.error("Google sign-in is unavailable right now.");
    }
  };

  return (
    <GoogleAuthPanel
      title="Sign in"
      description="Use your Google account to continue."
      buttonLabel="Continue with Google"
      isReady={fetchStatus === "idle" && Boolean(signIn)}
      isSubmitting={isSubmitting}
      onContinue={handleContinue}
    />
  );
}
