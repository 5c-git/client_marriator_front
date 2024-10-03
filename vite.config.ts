import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  ssr: {
    // Bundle `problematic-dependency` into the server build
    noExternal: ["ymap3-components"],
  },
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
                route(
                  ":lang?/registration/registration-complete",
                  "routes/registration/registration-complete/registration-complete.tsx"
                );
                route(":lang?/profile", "routes/profile/index/profile.tsx");
                route(
                  ":lang?/profile/my-profile",
                  "routes/profile/my-profile/index/my-profile.tsx"
                );

                route(
                  ":lang?/profile/my-profile/profile-edit",
                  "routes/profile/my-profile/profile-edit/profile-edit.tsx"
                );
                route(
                  ":lang?/profile/my-profile/profile-meta",
                  "routes/profile/my-profile/profile-meta/index/profile-meta.tsx"
                );
                route(
                  ":lang?/profile/my-profile/profile-meta/confirm-personal-email",
                  "routes/profile/my-profile/profile-meta/confirm-personal-email/confirm-personal-email.tsx"
                );
                route(
                  ":lang?/profile/my-profile/profile-meta/confirm-personal-phone",
                  "routes/profile/my-profile/profile-meta/confirm-personal-phone/confirm-personal-phone.tsx"
                );
                route(
                  ":lang?/profile/my-profile/user-activities",
                  "routes/profile/my-profile/user-activities/user-activities.tsx"
                );
                route(
                  ":lang?/profile/my-profile/billing",
                  "routes/profile/my-profile/billing/index/billing.tsx"
                );
                route(
                  ":lang?/profile/my-profile/billing/billing-add",
                  "routes/profile/my-profile/billing/billing-add/billing-add.tsx"
                );
                route(
                  ":lang?/profile/my-profile/billing/billing-edit",
                  "routes/profile/my-profile/billing/billing-edit/billing-edit.tsx"
                );
                route(
                  ":lang?/profile/my-profile/work-radius",
                  "routes/profile/my-profile/work-radius/work-radius.tsx"
                );
                route(
                  ":lang?/profile/documents",
                  "routes/profile/documents/index/documents.tsx"
                );
              });

              //signin
              route(":lang?/signin/phone", "routes/signin/phone/phone.tsx");
              route(":lang?/signin/sms", "routes/signin/sms/sms.tsx");
              route(
                ":lang?/signin/createPin",
                "routes/signin/createPin/createPin.tsx"
              );
              route(":lang?/signin/pin", "routes/signin/pin/pin.tsx");
              route(
                ":lang?/signin/confirm-restore-pin",
                "routes/signin/confirm-restore-pin/confirm-restore-pin.tsx"
              );
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
              route(
                ":lang?/registration/confirm-email",
                "routes/registration/confirm-email/confirm-email.tsx"
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
