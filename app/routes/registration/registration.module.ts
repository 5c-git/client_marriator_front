import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { RegistrationService } from "./registration.service";
import { registrationPrivateTokens } from "./registration.private-tokens";
import { registrationTokens } from "./registration.tokens";

import { useStore } from "~/store/store";
import { getForm } from "~/api/getForm/getForm";
import { postSaveForm } from "~/api/postSaveForm/postSaveForm";
import { getStaticUserInfo } from "~/api/getStaticUserInfo/getStaticUserInfo";
import { postSetUserEmail } from "~/api/_personal/postSetUserEmail/postSetUserEmail";
import { postCheckEmailCode } from "~/api/postCheckEmailCode/postCheckEmailCode";
import { postFinishRegister } from "~/api/postFinishRegister/postFinishRegister";

export const registrationContainer = new Container().extend(appContainer);

registrationContainer
  .bind(registrationPrivateTokens.getRegistrationStep)
  .toConstant((accessToken, step) => getForm(accessToken, step));

registrationContainer
  .bind(registrationPrivateTokens.getUserStaticInfo)
  .toConstant((accessToken) => getStaticUserInfo(accessToken));

registrationContainer
  .bind(registrationPrivateTokens.postFields)
  .toConstant((accessToken, step, fields) =>
    postSaveForm(accessToken, step, fields),
  );

registrationContainer
  .bind(registrationPrivateTokens.checkEmailCode)
  .toConstant((accessToken, code) => postCheckEmailCode(accessToken, code));

registrationContainer
  .bind(registrationPrivateTokens.saveUserEmail)
  .toConstant((accessToken, email) => postSetUserEmail(accessToken, email));

registrationContainer
  .bind(registrationPrivateTokens.finishRegistration)
  .toConstant((accessToken) => postFinishRegister(accessToken));

registrationContainer
  .bind(registrationPrivateTokens.setUserEmail)
  .toConstant(useStore.getState().setUserEmail);

registrationContainer
  .bind(registrationPrivateTokens.getUserEmail)
  .toConstant(() => useStore.getState().userEmail);

registrationContainer
  .bind(registrationTokens.registrationService)
  .toInstance(RegistrationService)
  .inSingletonScope();
