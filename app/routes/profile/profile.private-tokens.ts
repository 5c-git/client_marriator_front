import { token } from "brandi";

import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";

export type FetchUserInfoCached = (
  accessToken: string,
) => Promise<GetUserInfoSuccess>;

export type ClearAppStore = () => void;

export type InvalidateUserInfoQueries = () => void;

export const profilePrivateTokens = {
  fetchUserInfoCached: token<FetchUserInfoCached>(
    "profile-private:fetchUserInfoCached",
  ),
  clearAppStore: token<ClearAppStore>("profile-private:clearAppStore"),
  invalidateUserInfoQueries: token<InvalidateUserInfoQueries>(
    "profile-private:invalidateUserInfoQueries",
  ),
};
