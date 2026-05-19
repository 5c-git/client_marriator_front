import { Container } from "brandi";

import { postStartRestorePin } from "~/api/postStartRestorePin/postStartRestorePin";
import { postCheckCodeRestore } from "~/api/postCheckCodeRestore/postCheckCodeRestore";
import { useStore } from "~/store/store";

import { ConfirmRestorePinService } from "./confirmRestorePin.service";
import { confirmRestorePinPrivateTokens } from "./confirmRestorePin.private-tokens";
import { confirmRestorePinTokens } from "./confirmRestorePin.tokens";

import { appContainer } from "~/shared/container/container";

export const confirmRestorePinContainer = new Container().extend(appContainer);

confirmRestorePinContainer
  .bind(confirmRestorePinPrivateTokens.startRestorePin)
  .toConstant(postStartRestorePin);
confirmRestorePinContainer
  .bind(confirmRestorePinPrivateTokens.checkCodeRestore)
  .toConstant(postCheckCodeRestore);
confirmRestorePinContainer
  .bind(confirmRestorePinPrivateTokens.rememberAccessToken)
  .toConstant(useStore.getState().setAccessToken);
confirmRestorePinContainer
  .bind(confirmRestorePinPrivateTokens.rememberRefreshToken)
  .toConstant(useStore.getState().setRefreshToken);

confirmRestorePinContainer
  .bind(confirmRestorePinTokens.confirmRestorePinService)
  .toInstance(ConfirmRestorePinService)
  .inSingletonScope();
