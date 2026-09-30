import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { WorkRadiusService } from "./work-radius.service";
import { workRadiusPrivateTokens } from "./work-radius.private-tokens";
import { workRadiusTokens } from "./work-radius.tokens";

import { getMapField } from "~/api/_personal/getMapField/getMapField";
import { getSettingsFromKey } from "~/api/_settings/getSettingsFromKey/getSettingsFromKey";
import { postSetMapField } from "~/api/_personal/postSetMapField/postSetMapField";
import { getGeoData } from "~/api/getGeoData/getGeoData";

export const workRadiusContainer = new Container().extend(appContainer);

workRadiusContainer
  .bind(workRadiusPrivateTokens.fetchMapField)
  .toConstant((accessToken) => getMapField(accessToken));

workRadiusContainer
  .bind(workRadiusPrivateTokens.fetchSettingsFromKey)
  .toConstant((accessToken, setting) => getSettingsFromKey(accessToken, setting));

workRadiusContainer
  .bind(workRadiusPrivateTokens.fetchGeoData)
  .toConstant((geoData) => getGeoData(geoData));

workRadiusContainer
  .bind(workRadiusPrivateTokens.saveMapField)
  .toConstant((accessToken, mapAddress, mapRadius, latitude, longitude) =>
    postSetMapField(accessToken, mapAddress, mapRadius, latitude, longitude),
  );

workRadiusContainer
  .bind(workRadiusTokens.workRadiusService)
  .toInstance(WorkRadiusService)
  .inSingletonScope();
