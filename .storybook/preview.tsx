import type { Preview } from "@storybook/react";

import { withThemeProvider } from "storybook-addon-theme-provider";
import { initialize, mswLoader } from "msw-storybook-addon";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { ReactNode } from "react";

import { theme } from "../app/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 100,
    },
  },
});

initialize({
  serviceWorker: {
    url: "/client_marriator_front/mockServiceWorker.js",
  },
  onUnhandledRequest: "bypass",
  findWorker(scriptUrl, mockServiceWorkerUrl) {
    return scriptUrl.includes("mockServiceWorker");
  },
});

export const Provider = ({ children }: { children?: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withThemeProvider(Provider)],
  loaders: [mswLoader],
};

export default preview;
