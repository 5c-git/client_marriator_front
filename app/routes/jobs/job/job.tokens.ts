import { token } from "brandi";

import type { JobService } from "./job.service";

export const jobTokens = {
  jobService: token<JobService>("JobsService"),
};
