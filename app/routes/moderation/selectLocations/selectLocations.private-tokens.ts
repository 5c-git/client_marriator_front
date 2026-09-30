import { token } from "brandi";

import type { GetModerationSingleClientSuccess } from "~/api/_personal/_moderation/getModerationSingleClient/getModerationSingleClientSuccess.schema";
import type { GetPlaceModerationSuccess } from "~/api/_personal/_moderation/getPlaceModeration/getPlaceModerationSuccess.schema";
import type { PostSetPlaceModerationSuccess } from "~/api/_personal/_moderation/postSetPlaceModeration/postSetPlaceModerationSuccess.schema";

export type FetchModerationSingleClient = (
  accessToken: string,
  userId: number,
) => Promise<GetModerationSingleClientSuccess>;

export type FetchPlaceModeration = (
  accessToken: string,
  userId: number,
) => Promise<GetPlaceModerationSuccess>;

export type SavePlaceModeration = (
  accessToken: string,
  userId: string,
  locations: string[],
) => Promise<PostSetPlaceModerationSuccess>;

export const selectLocationsPrivateTokens = {
  fetchModerationSingleClient: token<FetchModerationSingleClient>(
    "users-selectLocations-private:fetchModerationSingleClient",
  ),
  fetchPlaceModeration: token<FetchPlaceModeration>(
    "users-selectLocations-private:fetchPlaceModeration",
  ),
  savePlaceModeration: token<SavePlaceModeration>(
    "users-selectLocations-private:savePlaceModeration",
  ),
};
