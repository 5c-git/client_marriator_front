import { injected } from "brandi";

import type { FetchUserPersonalMenuCached } from "./my-profile.private-tokens";
import type { AppService } from "~/shared/container/container.service";

import { myProfilePrivateTokens } from "./my-profile.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { MyProfileMapper } from "./my-profile.mapper";

export type MyProfileSection = {
  name: string;
  value: number;
  hasNotification: boolean;
};

export type MyProfileLoaderData = {
  sections: MyProfileSection[];
  hasSectionsWithNotifications: boolean;
};

export class MyProfileService {
  constructor(
    private readonly fetchUserPersonalMenuCached: FetchUserPersonalMenuCached,
    private readonly appService: AppService,
  ) {}

  async loadMyProfile(): Promise<MyProfileLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchUserPersonalMenuCached(accessToken);

    return MyProfileMapper.toLoaderData(data);
  }
}

injected(
  MyProfileService,
  myProfilePrivateTokens.fetchUserPersonalMenuCached,
  appTokens.appService,
);
