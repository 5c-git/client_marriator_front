import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { UsersLayoutService } from "./layout.service";
import { layoutTokens } from "./layout.tokens";

export const usersLayoutContainer = new Container().extend(appContainer);

usersLayoutContainer
  .bind(layoutTokens.usersLayoutService)
  .toInstance(UsersLayoutService)
  .inSingletonScope();
