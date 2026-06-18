import { Container } from "brandi";

import { appPrivateTokens } from "./container.private-tokens";
import { appTokens } from "./container.tokens";

import { AppService } from "./container.service";

import { useStore } from "../../store/store";

export const appContainer = new Container();

appContainer
  .bind(appPrivateTokens.getAccessToken)
  .toConstant(() => useStore.getState().accessToken);

appContainer
  .bind(appPrivateTokens.getUserRole)
  .toConstant(() => useStore.getState().userRole);

appContainer
  .bind(appTokens.appService)
  .toInstance(AppService)
  .inSingletonScope();
