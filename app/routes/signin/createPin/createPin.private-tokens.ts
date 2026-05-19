import { token } from "brandi";

import type { PostSetUserPinSuccess } from "~/api/postSetUserPin/postSetUserPinSuccess.schema";
import type { PostSetUserPinUnauth } from "~/api/postSetUserPin/postSetUserPinUnauth.schema";

export type SetUserPin = (
  accessToken: string,
  pin: string,
) => Promise<PostSetUserPinSuccess | PostSetUserPinUnauth>;

export type GetUserRole = () =>
  | "admin"
  | "supervisor"
  | "manager"
  | "client"
  | "specialist"
  | "recruiter"
  | null;

export const createPinPrivateTokens = {
  setUserPin: token<SetUserPin>("createPin-private:setUserPin"),
  getUserRole: token<GetUserRole>("createPin-private:getUserRole"),
};
