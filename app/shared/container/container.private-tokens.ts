import { token } from "brandi";

export type GetAccessToken = () => string | null;

export const appPrivateTokens = {
    getAccessToken: token<GetAccessToken>("appContainer:getAccessToken"),
  };