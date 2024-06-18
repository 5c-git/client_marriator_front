import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/:lang?", "routes/_index/route.tsx", { index: true });
          route(
            "/:lang?/registration/step1",
            "routes/registration/step1/route.tsx"
          );
          route(
            "/:lang?/registration/step2",
            "routes/registration/step2/route.tsx"
          );
        });
      },
    }),
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
