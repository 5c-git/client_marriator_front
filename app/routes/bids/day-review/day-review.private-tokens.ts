import { token } from "brandi";

import type { GetJobSuccess } from "~/api/_personal/getJob/getJobSuccess.schema";
import type { GetReasonsSuccess } from "~/api/_personal/getReasons/getReasonsSuccess.schema";
import type { PostAcceptReportSuccess } from "~/api/_personal/postAcceptReport/postAcceptReportSuccess.schema";
import type { PostUpdateReportSuccess } from "~/api/_personal/postUpdateReport/postUpdateReportSuccess.schema";
import type { PostAcceptAllReportJobSuccess } from "~/api/_personal/postAcceptAllReportJob/postAcceptAllReportJobSuccess.schema";

export type GetJob = (
  accessToken: string,
  specialistId: string,
  bidId: string,
) => Promise<GetJobSuccess>;

export type GetReasons = (accessToken: string) => Promise<GetReasonsSuccess>;

export type AcceptReport = (
  accessToken: string,
  payload: {
    reportId: number;
    hours: number;
    reasons: {
      reasonId: number;
      count: number;
      amount: number;
    }[];
  },
) => Promise<PostAcceptReportSuccess>;

export type UpdateReport = (
  accessToken: string,
  payload: {
    reportId: number;
    hours: number;
    reasons: {
      reasonId: number;
      count: number;
    }[];
  },
) => Promise<PostUpdateReportSuccess>;

export type AcceptAllReports = (
  accessToken: string,
  payload: {
    bidId: number;
    specialistId: number;
    reports: {
      reportId: number;
      hours: number;
      reasons: {
        reasonId: number;
        count: number;
        amount: number;
      }[];
    }[];
  },
) => Promise<PostAcceptAllReportJobSuccess>;

export const dayReviewPrivateTokens = {
  getJob: token<GetJob>("dayReview-private:getJob"),
  getReasons: token<GetReasons>("dayReview-private:getReasons"),
  acceptReport: token<AcceptReport>("dayReview-private:acceptReport"),
  updateReport: token<UpdateReport>("dayReview-private:updateReport"),
  acceptAllReports: token<AcceptAllReports>(
    "dayReview-private:acceptAllReports",
  ),
};
