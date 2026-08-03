import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";
import { State } from "~/store/store";

export type ProfileData = {
  avatarUrl: string;
  displayName: string | null;
  userRole: State["userRole"];
  hasProfileErrors: boolean;
};
export class ProfileMapper {
  static toData(
    data: GetDataSuccess,
    userRole: ProfileData["userRole"],
  ): ProfileData {
    return {
      avatarUrl: data.data.logo ? data.data.logo : "",
      displayName: data.data.name,
      userRole: userRole,
      hasProfileErrors: Boolean(data.data.errorData),
    };
  }
}
