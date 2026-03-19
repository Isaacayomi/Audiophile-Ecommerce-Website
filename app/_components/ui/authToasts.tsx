"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const AUTH_TOASTS: Record<string, string> = {
  sign_in_success: "Signed in successfully.",
  signed_out: "Signed out successfully.",
};

function AuthToastsContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lastAuthState = useRef<string | null>(null);

  useEffect(() => {
    const authState = searchParams.get("auth");

    if (!authState || lastAuthState.current === authState) {
      return;
    }

    const message = AUTH_TOASTS[authState];

    if (!message) {
      return;
    }

    lastAuthState.current = authState;
    toast.success(message);

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("auth");

    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}

export default function AuthToasts() {
  return (
    <Suspense fallback={null}>
      <AuthToastsContent />
    </Suspense>
  );
}
