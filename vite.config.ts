import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/_index/route.tsx", { index: true });
          route("registration/step1", "routes/registration/step1/route.tsx");
          route("registration/step2", "routes/registration/step2/route.tsx");
        });
      },
    }),
    tsconfigPaths(),
  ],
});
