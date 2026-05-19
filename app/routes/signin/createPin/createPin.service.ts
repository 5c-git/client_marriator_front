import { injected } from "brandi";

import type {
  SetUserPin,
  GetUserRole,
} from "./createPin.private-tokens";
import { createPinPrivateTokens } from "./createPin.private-tokens";
import type { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class CreatePinService {
  constructor(
    private readonly setUserPin: SetUserPin,
    private readonly getUserRole: GetUserRole,
    private readonly appService : AppService
  ) {}

  async setPin(pin: string) {
    const token = this.appService.getToken()

    return await this.setUserPin(token, pin);
  }

  getRedirectPath(type: string | null) {
    const userRole = this.getUserRole();

    if (type === "restore") {
      return "/signin/pin";
    }

    if (userRole === "recruiter") {
      return "/signin/client/recruiter";
    }

    if (userRole !== "specialist") {
      return "/signin/client/meta";
    }

    return "/registration/step1";
  }
}

injected(
  CreatePinService,
  createPinPrivateTokens.setUserPin,
  createPinPrivateTokens.getUserRole,
  appTokens.appService
);
