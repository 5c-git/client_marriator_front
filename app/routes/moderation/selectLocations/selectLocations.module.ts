import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { getModerationSingleClient } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { getPlaceModeration } from "~/api/_personal/_moderation/getPlaceModeration/getPlaceModeration";
import { postSetPlaceModeration } from "~/api/_personal/_moderation/postSetPlaceModeration/postSetPlaceModeration";

import { selectLocationsPrivateTokens } from "./selectLocations.private-tokens";
import { SelectLocationsService } from "./selectLocations.service";
import { selectLocationsTokens } from "./selectLocations.tokens";

export const selectLocationsContainer = new Container().extend(appContainer);

selectLocationsContainer
  .bind(selectLocationsPrivateTokens.fetchModerationSingleClient)
  .toConstant((accessToken, userId) =>
    getModerationSingleClient(accessToken, userId),
  );

selectLocationsContainer
  .bind(selectLocationsPrivateTokens.fetchPlaceModeration)
  .toConstant((accessToken, userId) => getPlaceModeration(accessToken, userId));

selectLocationsContainer
  .bind(selectLocationsPrivateTokens.savePlaceModeration)
  .toConstant((accessToken, userId, locations) =>
    postSetPlaceModeration(accessToken, userId, locations),
  );

selectLocationsContainer
  .bind(selectLocationsTokens.selectLocationsService)
  .toInstance(SelectLocationsService)
  .inSingletonScope();
