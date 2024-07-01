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
          route("", "routes/rootErrorBoundry/route.tsx", () => {
            route("/:lang?", "routes/_index/route.tsx", { index: true });

            //signin
            route("/:lang?/signin/phone", "routes/signin/phone/route.tsx");
            route("/:lang?/signin/sms", "routes/signin/sms/route.tsx");
            route(
              "/:lang?/signin/createPin",
              "routes/signin/createPin/route.tsx"
            );
            route("/:lang?/signin/pin", "routes/signin/pin/route.tsx");
            //signin

            //registration
            route(
              "/:lang?/registration/step1",
              "routes/registration/step1/route.tsx"
            );
            route(
              "/:lang?/registration/step2",
              "routes/registration/step2/route.tsx"
            );

            route(
              "/:lang?/registration/step3",
              "routes/registration/step3/route.tsx"
            );
            route(
              "/:lang?/registration/step4",
              "routes/registration/step4/route.tsx"
            );
            route(
              "/:lang?/registration/step5",
              "routes/registration/step5/route.tsx"
            );
            route(
              "/:lang?/registration/step6",
              "routes/registration/step6/route.tsx"
            );
            route(
              "/:lang?/registration/step7",
              "routes/registration/step7/route.tsx"
            );
            //registration
          });
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
