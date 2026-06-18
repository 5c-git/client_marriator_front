import { injected } from "brandi";

import type { GetAccessToken, GetUserRole } from "./container.private-tokens";
import { appPrivateTokens } from "./container.private-tokens";

export class AppService {
  constructor(
    private readonly getAccessToken: GetAccessToken,
    private readonly getRole: GetUserRole,
  ) {}

  getToken(): string {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error("Токен авторизации не обнаружен!");
    }
    return token;
  }

  getUserRole() {
    return this.getRole();
  }
}

injected(
  AppService,
  appPrivateTokens.getAccessToken,
  appPrivateTokens.getUserRole,
);
