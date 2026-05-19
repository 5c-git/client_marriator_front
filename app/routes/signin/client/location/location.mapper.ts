import type { LngLat } from "ymaps3";

import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";
import type { GetPlaceSuccess } from "~/api/getPlace/getPlaceSuccess.schema";

export type LocationOption = {
    value: string;
    name: string;
    icon: string;
    coordinates: LngLat;
    address: string;
    region: string;
    regionId: string;
    disabled: boolean;
};
  
export type LocationRegionOption = {
    value: string;
    label: string;
    disabled: boolean;
};


export class LocationMapper {
    static mapPlacesToLocationOptions(locations: GetPlaceSuccess): LocationOption[] {


        const shops: LocationOption[] = [];

        locations.data.forEach((item, index) => {
            shops.push({
              value: item.id.toString(),
              name: item.name,
              icon: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
              coordinates: [Number(item.latitude), Number(item.longitude)],
              address: item.address_kladr,
              region: item.region.name,
              regionId: item.region.id.toString(),
              disabled: false,
            });
          });

          return shops
    }

    static mapPlacesToLocationRegionOptions(items: GetPlaceSuccess): LocationRegionOption[] {
        const regions: LocationRegionOption[] = [];

        items.data.forEach((item, index) => {
            const match = regions.findIndex(
                (region) => region.value === item.region.id.toString(),
              );
        
              if (match === -1) {
                regions.push({
                  value: items.data[index].region.id.toString(),
                  label: items.data[index].region.name,
                  disabled: false,
                });
              }
        });

        return regions;
    }

    static mapLocationsToSelectedLocations(items: GetDataSuccess): string[] {
        const selectedLocations: string[] = [];

        items.data.place.forEach((item) => {
            selectedLocations.push(item.id.toString());
        });

        return selectedLocations;
    }
}