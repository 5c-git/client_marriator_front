import { Container } from "brandi";

import { getData } from "~/api/_personal/getData/getData";
import { getBrand } from "~/api/getBrand/getBrand";
import { postDelPlace } from "~/api/postDelPlace/postDelPlace";
import { postSetBrandImg } from "~/api/postSetBrandImg/postSetBrandImg";
import { postSetUserData } from "~/api/postSetUserData/postSetUserData";
import { postFinishRegister } from "~/api/postFinishRegister/postFinishRegister";
import { useStore } from "~/store/store";

import { MetaService } from "./meta.service";
import { metaPrivateTokens } from "./meta.private-tokens";
import { metaTokens } from "./meta.tokens";
import { useMetaStore } from "./metaStore";

import { appContainer } from "~/shared/container/container";

export const metaContainer = new Container().extend(appContainer);

metaContainer.bind(metaPrivateTokens.getData).toConstant(getData);
metaContainer.bind(metaPrivateTokens.getBrand).toConstant(getBrand);
metaContainer.bind(metaPrivateTokens.delPlace).toConstant(postDelPlace);
metaContainer.bind(metaPrivateTokens.setBrandImg).toConstant(postSetBrandImg);
metaContainer.bind(metaPrivateTokens.setUserData).toConstant(postSetUserData);
metaContainer
  .bind(metaPrivateTokens.postFinishRegister)
  .toConstant(postFinishRegister);
metaContainer
  .bind(metaPrivateTokens.getPersistedFio)
  .toConstant(() => useMetaStore.getState().fio);
metaContainer
  .bind(metaPrivateTokens.clearMetaStore)
  .toConstant(() => useMetaStore.getState().clearStore);
metaContainer
  .bind(metaPrivateTokens.clearAppStore)
  .toConstant(() => useStore.getState().clearStore);

metaContainer
  .bind(metaTokens.metaService)
  .toInstance(MetaService)
  .inSingletonScope();
