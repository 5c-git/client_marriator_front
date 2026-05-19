import { injected } from "brandi";

import type {
  CheckPin,
  StartRestorePin,
  GetUserInfo,
  RememberAccessToken,
  RememberRefreshToken,
  SetUserRole,
  SetUserId,
  DetermineUserRole,
} from "./pin.private-tokens";
import { pinPrivateTokens } from "./pin.private-tokens";
import type { AppService } from "~/shared/container/container.service";

export class PinService {
  constructor(
    private readonly checkPin: CheckPin,
    private readonly startRestorePin: StartRestorePin,
    private readonly getUserInfo: GetUserInfo,
    private readonly rememberAccessToken: RememberAccessToken,
    private readonly rememberRefreshToken: RememberRefreshToken,
    private readonly setUserRole: SetUserRole,
    private readonly setUserId: SetUserId,
    private readonly determineUserRole: DetermineUserRole,
    private readonly appService: AppService,
  ) {}

  async verifyPin(pin: string) {
    const accessToken = this.appService.getToken();
    const data = await this.checkPin(accessToken, pin);

    if (data.status === "success") {
      this.saveAuthTokens(
        data.result.token.access_token,
        data.result.token.refresh_token,
      );
      await this.loadUserProfile();
    }

    return data;
  }

  async restorePin() {
    const accessToken = this.appService.getToken();
    const data = await this.startRestorePin(accessToken);

    this.saveAuthTokens(
      data.result.token.access_token,
      data.result.token.refresh_token,
    );

    return data;
  }

  saveAuthTokens(accessToken: string, refreshToken: string) {
    this.rememberAccessToken(accessToken);
    this.rememberRefreshToken(refreshToken);
  }

  private async loadUserProfile() {
    const accessToken = this.appService.getToken();
    const userData = await this.getUserInfo(accessToken);
    const currentRole = this.determineUserRole(userData.result.userData.roles);

    this.setUserRole(currentRole);
    this.setUserId(userData.result.userData.id);
  }
}

injected(
  PinService,
  pinPrivateTokens.checkPin,
  pinPrivateTokens.startRestorePin,
  pinPrivateTokens.getUserInfo,
  pinPrivateTokens.rememberAccessToken,
  pinPrivateTokens.rememberRefreshToken,
  pinPrivateTokens.setUserRole,
  pinPrivateTokens.setUserId,
  pinPrivateTokens.determineUserRole,
  pinPrivateTokens.appService,
);
