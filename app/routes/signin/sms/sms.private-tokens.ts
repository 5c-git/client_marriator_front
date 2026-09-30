import { token } from "brandi";

import type { PostSendPhoneSuccess } from "~/api/postSendPhone/postSendPhoneSuccess.schema";
import type { PostSendPhoneErrorTimer } from "~/api/postSendPhone/postSendPhoneErrorTimer.schema";
import type { PostCheckCodeSuccess } from "~/api/postCheckCode/postCheckCodeSuccess.schema";
import type { PostCheckCodeError } from "~/api/postCheckCode/postCheckCodeError.schema";

export type SendPhone = (
  phone: string,
) => Promise<PostSendPhoneSuccess | PostSendPhoneErrorTimer>;

export type CheckCode = (
  phone: string,
  code: string,
) => Promise<PostCheckCodeSuccess | PostCheckCodeError>;

export type GetUserPhone = () => string | null;

export type RememberAccessToken = (token: string) => void;
export type RememberRefreshToken = (token: string) => void;

export const smsPrivateTokens = {
  sendPhone: token<SendPhone>("sms-private:sendPhone"),
  checkCode: token<CheckCode>("sms-private:checkCode"),
  getUserPhone: token<GetUserPhone>("sms-private:getUserPhone"),
  rememberAccessToken: token<RememberAccessToken>(
    "sms-private:rememberAccessToken",
  ),
  rememberRefreshToken: token<RememberRefreshToken>(
    "sms-private:rememberRefreshToken",
  ),
};
