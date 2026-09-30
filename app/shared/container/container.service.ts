import { injected } from "brandi";

import type {
  GetAccessToken,
  GetUserRole,
  Logout,
} from "./container.private-tokens";
import { appPrivateTokens } from "./container.private-tokens";

export class AppService {
  constructor(
    private readonly getAccessToken: GetAccessToken,
    private readonly getRole: GetUserRole,
    private readonly exit: Logout,
  ) {}

  getToken(): string {
    const token = this.getAccessToken();
    if (!token) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }
    return token;
  }

  getUserRole() {
    return this.getRole();
  }

  logout() {
    return this.exit();
  }
}

injected(
  AppService,
  appPrivateTokens.getAccessToken,
  appPrivateTokens.getUserRole,
  appPrivateTokens.logout,
);
