// import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";
import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";

import type { ProfileMetaLoaderData } from "./profile-meta.service";

export class ProfileMetaMapper {
  static toLoaderData(
    accessToken: string,
    data: GetDataSuccess,
  ): ProfileMetaLoaderData {
    // const userData = data.result.userData;
    const userData = data.data;

    return {
      accessToken,
      // id: userData.uuid !== "" ? userData.uuid : null,
      id: null,
      photo: userData.logo ? userData.logo : "",
      phone: userData.phone.toString(),
      email: userData.email,
    };
  }
}
