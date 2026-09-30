import type { GetPlaceSuccess } from "~/api/getPlace/getPlaceSuccess.schema";

export type RecruiterLocationOption = {
  id: number;
  name: string;
  icon: string;
  coordinates: string[];
  address: string;
};

export class RecruiterMapper {
  static mapPlacesToLocationOptions(
    locationsData: GetPlaceSuccess,
  ): RecruiterLocationOption[] {
    return locationsData.data.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.logo,
      coordinates: [item.latitude, item.longitude],
      address: item.address_kladr,
    }));
  }
}
