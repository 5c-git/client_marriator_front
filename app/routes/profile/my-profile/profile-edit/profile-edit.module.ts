import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { ProfileEditService } from "./profile-edit.service";
import { profileEditPrivateTokens } from "./profile-edit.private-tokens";
import { profileEditTokens } from "./profile-edit.tokens";

import { getUserFields } from "~/api/_personal/getUserFields/getUserFields";
import { postSaveUserFields } from "~/api/_personal/postSaveUserFields/postSaveUserFields";

export const profileEditContainer = new Container().extend(appContainer);

profileEditContainer
  .bind(profileEditPrivateTokens.fetchUserFields)
  .toConstant((accessToken, section) => getUserFields(accessToken, section));

profileEditContainer
  .bind(profileEditPrivateTokens.saveUserFields)
  .toConstant((accessToken, formData) =>
    postSaveUserFields(accessToken, formData),
  );

profileEditContainer
  .bind(profileEditTokens.profileEditService)
  .toInstance(ProfileEditService)
  .inSingletonScope();
