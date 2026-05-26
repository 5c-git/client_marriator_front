import { token } from "brandi";

import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";
import type { PostChangeUserPhoneSuccess } from "~/api/_personal/postChangeUserPhone/postChangeUserPhoneSuccess.schema";
import type { PostChangeUserPhoneError } from "~/api/_personal/postChangeUserPhone/postChangeUserPhoneError.schema";
import type { PostPersonalSetUserEmailSuccess } from "~/api/postPersonalSetUserEmail/postPersonalSetUserEmailSuccess.schema";
import type { PostPersonalSetUserEmailError } from "~/api/postPersonalSetUserEmail/postPersonalSetUserEmailError.schema";

export type FetchUserInfo = (
  accessToken: string,
) => Promise<GetUserInfoSuccess>;

export type ChangeUserPhone = (
  accessToken: string,
  phone: string,
) => Promise<PostChangeUserPhoneSuccess | PostChangeUserPhoneError>;

export type SetPersonalUserEmail = (
  accessToken: string,
  email: string,
) => Promise<PostPersonalSetUserEmailSuccess | PostPersonalSetUserEmailError>;

export type SetUserEmail = (email: string) => void;
export type SetUserPhone = (phone: string) => void;

export const profileMetaPrivateTokens = {
  fetchUserInfo: token<FetchUserInfo>(
    "profile-meta-private:fetchUserInfo",
  ),
  changeUserPhone: token<ChangeUserPhone>(
    "profile-meta-private:changeUserPhone",
  ),
  setPersonalUserEmail: token<SetPersonalUserEmail>(
    "profile-meta-private:setPersonalUserEmail",
  ),
  setUserEmail: token<SetUserEmail>("profile-meta-private:setUserEmail"),
  setUserPhone: token<SetUserPhone>("profile-meta-private:setUserPhone"),
};
