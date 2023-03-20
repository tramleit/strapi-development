import LocalizationProvider from "@/components/LocalizationProvider/LocalizationProvider";
import type { AppContext, AppProps as OldAppProps } from "next/app";
import "@/styles/globals.css";

type AppProps = Pick<OldAppProps, "Component" | "pageProps"> & {
  translations: Localizations;
};

export default function App({ Component, pageProps, translations }: AppProps) {
  return (
    <LocalizationProvider
      translations={translations}
      options={{
        fallbackLocales: ["it", "en"],
        nonExplicitSupportedLocales: true,
      }}
    >
      <Component {...pageProps} />
    </LocalizationProvider>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  const translations = await (
    await fetch("http://localhost:1337/localization", {
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5MDA4OTUyLCJleHAiOjE2ODE2MDA5NTJ9.Zc-0Hz_YrjL4ef0yxPByoVQHTt49q2wKmJMU2Xr1cL4",
      }),
      next: {
        revalidate: 60,
      },
    })
  ).json();

  return {
    translations,
  };
};
