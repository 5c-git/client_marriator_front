import { token } from "brandi";

import type { GetUserByHashSuccess } from "~/api/getUserByHash/getUserByHashSuccess.schema";
import type { PostSendPhoneSuccess } from "~/api/postSendPhone/postSendPhoneSuccess.schema";
import type { PostSendPhoneErrorTimer } from "~/api/postSendPhone/postSendPhoneErrorTimer.schema";

export type GetUserByHash = (
  accessToken: string,
  hash: string,
) => Promise<GetUserByHashSuccess>;

export type SendPhone = (
  phone: string,
) => Promise<PostSendPhoneSuccess | PostSendPhoneErrorTimer>;

export type SetUserPhone = (phone: string) => void;

export type SetUserRole = (
  role: GetUserByHashSuccess["result"]["role"],
) => void;

export const phonePrivateTokens = {
  getUserByHash: token<GetUserByHash>("client-phone-private:getUserByHash"),
  sendPhone: token<SendPhone>("client-phone-private:sendPhone"),
  setUserPhone: token<SetUserPhone>("client-phone-private:setUserPhone"),
  setUserRole: token<SetUserRole>("client-phone-private:setUserRole"),
};
