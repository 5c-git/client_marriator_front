import { token } from "brandi";

import type { GetSigninJobsSuccess } from "~/api/getSigninJobs/getSigninJobsSuccess.schema";

export type GetPublicJobs = () => Promise<GetSigninJobsSuccess>;

export const signinJobsPrivateTokens = {
    getJobs: token<GetPublicJobs>("signin-jobs:getPublicJobs"),
  };