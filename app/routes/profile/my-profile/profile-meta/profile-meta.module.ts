import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { ProfileMetaService } from "./profile-meta.service";
import { profileMetaPrivateTokens } from "./profile-meta.private-tokens";
import { profileMetaTokens } from "./profile-meta.tokens";

import { getUserInfo } from "~/api/_personal/getUserInfo/getUserInfo";
import { postChangeUserPhone } from "~/api/_personal/postChangeUserPhone/postChangeUserPhone";
import { postPersonalSetUserEmail } from "~/api/postPersonalSetUserEmail/postPersonalSetUserEmail";
import { useStore } from "~/store/store";

export const profileMetaContainer = new Container().extend(appContainer);

profileMetaContainer
  .bind(profileMetaPrivateTokens.fetchUserInfo)
  .toConstant((accessToken) => getUserInfo(accessToken));

profileMetaContainer
  .bind(profileMetaPrivateTokens.changeUserPhone)
  .toConstant((accessToken, phone) => postChangeUserPhone(accessToken, phone));

profileMetaContainer
  .bind(profileMetaPrivateTokens.setPersonalUserEmail)
  .toConstant((accessToken, email) =>
    postPersonalSetUserEmail(accessToken, email),
  );

profileMetaContainer
  .bind(profileMetaPrivateTokens.setUserEmail)
  .toConstant(useStore.getState().setUserEmail);

profileMetaContainer
  .bind(profileMetaPrivateTokens.setUserPhone)
  .toConstant(useStore.getState().setUserPhone);

profileMetaContainer
  .bind(profileMetaTokens.profileMetaService)
  .toInstance(ProfileMetaService)
  .inSingletonScope();
