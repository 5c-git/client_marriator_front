import { vitePlugin as remix } from "@remix-run/dev";
// import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// PIGMENT MIGRATION v6.1.5 - DOES NOT WORK
// import { pigment } from "@pigment-css/vite-plugin";
// import { pigmentTheme } from "./app/theme/themePigment";

// /**
//  * @type {import('@pigment-css/vite-plugin').PigmentOptions}

// const pigmentConfig = {
//   transformLibraries: ["@mui/material"],
//   theme: pigmentTheme,
// };

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  ssr: {
    // Bundle `problematic-dependency` into the server build
    noExternal: ["ymap3-components", /^@mui\//],
    // noExternal: ["ymap3-components"],
  },
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
        v3_routeConfig: true,
      },
    }),
    // pigment(pigmentConfig),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@mui/x-date-pickers/AdapterDateFnsV3": path.resolve(
        __dirname,
        "node_modules/@mui/x-date-pickers/AdapterDateFnsV3/AdapterDateFnsV3.js"
      ),
    },
  },
});
