import { token } from "brandi";
import type { State } from "~/store/store";

export type GetAccessToken = () => string | null;
export type GetUserRole = () => State["userRole"];

export const appPrivateTokens = {
  getAccessToken: token<GetAccessToken>("appContainer:getAccessToken"),
  getUserRole: token<GetUserRole>("appContainer:getUserRole"),
};
