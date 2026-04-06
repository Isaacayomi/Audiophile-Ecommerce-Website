"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../store/store";
import { RhythmProvider } from "./ui/Rhythm";
import AuthToasts from "./ui/authToasts";
import {
  CART_STORAGE_KEY,
  hydrateCartValue,
} from "../store/uiState/cartValueslice";
import type { cartValueState } from "../type";

function CartPersistence() {
  useEffect(() => {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (rawCart) {
      try {
        const parsed = JSON.parse(rawCart) as unknown;

        if (
          parsed &&
          typeof parsed === "object" &&
          "items" in parsed &&
          "value" in parsed &&
          "selectedValue" in parsed
        ) {
          store.dispatch(hydrateCartValue(parsed as cartValueState));
        }
      } catch {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      }
    }

    let previous = "";

    const syncCart = () => {
      const cartValue = store.getState().cartValue;
      const next = JSON.stringify(cartValue);

      if (next === previous) {
        return;
      }

      previous = next;
      window.localStorage.setItem(CART_STORAGE_KEY, next);
    };

    syncCart();

    const unsubscribe = store.subscribe(syncCart);

    return unsubscribe;
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 60_000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RhythmProvider>
          <CartPersistence />
          <AuthToasts />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "0.75rem",
                background: "#101010",
                color: "#fafafa",
              },
            }}
          />
          {children}
        </RhythmProvider>
      </Provider>
    </QueryClientProvider>
  );
}
