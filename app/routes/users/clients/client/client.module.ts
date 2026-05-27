import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { ClientService } from "./client.service";
import { clientTokens } from "./client.tokens";
import { clientPrivateTokens } from "./client.private-tokens";

import { getCounterparty } from "~/api/_personal/_moderation/getCounterparty/getCounterparty";
import { getModerationSingleClient } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { postSetUserImg } from "~/api/_personal/_moderation/postSetUserImg/postSetUserImg";
import { postDelProject } from "~/api/_personal/_moderation/delProject/delProject";
import { postDelPlaceModeration } from "~/api/_personal/_moderation/postDelPlaceModeration/postDelPlaceModeration";
import { postConfirmUserRegister } from "~/api/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegister";
import { postSetCounterparty } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterparty";
import { postDeleteCounterparty } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterparty";

export const clientContainer = new Container().extend(appContainer);

clientContainer
  .bind(clientPrivateTokens.fetchModerationSingleClient)
  .toConstant((accessToken, userId) => getModerationSingleClient(accessToken, userId));

clientContainer
  .bind(clientPrivateTokens.fetchCounterparty)
  .toConstant((accessToken) => getCounterparty(accessToken));

clientContainer
  .bind(clientPrivateTokens.confirmUserRegister)
  .toConstant((accessToken, userId, confirm, fields) =>
    postConfirmUserRegister(accessToken, userId, confirm, fields),
  );

clientContainer
  .bind(clientPrivateTokens.setUserImg)
  .toConstant((accessToken, userId, projectId) =>
    postSetUserImg(accessToken, userId, projectId),
  );

clientContainer
  .bind(clientPrivateTokens.deleteProject)
  .toConstant((accessToken, userId, projectId) =>
    postDelProject(accessToken, userId, projectId),
  );

clientContainer
  .bind(clientPrivateTokens.deletePlaceModeration)
  .toConstant((accessToken, userId, projectId) =>
    postDelPlaceModeration(accessToken, userId, projectId),
  );

clientContainer
  .bind(clientPrivateTokens.setCounterparty)
  .toConstant((accessToken, userId, counterparties) =>
    postSetCounterparty(accessToken, userId, counterparties),
  );

clientContainer
  .bind(clientPrivateTokens.deleteCounterparty)
  .toConstant((accessToken, userId, counterpartyId) =>
    postDeleteCounterparty(accessToken, userId, counterpartyId),
  );

clientContainer
  .bind(clientTokens.clientService)
  .toInstance(ClientService)
  .inSingletonScope();

