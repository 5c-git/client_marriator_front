import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type { ChangeUserPhone } from "../profile-meta.private-tokens";
import type {
  ConfirmChangeUserPhone,
  GetUserPhone,
} from "./confirm-personal-phone.private-tokens";

import { confirmPersonalPhonePrivateTokens } from "./confirm-personal-phone.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

export class ConfirmPersonalPhoneService {
  constructor(
    private readonly appService: AppService,
    private readonly changeUserPhone: ChangeUserPhone,
    private readonly confirmChangeUserPhone: ConfirmChangeUserPhone,
    private readonly getUserPhone: GetUserPhone,
  ) {}

  async resendCode(phone: string) {
    const accessToken = this.appService.getToken();
    const data = await this.changeUserPhone(accessToken, phone);

    if (!("result" in data)) {
      throw new Response("Не удалось отправить код повторно");
    }

    return data.result.code.ttl;
  }

  async verifyCode(code: string) {
    const accessToken = this.appService.getToken();
    const phone = this.getUserPhone();

    if (!phone) {
      throw new Response("Телефон пользователя не обнаружен!", {
        status: 401,
      });
    }

    return await this.confirmChangeUserPhone(accessToken, phone, code);
  }
}

injected(
  ConfirmPersonalPhoneService,
  appTokens.appService,
  confirmPersonalPhonePrivateTokens.changeUserPhone,
  confirmPersonalPhonePrivateTokens.confirmChangeUserPhone,
  confirmPersonalPhonePrivateTokens.getUserPhone,
);
