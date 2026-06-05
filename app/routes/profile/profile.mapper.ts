import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";


export type ProfileData = {
  avatarUrl: string;
  displayName: string | null;
  hasProfileErrors: boolean;
};
export class ProfileMapper {
  static toData(data: GetUserInfoSuccess): ProfileData {
    const { userData } = data.result;

    return {
      avatarUrl: userData.img,
      displayName: userData.name,
      hasProfileErrors: Boolean(userData.errorData),
    };
  }
}
