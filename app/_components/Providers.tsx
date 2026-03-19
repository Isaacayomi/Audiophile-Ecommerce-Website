"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../store/store";
import { RhythmProvider } from "./ui/Rhythm";
import AuthToasts from "./ui/authToasts";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <RhythmProvider>
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
  );
}
