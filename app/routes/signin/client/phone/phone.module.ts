import { Container } from "brandi";

import { getUserByHash } from "~/api/getUserByHash/getUserByHash";
import { postSendPhone } from "~/api/postSendPhone/postSendPhone";
import { useStore } from "~/store/store";

import { PhoneService } from "./phone.service";
import { phonePrivateTokens } from "./phone.private-tokens";
import { phoneTokens } from "./phone.tokens";

import { appContainer } from "~/shared/container/container";

export const phoneContainer = new Container().extend(appContainer);

phoneContainer
  .bind(phonePrivateTokens.getUserByHash)
  .toConstant(getUserByHash);
phoneContainer.bind(phonePrivateTokens.sendPhone).toConstant(postSendPhone);
phoneContainer
  .bind(phonePrivateTokens.setUserPhone)
  .toConstant(useStore.getState().setUserPhone);
phoneContainer
  .bind(phonePrivateTokens.setUserRole)
  .toConstant(useStore.getState().setUserRole);

phoneContainer
  .bind(phoneTokens.phoneService)
  .toInstance(PhoneService)
  .inSingletonScope();
