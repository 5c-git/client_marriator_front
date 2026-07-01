import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { dayReviewPrivateTokens } from "./day-review.private-tokens";
import { dayReviewTokens } from "./day-review.tokens";

import { getJob } from "~/api/_personal/getJob/getJob";
import { getReasons } from "~/api/_personal/getReasons/getReasons";
import { postAcceptReport } from "~/api/_personal/postAcceptReport/postAcceptReport";
import { postUpdateReport } from "~/api/_personal/postUpdateReport/postUpdateReport";
import { postAcceptAllReportJob } from "~/api/_personal/postAcceptAllReportJob/postAcceptAllReportJob";

export const dayReviewContainer = new Container().extend(appContainer);
import { DayReviewService } from "./day-review.service";

dayReviewContainer
  .bind(dayReviewPrivateTokens.getJob)
  .toConstant((accessToken, specialistId, bidId) =>
    getJob(accessToken, specialistId, bidId),
  );

dayReviewContainer
  .bind(dayReviewPrivateTokens.getReasons)
  .toConstant((accessToken) => getReasons(accessToken));

dayReviewContainer
  .bind(dayReviewPrivateTokens.acceptReport)
  .toConstant((accessToken, payload) => postAcceptReport(accessToken, payload));

dayReviewContainer
  .bind(dayReviewPrivateTokens.updateReport)
  .toConstant((accessToken, payload) => postUpdateReport(accessToken, payload));

dayReviewContainer
  .bind(dayReviewPrivateTokens.acceptAllReports)
  .toConstant((accessToken, payload) =>
    postAcceptAllReportJob(accessToken, payload),
  );

dayReviewContainer
  .bind(dayReviewTokens.dayReviewService)
  .toInstance(DayReviewService)
  .inSingletonScope();
