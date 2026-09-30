import { token } from "brandi";

import type { GetModerationClientSuccess } from "~/api/_personal/_moderation/getModerationClient/getModerationClientSuccess.schema";

export type FetchModerationClients = (
  accessToken: string,
  limit: number,
  role: "client",
  search: string | null,
  sort: string | null,
  status: string | null,
  offset: string | null,
) => Promise<GetModerationClientSuccess>;

export const clientsPrivateTokens = {
  fetchModerationClients: token<FetchModerationClients>(
    "clients-private:fetchModerationClients",
  ),
};

