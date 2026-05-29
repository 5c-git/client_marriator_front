import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { useStore } from "~/store/store";
import { getCounterparty } from "~/api/_personal/_moderation/getCounterparty/getCounterparty";
import { getModerationSingleClient } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { getManager } from "~/api/_personal/getManager/getManager";
import { postSetUserImg } from "~/api/_personal/_moderation/postSetUserImg/postSetUserImg";
import { postDelProject } from "~/api/_personal/_moderation/delProject/delProject";
import { postDelPlaceModeration } from "~/api/_personal/_moderation/postDelPlaceModeration/postDelPlaceModeration";
import { postConfirmUserRegister } from "~/api/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegister";
import { postDelManager } from "~/api/_personal/postDelManager/postDelManager";
import { postSetManagers } from "~/api/_personal/postSetManagers/postSetManagers";
import { postSetCounterparty } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterparty";
import { postDeleteCounterparty } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterparty";

import { SupervisorService } from "./supervisor.service";
import { supervisorTokens } from "./supervisor.tokens";
import { supervisorPrivateTokens } from "./supervisor.private-tokens";

export const supervisorContainer = new Container().extend(appContainer);

supervisorContainer
  .bind(supervisorPrivateTokens.getUserRole)
  .toConstant(() => useStore.getState().userRole);

supervisorContainer
  .bind(supervisorPrivateTokens.fetchModerationSingleSupervisor)
  .toConstant((accessToken, userId) => getModerationSingleClient(accessToken, userId));

supervisorContainer
  .bind(supervisorPrivateTokens.fetchCounterparty)
  .toConstant((accessToken) => getCounterparty(accessToken));

supervisorContainer
  .bind(supervisorPrivateTokens.fetchManagers)
  .toConstant((accessToken, userId) => getManager(accessToken, userId));

supervisorContainer
  .bind(supervisorPrivateTokens.confirmUserRegister)
  .toConstant((accessToken, userId, confirm, fields) =>
    postConfirmUserRegister(accessToken, userId.toString(), confirm, fields),
  );

supervisorContainer
  .bind(supervisorPrivateTokens.setUserImg)
  .toConstant((accessToken, userId, projectId) =>
    postSetUserImg(accessToken, userId.toString(), projectId.toString()),
  );

supervisorContainer
  .bind(supervisorPrivateTokens.deleteProject)
  .toConstant((accessToken, userId, projectId) =>
    postDelProject(accessToken, userId.toString(), projectId.toString()),
  );

supervisorContainer
  .bind(supervisorPrivateTokens.deletePlaceModeration)
  .toConstant((accessToken, userId, projectId) =>
    postDelPlaceModeration(accessToken, userId.toString(), projectId.toString()),
  );

supervisorContainer
  .bind(supervisorPrivateTokens.setManagers)
  .toConstant((accessToken, userId, managers) =>
    postSetManagers(accessToken, userId.toString(), managers),
  );

supervisorContainer
  .bind(supervisorPrivateTokens.deleteManager)
  .toConstant((accessToken, userId, managerId) =>
    postDelManager(accessToken, userId.toString(), managerId.toString()),
  );

supervisorContainer
  .bind(supervisorPrivateTokens.setCounterparty)
  .toConstant((accessToken, userId, counterparties) =>
    postSetCounterparty(accessToken, userId.toString(), counterparties),
  );

supervisorContainer
  .bind(supervisorPrivateTokens.deleteCounterparty)
  .toConstant((accessToken, userId, counterpartyId) =>
    postDeleteCounterparty(accessToken, userId.toString(), counterpartyId.toString()),
  );

supervisorContainer
  .bind(supervisorTokens.supervisorService)
  .toInstance(SupervisorService)
  .inSingletonScope();
