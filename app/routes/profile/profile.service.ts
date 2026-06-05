import { injected } from "brandi";

import type {
  FetchUserInfoCached,
  ClearAppStore,
  InvalidateUserInfoQueries,
} from "./profile.private-tokens";
import type { AppService } from "~/shared/container/container.service";

import { profilePrivateTokens } from "./profile.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { ProfileMapper, ProfileData } from "./profile.mapper";



export class ProfileService {
  constructor(
    private readonly fetchUserInfoCached: FetchUserInfoCached,
    private readonly clearAppStore: ClearAppStore,
    private readonly invalidateUserInfoQueries: InvalidateUserInfoQueries,
    private readonly appService: AppService,
  ) {}

  async loadProfile(): Promise<ProfileData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchUserInfoCached(accessToken);

    return ProfileMapper.toData(data);
  }

  logout() {
    this.clearAppStore();
    this.invalidateUserInfoQueries();

    return { status: "ok" as const };
  }
}

injected(
  ProfileService,
  profilePrivateTokens.fetchUserInfoCached,
  profilePrivateTokens.clearAppStore,
  profilePrivateTokens.invalidateUserInfoQueries,
  appTokens.appService,
);
