import { token } from "brandi";

import type { JobsService } from "./jobs.service";

export const jobsTokens = {
  jobsService: token<JobsService>("JobsService"),
};
