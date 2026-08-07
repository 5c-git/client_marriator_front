import { token } from "brandi";

import type { GetModerationClientSuccess } from "~/api/_personal/_moderation/getModerationClient/getModerationClientSuccess.schema";

export type FetchModerationManagers = (
  accessToken: string,
  limit: number,
  role: "manager",
  search: string | null,
  sort: string | null,
  status: string | null,
  offset: string | null,
) => Promise<GetModerationClientSuccess>;

export const managersPrivateTokens = {
  fetchModerationManagers: token<FetchModerationManagers>(
    "managers-private:fetchModerationManagers",
  ),
};
