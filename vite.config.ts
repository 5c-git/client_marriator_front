import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";
import hawkVitePlugin from "@hawk.so/vite-plugin";

export default defineConfig({
  ssr: {
    // Bundle `problematic-dependency` into the server build
    noExternal: [/^@mui\//],
  },

  plugins: [
    reactRouter(),
    tsconfigPaths(),
    hawkVitePlugin({
      token:
        "eyJpbnRlZ3JhdGlvbklkIjoiZTFhZWNhMzgtOGNiOC00YzQzLThmODctNzc2MzY5NGYwMzY4Iiwic2VjcmV0IjoiMDEwMDdjYjEtNzRhNC00MDcxLTg3YzktNGMzMjU5YWJhMDM2In0=",
    }),
  ],

  resolve: {
    alias: {
      "@mui/x-date-pickers/AdapterDateFnsV3": path.resolve(
        __dirname,
        "node_modules/@mui/x-date-pickers/AdapterDateFnsV3/AdapterDateFnsV3.js"
      ),
    },
  },

  build: {
    sourcemap: true,
  },
});
