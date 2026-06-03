import { injected } from "brandi";

import type {
  CheckPin,
  StartRestorePin,
  GetUserInfo,
  GetUserData,
  RememberAccessToken,
  RememberRefreshToken,
  SetUserRole,
  SetUserId,
  DetermineUserRole,
  SetUserManager,
  SetUserSupervisor
} from "./pin.private-tokens";
import { pinPrivateTokens } from "./pin.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";
import type { AppService } from "~/shared/container/container.service";

export class PinService {
  constructor(
    private readonly checkPin: CheckPin,
    private readonly startRestorePin: StartRestorePin,
    private readonly getUserInfo: GetUserInfo,
    private readonly getUserData: GetUserData,
    private readonly rememberAccessToken: RememberAccessToken,
    private readonly rememberRefreshToken: RememberRefreshToken,
    private readonly setUserRole: SetUserRole,
    private readonly setUserId: SetUserId,
    private readonly setUserManager: SetUserManager,
    private readonly setUserSupervisor: SetUserSupervisor,
    private readonly determineUserRole: DetermineUserRole,
    private readonly appService: AppService,
  ) {}

  private async loadUserProfile() {
    const accessToken = this.appService.getToken();
    const userData = await this.getUserInfo(accessToken);
    const currentRole = this.determineUserRole(userData.result.userData.roles);

    this.setUserRole(currentRole);
    this.setUserId(userData.result.userData.id);
  }

  private saveAuthTokens(accessToken: string, refreshToken: string) {
    this.rememberAccessToken(accessToken);
    this.rememberRefreshToken(refreshToken);
  }

  private async getAndSaveUserSuperiors() {
    const superiorsData = await this.getUserData(this.appService.getToken());

    const manager = superiorsData.data.userManager.length > 0 ? superiorsData.data.userManager[0] : null;
    const supervisor = superiorsData.data.userSupervisors.length > 0 ? superiorsData.data.userSupervisors[0] : null;

    if(manager) {
      this.setUserManager({
        id: manager.id,
        name: manager.name,
        email: manager.email,
        phone: manager.phone
      })
    }
    if(supervisor) {
      this.setUserSupervisor({
        id: supervisor.id,
        name: supervisor.name,
        email: supervisor.email,
        phone: supervisor.phone
      })
    }
  }

  async verifyPin(pin: string) {
    const accessToken = this.appService.getToken();
    const data = await this.checkPin(accessToken, pin);

    if (data.status === "success") {
      this.saveAuthTokens(
        data.result.token.access_token,
        data.result.token.refresh_token,
      );

      await this.getAndSaveUserSuperiors();
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

}

injected(
  PinService,
  pinPrivateTokens.checkPin,
  pinPrivateTokens.startRestorePin,
  pinPrivateTokens.getUserInfo,
  pinPrivateTokens.getUserData,
  pinPrivateTokens.rememberAccessToken,
  pinPrivateTokens.rememberRefreshToken,
  pinPrivateTokens.setUserRole,
  pinPrivateTokens.setUserId,
  pinPrivateTokens.setUserManager,
  pinPrivateTokens.setUserSupervisor,
  pinPrivateTokens.determineUserRole,
  appTokens.appService,
);
