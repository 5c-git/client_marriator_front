import { token } from "brandi";

import type { GetUserFieldsSuccess } from "~/api/_personal/getUserFields/getUserFields.schema";
import type { PostSaveUserFieldsError } from "~/api/_personal/postSaveUserFields/postSaveUserFieldsError.schema";
import type { PostSaveUserFieldsSuccess } from "~/api/_personal/postSaveUserFields/postSaveUserFieldsSuccess.schema";

export type FetchUserFields = (
  accessToken: string,
  section: string,
) => Promise<GetUserFieldsSuccess>;

export type SaveUserFields = (
  accessToken: string,
  formData: unknown,
) => Promise<PostSaveUserFieldsSuccess | PostSaveUserFieldsError>;

export const profileEditPrivateTokens = {
  fetchUserFields: token<FetchUserFields>(
    "profile-edit-private:fetchUserFields",
  ),
  saveUserFields: token<SaveUserFields>("profile-edit-private:saveUserFields"),
};
