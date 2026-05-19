import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";

import type { ProfileLoaderData } from "./profile.service";

export class ProfileMapper {
  static toLoaderData(data: GetUserInfoSuccess): ProfileLoaderData {
    const { userData } = data.result;

    return {
      avatarUrl: userData.img,
      displayName: userData.name,
      hasProfileErrors: Boolean(userData.errorData),
    };
  }
}
