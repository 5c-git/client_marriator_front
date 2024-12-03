import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

// PIGMENT MIGRATION v6.1.5 - DOES NOT WORK
// import { pigment } from "@pigment-css/vite-plugin";
// import { pigmentTheme } from "./app/theme/themePigment";

// /**
//  * @type {import('@pigment-css/vite-plugin').PigmentOptions}

// const pigmentConfig = {
//   transformLibraries: ["@mui/material"],
//   theme: pigmentTheme,
// };

export default defineConfig({
  ssr: {
    // Bundle `problematic-dependency` into the server build
    noExternal: ["ymap3-components", /^@mui\//],
    // noExternal: ["ymap3-components"],
  },
  plugins: [
    reactRouter(),
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
