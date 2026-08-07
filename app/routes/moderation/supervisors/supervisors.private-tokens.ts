import { token } from "brandi";

import type { GetModerationClientSuccess } from "~/api/_personal/_moderation/getModerationClient/getModerationClientSuccess.schema";

export type FetchModerationSupervisors = (
  accessToken: string,
  limit: number,
  role: "supervisor",
  search: string | null,
  sort: string | null,
  status: string | null,
  offset: string | null,
) => Promise<GetModerationClientSuccess>;

export const supervisorsPrivateTokens = {
  fetchModerationSupervisors: token<FetchModerationSupervisors>(
    "supervisors-private:fetchModerationSupervisors",
  ),
};
