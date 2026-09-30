import { token } from "brandi";

import type { PostStartRestorePinSuccess } from "~/api/postStartRestorePin/postStartRestorePinSuccess.schema";
import type { PostStartRestorePinError } from "~/api/postStartRestorePin/postStartRestorePinError.schema";
import type { PostCheckCodeRestoreSuccess } from "~/api/postCheckCodeRestore/postCheckCodeRestoreSuccess.schema";
import type { PostCheckCodeRestoreError } from "~/api/postCheckCodeRestore/postCheckCodeRestoreError.schema";

export type StartRestorePin = (
  accessToken: string,
) => Promise<PostStartRestorePinSuccess | PostStartRestorePinError>;

export type CheckCodeRestore = (
  accessToken: string,
  code: string,
) => Promise<PostCheckCodeRestoreSuccess | PostCheckCodeRestoreError>;

export type RememberAccessToken = (token: string) => void;
export type RememberRefreshToken = (token: string) => void;

export const confirmRestorePinPrivateTokens = {
  startRestorePin: token<StartRestorePin>(
    "confirmRestorePin-private:startRestorePin",
  ),
  checkCodeRestore: token<CheckCodeRestore>(
    "confirmRestorePin-private:checkCodeRestore",
  ),
  rememberAccessToken: token<RememberAccessToken>(
    "confirmRestorePin-private:rememberAccessToken",
  ),
  rememberRefreshToken: token<RememberRefreshToken>(
    "confirmRestorePin-private:rememberRefreshToken",
  ),
};
