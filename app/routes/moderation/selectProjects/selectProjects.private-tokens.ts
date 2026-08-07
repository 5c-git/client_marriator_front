import { token } from "brandi";

import type { GetModerationSingleClientSuccess } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClientSuccess.schema";
import type { GetProjectSuccess } from "~/api/_personal/_moderation/getProject/getProjectSuccess.schema";
import type { PostSetProjectSuccess } from "~/api/_personal/_moderation/postSetProject/postSetProjectSuccess.schema";

export type FetchModerationSingleClient = (
  accessToken: string,
  userId: number,
) => Promise<GetModerationSingleClientSuccess>;

export type FetchProjects = (
  accessToken: string,
  userId: number,
) => Promise<GetProjectSuccess>;

export type SaveProjects = (
  accessToken: string,
  userId: string,
  projects: string[],
) => Promise<PostSetProjectSuccess>;

export const selectProjectsPrivateTokens = {
  fetchModerationSingleClient: token<FetchModerationSingleClient>(
    "users-selectProjects-private:fetchModerationSingleClient",
  ),
  fetchProjects: token<FetchProjects>("users-selectProjects-private:fetchProjects"),
  saveProjects: token<SaveProjects>("users-selectProjects-private:saveProjects"),
};
