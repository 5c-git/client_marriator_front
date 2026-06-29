import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { jobsPrivateTokens } from "./jobs.private-tokens";
import { jobsTokens } from "./jobs.tokens";

export const jobsContainer = new Container().extend(appContainer);
import { JobsService } from "./jobs.service";

import { getJobs } from "~/api/_personal/getJobs/getJobs";

jobsContainer
  .bind(jobsPrivateTokens.getJobs)
  .toConstant((accessToken) => getJobs(accessToken));

jobsContainer
  .bind(jobsTokens.jobsService)
  .toInstance(JobsService)
  .inSingletonScope();
