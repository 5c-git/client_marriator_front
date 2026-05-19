import { token } from "brandi";

import type { PostCheckPinSuccess } from "~/api/postCheckPin/postCheckPinSuccess.schema";
import type { PostCheckPinError } from "~/api/postCheckPin/postCheckPinError.schema";
import type { PostStartRestorePinSuccess } from "~/api/postStartRestorePin/postStartRestorePinSuccess.schema";
import type { PostStartRestorePinError } from "~/api/postStartRestorePin/postStartRestorePinError.schema";
import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";
import type { determineRole } from "~/shared/determineRole";

export type CheckPin = (
  accessToken: string,
  pin: string,
) => Promise<PostCheckPinSuccess | PostCheckPinError>;

export type StartRestorePin = (
  accessToken: string,
) => Promise<PostStartRestorePinSuccess | PostStartRestorePinError>;

export type GetUserInfo = (accessToken: string) => Promise<GetUserInfoSuccess>;

export type RememberAccessToken = (token: string) => void;
export type RememberRefreshToken = (token: string) => void;

export type SetUserRole = (
  userRole: "admin" | "supervisor" | "manager" | "client" | "specialist",
) => void;

export type SetUserId = (userId: number) => void;

export type DetermineUserRole = typeof determineRole;

export const pinPrivateTokens = {
  checkPin: token<CheckPin>("pin-private:checkPin"),
  startRestorePin: token<StartRestorePin>("pin-private:startRestorePin"),
  getUserInfo: token<GetUserInfo>("pin-private:getUserInfo"),
  rememberAccessToken: token<RememberAccessToken>(
    "pin-private:rememberAccessToken",
  ),
  rememberRefreshToken: token<RememberRefreshToken>(
    "pin-private:rememberRefreshToken",
  ),
  setUserRole: token<SetUserRole>("pin-private:setUserRole"),
  setUserId: token<SetUserId>("pin-private:setUserId"),
  determineUserRole: token<DetermineUserRole>("pin-private:determineUserRole"),
};
