"use client";
import { useUser, UserButton } from "@clerk/nextjs";

export default function HeaderAuth() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "h-8 w-8 ring-1 ring-white/20",
        },
      }}
    />
  );
}
