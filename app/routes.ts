import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  ///////////////////////////DASHBOARD///////////////////////////
  layout("shared/layouts/DashboardLayout/DashboardLayout.tsx", [
    route(":lang?/dashboard/orders", "routes/orders/_dashboard/orders.tsx", [
      route(":orderId", "routes/orders/order/order.tsx", {
        id: "dashboard-order",
      }),
      route(":orderId/service/:serviceId?", "routes/activity/activity.tsx", {
        id: "dashboard-order-service",
      }),
      route("new-order/:orderId", "routes/orders/new-order/new-order.tsx", {
        id: "dashboard-new-order",
      }),
    ]),
    route(":lang?/dashboard/tasks", "routes/tasks/_dashboard/tasks.tsx", [
      route(":taskId", "routes/tasks/task/task.tsx", {
        id: "dashboard-task",
      }),
      route(":taskId/service/:serviceId?", "routes/activity/activity.tsx", {
        id: "dashboard-task-service",
      }),
      route("new-task/:taskId", "routes/tasks/new-task/new-task.tsx", {
        id: "dashboard-new-task",
      }),
    ]),
    route(":lang?/dashboard/bids", "routes/bids/_dashboard/bids.tsx", [
      layout("routes/bids/bid/BidLayout/_dashboard/BidLayout.tsx", [
        route(":bidId", "routes/bids/bid/bid.tsx", {
          id: "dashboard-bid",
        }),
        route(":bidId/specialists", "routes/bids/specialists/specialists.tsx", {
          id: "dashboard-bid-specialists",
        }),
      ]),
      route(
        ":bidId/specialists/:specialistId",
        "routes/bids/specialist/specialist.tsx",
        {
          id: "dashboard-specialist",
        },
      ),
    ]),
    route(":lang?/dashboard/jobs", "routes/jobs/_dashboard/jobs.tsx", [
      route(
        ":bidId/specialists/:specialistId",
        "routes/bids/specialist/specialist.tsx",
        {
          id: "dashboard-job-for-manager",
        },
      ),
      route(
        ":bidId/specialists/:specialistId/day-review/:reportId?",
        "routes/bids/day-review/day-review.tsx",
        {
          id: "dashboard-dayReview",
        },
      ),

      route(":jobId/:specialistId", "routes/jobs/job/job.tsx", {
        id: "dashboard-job",
      }),
    ]),

    //profile
    route(":lang?/dashboard/profile", "routes/profile/profile.tsx", {
      id: "dashboard-profile",
    }),
    route(
      ":lang?/dashboard/profile/my-profile",
      "routes/profile/my-profile/my-profile.tsx",
      {
        id: "dashboard-myProfile",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/profile-edit",
      "routes/profile/my-profile/profile-edit/profile-edit.tsx",
      {
        id: "dashboard-profileEdit",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/profile-meta",
      "routes/profile/my-profile/profile-meta/profile-meta.tsx",
      {
        id: "dashboard-profileMeta",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/profile-meta/confirm-personal-email",
      "routes/profile/my-profile/profile-meta/confirm-personal-email/confirm-personal-email.tsx",
      {
        id: "dashboard-confirmPersonalEmail",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/profile-meta/confirm-personal-phone",
      "routes/profile/my-profile/profile-meta/confirm-personal-phone/confirm-personal-phone.tsx",
      {
        id: "dashboard-confirmPersonalPhone",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/user-activities",
      "routes/profile/my-profile/user-activities/user-activities.tsx",
      {
        id: "dashboard-userActivities",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/billing",
      "routes/profile/my-profile/billing/billing.tsx",
      {
        id: "dashboard-billing",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/billing/billing-add",
      "routes/profile/my-profile/billing/billing-add/billing-add.tsx",
      {
        id: "dashboard-billingAdd",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/billing/billing-edit",
      "routes/profile/my-profile/billing/billing-edit/billing-edit.tsx",
      {
        id: "dashboard-billingEdit",
      },
    ),
    route(
      ":lang?/dashboard/profile/my-profile/work-radius",
      "routes/profile/my-profile/work-radius/work-radius.tsx",
      {
        id: "dashboard-workRadius",
      },
    ),
    route(
      ":lang?/dashboard/profile/documents",
      "routes/profile/documents/documents.tsx",
      {
        id: "dashboard-documents",
      },
    ),
    route(
      ":lang?/dashboard/profile/requests",
      "routes/profile/requests/requests.tsx",
      {
        id: "dashboard-requests",
      },
    ),
    route(
      ":lang?/dashboard/profile/settings",
      "routes/profile/settings/settings.tsx",
      {
        id: "dashboard-settings",
      },
    ),
    route(
      ":lang?/dashboard/profile/documents/sign",
      "routes/profile/documents/sign/sign.tsx",
      {
        id: "dashboard-sign",
      },
    ),
    route(
      ":lang?/dashboard/profile/documents/sign-a-deal",
      "routes/profile/documents/sign-a-deal/sign-a-deal.tsx",
      {
        id: "dashboard-signADeal",
      },
    ),
    route(
      ":lang?/dashboard/profile/documents/terminate-a-deal",
      "routes/profile/documents/terminate-a-deal/terminate-a-deal.tsx",
      {
        id: "dashboard-terminateADeal",
      },
    ),
    route(
      ":lang?/dashboard/profile/documents/archive",
      "routes/profile/documents/archive/archive.tsx",
      {
        id: "dashboard-archive",
      },
    ),
    route(
      ":lang?/dashboard/profile/documents/certificates",
      "routes/profile/documents/certificates/certificates.tsx",
      {
        id: "dashboard-certificates",
      },
    ),
    //profile

    //moderation
    route(
      ":lang?/dashboard/moderation/clients",
      "routes/moderation/clients/_dashboard/clients.tsx",
      [
        route(":user", "routes/moderation/clients/client/client.tsx", {
          id: "dashboard-client",
        }),

        route(
          ":user/select-projects",
          "routes/moderation/selectProjects/selectProjects.tsx",
          {
            id: "dashboard-client-selectProjects",
          },
        ),
        route(
          ":user/select-locations",
          "routes/moderation/selectLocations/selectLocations.tsx",
          {
            id: "dashboard-client-selectLocations",
          },
        ),
      ],
    ),
    route(
      ":lang?/dashboard/moderation/managers",
      "routes/moderation/managers/_dashboard/managers.tsx",
      [
        route(":user", "routes/moderation/managers/manager/manager.tsx", {
          id: "dashboard-manager",
        }),
        route(
          ":user/select-projects",
          "routes/moderation/selectProjects/selectProjects.tsx",
          {
            id: "dashboard-manager-selectProjects",
          },
        ),
        route(
          ":user/select-locations",
          "routes/moderation/selectLocations/selectLocations.tsx",
          {
            id: "dashboard-manager-selectLocations",
          },
        ),
      ],
    ),
    route(
      ":lang?/dashboard/moderation/supervisors",
      "routes/moderation/supervisors/_dashboard/supervisors.tsx",
      [
        route(
          ":user",
          "routes/moderation/supervisors/supervisor/supervisor.tsx",
          {
            id: "dashboard-supervisor",
          },
        ),
        route(
          ":user/select-projects",
          "routes/moderation/selectProjects/selectProjects.tsx",
          {
            id: "dashboard-supervisor-selectProjects",
          },
        ),
        route(
          ":user/select-locations",
          "routes/moderation/selectLocations/selectLocations.tsx",
          {
            id: "dashboard-supervisor-selectLocations",
          },
        ),
      ],
    ),

    //moderation
  ]),

  //signin
  layout("shared/layouts/SigninLayout/SigninLayout.tsx", [
    route(
      ":lang?/dashboard/signin/phone",
      "routes/signin/phone/_dashboard/phone.tsx",
    ),
    route(
      ":lang?/dashboard/signin/sms",
      "routes/signin/sms/_dashboard/sms.tsx",
    ),
    route(
      ":lang?/dashboard/signin/pin",
      "routes/signin/pin/_dashboard/pin.tsx",
    ),
    route(
      ":lang?/dashboard/signin/createPin",
      "routes/signin/createPin/createPin.tsx",
      {
        id: "dashboard-createPin",
      },
    ),
    route(
      ":lang?/dashboard/signin/confirm-restore-pin",
      "routes/signin/confirm-restore-pin/confirm-restore-pin.tsx",
      {
        id: "dashboard-confirm-restore-pin",
      },
    ),
    route(
      ":lang?/dashboard/signin/client/phone",
      "routes/signin/client/phone/phone.tsx",
      {
        id: "dashboard-phone",
      },
    ),
    route(
      ":lang?/dashboard/signin/client/meta",
      "routes/signin/client/meta/meta.tsx",
      {
        id: "dashboard-meta",
      },
    ),
    route(
      ":lang?/dashboard/signin/client/recruiter",
      "routes/signin/client/recruiter/recruiter.tsx",
      {
        id: "dashboard-recruiter",
      },
    ),
    route(
      ":lang?/dashboard/signin/client/location",
      "routes/signin/client/location/location.tsx",
      {
        id: "dashboard-location",
      },
    ),
    route(
      ":lang?/dashboard/signin/client/registration-complete",
      "routes/signin/client/registration-complete/registration-complete.tsx",
      {
        id: "dashboard-client-registration-complete",
      },
    ),
  ]),
  // signin

  // registration
  layout("shared/layouts/RegistrationLayout/RegistrationLayout.tsx", [
    route(
      ":lang?/dashboard/registration/step1",
      "routes/registration/step1/step1.tsx",
      {
        id: "dashboard-step1",
      },
    ),
    route(
      ":lang?/dashboard/registration/step2",
      "routes/registration/step2/step2.tsx",
      {
        id: "dashboard-step2",
      },
    ),
    route(
      ":lang?/dashboard/registration/step3",
      "routes/registration/step3/step3.tsx",
      {
        id: "dashboard-step3",
      },
    ),
    route(
      ":lang?/dashboard/registration/step4",
      "routes/registration/step4/step4.tsx",
      {
        id: "dashboard-step4",
      },
    ),
    route(
      ":lang?/dashboard/registration/step5",
      "routes/registration/step5/step5.tsx",
      {
        id: "dashboard-step5",
      },
    ),
    route(
      ":lang?/dashboard/registration/step6",
      "routes/registration/step6/step6.tsx",
      {
        id: "dashboard-step6",
      },
    ),
    route(
      ":lang?/dashboard/registration/confirm-email",
      "routes/registration/confirm-email/confirm-email.tsx",
      {
        id: "dashboard-confirm-email",
      },
    ),
    route(
      ":lang?/dashboard/registration/registration-complete",
      "routes/registration/registration-complete/registration-complete.tsx",
      {
        id: "dashboard-registration-complete",
      },
    ),
  ]),
  // registration

  // internal pages without navigation menu
  // route(
  //   ":lang?/dashboard/moderation/:user/select-projects",
  //   "routes/moderation/selectProjects/selectProjects.tsx",
  //   {
  //     id: "dashboard-selectProjects",
  //   },
  // ),
  route(
    ":lang?/dashboard/moderation/:user/select-locations",
    "routes/moderation/selectLocations/selectLocations.tsx",
    {
      id: "dashboard-selectLocations",
    },
  ),

  //bid
  route(
    ":lang?/dashboard/bids/:bidId/specialists",
    "routes/bids/specialists/specialists.tsx",
    {
      id: "dashboard-specialists",
    },
  ),

  ///////////////////////////DASHBOARD///////////////////////////

  ///////////////////////////MOBILE///////////////////////////
  layout("shared/layouts/MobileBottomMenuLayout/MobileBottomMenuLayout.tsx", [
    layout("routes/home/HomeMobileLayout/HomeMobileLayout.tsx", [
      route(":lang?/", "routes/home/home.tsx"),
      route(":lang?/orders", "routes/orders/orders.tsx"),
      route(":lang?/tasks", "routes/tasks/tasks.tsx"),
      route(":lang?/bids", "routes/bids/bids.tsx"),
      route(":lang?/jobs", "routes/jobs/jobs.tsx"),
    ]),

    route(":lang?/jobs/:jobId/:specialistId", "routes/jobs/job/job.tsx"),
    route(
      ":lang?/bids/:bidId/specialists/:specialistId/day-review/:reportId?",
      "routes/bids/day-review/day-review.tsx",
    ),

    route(":lang?/profile", "routes/profile/profile.tsx"),
    route(
      ":lang?/profile/my-profile",
      "routes/profile/my-profile/my-profile.tsx",
    ),
    route(
      ":lang?/profile/my-profile/profile-edit",
      "routes/profile/my-profile/profile-edit/profile-edit.tsx",
    ),
    route(
      ":lang?/profile/my-profile/profile-meta",
      "routes/profile/my-profile/profile-meta/profile-meta.tsx",
    ),
    route(
      ":lang?/profile/my-profile/profile-meta/confirm-personal-email",
      "routes/profile/my-profile/profile-meta/confirm-personal-email/confirm-personal-email.tsx",
    ),
    route(
      ":lang?/profile/my-profile/profile-meta/confirm-personal-phone",
      "routes/profile/my-profile/profile-meta/confirm-personal-phone/confirm-personal-phone.tsx",
    ),
    route(
      ":lang?/profile/my-profile/user-activities",
      "routes/profile/my-profile/user-activities/user-activities.tsx",
    ),
    route(
      ":lang?/profile/my-profile/billing",
      "routes/profile/my-profile/billing/billing.tsx",
    ),
    route(
      ":lang?/profile/my-profile/billing/billing-add",
      "routes/profile/my-profile/billing/billing-add/billing-add.tsx",
    ),
    route(
      ":lang?/profile/my-profile/billing/billing-edit",
      "routes/profile/my-profile/billing/billing-edit/billing-edit.tsx",
    ),
    route(
      ":lang?/profile/my-profile/work-radius",
      "routes/profile/my-profile/work-radius/work-radius.tsx",
    ),
    route(":lang?/profile/documents", "routes/profile/documents/documents.tsx"),
    route(":lang?/profile/requests", "routes/profile/requests/requests.tsx"),
    route(":lang?/profile/settings", "routes/profile/settings/settings.tsx"),
    route(
      ":lang?/profile/documents/sign",
      "routes/profile/documents/sign/sign.tsx",
    ),
    route(
      ":lang?/profile/documents/sign-a-deal",
      "routes/profile/documents/sign-a-deal/sign-a-deal.tsx",
    ),
    route(
      ":lang?/profile/documents/terminate-a-deal",
      "routes/profile/documents/terminate-a-deal/terminate-a-deal.tsx",
    ),
    route(
      ":lang?/profile/documents/archive",
      "routes/profile/documents/archive/archive.tsx",
    ),
    route(
      ":lang?/profile/documents/certificates",
      "routes/profile/documents/certificates/certificates.tsx",
    ),

    layout(
      "routes/moderation/ModerationMobileLayout/ModerationMobileLayout.tsx",
      [
        route(
          ":lang?/moderation/clients",
          "routes/moderation/clients/clients.tsx",
        ),
        route(
          ":lang?/moderation/managers",
          "routes/moderation/managers/managers.tsx",
        ),
        route(
          ":lang?/moderation/supervisors",
          "routes/moderation/supervisors/supervisors.tsx",
        ),
      ],
    ),

    route(
      ":lang?/moderation/clients/:user",
      "routes/moderation/clients/client/client.tsx",
    ),
    route(
      ":lang?/moderation/managers/:user",
      "routes/moderation/managers/manager/manager.tsx",
    ),
    route(
      ":lang?/moderation/supervisors/:user",
      "routes/moderation/supervisors/supervisor/supervisor.tsx",
    ),
  ]),

  //signin
  layout("routes/signin/phone/_views/MenuOutlet.tsx", [
    route(":lang?/signin/phone", "routes/signin/phone/phone.tsx"),
    route(":lang?/signin/jobs", "routes/signin/jobs/jobs.tsx"),
  ]),
  route(":lang?/signin/sms", "routes/signin/sms/sms.tsx"),
  route(":lang?/signin/createPin", "routes/signin/createPin/createPin.tsx"),
  route(":lang?/signin/pin", "routes/signin/pin/pin.tsx"),
  route(
    ":lang?/signin/confirm-restore-pin",
    "routes/signin/confirm-restore-pin/confirm-restore-pin.tsx",
  ),

  route(":lang?/signin/client/phone", "routes/signin/client/phone/phone.tsx"),
  route(":lang?/signin/client/meta", "routes/signin/client/meta/meta.tsx"),
  route(
    ":lang?/signin/client/recruiter",
    "routes/signin/client/recruiter/recruiter.tsx",
  ),
  route(
    ":lang?/signin/client/location",
    "routes/signin/client/location/location.tsx",
  ),
  route(
    ":lang?/signin/client/registration-complete",
    "routes/signin/client/registration-complete/registration-complete.tsx",
  ),

  // signin

  // registration
  route(":lang?/registration/step1", "routes/registration/step1/step1.tsx"),
  route(":lang?/registration/step2", "routes/registration/step2/step2.tsx"),
  route(":lang?/registration/step3", "routes/registration/step3/step3.tsx"),
  route(":lang?/registration/step4", "routes/registration/step4/step4.tsx"),
  route(":lang?/registration/step5", "routes/registration/step5/step5.tsx"),
  route(":lang?/registration/step6", "routes/registration/step6/step6.tsx"),
  // route(":lang?/registration/step7", "routes/registration/step7/step7.tsx"),
  route(
    ":lang?/registration/confirm-email",
    "routes/registration/confirm-email/confirm-email.tsx",
  ),
  route(
    ":lang?/registration/registration-complete",
    "routes/registration/registration-complete/registration-complete.tsx",
  ),
  // registration

  // internal pages without navigation menu
  route(
    ":lang?/moderation/clients/:user/select-projects",
    "routes/moderation/selectProjects/selectProjects.tsx",
    {
      id: "moderation-mobile-clients-project",
    },
  ),
  route(
    ":lang?/moderation/managers/:user/select-projects",
    "routes/moderation/selectProjects/selectProjects.tsx",
    {
      id: "moderation-mobile-managers-project",
    },
  ),
  route(
    ":lang?/moderation/supervisors/:user/select-projects",
    "routes/moderation/selectProjects/selectProjects.tsx",
    {
      id: "moderation-mobile-supervisors-project",
    },
  ),

  route(
    ":lang?/moderation/clients/:user/select-locations",
    "routes/moderation/selectLocations/selectLocations.tsx",
    {
      id: "moderation-mobile-clients-locations",
    },
  ),
  route(
    ":lang?/moderation/managers/:user/select-locations",
    "routes/moderation/selectLocations/selectLocations.tsx",
    {
      id: "moderation-mobile-clients-managers",
    },
  ),
  route(
    ":lang?/moderation/supervisors/:user/select-locations",
    "routes/moderation/selectLocations/selectLocations.tsx",
    {
      id: "moderation-mobile-clients-supervisors",
    },
  ),

  //bid
  layout("routes/bids/bid/BidLayout/BidLayout.tsx", [
    route(":lang?/bids/:bidId", "routes/bids/bid/bid.tsx"),
    route(
      ":lang?/bids/:bidId/specialists",
      "routes/bids/specialists/specialists.tsx",
    ),
  ]),
  route(
    ":lang?/bids/:bidId/specialists/:specialistId",
    "routes/bids/specialist/specialist.tsx",
  ),

  //order
  route(":lang?/orders/:orderId", "routes/orders/order/order.tsx"),
  route(
    ":lang?/orders/new-order/:orderId",
    "routes/orders/new-order/new-order.tsx",
  ),
  route(
    ":lang?/orders/:orderId/service/:serviceId?",
    "routes/activity/activity.tsx",
    { id: "order-service" },
  ),
  //order

  //task
  route(":lang?/tasks/:taskId", "routes/tasks/task/task.tsx"),
  route(":lang?/tasks/new-task/:taskId", "routes/tasks/new-task/new-task.tsx"),
  route(
    ":lang?/tasks/:taskId/service/:serviceId?",
    "routes/activity/activity.tsx",
    { id: "task-service" },
  ),
  ///////////////////////////MOBILE///////////////////////////
] satisfies RouteConfig;
