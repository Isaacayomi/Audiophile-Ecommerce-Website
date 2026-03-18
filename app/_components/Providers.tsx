"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { RhythmProvider } from "./ui/Rhythm";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <RhythmProvider>{children}</RhythmProvider>
    </Provider>
  );
}
