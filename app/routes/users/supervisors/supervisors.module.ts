import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { getModerationClient } from "~/api/_personal/_moderation/getModerationClient/getModerationClient";

import { supervisorsPrivateTokens } from "./supervisors.private-tokens";
import { SupervisorsService } from "./supervisors.service";
import { supervisorsTokens } from "./supervisors.tokens";

export const supervisorsContainer = new Container().extend(appContainer);

supervisorsContainer
  .bind(supervisorsPrivateTokens.fetchModerationSupervisors)
  .toConstant((accessToken, limit, role, search, sort, status, offset) =>
    getModerationClient(accessToken, limit, role, search, sort, status, offset),
  );

supervisorsContainer
  .bind(supervisorsTokens.supervisorsService)
  .toInstance(SupervisorsService)
  .inSingletonScope();
