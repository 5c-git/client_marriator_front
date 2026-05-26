import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type {
  ChangeUserPhone,
  FetchUserInfo,
  SetPersonalUserEmail,
  SetUserEmail,
  SetUserPhone,
} from "./profile-meta.private-tokens";

import { profileMetaPrivateTokens } from "./profile-meta.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";
import { ProfileMetaMapper } from "./profile-meta.mapper";

export type ProfileMetaLoaderData = {
  accessToken: string;
  id: string | null;
  photo: string;
  phone: string;
  email: string;
};

export type ProfileMetaFormValues = {
  metaPhoto: string;
  metaPhone: string;
  metaEmail: string;
};

export type ProfileMetaActionError = {
  error: "emailAlreadyExists" | "phoneAlreadyExists";
};

export type ProfileMetaActionRedirect = {
  redirectPath: string;
};

export type ProfileMetaActionResult =
  | null
  | ProfileMetaActionError
  | ProfileMetaActionRedirect;

const CONFIRM_TTL = "120";

export class ProfileMetaService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchUserInfo: FetchUserInfo,
    private readonly setPersonalUserEmail: SetPersonalUserEmail,
    private readonly changeUserPhone: ChangeUserPhone,
    private readonly setUserEmail: SetUserEmail,
    private readonly setUserPhone: SetUserPhone,
  ) {}

  async loadProfileMeta(): Promise<ProfileMetaLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchUserInfo(accessToken);

    return ProfileMetaMapper.toLoaderData(accessToken, data);
  }

  async confirmEmail(email: string): Promise<ProfileMetaActionResult> {
    const accessToken = this.appService.getToken();

    this.setUserEmail(email);

    const newEmailData = await this.setPersonalUserEmail(accessToken, email);

    if (newEmailData.status === "error") {
      return { error: "emailAlreadyExists" };
    }

    return {
      redirectPath: `/profile/my-profile/profile-meta/confirm-personal-email?ttl=${CONFIRM_TTL}`,
    };
  }

  async confirmPhone(phone: string): Promise<ProfileMetaActionResult> {
    const accessToken = this.appService.getToken();

    this.setUserPhone(phone);

    const newPhoneData = await this.changeUserPhone(accessToken, phone);

    if (newPhoneData.status === "error") {
      return { error: "phoneAlreadyExists" };
    }

    return {
      redirectPath: `/profile/my-profile/profile-meta/confirm-personal-phone?ttl=${CONFIRM_TTL}`,
    };
  }
}

injected(
  ProfileMetaService,
  appTokens.appService,
  profileMetaPrivateTokens.fetchUserInfo,
  profileMetaPrivateTokens.setPersonalUserEmail,
  profileMetaPrivateTokens.changeUserPhone,
  profileMetaPrivateTokens.setUserEmail,
  profileMetaPrivateTokens.setUserPhone,
);
