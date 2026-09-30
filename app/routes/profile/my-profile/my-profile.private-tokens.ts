import { token } from "brandi";

import type { GetUserPersonalMenuSuccess } from "~/api/_personal/getUserPersonalMenu/getUserPersonalMenu.schema";

export type FetchUserPersonalMenuCached = (
  accessToken: string,
) => Promise<GetUserPersonalMenuSuccess>;

export const myProfilePrivateTokens = {
  fetchUserPersonalMenuCached: token<FetchUserPersonalMenuCached>(
    "my-profile-private:fetchUserPersonalMenuCached",
  ),
};
