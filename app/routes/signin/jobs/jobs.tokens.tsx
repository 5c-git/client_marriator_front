import { token } from "brandi";

import { SigninJobsService } from "./jobs.service";

export const SigninJobsTokens = {
  jobService: token<SigninJobsService>("signin-jobs:PinService"),
};
