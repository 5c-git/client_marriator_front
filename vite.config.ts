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
          route(
            undefined,
            "routes/rootErrorBoundry/rootErrorBoundry.tsx",
            () => {
              route(undefined, "routes/menuLayout/menuLayout.tsx", () => {
                route(":lang?/", "routes/home/home.tsx");
                route(":lang?/profile", "routes/profile/profile.tsx");
              });

              //signin
              route(":lang?/signin/phone", "routes/signin/phone/phone.tsx");
              route(":lang?/signin/sms", "routes/signin/sms/sms.tsx");
              route(
                ":lang?/signin/createPin",
                "routes/signin/createPin/createPin.tsx"
              );
              route(":lang?/signin/pin", "routes/signin/pin/pin.tsx");
              //signin

              //registration
              route(
                ":lang?/registration/step1",
                "routes/registration/step1/step1.tsx"
              );
              route(
                ":lang?/registration/step2",
                "routes/registration/step2/step2.tsx"
              );

              route(
                ":lang?/registration/step3",
                "routes/registration/step3/step3.tsx"
              );
              route(
                ":lang?/registration/step4",
                "routes/registration/step4/step4.tsx"
              );
              route(
                ":lang?/registration/step5",
                "routes/registration/step5/step5.tsx"
              );
              route(
                ":lang?/registration/step6",
                "routes/registration/step6/step6.tsx"
              );
              route(
                ":lang?/registration/step7",
                "routes/registration/step7/step7.tsx"
              );
              // registration;
            }
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
