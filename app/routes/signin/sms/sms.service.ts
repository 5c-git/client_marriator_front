import { injected } from "brandi";

import type {
  SendPhone,
  CheckCode,
  GetUserPhone,
  RememberAccessToken,
  RememberRefreshToken,
} from "./sms.private-tokens";
import { smsPrivateTokens } from "./sms.private-tokens";

export class SmsService {
  constructor(
    private readonly sendPhone: SendPhone,
    private readonly checkCode: CheckCode,
    private readonly getUserPhone: GetUserPhone,
    private readonly rememberAccessToken: RememberAccessToken,
    private readonly rememberRefreshToken: RememberRefreshToken,
  ) {}

  getStoredPhone() {
    return this.getUserPhone();
  }

  async resendCode(phone: string) {
    return await this.sendPhone(phone);
  }

  async verifyCode(phone: string, code: string) {
    return await this.checkCode(phone, code);
  }

  saveAuthTokens(accessToken: string, refreshToken: string) {
    this.rememberAccessToken(accessToken);
    this.rememberRefreshToken(refreshToken);
  }
}

injected(
  SmsService,
  smsPrivateTokens.sendPhone,
  smsPrivateTokens.checkCode,
  smsPrivateTokens.getUserPhone,
  smsPrivateTokens.rememberAccessToken,
  smsPrivateTokens.rememberRefreshToken,
);
