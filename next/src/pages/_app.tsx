import type { AppProps as AppProps } from "next/app";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import NextI18nextConfig from "../../next-i18next.config";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App, NextI18nextConfig);
