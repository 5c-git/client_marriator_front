import { injected } from "brandi";

import type { FetchUserPersonalMenuCached } from "./my-profile.private-tokens";
import type { AppService } from "~/shared/container/container.service";

import { myProfilePrivateTokens } from "./my-profile.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { MyProfileMapper, MyProfileData } from "./my-profile.mapper";


export class MyProfileService {
  constructor(
    private readonly fetchUserPersonalMenuCached: FetchUserPersonalMenuCached,
    private readonly appService: AppService,
  ) {}

  async loadMyProfile(): Promise<MyProfileData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchUserPersonalMenuCached(accessToken);

    return MyProfileMapper.toData(data);
  }
}

injected(
  MyProfileService,
  myProfilePrivateTokens.fetchUserPersonalMenuCached,
  appTokens.appService,
);
