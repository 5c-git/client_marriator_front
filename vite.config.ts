import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";
import hawkVitePlugin from "@hawk.so/vite-plugin";

// import { pigment } from "@pigment-css/vite-plugin";
// import { pigmentTheme } from "./app/theme/themePigment";

// /**
//  * @type {import('@pigment-css/vite-plugin').PigmentOptions}
//  */
// const pigmentConfig = {
//   transformLibraries: ["@mui/material"],
//   theme: pigmentTheme,
// };

export default defineConfig({
  // ssr: {
  //   // Bundle `problematic-dependency` into the server build
  //   // noExternal: [/^@mui\//, /^@pigment-css\//, /^@emotion\//],
  //   noExternal: [/^@mui\//],
  // },

  plugins: [
    reactRouter(),
    tsconfigPaths(),
    // pigment(pigmentConfig),

    // hawkVitePlugin({
    //   token:
    //     "eyJpbnRlZ3JhdGlvbklkIjoiZTFhZWNhMzgtOGNiOC00YzQzLThmODctNzc2MzY5NGYwMzY4Iiwic2VjcmV0IjoiMDEwMDdjYjEtNzRhNC00MDcxLTg3YzktNGMzMjU5YWJhMDM2In0=",
    // }),
  ],

  ssr: {
    // Workaround for resolving dependencies in the server bundle
    // Without this, the React context will be different between direct import and transitive imports in development environment
    // For more information, see https://github.com/mui/material-ui/issues/45878#issuecomment-2987441663
    optimizeDeps: {
      include: ["@emotion/*", "@mui/*"],
    },
    noExternal: ["@emotion/*", "@mui/*"],
  },

  // build: {
  //   sourcemap: true,
  // },
});
