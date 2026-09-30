import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { jobPrivateTokens } from "./job.private-tokens";
import { jobTokens } from "./job.tokens";
import { JobService } from "./job.service";

import { getJob } from "~/api/_personal/getJob/getJob";
import { postAcceptBid } from "~/api/_personal/postAcceptBid/postAcceptBid";
import { postStartDay } from "~/api/_personal/postStartDay/postStartDay";
import { postRejectBid } from "~/api/_personal/postRejectBid/postRejectBid";
import { postEndDay } from "~/api/_personal/postEndDay/postEndDay";
import { postPayReport } from "~/api/_personal/postPayReport/postPayReport";
import { getSettingsFromKey } from "~/api/_settings/getSettingsFromKey/getSettingsFromKey";

export const jobContainer = new Container().extend(appContainer);

jobContainer
  .bind(jobPrivateTokens.getJob)
  .toConstant((accessToken, specialistId, bidId) =>
    getJob(accessToken, specialistId, bidId),
  );

jobContainer
  .bind(jobPrivateTokens.acceptBid)
  .toConstant((accessToken, bidId) => postAcceptBid(accessToken, bidId));

jobContainer
  .bind(jobPrivateTokens.startDay)
  .toConstant((accessToken, bidId) => postStartDay(accessToken, bidId));

jobContainer
  .bind(jobPrivateTokens.rejectBid)
  .toConstant((accessToken, bidId) => postRejectBid(accessToken, bidId));

jobContainer
  .bind(jobPrivateTokens.endDay)
  .toConstant((accessToken, bidId, files) =>
    postEndDay(accessToken, bidId, files),
  );

jobContainer
  .bind(jobPrivateTokens.payReport)
  .toConstant((accessToken, reportId) => postPayReport(accessToken, reportId));

jobContainer
  .bind(jobPrivateTokens.getSettings)
  .toConstant((accessToken, setting) =>
    getSettingsFromKey(accessToken, setting),
  );

jobContainer
  .bind(jobTokens.jobService)
  .toInstance(JobService)
  .inTransientScope();
