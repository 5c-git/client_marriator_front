import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type { SetPersonalUserEmail } from "../profile-meta.private-tokens";
import type {
  CheckPersonalEmailCode,
} from "./confirm-personal-email.private-tokens";

import { confirmPersonalEmailPrivateTokens } from "./confirm-personal-email.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

export class ConfirmPersonalEmailService {
  constructor(
    private readonly appService: AppService,
    private readonly setPersonalUserEmail: SetPersonalUserEmail,
    private readonly checkPersonalEmailCode: CheckPersonalEmailCode,
  ) {}

  async resendCode(email: string) {
    const accessToken = this.appService.getToken();
    const data = await this.setPersonalUserEmail(accessToken, email);

    if (!("result" in data)) {
      throw new Response("Не удалось отправить код повторно");
    }

    return data.result.code.ttl;
  }

  async verifyCode(code: string) {
    const accessToken = this.appService.getToken();

    return await this.checkPersonalEmailCode(accessToken, code);
  }
}

injected(
  ConfirmPersonalEmailService,
  appTokens.appService,
  confirmPersonalEmailPrivateTokens.setPersonalUserEmail,
  confirmPersonalEmailPrivateTokens.checkPersonalEmailCode,
);
