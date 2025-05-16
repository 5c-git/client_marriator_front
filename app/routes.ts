import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  // index("routes/pigment/pigment.tsx"),
  layout("routes/rootErrorBoundry/rootErrorBoundry.tsx", [
    layout("routes/menuLayout/menuLayout.tsx", [
      route(":lang?/", "routes/home/home.tsx"),
      route(
        ":lang?/registration/registration-complete",
        "routes/registration/registration-complete/registration-complete.tsx"
      ),
      route(":lang?/profile", "routes/profile/index/profile.tsx"),
      route(
        ":lang?/profile/my-profile",
        "routes/profile/my-profile/index/my-profile.tsx"
      ),
      route(
        ":lang?/profile/my-profile/profile-edit",
        "routes/profile/my-profile/profile-edit/profile-edit.tsx"
      ),
      route(
        ":lang?/profile/my-profile/profile-meta",
        "routes/profile/my-profile/profile-meta/index/profile-meta.tsx"
      ),
      route(
        ":lang?/profile/my-profile/profile-meta/confirm-personal-email",
        "routes/profile/my-profile/profile-meta/confirm-personal-email/confirm-personal-email.tsx"
      ),
      route(
        ":lang?/profile/my-profile/profile-meta/confirm-personal-phone",
        "routes/profile/my-profile/profile-meta/confirm-personal-phone/confirm-personal-phone.tsx"
      ),
      route(
        ":lang?/profile/my-profile/user-activities",
        "routes/profile/my-profile/user-activities/user-activities.tsx"
      ),
      route(
        ":lang?/profile/my-profile/billing",
        "routes/profile/my-profile/billing/index/billing.tsx"
      ),
      route(
        ":lang?/profile/my-profile/billing/billing-add",
        "routes/profile/my-profile/billing/billing-add/billing-add.tsx"
      ),
      route(
        ":lang?/profile/my-profile/billing/billing-edit",
        "routes/profile/my-profile/billing/billing-edit/billing-edit.tsx"
      ),
      route(
        ":lang?/profile/my-profile/work-radius",
        "routes/profile/my-profile/work-radius/work-radius.tsx"
      ),
      route(
        ":lang?/profile/documents",
        "routes/profile/documents/index/documents.tsx"
      ),
      route(
        ":lang?/profile/documents/sign",
        "routes/profile/documents/sign/sign.tsx"
      ),
      route(
        ":lang?/profile/documents/sign-a-deal",
        "routes/profile/documents/sign-a-deal/sign-a-deal.tsx"
      ),
      route(
        ":lang?/profile/documents/terminate-a-deal",
        "routes/profile/documents/terminate-a-deal/terminate-a-deal.tsx"
      ),
      route(
        ":lang?/profile/documents/archive",
        "routes/profile/documents/archive/archive.tsx"
      ),
      route(
        ":lang?/profile/documents/certificates",
        "routes/profile/documents/certificates/certificates.tsx"
      ),

      layout("routes/dev/moderation/layout/layout.tsx", [
        route(
          ":lang?/dev/moderation/moderation-1",
          "routes/dev/moderation/moderation-1/page.tsx"
        ),
        route(
          ":lang?/dev/moderation/moderation-2",
          "routes/dev/moderation/moderation-2/page.tsx"
        ),
        route(
          ":lang?/dev/moderation/moderation-3",
          "routes/dev/moderation/moderation-3/page.tsx"
        ),
        route(
          ":lang?/dev/moderation/moderation-4",
          "routes/dev/moderation/moderation-4/page.tsx"
        ),
      ]),

      route(
        ":lang?/dev/moderation/moderation-1/client",
        "routes/dev/moderation/moderation-1/client/client.tsx"
      ),
      route(
        ":lang?/dev/moderation/moderation-2/project-manager",
        "routes/dev/moderation/moderation-2/project-manager/project-manager.tsx"
      ),
      route(
        ":lang?/dev/moderation/moderation-3/recruter",
        "routes/dev/moderation/moderation-3/recruter/recruter.tsx"
      ),
      route(
        ":lang?/dev/moderation/moderation-4/supervisor",
        "routes/dev/moderation/moderation-4/supervisor/supervisor.tsx"
      ),
    ]),

    route(":lang?/offline", "routes/offline/offline.tsx"),

    //signin
    route(":lang?/signin/phone", "routes/signin/phone/phone.tsx"),
    route(":lang?/signin/sms", "routes/signin/sms/sms.tsx"),
    route(":lang?/signin/createPin", "routes/signin/createPin/createPin.tsx"),
    route(":lang?/signin/pin", "routes/signin/pin/pin.tsx"),
    route(
      ":lang?/signin/confirm-restore-pin",
      "routes/signin/confirm-restore-pin/confirm-restore-pin.tsx"
    ),

    route(":lang?/signin/client/phone", "routes/signin/client/phone/phone.tsx"),
    route(":lang?/signin/client/meta", "routes/signin/client/meta/meta.tsx"),
    route(
      ":lang?/signin/client/location",
      "routes/signin/client/location/location.tsx"
    ),
    // signin

    // registration
    route(":lang?/registration/step1", "routes/registration/step1/step1.tsx"),
    route(":lang?/registration/step2", "routes/registration/step2/step2.tsx"),
    route(":lang?/registration/step3", "routes/registration/step3/step3.tsx"),
    route(":lang?/registration/step4", "routes/registration/step4/step4.tsx"),
    route(":lang?/registration/step5", "routes/registration/step5/step5.tsx"),
    route(":lang?/registration/step6", "routes/registration/step6/step6.tsx"),
    route(":lang?/registration/step7", "routes/registration/step7/step7.tsx"),
    route(
      ":lang?/registration/confirm-email",
      "routes/registration/confirm-email/confirm-email.tsx"
    ),
    // registration
  ]),
] satisfies RouteConfig;
