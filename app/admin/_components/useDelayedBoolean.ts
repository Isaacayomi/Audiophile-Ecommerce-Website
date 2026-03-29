"use client";

import { useEffect, useState } from "react";

export function useDelayedBoolean(value: boolean, delayMs = 1000) {
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    if (!value) {
      setIsDelayed(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsDelayed(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return isDelayed;
}
