import { injected } from "brandi";

import type {
  FetchUserInfoCached,
  ClearAppStore,
  InvalidateUserInfoQueries,
} from "./profile.private-tokens";
import type { AppService } from "~/shared/container/container.service";

import { profilePrivateTokens } from "./profile.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { ProfileMapper } from "./profile.mapper";

export type ProfileLoaderData = {
  avatarUrl: string;
  displayName: string | null;
  hasProfileErrors: boolean;
};

export class ProfileService {
  constructor(
    private readonly fetchUserInfoCached: FetchUserInfoCached,
    private readonly clearAppStore: ClearAppStore,
    private readonly invalidateUserInfoQueries: InvalidateUserInfoQueries,
    private readonly appService: AppService,
  ) {}

  async loadProfile(): Promise<ProfileLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchUserInfoCached(accessToken);

    return ProfileMapper.toLoaderData(data);
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
