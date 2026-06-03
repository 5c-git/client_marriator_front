import { Container } from "brandi";

import { getData } from "~/api/_personal/getData/getData";
import { postCheckPin } from "~/api/postCheckPin/postCheckPin";
import { postStartRestorePin } from "~/api/postStartRestorePin/postStartRestorePin";
import { getUserInfo } from "~/api/_personal/getUserInfo/getUserInfo";
import { useStore } from "~/store/store";
import { determineRole } from "~/shared/determineRole";

import { PinService } from "./pin.service";
import { pinPrivateTokens } from "./pin.private-tokens";
import { pinTokens } from "./pin.tokens";

import { appContainer } from "~/shared/container/container";

export const pinContainer = new Container().extend(appContainer);


pinContainer.bind(pinPrivateTokens.checkPin).toConstant(postCheckPin);
pinContainer
  .bind(pinPrivateTokens.startRestorePin)
  .toConstant(postStartRestorePin);
pinContainer.bind(pinPrivateTokens.getUserInfo).toConstant(getUserInfo);
pinContainer
  .bind(pinPrivateTokens.rememberAccessToken)
  .toConstant(useStore.getState().setAccessToken);
pinContainer
  .bind(pinPrivateTokens.rememberRefreshToken)
  .toConstant(useStore.getState().setRefreshToken);
pinContainer
  .bind(pinPrivateTokens.setUserRole)
  .toConstant(useStore.getState().setUserRole);
pinContainer
  .bind(pinPrivateTokens.setUserId)
  .toConstant(useStore.getState().setUserId);
pinContainer
  .bind(pinPrivateTokens.determineUserRole)
  .toConstant(determineRole);
  pinContainer
  .bind(pinPrivateTokens.setUserManager)
  .toConstant(useStore.getState().setUserManager);
pinContainer
  .bind(pinPrivateTokens.setUserSupervisor)
  .toConstant(useStore.getState().setUserSupervisor);

pinContainer
  .bind(pinPrivateTokens.getUserData)
  .toConstant(getData);



pinContainer
  .bind(pinTokens.pinService)
  .toInstance(PinService)
  .inSingletonScope();
