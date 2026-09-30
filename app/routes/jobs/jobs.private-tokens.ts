import { token } from "brandi";

import type { GetJobsSuccess } from "~/api/_personal/getJobs/getJobsSuccess.schema";

export type GetJobs = (accessToken: string) => Promise<GetJobsSuccess>;

export const jobsPrivateTokens = {
  getJobs: token<GetJobs>("getJobs-private:getJobs"),
};
