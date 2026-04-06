"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
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

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const { fetchStatus, signUp } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectUrlComplete = useMemo(
    () =>
      normalizeRedirectTarget(
        searchParams.get("redirect_url"),
        "/checkout?auth=sign_in_success",
      ),
    [searchParams],
  );

  const handleContinue = async () => {
    if (fetchStatus !== "idle" || !signUp || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp.sso({
        strategy: "oauth_google",
        redirectUrl: redirectUrlComplete,
        redirectCallbackUrl: CALLBACK_URL,
      });
    } catch {
      setIsSubmitting(false);
      toast.error("Google sign-up is unavailable right now.");
    }
  };

  return (
    <GoogleAuthPanel
      title="Create account"
      description="Use Google to set up your Audiophile account."
      buttonLabel="Continue with Google"
      isReady={fetchStatus === "idle" && Boolean(signUp)}
      isSubmitting={isSubmitting}
      onContinue={handleContinue}
    />
  );
}
