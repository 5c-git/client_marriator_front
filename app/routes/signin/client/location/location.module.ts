import { Container } from "brandi";

import { getData } from "~/api/_personal/getData/getData";
import { getPlace } from "~/api/getPlace/getPlace";
import { postSetPlace } from "~/api/postSetPlace/postSetPlace";

import { LocationService } from "./location.service";
import { locationPrivateTokens } from "./location.private-tokens";
import { locationTokens } from "./location.tokens";

import { appContainer } from "~/shared/container/container";

export const locationContainer = new Container().extend(appContainer);

locationContainer.bind(locationPrivateTokens.getData).toConstant(getData);
locationContainer.bind(locationPrivateTokens.getPlace).toConstant(getPlace);
locationContainer.bind(locationPrivateTokens.setPlace).toConstant(postSetPlace);

locationContainer
  .bind(locationTokens.locationService)
  .toInstance(LocationService)
  .inSingletonScope();
