"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SignInSsoCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-6">
      <AuthenticateWithRedirectCallback signInUrl="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
