import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { getModerationSingleClient } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { getProject } from "~/api/_personal/_moderation/getProject/getProject";
import { postSetProject } from "~/api/_personal/_moderation/postSetProject/postSetProject";

import { selectProjectsPrivateTokens } from "./selectProjects.private-tokens";
import { SelectProjectsService } from "./selectProjects.service";
import { selectProjectsTokens } from "./selectProjects.tokens";

export const selectProjectsContainer = new Container().extend(appContainer);

selectProjectsContainer
  .bind(selectProjectsPrivateTokens.fetchModerationSingleClient)
  .toConstant((accessToken, userId) =>
    getModerationSingleClient(accessToken, userId),
  );

selectProjectsContainer
  .bind(selectProjectsPrivateTokens.fetchProjects)
  .toConstant((accessToken, userId) => getProject(accessToken, userId));

selectProjectsContainer
  .bind(selectProjectsPrivateTokens.saveProjects)
  .toConstant((accessToken, userId, projects) =>
    postSetProject(accessToken, userId, projects),
  );

selectProjectsContainer
  .bind(selectProjectsTokens.selectProjectsService)
  .toInstance(SelectProjectsService)
  .inSingletonScope();
