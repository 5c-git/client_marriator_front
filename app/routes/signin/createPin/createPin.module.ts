import { Container } from "brandi";

import { postSetUserPin } from "~/api/postSetUserPin/postSetUserPin";
import { useStore } from "~/store/store";

import { CreatePinService } from "./createPin.service";
import { createPinPrivateTokens } from "./createPin.private-tokens";
import { createPinTokens } from "./createPin.tokens";

import { appContainer } from "~/shared/container/container";

export const createPinContainer = new Container().extend(appContainer);

createPinContainer
  .bind(createPinPrivateTokens.setUserPin)
  .toConstant(postSetUserPin);

createPinContainer
  .bind(createPinPrivateTokens.getUserRole)
  .toConstant(() => useStore.getState().userRole);

createPinContainer
  .bind(createPinTokens.createPinService)
  .toInstance(CreatePinService)
  .inSingletonScope();
