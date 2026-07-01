import { GetSpecialistForBidSuccess } from "~/api/_personal/getSpecialistForBid/getSpecialistForBidSuccess.schema";
import { GetRadiusSelectSuccess } from "~/api/_personal/getRadiusSelect/getRadiusSelectSuccess.schema";
import type { SpecialistsMobileViewInterface } from "./SpecialitstsMobileView/SpecialistsMobileViewInterface";

export class SpecialistsMapper {
  static mapDataToSpecialists(
    data: GetSpecialistForBidSuccess,
  ): SpecialistsMobileViewInterface["specialists"] {
    return data.data.map((item) => ({
      id: item.id,
      phone: item.phone,
      email: item.email,
      logo: item.logo ? item.logo : "",
      roles: item.roles,
      radius: item.radius.toString(),
      name: item.name,
      age: item.age,
      country: item.country,
      viewActivities: item.viewActivities,
      status: 1,
      viewActivitiesAccurate: item.viewActivitiesAccurate,
    }));
  }

  static mapRadiusDataToOptions(data: GetRadiusSelectSuccess) {
    return data.data.map((item) => ({
      value: item.id.toString(),
      label: `${item.value.toString()} км`,
      disabled: false,
    }));
  }

  static getDefaultRadius(data: GetRadiusSelectSuccess) {
    let startingRadius = 1;

    const defaultRadius = data.data.find((item) => item.default === true);

    if (defaultRadius) {
      startingRadius = defaultRadius.id;
    }

    return startingRadius;
  }
}
