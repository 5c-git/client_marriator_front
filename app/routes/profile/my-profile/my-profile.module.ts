import { Container } from "brandi";

import {
  getUserPersonalMenu,
  getUserPersonalMenuKeys,
} from "~/api/_personal/getUserPersonalMenu/getUserPersonalMenu";
import { queryClient } from "~/shared/queryClient";

import { appContainer } from "~/shared/container/container";

import { MyProfileService } from "./my-profile.service";
import { myProfilePrivateTokens } from "./my-profile.private-tokens";
import { myProfileTokens } from "./my-profile.tokens";

export const myProfileContainer = new Container().extend(appContainer);

myProfileContainer
  .bind(myProfilePrivateTokens.fetchUserPersonalMenuCached)
  .toConstant((accessToken) =>
    queryClient.fetchQuery({
      queryKey: [getUserPersonalMenuKeys[0]],
      queryFn: () => getUserPersonalMenu(accessToken),
      staleTime: 60000,
    }),
  );

myProfileContainer
  .bind(myProfileTokens.myProfileService)
  .toInstance(MyProfileService)
  .inSingletonScope();
