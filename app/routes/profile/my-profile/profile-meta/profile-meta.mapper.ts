import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";

import type { ProfileMetaLoaderData } from "./profile-meta.service";

export class ProfileMetaMapper {
  static toLoaderData(
    accessToken: string,
    data: GetUserInfoSuccess,
  ): ProfileMetaLoaderData {
    const userData = data.result.userData;

    return {
      accessToken,
      id: userData.uuid !== "" ? userData.uuid : null,
      photo: userData.img,
      phone: userData.phone.toString(),
      email: userData.email,
    };
  }
}
