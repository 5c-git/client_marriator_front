import { token } from "brandi";

import type { GetJobSuccess } from "~/api/_personal/getJob/getJobSuccess.schema";
import type { PostAcceptSpecialistSuccess } from "~/api/_personal/postAcceptSpecialist/postAcceptSpecialistSuccess.schema";
import type { PostEndSpecialistJobSuccess } from "~/api/_personal/postEndSpecialistJob/postEndSpecialistJobSuccess.schema";
import type { PostPayReportForManagerSuccess } from "~/api/_personal/postPayReportForManager/postPayReportForManagerSuccess.schema";

export type GetJob = (
  accessToken: string,
  specialistId: string,
  bidId: string,
) => Promise<GetJobSuccess>;

export type AcceptSpecialist = (
  accessToken: string,
  bidId: string,
  specialistId: string,
) => Promise<PostAcceptSpecialistSuccess>;

export type EndSpecialistJob = (
  accessToken: string,
  bidId: string,
  specialistId: string,
) => Promise<PostEndSpecialistJobSuccess>;

export type PayReportForManager = (
  accessToken: string,
  reportId: string,
) => Promise<PostPayReportForManagerSuccess>;

export const specialistPrivateTokens = {
  getJob: token<GetJob>("specialist-private:getJob"),
  acceptSpecialist: token<AcceptSpecialist>(
    "specialist-private:acceptSpecialist",
  ),
  endSpecialistJob: token<EndSpecialistJob>(
    "specialist-private:endSpecialistJobs",
  ),
  payReportForManager: token<PayReportForManager>(
    "specialist-private:payReportForManager",
  ),
};
