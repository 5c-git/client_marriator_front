import type { GetDataSuccess } from "~/api/_personal/getData/getDataSuccess.schema";
import type { GetBrandSuccess } from "~/api/getBrand/getBrandSuccess.schema";

export type MetaBrandOption = {
  value: string;
  label: string;
  disabled: boolean;
  image: string | null;
};

export type MetaLocationOption = {
  id: number;
  name: string;
  icon: string;
  coordinates: string[];
  address: string;
};

export class MetaMapper {
  static mapBrandsToOptions(brandsData: GetBrandSuccess): MetaBrandOption[] {
    return brandsData.data.map((item) => ({
      value: item.id.toString(),
      label: item.name,
      disabled: false,
      image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
    }));
  }

  static mapPlacesToLocationOptions(
    userData: GetDataSuccess,
  ): MetaLocationOption[] {
    return userData.data.place.map((place) => ({
      id: place.id,
      name: place.name,
      icon: place.logo,
      coordinates: [place.latitude, place.longitude],
      address: place.address_kladr,
    }));
  }

  static mapUserName(
    userData: GetDataSuccess,
    persistedFio: string,
  ): string {
    return userData.data.name ? userData.data.name : persistedFio;
  }

  static mapUserLogo(userData: GetDataSuccess): string {
    return userData.data.logo ? userData.data.logo : "";
  }
}
