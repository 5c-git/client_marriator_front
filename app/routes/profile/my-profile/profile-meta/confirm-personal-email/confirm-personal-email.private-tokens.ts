import { token } from "brandi";

import type { PostPersonalCheckEmailCodeSuccess } from "~/api/_personal/postPersonalCheckEmailCode/postPersonalCheckEmailCodeSuccess.schema";
import type { PostPersonalCheckEmailCodeError } from "~/api/_personal/postPersonalCheckEmailCode/postPersonalCheckEmailCodeError.schema";
import type { SetPersonalUserEmail } from "../profile-meta.private-tokens";

export type CheckPersonalEmailCode = (
  accessToken: string,
  code: string,
) => Promise<
  PostPersonalCheckEmailCodeSuccess | PostPersonalCheckEmailCodeError
>;

export type GetUserEmail = () => string | null;

export const confirmPersonalEmailPrivateTokens = {
  setPersonalUserEmail: token<SetPersonalUserEmail>(
    "confirm-personal-email:setPersonalUserEmail",
  ),
  checkPersonalEmailCode: token<CheckPersonalEmailCode>(
    "confirm-personal-email:checkPersonalEmailCode",
  ),
  getUserEmail: token<GetUserEmail>("confirm-personal-email:getUserEmail"),
};
