import { token } from "brandi";

import type { State } from "~/store/store";
import type { GetModerationClientSuccess } from "~/api/_personal/_moderation/getModerationClient/getModerationClientSuccess.schema";

export type GetUserRole = () => State['userRole']

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
  getUserRole: token<GetUserRole>("managers-private:getUserRole"),
  fetchModerationManagers: token<FetchModerationManagers>(
    "managers-private:fetchModerationManagers",
  ),
};
