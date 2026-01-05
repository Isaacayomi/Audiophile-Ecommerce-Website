"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
{
  /* <parameter name="filePath">c:\Users\okunl\Documents\audiophile-website\app\_components\Providers.tsx */
}
