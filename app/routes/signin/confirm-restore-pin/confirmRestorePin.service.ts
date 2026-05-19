import { injected } from "brandi";

import type {
  StartRestorePin,
  CheckCodeRestore,
  RememberAccessToken,
  RememberRefreshToken,
} from "./confirmRestorePin.private-tokens";
import { confirmRestorePinPrivateTokens } from "./confirmRestorePin.private-tokens";
import type { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class ConfirmRestorePinService {
  constructor(
    private readonly startRestorePin: StartRestorePin,
    private readonly checkCodeRestore: CheckCodeRestore,
    private readonly rememberAccessToken: RememberAccessToken,
    private readonly rememberRefreshToken: RememberRefreshToken,
    private readonly appService: AppService,
  ) {}

  async resendCode() {
    const accessToken = this.appService.getToken();
    const data = await this.startRestorePin(accessToken);

    this.saveAuthTokens(
      data.result.token.access_token,
      data.result.token.refresh_token,
    );

    return data.result.code.ttl;
  }

  async verifyCode(code: string) {
    const accessToken = this.appService.getToken();
    const data = await this.checkCodeRestore(accessToken, code);

    if ("token" in data.result) {
      this.saveAuthTokens(
        data.result.token.access_token,
        data.result.token.refresh_token,
      );
    }

    return data;
  }

  saveAuthTokens(accessToken: string, refreshToken: string) {
    this.rememberAccessToken(accessToken);
    this.rememberRefreshToken(refreshToken);
  }
}

injected(
  ConfirmRestorePinService,
  confirmRestorePinPrivateTokens.startRestorePin,
  confirmRestorePinPrivateTokens.checkCodeRestore,
  confirmRestorePinPrivateTokens.rememberAccessToken,
  confirmRestorePinPrivateTokens.rememberRefreshToken,
  appTokens.appService,
);
