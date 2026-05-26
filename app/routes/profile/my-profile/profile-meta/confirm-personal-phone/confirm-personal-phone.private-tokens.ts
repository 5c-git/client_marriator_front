import { token } from "brandi";

import type { PostConfirmChangeUserPhoneSuccess } from "~/api/_personal/postConfirmChangeUserPhone/postConfirmChangeUserPhoneSuccess.schema";
import type { PostConfirmChangeUserPhoneError } from "~/api/_personal/postConfirmChangeUserPhone/postConfirmChangeUserPhoneError.schema";
import type { ChangeUserPhone } from "../profile-meta.private-tokens";

export type ConfirmChangeUserPhone = (
  accessToken: string,
  phone: string,
  code: string,
) => Promise<
  PostConfirmChangeUserPhoneSuccess | PostConfirmChangeUserPhoneError
>;

export type GetUserPhone = () => string | null;

export const confirmPersonalPhonePrivateTokens = {
  changeUserPhone: token<ChangeUserPhone>(
    "confirm-personal-phone:changeUserPhone",
  ),
  confirmChangeUserPhone: token<ConfirmChangeUserPhone>(
    "confirm-personal-phone:confirmChangeUserPhone",
  ),
  getUserPhone: token<GetUserPhone>("confirm-personal-phone:getUserPhone"),
};
