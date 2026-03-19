"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function HeaderAuth() {
  const { isSignedIn } = useUser();

  return (
    <>
      {!isSignedIn && <SignInButton />}
      {isSignedIn && <UserButton />}
    </>
  );
}
