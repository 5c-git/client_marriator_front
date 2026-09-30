import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type { Inputs } from "~/shared/constructor/inputs.schema";
import type {
  FetchUserFields,
  SaveUserFields,
} from "./profile-edit.private-tokens";

import { profileEditPrivateTokens } from "./profile-edit.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

export type ProfileEditLoaderData = {
  accessToken: string;
  formFields: Inputs;
  currentSection?: string;
};

export class ProfileEditService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchUserFields: FetchUserFields,
    private readonly saveUserFields: SaveUserFields,
  ) {}

  async loadProfileEdit(section: string): Promise<ProfileEditLoaderData> {
    const accessToken = this.appService.getToken();
    const data = await this.fetchUserFields(accessToken, section);

    const currentSectionItem = data.result.section.find(
      (item) => item.value === Number(section),
    );

    return {
      accessToken,
      formFields: data.result.formData,
      currentSection: currentSectionItem?.name,
    };
  }

  async saveProfileFields(fields: unknown) {
    return await this.saveUserFields(this.appService.getToken(), fields);
  }
}

injected(
  ProfileEditService,
  appTokens.appService,
  profileEditPrivateTokens.fetchUserFields,
  profileEditPrivateTokens.saveUserFields,
);
