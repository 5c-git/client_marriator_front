import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { ClientsService } from "./clients.service";
import { clientsTokens } from "./clients.tokens";
import { clientsPrivateTokens } from "./clients.private-tokens";

import { getModerationClient } from "~/api/_personal/_moderation/getModerationClient/getModerationClient";

export const clientsContainer = new Container().extend(appContainer);

clientsContainer
  .bind(clientsPrivateTokens.fetchModerationClients)
  .toConstant((accessToken, limit, role, search, sort, status, offset) =>
    getModerationClient(accessToken, limit, role, search, sort, status, offset),
  );

clientsContainer
  .bind(clientsTokens.clientsService)
  .toInstance(ClientsService)
  .inSingletonScope();

