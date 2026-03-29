"use client";

import { useMemo } from "react";
import { useUser } from "@clerk/nextjs";

const buildDisplayName = (value: string | null | undefined) =>
  value?.trim() || "Store Admin";

export function useAdminIdentity() {
  const { user, isLoaded } = useUser();

  const displayName = useMemo(
    () =>
      buildDisplayName(
        user?.fullName ||
          user?.firstName ||
          user?.username ||
          user?.primaryEmailAddress?.emailAddress,
      ),
    [user],
  );

  const initials = useMemo(() => {
    const parts = displayName.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "A";
    const second = parts[1]?.[0] ?? parts[0]?.[1] ?? "D";
    return `${first}${second}`.toUpperCase();
  }, [displayName]);

  return {
    displayName,
    initials,
    isLoaded,
  };
}
