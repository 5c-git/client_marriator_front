import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { getCounterparty } from "~/api/_personal/_moderation/getCounterparty/getCounterparty";
import { getModerationSingleClient } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { getSupervisors } from "~/api/_personal/_moderation/getSupervisors/getSupervisors";
import { postSetUserImg } from "~/api/_personal/_moderation/postSetUserImg/postSetUserImg";
import { postDelProject } from "~/api/_personal/_moderation/delProject/delProject";
import { postDelPlaceModeration } from "~/api/_personal/_moderation/postDelPlaceModeration/postDelPlaceModeration";
import { postConfirmUserRegister } from "~/api/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegister";
import { postSetSupervisors } from "~/api/_personal/_moderation/postSetSupervisors/postSetSupervisors";
import { postDelSupervisor } from "~/api/_personal/_moderation/postDelSupervisor/postDelSupervisor";
import { postSetCounterparty } from "~/api/_personal/_moderation/postSetCounterparty/postSetCounterparty";
import { postDeleteCounterparty } from "~/api/_personal/_moderation/postDeleteCounterparty/postDeleteCounterparty";

import { ManagerService } from "./manager.service";
import { managerTokens } from "./manager.tokens";
import { managerPrivateTokens } from "./manager.private-tokens";

export const managerContainer = new Container().extend(appContainer);

managerContainer
  .bind(managerPrivateTokens.fetchModerationSingleManager)
  .toConstant((accessToken, userId) => getModerationSingleClient(accessToken, userId));

managerContainer
  .bind(managerPrivateTokens.fetchCounterparty)
  .toConstant((accessToken) => getCounterparty(accessToken));

managerContainer
  .bind(managerPrivateTokens.fetchSupervisors)
  .toConstant((accessToken, userId) => getSupervisors(accessToken, userId));

managerContainer
  .bind(managerPrivateTokens.confirmUserRegister)
  .toConstant((accessToken, userId, confirm, fields) =>
    postConfirmUserRegister(accessToken, userId.toString(), confirm, fields),
  );

managerContainer
  .bind(managerPrivateTokens.setUserImg)
  .toConstant((accessToken, userId, projectId) =>
    postSetUserImg(accessToken, userId.toString(), projectId.toString()),
  );

managerContainer
  .bind(managerPrivateTokens.deleteProject)
  .toConstant((accessToken, userId, projectId) =>
    postDelProject(accessToken, userId.toString(), projectId.toString()),
  );

managerContainer
  .bind(managerPrivateTokens.deletePlaceModeration)
  .toConstant((accessToken, userId, projectId) =>
    postDelPlaceModeration(accessToken, userId.toString(), projectId.toString()),
  );

managerContainer
  .bind(managerPrivateTokens.setSupervisors)
  .toConstant((accessToken, userId, supervisors) =>
    postSetSupervisors(accessToken, userId.toString(), supervisors),
  );

managerContainer
  .bind(managerPrivateTokens.deleteSupervisor)
  .toConstant((accessToken, userId, supervisorId) =>
    postDelSupervisor(accessToken, userId.toString(), supervisorId.toString()),
  );

managerContainer
  .bind(managerPrivateTokens.setCounterparty)
  .toConstant((accessToken, userId, counterparties) =>
    postSetCounterparty(accessToken, userId.toString(), counterparties),
  );

managerContainer
  .bind(managerPrivateTokens.deleteCounterparty)
  .toConstant((accessToken, userId, counterpartyId) =>
    postDeleteCounterparty(accessToken, userId.toString(), counterpartyId.toString()),
  );

managerContainer
  .bind(managerTokens.managerService)
  .toInstance(ManagerService)
  .inSingletonScope();
