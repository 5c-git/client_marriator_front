import { token } from "brandi";

import type { GetJobSuccess } from "~/api/_personal/getJob/getJobSuccess.schema";
import type { PostAcceptBidSuccess } from "~/api/_personal/postAcceptBid/postAcceptBidSuccess.schema";
import type { PostStartDaySuccess } from "~/api/_personal/postStartDay/postStartDaySuccess.schema";
import type { PostRejectBidSuccess } from "~/api/_personal/postRejectBid/postRejectBidSuccess.schema";
import type { PostEndDaySuccess } from "~/api/_personal/postEndDay/postEndDaySuccess.schema";
import type { PostPayReportSuccess } from "~/api/_personal/postPayReport/postPayReportSuccess.schema";
import type {
  GetSettingsFromKeySuccess,
  Setting,
} from "~/api/_settings/getSettingsFromKey/getSettingsFromKeySuccess.schema";

export type GetJob = (
  accessToken: string,
  specialistId: string,
  bidId: string,
) => Promise<GetJobSuccess>;

export type AcceptBid = (
  accessToken: string,
  bidId: string,
) => Promise<PostAcceptBidSuccess>;

export type StartDay = (
  accessToken: string,
  bidId: string,
) => Promise<PostStartDaySuccess>;

export type RejectBid = (
  accessToken: string,
  bidId: string,
) => Promise<PostRejectBidSuccess>;

export type EndDay = (
  accessToken: string,
  bidId: string,
  files?: File[],
) => Promise<PostEndDaySuccess>;

export type PayReport = (
  accessToken: string,
  reportId: string,
) => Promise<PostPayReportSuccess>;

export type GetSettings = (
  accessToken: string,
  setting: Setting,
) => Promise<GetSettingsFromKeySuccess>;

export const jobPrivateTokens = {
  getJob: token<GetJob>("job-private:getJob"),
  acceptBid: token<AcceptBid>("job-private:acceptBid"),
  startDay: token<StartDay>("job-private:startDay"),
  rejectBid: token<RejectBid>("job-private:rejectBid"),
  endDay: token<EndDay>("job-private:endBid"),
  payReport: token<PayReport>("job-private:payReport"),
  getSettings: token<GetSettings>("job-private:getSettings"),
};
