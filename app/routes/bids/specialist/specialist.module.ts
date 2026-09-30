import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { specialistPrivateTokens } from "./specialist.private-tokens";
import { specialistTokens } from "./specialist.tokens";
import { SpecialistService } from "./specialist.service";

import { getJob } from "~/api/_personal/getJob/getJob";
import { postAcceptSpecialist } from "~/api/_personal/postAcceptSpecialist/postAcceptSpecialist";
import { postEndSpecialistJob } from "~/api/_personal/postEndSpecialistJob/postEndSpecialistJob";
import { postPayReportForManager } from "~/api/_personal/postPayReportForManager/postPayReportForManager";

export const specialistContainer = new Container().extend(appContainer);

specialistContainer
  .bind(specialistPrivateTokens.getJob)
  .toConstant((accessToken, specialistId, bidId) =>
    getJob(accessToken, specialistId, bidId),
  );

specialistContainer
  .bind(specialistPrivateTokens.acceptSpecialist)
  .toConstant((accessToken, bidId, specialistId) =>
    postAcceptSpecialist(accessToken, bidId, specialistId),
  );

specialistContainer
  .bind(specialistPrivateTokens.endSpecialistJob)
  .toConstant((accessToken, bidId, specialistId) =>
    postEndSpecialistJob(accessToken, bidId, specialistId),
  );

specialistContainer
  .bind(specialistPrivateTokens.payReportForManager)
  .toConstant((accessToken, reportId) =>
    postPayReportForManager(accessToken, reportId),
  );

specialistContainer
  .bind(specialistTokens.specialistService)
  .toInstance(SpecialistService)
  .inSingletonScope();
