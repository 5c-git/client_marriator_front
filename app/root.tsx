import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router";

// MUI
import { theme } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
// MUI
import "@mui/material-pigment-css/styles.css";
// import DefaultPropsProvider from "@mui/material/DefaultPropsProvider";

import { QueryClient } from "@tanstack/react-query";

import { changeLanguage } from "i18next";
import { supportedLngs } from "./entry.client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 3 minines
      staleTime: 180000,
    },
  },
});

export function HydrateFallback() {
  return <div></div>;
}

export async function clientLoader({ params }: LoaderFunctionArgs) {
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
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        {/* <DefaultPropsProvider
          value={{
            MuiButtonBase: {
              disableRipple: true,
            },
          }}
        >
          {children}
        </DefaultPropsProvider> */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
