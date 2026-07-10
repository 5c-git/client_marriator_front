import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  ///////////////////////////DASHBOARD///////////////////////////
  route(":lang?/dashboard", "routes/home/home.tsx", {
    id: "dashboard-home",
  }),
  route(":lang?/dashboard/orders", "routes/orders/orders.tsx", {
    id: "dashboard-orders",
  }),
  route(":lang?/dashboard/tasks", "routes/tasks/tasks.tsx", {
    id: "dashboard-tasks",
  }),
  route(":lang?/dashboard/bids", "routes/bids/bids.tsx", {
    id: "dashboard-bids",
  }),
  route(":lang?/dashboard/jobs", "routes/jobs/jobs.tsx", {
    id: "dashboard-jobs",
  }),

  route(
    ":lang?/dashboard/jobs/:jobId/:specialistId",
    "routes/jobs/job/job.tsx",
    {
      id: "dashboard-job",
    },
  ),
  route(
    ":lang?/dashboard/bids/:bidId/specialists/:specialistId/day-review/:reportId?",
    "routes/bids/day-review/day-review.tsx",
    {
      id: "dashboard-dayReview",
    },
  ),

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

  route(":lang?/dashboard/users", "routes/users/clients/clients.tsx", {
    id: "dashboard-users",
  }),
  route(
    ":lang?/dashboard/users/managers",
    "routes/users/managers/managers.tsx",
    {
      id: "dashboard-managers",
    },
  ),
  route(
    ":lang?/dashboard/users/supervisors",
    "routes/users/supervisors/supervisors.tsx",
    {
      id: "dashboard-supervisors",
    },
  ),

  route(
    ":lang?/dashboard/users/client/:user",
    "routes/users/clients/client/client.tsx",
    {
      id: "dashboard-client",
    },
  ),
  route(
    ":lang?/dashboard/users/manager/:user",
    "routes/users/managers/manager/manager.tsx",
    {
      id: "dashboard-manager",
    },
  ),
  route(
    ":lang?/dashboard/users/supervisor/:user",
    "routes/users/supervisors/supervisor/supervisor.tsx",
    {
      id: "dashboard-supervisor",
    },
  ),

  //signin
  route(":lang?/dashboard/signin/phone", "routes/signin/phone/phone.tsx", {
    id: "dashboard-signinPhone",
  }),
  route(":lang?/dashboard/signin/jobs", "routes/signin/jobs/jobs.tsx", {
    id: "dashboard-signinJobs",
  }),
  route(":lang?/dashboard/signin/sms", "routes/signin/sms/sms.tsx", {
    id: "dashboard-signinSms",
  }),
  route(
    ":lang?/dashboard/signin/createPin",
    "routes/signin/createPin/createPin.tsx",
    {
      id: "dashboard-createPin",
    },
  ),
  route(":lang?/dashboard/signin/pin", "routes/signin/pin/pin.tsx", {
    id: "dashboard-pin",
  }),
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

  // signin

  // registration
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
  // registration

  // internal pages without navigation menu
  route(
    ":lang?/dashboard/users/:user/select-projects",
    "routes/users/selectProjects/selectProjects.tsx",
    {
      id: "dashboard-selectProjects",
    },
  ),
  route(
    ":lang?/dashboard/users/:user/select-locations",
    "routes/users/selectLocations/selectLocations.tsx",
    {
      id: "dashboard-selectLocations",
    },
  ),

  //bid
  route(":lang?/dashboard/bids/:bidId", "routes/bids/bid/bid.tsx", {
    id: "dashboard-bid",
  }),
  route(
    ":lang?/dashboard/bids/:bidId/specialists",
    "routes/bids/specialists/specialists.tsx",
    {
      id: "dashboard-specialists",
    },
  ),
  route(
    ":lang?/dashboard/bids/:bidId/specialists/:specialistId",
    "routes/bids/specialist/specialist.tsx",
    {
      id: "dashboard-specialist",
    },
  ),

  //order
  route(":lang?/dashboard/orders/:orderId", "routes/orders/order/order.tsx", {
    id: "dashboard-order",
  }),
  route(
    ":lang?/dashboard/orders/new-order",
    "routes/orders/new-order/new-order.tsx",
    {
      id: "dashboard-new-order",
    },
  ),
  route(
    ":lang?/dashboard/orders/:orderId/service/:serviceId?",
    "routes/activity/activity.tsx",
    { id: "dashboard-order-service" },
  ),
  //order

  //task
  route(":lang?/dashboard/tasks/:taskId", "routes/tasks/task/task.tsx", {
    id: "dashboard-task",
  }),
  route(
    ":lang?/dashboard/tasks/new-task",
    "routes/tasks/new-task/new-task.tsx",
    {
      id: "dashboard-new-task",
    },
  ),
  route(
    ":lang?/dashboard/tasks/:taskId/service/:serviceId?",
    "routes/activity/activity.tsx",
    { id: "dashboard-task-service" },
  ),
  ///////////////////////////DASHBOARD///////////////////////////

  ///////////////////////////MOBILE///////////////////////////
  layout("routes/MenuLayout/MenuLayout.tsx", [
    layout("routes/home/HomeLayout/HomeLayout.tsx", [
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

    layout("routes/users/layout/layout.tsx", [
      route(":lang?/users", "routes/users/clients/clients.tsx"),
      route(":lang?/users/managers", "routes/users/managers/managers.tsx"),
      route(
        ":lang?/users/supervisors",
        "routes/users/supervisors/supervisors.tsx",
      ),
    ]),

    route(
      ":lang?/users/client/:user",
      "routes/users/clients/client/client.tsx",
    ),
    route(
      ":lang?/users/manager/:user",
      "routes/users/managers/manager/manager.tsx",
    ),
    route(
      ":lang?/users/supervisor/:user",
      "routes/users/supervisors/supervisor/supervisor.tsx",
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
    ":lang?/users/:user/select-projects",
    "routes/users/selectProjects/selectProjects.tsx",
  ),
  route(
    ":lang?/users/:user/select-locations",
    "routes/users/selectLocations/selectLocations.tsx",
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
  route(":lang?/orders/new-order", "routes/orders/new-order/new-order.tsx"),
  route(
    ":lang?/orders/:orderId/service/:serviceId?",
    "routes/activity/activity.tsx",
    { id: "order-service" },
  ),
  //order

  //task
  route(":lang?/tasks/:taskId", "routes/tasks/task/task.tsx"),
  route(":lang?/tasks/new-task", "routes/tasks/new-task/new-task.tsx"),
  route(
    ":lang?/tasks/:taskId/service/:serviceId?",
    "routes/activity/activity.tsx",
    { id: "task-service" },
  ),
  ///////////////////////////MOBILE///////////////////////////
] satisfies RouteConfig;
