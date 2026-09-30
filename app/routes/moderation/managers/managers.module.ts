import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { useStore } from "~/store/store";
import { getModerationClient } from "~/api/_personal/_moderation/getModerationClient/getModerationClient";

import { managersPrivateTokens } from "./managers.private-tokens";
import { ManagersService } from "./managers.service";
import { managersTokens } from "./managers.tokens";

export const managersContainer = new Container().extend(appContainer);

managersContainer
  .bind(managersPrivateTokens.fetchModerationManagers)
  .toConstant((accessToken, limit, role, search, sort, status, offset) =>
    getModerationClient(accessToken, limit, role, search, sort, status, offset),
  );

managersContainer
  .bind(managersTokens.managersService)
  .toInstance(ManagersService)
  .inSingletonScope();
