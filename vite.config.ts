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
  ssr: {
    // Bundle `problematic-dependency` into the server build
    // noExternal: [/^@mui\//, /^@pigment-css\//, /^@emotion\//],
    noExternal: [/^@mui\//],
  },

  plugins: [
    reactRouter(),
    tsconfigPaths(),
    // pigment(pigmentConfig),

    // hawkVitePlugin({
    //   token:
    //     "eyJpbnRlZ3JhdGlvbklkIjoiZTFhZWNhMzgtOGNiOC00YzQzLThmODctNzc2MzY5NGYwMzY4Iiwic2VjcmV0IjoiMDEwMDdjYjEtNzRhNC00MDcxLTg3YzktNGMzMjU5YWJhMDM2In0=",
    // }),
  ],

  // build: {
  //   sourcemap: true,
  // },
});
