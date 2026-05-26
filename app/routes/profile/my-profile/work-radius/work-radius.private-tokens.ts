import { token } from "brandi";

import type { GetMapFieldSuccess } from "~/api/_personal/getMapField/getMapFieldSuccess.schema";
import type { PostSetMapFieldSuccess } from "~/api/_personal/postSetMapField/postSetMapFieldSuccess.schema";
import type { GetSettingsFromKeySuccess } from "~/api/_settings/getSettingsFromKey/getSettingsFromKeySuccess.schema";
import type { GetGeoDataSuccess } from "~/api/getGeoData/getGeoDataSuccess.schema";

export type FetchMapField = (accessToken: string) => Promise<GetMapFieldSuccess>;

export type FetchSettingsFromKey = (
  accessToken: string,
  setting: "radius" | "intervalDayStart" | "intervalDayEnd",
) => Promise<GetSettingsFromKeySuccess>;

export type FetchGeoData = (geoData: string) => Promise<GetGeoDataSuccess>;

export type SaveMapField = (
  accessToken: string,
  mapAddress: string,
  mapRadius: string | null,
  latitude: string,
  longitude: string,
) => Promise<PostSetMapFieldSuccess>;

export const workRadiusPrivateTokens = {
  fetchMapField: token<FetchMapField>("work-radius-private:fetchMapField"),
  fetchSettingsFromKey: token<FetchSettingsFromKey>(
    "work-radius-private:fetchSettingsFromKey",
  ),
  fetchGeoData: token<FetchGeoData>("work-radius-private:fetchGeoData"),
  saveMapField: token<SaveMapField>("work-radius-private:saveMapField"),
};
