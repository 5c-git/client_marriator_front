import { injected } from "brandi";


import type { GetData, GetPlace, SetPlace } from "./location.private-tokens";
import type { AppService } from "~/shared/container/container.service";
import type { LocationOption, LocationRegionOption } from "./location.mapper";

import { locationPrivateTokens } from "./location.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { LocationMapper } from "./location.mapper";

export type LocationLoaderData = {
  shops: LocationOption[];
  regions: LocationRegionOption[];
  selectedLocations: string[];
};

export class LocationService {
  constructor(
    private readonly getData: GetData,
    private readonly getPlace: GetPlace,
    private readonly setPlace: SetPlace,
    private readonly appService: AppService,
  ) {}

  async loadLocations(): Promise<LocationLoaderData> {
    const accessToken = this.appService.getToken();
    const userData = await this.getData(accessToken);
    const locationsData = await this.getPlace(accessToken);

    const shops: LocationOption[] = LocationMapper.mapPlacesToLocationOptions(locationsData);
    const regions: LocationRegionOption[] = LocationMapper.mapPlacesToLocationRegionOptions(locationsData);
    const selectedLocations: string[] = LocationMapper.mapLocationsToSelectedLocations(userData);

    return { shops, regions, selectedLocations };
  }

  async saveLocations(shopIds: string[]) {
    const accessToken = this.appService.getToken();
    await this.setPlace(accessToken, shopIds);
  }
}

injected(
  LocationService,
  locationPrivateTokens.getData,
  locationPrivateTokens.getPlace,
  locationPrivateTokens.setPlace,
  appTokens.appService,
);
