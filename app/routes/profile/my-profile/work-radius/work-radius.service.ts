import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import type {
  FetchGeoData,
  FetchMapField,
  FetchSettingsFromKey,
  SaveMapField,
} from "./work-radius.private-tokens";

import { workRadiusPrivateTokens } from "./work-radius.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

const DEFAULT_COORDINATES: [lon: number, lat: number] = [37.623082, 55.75254];

export type WorkRadiusLoaderData = {
  address: string;
  coordinates: [lon: number, lat: number];
  radius: string;
};

export type WorkRadiusFormValues = {
  address: string;
  coordinates: [lon: number, lat: number];
  radius: string;
};

export type WorkRadiusActionPayload = {
  _action?: string;
  value?: string;
  radius?: string;
};

export type WorkRadiusActionResult =
  | null
  | { reset: "reset" }
  | { error: 400 | 402 | 404 };

export class WorkRadiusService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchMapField: FetchMapField,
    private readonly fetchSettingsFromKey: FetchSettingsFromKey,
    private readonly fetchGeoData: FetchGeoData,
    private readonly saveMapField: SaveMapField,
  ) {}

  async loadWorkRadiusData(): Promise<WorkRadiusLoaderData> {
    const accessToken = this.appService.getToken();

    const geolocation = [] as unknown as [lon: number, lat: number];
    navigator.geolocation.getCurrentPosition(
      (position) => {
        geolocation.push(position.coords.longitude);
        geolocation.push(position.coords.latitude);
      },
      () => {
        geolocation.push(DEFAULT_COORDINATES[0]);
        geolocation.push(DEFAULT_COORDINATES[1]);
      },
      {
        maximumAge: 1000,
      },
    );

    const mapData = await this.fetchMapField(accessToken);
    const settingsData = await this.fetchSettingsFromKey(accessToken, "radius");

    const coordinates: [lon: number, lat: number] =
      mapData.result.latitude !== null && mapData.result.longitude !== null
        ? [Number(mapData.result.longitude), Number(mapData.result.latitude)]
        : geolocation;

    return {
      address: mapData.result.mapAddress,
      coordinates,
      radius:
        mapData.result.mapRadius === ""
          ? settingsData.data.value
          : mapData.result.mapRadius,
    };
  }

  async submitGeoData(
    payload: WorkRadiusActionPayload,
  ): Promise<WorkRadiusActionResult> {
    if (payload._action === "reset") {
      return { reset: "reset" };
    }

    if (payload.value === "") {
      return { error: 400 };
    }

    if (payload.radius === "") {
      return { error: 402 };
    }

    const yandexGeoData = await this.fetchGeoData(payload.value!);
    const accessToken = this.appService.getToken();

    if (yandexGeoData.response.GeoObjectCollection.featureMember.length === 0) {
      return { error: 404 };
    }

    const geoObject =
      yandexGeoData.response.GeoObjectCollection.featureMember[0].GeoObject;
    const [longitude, latitude] = geoObject.Point.pos.split(" ");

    await this.saveMapField(
      accessToken,
      geoObject.metaDataProperty.GeocoderMetaData.text,
      payload.radius!,
      latitude,
      longitude,
    );

    return null;
  }
}

injected(
  WorkRadiusService,
  appTokens.appService,
  workRadiusPrivateTokens.fetchMapField,
  workRadiusPrivateTokens.fetchSettingsFromKey,
  workRadiusPrivateTokens.fetchGeoData,
  workRadiusPrivateTokens.saveMapField,
);
