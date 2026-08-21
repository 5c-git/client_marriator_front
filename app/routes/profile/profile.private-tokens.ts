import { token } from "brandi";

import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";

export type FetchUserInfoCached = (
  accessToken: string,
) => Promise<GetDataSuccess>;

export type ChangeUserRole = (newRole: "supervisor" | "specialist") => void;

export type ClearAppStore = () => void;

export type InvalidateUserInfoQueries = () => void;

export const profilePrivateTokens = {
  fetchUserInfoCached: token<FetchUserInfoCached>(
    "profile-private:fetchUserInfoCached",
  ),
  changeUserRole: token<ChangeUserRole>("profile-private:changeUserRole"),
  clearAppStore: token<ClearAppStore>("profile-private:clearAppStore"),
  invalidateUserInfoQueries: token<InvalidateUserInfoQueries>(
    "profile-private:invalidateUserInfoQueries",
  ),
};
