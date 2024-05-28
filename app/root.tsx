import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

// MUI
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// MUI

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <p>pizes!</p>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
