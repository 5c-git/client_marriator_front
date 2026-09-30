import { injected } from "brandi";

import type { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

import type {
  FetchModerationSingleClient,
  FetchPlaceModeration,
  SavePlaceModeration,
} from "./selectLocations.private-tokens";
import { selectLocationsPrivateTokens } from "./selectLocations.private-tokens";

export type LocationOption = {
  value: string;
  name: string;
  icon: string;
  coordinates: [lon: number, lat: number];
  address: string;
  region: string;
  regionId: string;
  disabled: boolean;
};

export type RegionOption = {
  value: string;
  label: string;
  disabled: boolean;
};

export type SelectLocationsLoaderData = {
  userId: string;
  locations: LocationOption[];
  regions: RegionOption[];
  selectedLocations: string[];
};

export class SelectLocationsService {
  constructor(
    private readonly appService: AppService,
    private readonly fetchModerationSingleClient: FetchModerationSingleClient,
    private readonly fetchPlaceModeration: FetchPlaceModeration,
    private readonly savePlaceModeration: SavePlaceModeration,
  ) {}

  async getSelectLocationsData(
    userId: number,
  ): Promise<SelectLocationsLoaderData> {
    const accessToken = this.appService.getToken();
    const [userData, locationsData] = await Promise.all([
      this.fetchModerationSingleClient(accessToken, userId),
      this.fetchPlaceModeration(accessToken, userId),
    ]);

    const regions: RegionOption[] = [];
    const locations: LocationOption[] = [];
    const selectedLocations: string[] = [];

    locationsData.data.forEach((item, index) => {
      locations.push({
        value: item.id.toString(),
        name: item.name,
        icon: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
        coordinates: [Number(item.latitude), Number(item.longitude)],
        address: item.address_kladr,
        region: item.region.name,
        regionId: item.region.id.toString(),
        disabled: false,
      });

      const match = regions.findIndex(
        (region) => region.value === item.region.id.toString(),
      );

      if (match === -1) {
        regions.push({
          value: locationsData.data[index].region.id.toString(),
          label: locationsData.data[index].region.name,
          disabled: false,
        });
      }
    });

    userData.data.place.forEach((item) => {
      selectedLocations.push(item.id.toString());
    });

    return {
      userId: userId.toString(),
      locations,
      regions,
      selectedLocations,
    };
  }

  async saveSelectedLocations(userId: string, locations: string[]) {
    const accessToken = this.appService.getToken();
    return await this.savePlaceModeration(accessToken, userId, locations);
  }
}

injected(
  SelectLocationsService,
  appTokens.appService,
  selectLocationsPrivateTokens.fetchModerationSingleClient,
  selectLocationsPrivateTokens.fetchPlaceModeration,
  selectLocationsPrivateTokens.savePlaceModeration,
);
