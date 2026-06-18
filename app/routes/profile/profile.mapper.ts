import type { GetUserInfoSuccess } from "~/api/_personal/getUserInfo/getUserInfoSuccess.schema";
import { State } from "~/store/store";

export type ProfileData = {
  avatarUrl: string;
  displayName: string | null;
  userRole: State["userRole"];
  hasProfileErrors: boolean;
};
export class ProfileMapper {
  static toData(
    data: GetUserInfoSuccess,
    userRole: ProfileData["userRole"],
  ): ProfileData {
    const { userData } = data.result;

    return {
      avatarUrl: userData.img,
      displayName: userData.name,
      userRole: userRole,
      hasProfileErrors: Boolean(userData.errorData),
    };
  }
}
