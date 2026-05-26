import { Container } from "brandi";


import { SigninJobsService } from "./jobs.service";
import { signinJobsPrivateTokens } from "./jobs.priviate-tokens";
import { SigninJobsTokens } from "./jobs.tokens";

import { getSigninJobs } from "~/api/getSigninJobs/getSigninJobs";


export const signinJobsContainer = new Container();


signinJobsContainer.bind(signinJobsPrivateTokens.getJobs).toConstant(getSigninJobs);

signinJobsContainer
  .bind(SigninJobsTokens.jobService)
  .toInstance(SigninJobsService)
  .inSingletonScope();