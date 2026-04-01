import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router";

// import { UAParser } from "ua-parser-js";


// MUI
import { theme } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";


import { changeLanguage } from "i18next";
import { supportedLngs } from "./entry.client";

import { Welcome } from "./shared/ui/Welcome/Welcome";

export function HydrateFallback() {
  return <Welcome />;
}

export async function clientLoader({

  params,
}: LoaderFunctionArgs) {
  const locale = params.lang ?? "ru";


  if (!supportedLngs.includes(locale)) {
    throw new Response(null, {
      status: 404,
      statusText: `Not Found: Invalid language ${locale}`,
    });
  }

  changeLanguage(locale);

  return locale;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLoaderData<typeof clientLoader>();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <script
          src={`https://api-maps.yandex.ru/v3/?apikey=${
            import.meta.env.VITE_YANDEX_GEO_KEY
          }&lang=ru_RU`}
        ></script>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
